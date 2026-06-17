/**
 * 日付を「2024.06.01」のような形式に変換する関数
 */

export const formatDate = (date: Date | string ): string => {
  return typeof date === 'string'
    ? date
    : date.toLocaleDateString('ja-JP').replace(/\//g, '.')
}
