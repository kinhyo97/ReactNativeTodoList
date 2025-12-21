// app/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLayout from "../layout/AppLayout";
import { useTheme } from "@/styles/hooks/useTheme";

export default function RootLayout() {
  console.log("RootLayout rendered");
  const theme = useTheme();

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
