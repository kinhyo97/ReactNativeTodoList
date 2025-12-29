import { View } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "@/styles/hooks/useTheme";

type Props = {
  children: ReactNode;
};

// 자체 UI 없이 자식 컴포넌트를 감싸는 레이아웃 컴포넌트
export default function AppLayout({ children }: Props) {
  // 다크모드 사용
  const theme = useTheme();

  // theme 배경색 적용
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background.primary,
        paddingTop:20,
      }}
    >
      {children}
    </View>
  );
}
