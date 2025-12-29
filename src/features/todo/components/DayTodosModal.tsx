import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

import { useTheme } from "@/styles/hooks/useTheme";
import { formatTime } from "@/utils/date";
import { Todo } from "../types/todo.types";
import { TodoDetailModal } from "./TodoDetailModal";

interface DayTodosModalProps {
  visible: boolean;
  date: string;
  todos: Todo[];        // 🔥 선택된 날짜의 todos
  onClose: () => void;
}

export function DayTodosModal({
  visible,
  date,
  todos,
  onClose,
}: DayTodosModalProps) {
  const theme = useTheme();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showTodoDetail, setShowTodoDetail] = useState(false);
  const categories = useMemo(() => {
    const map = new Map<
      number,
      { id: number; name: string; color?: string }
    >();

    todos.forEach((todo) => {
      if (todo.category) {
        map.set(todo.category.id, {
          id: todo.category.id,
          name: todo.category.name,
          color: todo.category.color,
        });
      }
    });

    return Array.from(map.values());
  }, [todos]);
  const filteredTodos = useMemo(() => {
    if (selectedCategoryId == null) return todos;
    return todos.filter(
      (todo) => todo.category?.id === selectedCategoryId
    );
  }, [todos, selectedCategoryId]);


  useEffect(() => {
  if (visible) {
    setSelectedCategoryId(null); // 🔥 모달 열릴 때 항상 "전체"
  }
}, [visible]);

  return (
  <Modal visible={visible} animationType="slide" transparent>
    {/* 🔥 바깥 영역 (누르면 닫힘) */}
    <Pressable
      onPress={onClose}
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
      }}
    >
      {/* 🔥 안쪽 영역 (이벤트 전파 차단) */}
      <Pressable
        onPress={() => {}}
        style={{
          maxHeight: "80%",
          backgroundColor: theme.background.primary,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 12,
          minHeight: "80%"
        }}
      >
        {/* =========================
            헤더
        ========================= */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.text.primary,
            }}
          >
            {date} 일정
          </Text>

          <Pressable onPress={onClose}>
            <Text style={{ color: theme.text.secondary }}>
              닫기
            </Text>
          </Pressable>
        </View>

        {/* =========================
            🔥 카테고리 필터
        ========================= */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            marginBottom: 12,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {/* 전체 */}
          <Pressable
            onPress={() => setSelectedCategoryId(null)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor:
                selectedCategoryId === null
                  ? theme.text.primary
                  : theme.background.secondary,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color:
                  selectedCategoryId === null
                    ? theme.text.inverse
                    : theme.text.primary,
              }}
            >
              전체
            </Text>
          </Pressable>

          {categories.map((cat) => {
            const selected = selectedCategoryId === cat.id;

            return (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategoryId(cat.id)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: selected
                    ? cat.color ?? theme.text.primary
                    : theme.background.secondary,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: selected
                      ? theme.text.inverse
                      : theme.text.primary,
                    fontWeight: selected ? "600" : "400",
                  }}
                >
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedTodo(item);
                setShowTodoDetail(true);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
    alignItems: "center",
                  marginHorizontal: 16,
                  marginBottom: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  backgroundColor:
                    item.category?.color ??
                    theme.background.secondary,
                }}
              >
                <Text
                  style={{
                    flex:1,
                    color: theme.text.primary,
                    fontWeight: "500",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </Text>

                {item.reminderTime && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.text.primary,
                    }}
                  >
                    {formatTime(item.reminderTime)}
                  </Text>
                )}
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                color: theme.text.tertiary,
                marginTop: 24,
              }}
            >
              해당 카테고리 일정이 없습니다.
            </Text>
          }
        />

        {selectedTodo && (
          <TodoDetailModal
            visible={showTodoDetail}
            todo={selectedTodo}
            onClose={() => {
              setShowTodoDetail(false);
              setSelectedTodo(null);
            }}
          />
        )}
      </Pressable>
    </Pressable>
  </Modal>
);

}
