/**
 * ブレークポイント定数（px）
 *
 * src/styles/global/theme.css の `--breakpoint-*` カスタムプロパティと
 * 対応している。値を変更する場合は必ず両方を揃えること。
 *
 * | key | px   | theme.css          |
 * |-----|------|--------------------|
 * | xs  | 320  | --breakpoint-xs    |
 * | sm  | 480  | --breakpoint-sm    |
 * | md  | 720  | --breakpoint-md    |
 * | lg  | 960  | --breakpoint-lg    |
 * | xl  | 1200 | --breakpoint-xl    |
 * | 2xl | 1440 | --breakpoint-2xl   |
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 960,
  xl: 1200,
  '2xl': 1440,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * matchMedia 用の min-width メディアクエリ文字列を返す。
 * CSS のメディアクエリと同様にユーザーのデフォルトフォントサイズへ
 * 追従させるため rem（1rem = 16px 基準）で出力する。
 */
export const minWidthQuery = (key: BreakpointKey): string => `(min-width: ${BREAKPOINTS[key] / 16}rem)`;
