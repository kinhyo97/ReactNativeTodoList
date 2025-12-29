import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { createStyles } from "./BackButton.style";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface BackButtonProps {
  label?: string;
  onPress?: () => void;
}

export default function BackButton({
  label = "뒤로",
  onPress,
}: BackButtonProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    
    router.back();
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={styles.hitSlop}
      style={styles.container}
    >
      {/* 아이콘 대용 (추후 교체 가능) */}
      <Text style={styles.icon}>‹</Text>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}
