// AnniversarySettingsScreen.tsx
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Keyboard,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import {
  Anniversary,
  getAnniversaries,
  createAnniversary,
  updateAnniversary,
  deleteAnniversary,
} from "@/features/todo/services/todo.api";
import { createStyles } from "./anniversary.style";

import { useTodoStore } from "@/features/todo/store/todo.store";
import { useTodoByDate } from "@/features/todo/hooks/useTodoByDate";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isValidMonthDay(month: number, day: number) {
  const dt = new Date(2024, month - 1, day);
  return dt.getMonth() === month - 1 && dt.getDate() === day;
}

function daysInMonth(month: number) {
  return new Date(2024, month, 0).getDate();
}

export default function AnniversarySettingsScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Anniversary[]>([]);

  const fetchAnniversaries = useTodoStore((s) => s.fetchAnniversaries);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const { selectedDate } = useTodoByDate();

  // 폼
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  // 편집
  const [editingId, setEditingId] = useState<number | null>(null);

  // 날짜 선택 모달
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [tempMonth, setTempMonth] = useState(month);
  const [tempDay, setTempDay] = useState(day);

  const openDateModal = () => {
    Keyboard.dismiss();
    setTempMonth(month);
    setTempDay(day);
    setDateModalOpen(true);
  };

  const closeDateModal = () => setDateModalOpen(false);

  useEffect(() => {
    const max = daysInMonth(tempMonth);
    if (tempDay > max) setTempDay(max);
  }, [tempMonth, tempDay]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await getAnniversaries();
      const list = (res as any).data ?? res;
      setItems(list);
    } catch (err) {
      console.error("[AnniversarySettings] fetch error", err);
      Alert.alert("실패", "기념일을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const resetForm = () => {
    setTitle("");
    setMonth(1);
    setDay(1);
    setEditingId(null);
    Keyboard.dismiss();
  };

  const fillFormForEdit = (a: Anniversary) => {
    setEditingId(a.id);
    setTitle(a.title ?? "");
    setMonth(a.month);
    setDay(a.day);
  };

  const handleSubmit = async () => {
    const t = title.trim();
    if (!t) {
      Alert.alert("확인", "제목을 입력해 주세요.");
      return;
    }
    if (!isValidMonthDay(month, day)) {
      Alert.alert("확인", "존재하지 않는 날짜입니다.");
      return;
    }

    try {
      setLoading(true);

      if (editingId == null) {
        await createAnniversary({ title: t, month, day });
        Alert.alert("완료", "기념일을 추가했습니다.");
      } else {
        await updateAnniversary(editingId, { title: t, month, day });
        Alert.alert("완료", "기념일을 수정했습니다.");
      }

      await fetchList();
      await fetchAnniversaries();
      await fetchTodos(selectedDate);
      resetForm();
    } catch (err) {
      console.error("[AnniversarySettings] submit error", err);
      Alert.alert("실패", "처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (a: Anniversary) => {
    Alert.alert(
      "기념일 삭제",
      `"${a.title}" 기념일을 삭제할까요?\n삭제하면 복구할 수 없습니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteAnniversary(a.id);
              await fetchList();
              await fetchAnniversaries();
            } catch (err) {
              console.error("[AnniversarySettings] delete error", err);
              Alert.alert("실패", "삭제 중 오류가 발생했습니다.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const tempDayOptions = useMemo(() => {
    const max = daysInMonth(tempMonth);
    return Array.from({ length: max }, (_, i) => i + 1);
  }, [tempMonth]);

  const sortedItems = useMemo(() => {
    return items.slice().sort((a, b) => a.month - b.month || a.day - b.day);
  }, [items]);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text.primary} />
        </Pressable>

        <Text style={styles.title}>기념일</Text>
      </View>

      {/* ✅ 폼 고정 + 목록만 스크롤 */}
      <View style={styles.content}>
        {/* 폼 (고정) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>기념일 관리</Text>
              <Text style={styles.sectionDesc}>
                등록한 기념일은 매년 같은 날짜(월/일)에 달력에 표시됩니다.
              </Text>
            </View>

            {editingId != null && (
              <Pressable
                onPress={resetForm}
                style={({ pressed }) => [
                  styles.cancelEditButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={styles.cancelEditText}>편집 취소</Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.fieldLabel}>제목</Text>
          <View style={styles.textInputWrap}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="예: 생일, 결혼기념일"
              placeholderTextColor={theme.text.tertiary}
              style={styles.textInput}
              returnKeyType="done"
            />
          </View>

          <Text style={styles.fieldLabel}>날짜</Text>
          <Pressable
            onPress={openDateModal}
            style={({ pressed }) => [
              styles.selectBox,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.selectText}>
              {pad2(month)}월 {pad2(day)}일
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={theme.text.secondary}
            />
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={({ pressed }) => [
              styles.primaryButton,
              { opacity: pressed ? 0.7 : 1 },
              loading && styles.disabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.primaryButtonText}>
                {editingId == null ? "기념일 추가" : "수정 저장"}
              </Text>
            )}
          </Pressable>
        </View>

        {/* 목록 (여기만 스크롤) */}
        <View style={[styles.section, styles.listSection]}>
          <Text style={styles.sectionTitle}>목록</Text>

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
            </View>
          ) : sortedItems.length === 0 ? (
            <Text style={styles.emptyText}>등록된 기념일이 없습니다.</Text>
          ) : (
            <FlatList
              data={sortedItems}
              keyExtractor={(a) => String(a.id)}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag" // ✅ 키보드/스크롤 충돌 방지
              style={styles.list}
              contentContainerStyle={styles.listContent}
              renderItem={({ item: a }) => (
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.nameText} numberOfLines={1}>
                      {a.title}
                    </Text>
                    <Text style={styles.subText}>
                      {pad2(a.month)}월 {pad2(a.day)}일
                    </Text>
                  </View>

                  <View style={styles.right}>
                    <Pressable
                      onPress={() => fillFormForEdit(a)}
                      hitSlop={8}
                      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color={theme.text.secondary}
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => handleDelete(a)}
                      hitSlop={8}
                      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                    >
                      <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </Pressable>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>

      {/* 날짜 선택 모달 */}
      <Modal
        visible={dateModalOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDateModal}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalOverlay} onPress={closeDateModal} />

          <View style={styles.modalSheet} pointerEvents="box-none">
            <View style={styles.modalCard} pointerEvents="auto">
              <Text style={styles.modalTitle}>날짜 선택</Text>

              <View style={styles.modalPickerRow}>
                <View style={styles.modalPickerCol}>
                  <Text style={styles.modalLabel}>월</Text>
                  <View style={styles.modalPickerBox}>
                    <Picker
                      selectedValue={tempMonth}
                      onValueChange={(v) => setTempMonth(Number(v))}
                      style={styles.modalPicker}
                      itemStyle={styles.modalPickerItem}
                      dropdownIconColor={theme.text.primary}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <Picker.Item
                          key={m}
                          label={`${m}월`}
                          value={m}
                          color={theme.text.primary}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.modalPickerCol}>
                  <Text style={styles.modalLabel}>일</Text>
                  <View style={styles.modalPickerBox}>
                    <Picker
                      selectedValue={tempDay}
                      onValueChange={(v) => setTempDay(Number(v))}
                      style={styles.modalPicker}
                      itemStyle={styles.modalPickerItem}
                      dropdownIconColor={theme.text.primary}
                    >
                      {tempDayOptions.map((d) => (
                        <Picker.Item
                          key={d}
                          label={`${d}일`}
                          value={d}
                          color={theme.text.primary}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.modalActions}>
                <Pressable
                  onPress={closeDateModal}
                  style={({ pressed }) => [
                    styles.modalBtn,
                    styles.modalBtnGhost,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text style={styles.modalBtnGhostText}>취소</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setMonth(tempMonth);
                    setDay(tempDay);
                    closeDateModal();
                  }}
                  style={({ pressed }) => [
                    styles.modalBtn,
                    styles.modalBtnPrimary,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text style={styles.modalBtnPrimaryText}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
