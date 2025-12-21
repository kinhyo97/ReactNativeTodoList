import { FlatList, Text, View, Pressable } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { createComponentStyles } from "../styles/TodoComponents.styles";
import { MaterialIcons } from "@expo/vector-icons";

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
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View style={styles.todoRow}>
  {/* 왼쪽 영역 전체 클릭 */}
  <Pressable
    onPress={() => {
      onPressItem(item.id);
      console.log("item 클릭:", item.id);
    }}
    style={{ flex: 1 }}
  >
    <Text style={styles.todoText}>
      {item.title}
    </Text>
  </Pressable>

  {/* 오른쪽 액션 영역 */}
  <View style={styles.actions}>
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
        <Text style={{ color: theme.text.tertiary }}>
          등록된 할 일이 없습니다.
        </Text>
      }
    />
  );
}
