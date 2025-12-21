import { Modal, View, Text, Pressable, useColorScheme } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";

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
  const theme = useTheme();
  const scheme = useColorScheme();
  useEffect(() => {
    setTempTime(initialTime);
  }, [initialTime]);

  if (!visible) return null;

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
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onPress={onClose}
        />

        {/* content */}
        <View
          style={{
            backgroundColor: theme.background.primary,
            paddingBottom: 16,
          }}
        >
          <DateTimePicker
            value={tempTime}
            mode="time"
            display="spinner"
            themeVariant={scheme === "dark" ? "dark" : "light"}
            onChange={(_, selected) => {
              if (selected) setTempTime(selected);
            }}
          />

          <View
  style={{
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  }}
>
  <Pressable
    onPress={onClose}
    style={{
      flex: 1,
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#d1d5db",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    }}
  >
    <Text style={{ fontSize: 16 }}>취소</Text>
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
