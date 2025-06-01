/**
 * Formats a given date to a string in the format "MMM DD YYYY".
 *
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export function toFormattedString(date: Date): string {
  return date.toDateString().split(" ").slice(1).join(" ");
}

/**
 * Formats a given Date object into a Japanese date string.
 *
 * The output format is "YYYY年MM月DD日", where:
 * - YYYY is the full year
 * - MM is the month (1-based)
 * - DD is the day of the month
 *
 * @param date - The Date object to format.
 * @returns A string representing the date in Japanese format.
 */
export function formatDateToJapanese(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

/**
 * Calculates the relative time difference between the given date and the current date,
 * and returns a human-readable string representing how long ago the date was.
 *
 * @param date - The date to calculate the time difference from.
 * @returns A string representing the time difference in Japanese, such as "3日前" (3 days ago),
 *          "2時間前" (2 hours ago), or "5秒前" (5 seconds ago).
 */
export function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // おおよその計算
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}年前`;
  if (months > 0) return `${months}ヶ月前`;
  if (weeks > 0) return `${weeks}週間前`;
  if (days > 0) return `${days}日前`;
  if (hours > 0) return `${hours}時間前`;
  if (minutes > 0) return `${minutes}分前`;
  return `${seconds}秒前`;
}
