export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 10);

export const isToday = (date: Date) => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};
