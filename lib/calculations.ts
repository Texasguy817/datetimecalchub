export function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function addMinutes(now: Date, minutes: number) {
  return new Date(now.getTime() + minutes * 60 * 1000);
}
export function addHours(now: Date, hours: number) {
  return addMinutes(now, hours * 60);
}
export function subtractMinutes(now: Date, minutes: number) {
  return new Date(now.getTime() - minutes * 60 * 1000);
}
export function subtractHours(now: Date, hours: number) {
  return subtractMinutes(now, hours * 60);
}
export function calculateDaysUntil(targetDate: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(`${targetDate}T00:00:00`);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
export function calculateDaysBetween(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
export function addDays(startDate: string, days: number) {
  const start = new Date(`${startDate}T00:00:00`);
  start.setDate(start.getDate() + days);
  return start;
}
export function subtractDays(startDate: string, days: number) {
  const start = new Date(`${startDate}T00:00:00`);
  start.setDate(start.getDate() - days);
  return start;
}
export function hoursToMinutes(hours: number) { return hours * 60; }
export function minutesToHours(minutes: number) { return minutes / 60; }
export function secondsToMinutes(seconds: number) { return seconds / 60; }
export function getSleepOptions(targetWakeTime: string) {
  const [hour, minute] = targetWakeTime.split(":").map(Number);
  const base = new Date();
  base.setHours(hour, minute, 0, 0);
  return [6, 5, 4].map((cycles) => new Date(base.getTime() - (cycles * 90 + 15) * 60 * 1000));
}
export function calculateWorkHours(startTime: string, endTime: string, breakMinutes: number) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const start = sh * 60 + sm;
  let end = eh * 60 + em;
  if (end < start) end += 24 * 60;
  const totalMinutes = Math.max(0, end - start - breakMinutes);
  return { totalMinutes, hours: totalMinutes / 60 };
}
export function getUnitLabel(mode: string, value: number) {
  if (mode.toLowerCase().includes("hour")) return `${value} hour${value === 1 ? "" : "s"}`;
  if (mode.toLowerCase().includes("minute")) return `${value} minute${value === 1 ? "" : "s"}`;
  if (mode.toLowerCase().includes("day")) return `${value} day${value === 1 ? "" : "s"}`;
  return `${value}`;
}
