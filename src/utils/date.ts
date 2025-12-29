export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 10);

export const isToday = (date: Date) => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};

export function formatTime(reminderTime?: string | Date | null) {
  if (!reminderTime) return "";

  const d = typeof reminderTime === "string"
    ? new Date(reminderTime)
    : reminderTime;

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");

  return `${hh}:${mm}`;
}