export function getReminderTriggerTime(
  reminderTime: Date,
  reminderOffset: number | null
) {
  if (!reminderOffset) return reminderTime;

  return new Date(
    reminderTime.getTime() - reminderOffset * 60 * 1000
  );
}
