/**
 * 日付を「2024.06.01」のような形式に変換する関数
 * 実行環境のタイムゾーンに依存しないよう Asia/Tokyo 固定で整形する
 */

const dateTimeFormat = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const formatDate = (date: Date | string): string => {
  return typeof date === 'string'
    ? date
    : dateTimeFormat.format(date).replace(/\//g, '.');
};
