import { FlatList, Text, View, Pressable } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { createComponentStyles } from "../styles/TodoComponents.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { formatTime } from "@/utils/date";

interface TodoListProps {
  todos: any[];
  header?: React.ReactElement | null;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
  onCompleted: (id: number) => void;
  onPressItem: (id: number) => void;
}

export function TodoList({
  todos,
  header,
  onDelete,
  onCompleted,
  loading,
  onPressItem,
}: TodoListProps) {
  const theme = useTheme();
  const styles = createComponentStyles(theme);

  return (
    <FlatList
      data={todos}
      extraData={todos}
      ListHeaderComponent={header}
      keyExtractor={(item) =>
        `${item.id}-${item.reminderTime ?? "none"}`
      }
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
      
        
      <View
        style={[
          styles.todoRow,

          // 완료 여부와 상관없이 카테고리 색만 유지
          item.category?.color && {
            backgroundColor: item.category.color,
          },
        ]}
      >
              
      <Pressable
        onPress={() => {
          onPressItem(item.id);
          console.log("item 클릭:", item.id);
        }}
        style={{ flex: 1 }}
      >
      <Text
        style={[
          styles.todoText,
          item.completed && {
            textDecorationLine: "line-through",
            color: theme.text.primary,
          },
        ]}
      >
        {item.title}
      </Text>
      </Pressable>

      {/* 오른쪽 액션 영역 */}
      <View style={styles.actions}>
        <Text style={styles.deleteText}>
          {formatTime(item.reminderTime)}
        </Text>
        <Pressable onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteText}>삭제</Text>
        </Pressable>

        <Pressable onPress={() => onCompleted(item.id)}>
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxChecked,
            ]}
          >
            {item.completed && (
              <MaterialIcons name="check" size={18} color={theme.text.primary} />
            )}
          </View>
        </Pressable>
      </View>
    </View>
    )}
      ListEmptyComponent={
        <Text style={{
           color: theme.text.tertiary,
           marginLeft:16,
           marginTop:16,
           
           }}>
          등록된 할 일이 없습니다.
        </Text>
      }
    />
  );
}
