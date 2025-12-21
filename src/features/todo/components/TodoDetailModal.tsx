import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { Todo } from "../types/todo.types";
import { useEffect, useRef, useState } from "react";
import { useDebouncedEffect } from "@/utils/debounce";
import * as todoApi from "../services/todo.api";
import { ScrollView } from "react-native";
import { Animated, PanResponder } from "react-native";
import { TimePickerModal } from "../components/TimePickerModal";

interface TodoDetailModalProps {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
}

export function TodoDetailModal({
  visible,
  todo,
  onClose,
}: TodoDetailModalProps) {
  const theme = useTheme();

  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const lastSentRef = useRef<string>("");
  const dragOffsetY = useRef(0);

  useEffect(() => {
    if (!visible || !todo) return;

    setDescription(todo.description ?? "");
    setReminderTime(
      todo.reminderTime ? new Date(todo.reminderTime) : null
    );

    // debounce 비교 기준 초기화
    lastSentRef.current = JSON.stringify({
      description: todo.description ?? "",
      reminderTime: todo.reminderTime
        ? new Date(todo.reminderTime).toISOString()
        : null,
    });
  }, [visible, todo]);

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(500);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  



  const patchTodo = async () => {
    if (!todo) return;

    const payload = {
      description,
      reminderTime: reminderTime
        ? reminderTime.toISOString()
        : null,
    };

    const serialized = JSON.stringify(payload);
    if (serialized === lastSentRef.current) return;

    lastSentRef.current = serialized;
    await todoApi.updateTodo(todo.id, payload);
  };

  

  const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponderCapture: () => !showTimePicker,
    onMoveShouldSetPanResponderCapture: () => !showTimePicker,

    onStartShouldSetPanResponder: () => !showTimePicker,
    onMoveShouldSetPanResponder: (_, g) =>
      !showTimePicker && Math.abs(g.dy) > Math.abs(g.dx),

    onPanResponderGrant: () => {
      // 🔥 현재 위치를 기준점으로 저장
      dragOffsetY.current = 0;
    },

    onPanResponderMove: (_, g) => {
      if (g.dy > 0) {
        translateY.setValue(dragOffsetY.current + g.dy);
      }
    },

    onPanResponderRelease: (_, g) => {
      if (g.dy > 120) {
        Animated.timing(translateY, {
          toValue: 500,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onClose();   // 🔥 여기서 끝
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  })
).current;





  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [description], 700);

  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [reminderTime], 300);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* backdrop */}
      <Pressable
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onPress={() => {
          Keyboard.dismiss();
          patchTodo();
          onClose();
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.background.primary,
          padding: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          minHeight: "90%",
          transform: [{ translateY }],
        }}
      >
        <View
  {...panResponder.panHandlers}
  style={{
    alignItems: "center",
    paddingVertical: 16,   // 🔥 터치 영역 크게
  }}
>
  {/* 시각적 핸들 */}
  <View
    style={{
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.text.tertiary,
    }}
  />
</View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text
            style={{
              color: theme.text.primary,
              fontSize: 16,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {todo?.title}
          </Text>

          

          <Pressable
            onPress={() => {
              setShowTimePicker(true);
            }}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: theme.background.secondary,
            }}
          >
            <Text style={{ color: theme.text.primary }}>
              {reminderTime
                ? reminderTime.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "시간 선택"}
            </Text>
          </Pressable>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="상세 내용 입력 (선택)"
            placeholderTextColor={theme.text.tertiary}
            style={{
              minHeight: 80,
              color: theme.text.primary,
              padding: 12,
              borderRadius: 8,
              backgroundColor: theme.background.secondary,
              marginVertical: 16,
            }}
            multiline
          />
        </ScrollView>
      </Animated.View>

      {/* ✅ 같은 Modal 안에서 TimePicker 렌더 */}
      {showTimePicker && (
        <TimePickerModal
          visible={true}
          initialTime={reminderTime ?? new Date()}
          onConfirm={(time) => setReminderTime(time)}
          onClose={() => setShowTimePicker(false)}
        />
      )}
    </Modal>
  );
}
