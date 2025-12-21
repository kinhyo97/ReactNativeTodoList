import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";

type Props = {
  selectedDate?: string;
  onSettings?: () => void;
};
export function TodoHeader({ selectedDate, onSettings }: Props) {
  const theme = useTheme();

  return (
    // <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>

    //   <Text style={{ color: theme.text.primary }}>{selectedDate}</Text>
    // </View>
    <>
    </>
  );
}
