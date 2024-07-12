//处理日期格式
export function formatDate(date?: Date): string {
  if (date == null) return "";
  return date.toString().slice(0, 10);
}
