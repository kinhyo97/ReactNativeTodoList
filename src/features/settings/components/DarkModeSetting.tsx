import { useThemeStore } from "@/store/theme.store";
import { useTheme } from "@/styles/hooks/useTheme";
import { View, Text, Switch } from "react-native";

export function DarkModeSetting() {
  const theme = useTheme();
  const { mode, setMode } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
      <Text style={{ color: theme.text.primary, fontSize: 16 }}>
        다크 모드
      </Text>

      <Switch
        value={isDark}
        onValueChange={(v) => setMode(v ? "dark" : "light")}
      />
    </View>
  );
}
