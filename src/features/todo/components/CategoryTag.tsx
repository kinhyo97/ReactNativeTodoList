import { Pressable, Text } from "react-native";

export function CategoryTag({
  label,
  color,
  selected,
  onPress,
}: {
  label: string;
  color: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: selected ? color : "transparent",
        borderWidth: 2,
        borderColor: color,
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          color: selected ? "#fff" : color,
          fontSize: 13,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
