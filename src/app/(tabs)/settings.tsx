import { View, Text } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { DarkModeSetting } from "@/features/settings/components/DarkModeSetting";

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.background.primary,
      }}
    >
      <Text style={{ color: theme.text.primary, fontSize: 20, marginBottom: 16 }}>
        설정
      </Text>

      <DarkModeSetting />
    </View>
  );
}
