// layout/TodoLayout.tsx
import { View, StyleSheet, Platform } from "react-native";
import { ReactNode } from "react";

// 레이아웃을 직접 만들지 않고 자식 컴포넌트를 감싸는 레이아웃 컴포넌트
type Props = {
  // 이 컴포넌트 안에 무엇이든 들어올 수 있음
  children: ReactNode;
};

// 특정 기능에 종속된 Layout
export default function TodoLayout({ children }: Props) {
  return (
    // 스타일을 덮어쓰기 위해 배열 형태 -> 뒤에 오는게덮어씀 ( web이면 styles.web )
    <View style={[styles.container, Platform.OS === "web" && styles.web]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  web: {
    paddingTop: 30,
  },
});
