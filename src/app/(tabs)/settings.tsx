import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { DarkModeSetting } from "@/features/settings/components/DarkModeSetting";
import { router } from "expo-router";

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop:60,
        backgroundColor: theme.background.primary,
        paddingHorizontal:16
      }}
    >
      <Text style={{ color: theme.text.primary, fontSize: 32, marginBottom: 16 }}>
        설정
      </Text>

      <DarkModeSetting />

      <Pressable
        onPress={() => router.push("/settings/data")}
        style={{
          paddingVertical:12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16,marginTop:10 }}>
          데이터
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/category")}
        style={{
          paddingVertical:12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16,marginTop:10 }}>
          카테고리 관리
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/anniversary")}
        style={{
          paddingVertical:12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 10,marginTop:10 }}>
          기념일 관리
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/account")}
        style={{
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 10 }}>
          계정
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/tos")}
        style={{
          paddingVertical:12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 10 }}>
          이용약관
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/private")}
        style={{
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 10 }}>
          개인정보처리방침
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/settings/app-info")}
        style={{
          paddingVertical:12,
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 10 }}>
          앱 정보
        </Text>
      </Pressable>
      {/* <Text style={{ color: theme.text.primary, fontSize: 16, marginBottom: 16,marginTop:16 }}>
        공지사항
      </Text> */}
    </View>
  );
}
