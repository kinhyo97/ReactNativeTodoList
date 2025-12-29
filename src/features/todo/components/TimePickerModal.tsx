import { Modal, View, Text, Pressable, useColorScheme, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useMemo, useState } from "react";
import { useThemeStore } from "@/store/theme.store"; // 경로는 너 프로젝트에 맞게
// 만약 경로 다르면: useThemeStore 있는 실제 경로로 바꿔

interface TimePickerModalProps {
  visible: boolean;
  initialTime: Date;
  onConfirm: (time: Date) => void;
  onClose: () => void;
}

export function TimePickerModal({
  visible,
  initialTime,
  onConfirm,
  onClose,
}: TimePickerModalProps) {
  const [tempTime, setTempTime] = useState<Date>(initialTime);

  // OS 테마
  const osScheme = useColorScheme() ?? "light";

  // 앱 설정 모드
  const mode = useThemeStore((s) => s.mode);

  // 최종 적용 테마 (system이면 OS 따라감)
  const resolvedScheme = useMemo(() => {
    if (mode === "system") return osScheme;
    return mode; // "light" | "dark"
  }, [mode, osScheme]);

  const isDark = resolvedScheme === "dark";

  useEffect(() => {
    setTempTime(initialTime);
  }, [initialTime]);

  if (!visible) return null;

  // 피커/버튼 영역 색상도 resolvedScheme 기준으로 맞춰주기
  const contentBg = isDark ? "#111827" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.12)" : "#e5e7eb";
  const text = isDark ? "#ffffff" : "#111827";

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        }}
      >
        {/* backdrop */}
        <Pressable
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          onPress={onClose}
        />

        {/* content */}
        <View style={{ backgroundColor: contentBg, paddingBottom: 16 }}>
          <DateTimePicker
            value={tempTime}
            mode="time"
            // Android spinner는 글자색/테마가 이상한 기기 많아서 default 추천
            display={Platform.OS === "android" ? "default" : "spinner"}
            themeVariant={isDark ? "dark" : "light"}
            onChange={(_, selected) => {
              if (selected) setTempTime(selected);
            }}
          />

          <View
            style={{
              flexDirection: "row",
              padding: 16,
              borderTopWidth: 1,
              borderColor: border,
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: border,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: text }}>취소</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onConfirm(tempTime);
                onClose();
              }}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 10,
                backgroundColor: "#2563eb",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
                확인
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
