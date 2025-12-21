import { useThemeStore } from "@/store/theme.store";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { View, Text, Switch, Pressable } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  const { mode, setMode } = useThemeStore();
  console.log("THEME MODE:", mode);
  const isDark = mode === "dark";

  return (
    
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.background.primary,
        marginTop:20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16 }}>
          다크 모드
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: theme.text.primary }}>← 뒤로가기</Text>
        </Pressable>

        <Switch
          value={isDark}
          onValueChange={(v) => setMode(v ? "dark" : "light")}
        />
      </View>
    </View>
  );
}
