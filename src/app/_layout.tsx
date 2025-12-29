// app/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLayout from "../layout/AppLayout";
import { useTheme } from "@/styles/hooks/useTheme";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function RootLayout() {
  console.log("RootLayout rendered");
  const theme = useTheme();

  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

  // OS 알림 권한 요청
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <AppLayout>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.background.primary,
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppLayout>
    </SafeAreaProvider>
  );
}
