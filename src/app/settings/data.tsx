import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { createStyles } from "./data.style";
import * as todoApi from "@/features/todo/services/todo.api"; // 경로 맞춰
import { useTodoByDate } from "@/features/todo/hooks/useTodoByDate";
import { useTodoStore } from "@/features/todo/store/todo.store";

export default function DataSettingsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const {selectedDate} = useTodoByDate();

  const [loading, setLoading] = useState(false);

  const handleDeleteAllTodos = () => {
    console.log("handledelete 호출")
    Alert.alert(
      "Todo 전체 삭제",
      "정말로 모든 Todo 데이터를 삭제할까요?\n삭제하면 복구할 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await todoApi.deleteAllTodo(); // ✅ 내 todo 전체 삭제 API
              Alert.alert("완료", "Todo 데이터를 모두 삭제했습니다.");
              await fetchTodos(selectedDate);
              
              
              router.back();
            } catch (err) {
              console.error("[DataSettings] deleteAllTodos error", err);
              Alert.alert("실패", "삭제 중 오류가 발생했습니다.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1 }]}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text.primary} />
        </Pressable>

        <Text style={styles.title}>데이터</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Todo 데이터</Text>
        <Text style={styles.sectionDesc}>
          모든 Todo를 한 번에 삭제합니다. 삭제 후 복구할 수 없습니다.
        </Text>

        <Pressable
          onPress={() => {
            console.log("[DataSettings] press delete button");
            handleDeleteAllTodos();

          }}
          disabled={loading}
          style={({ pressed }) => [
            styles.dangerButton,
            { opacity: pressed ? 0.6 : 1 },
            loading && styles.disabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.dangerText}>Todo 전체 삭제</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
