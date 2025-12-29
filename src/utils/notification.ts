import * as Notifications from "expo-notifications";
import { getReminderTriggerTime } from "./reminder";

/** reminderOffset(분) 기준으로 실제 알림 시각 계산 */
export function calcReminderTime(
  targetDate: Date,
  offsetMin: number
) {
  const t = new Date(targetDate);
  t.setMinutes(t.getMinutes() - offsetMin);
  return t;
}

/** OS에 로컬 알림 등록 */
export async function registerTodoReminder(
  title: string,
  reminderTime: Date,
  reminderOffset: number | null
) {
  const triggerTime = getReminderTriggerTime(
    reminderTime,
    reminderOffset
  );

  if (triggerTime.getTime() <= Date.now()) {
    console.log("❌ 과거 알림 시간");
    return null;
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "할 일 알림",
      body: reminderOffset
        ? `${reminderOffset}분 전 알림`
        : title,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerTime,
    },
  });
}



/** 취소 함수 */
export async function cancelTodoReminder(
  notificationId?: string | null
) {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}