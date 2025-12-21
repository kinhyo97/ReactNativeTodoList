export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const truncate = (text: string, length = 20) =>
  text.length > length ? text.slice(0, length) + "…" : text;
