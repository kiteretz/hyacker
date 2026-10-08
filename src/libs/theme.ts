/**
 * テーマ切り替えの共通定義。参照元は次の3箇所:
 * - @components/ThemeInit.astro（描画前に <html> へ適用するインラインスクリプト）
 * - @components/ThemeSwitch.astro（スイッチのマークアップ）
 * - @scripts/modules/theme-switch（スイッチの操作・OS 設定への追従）
 *
 * <html> に付与する属性:
 * - data-theme            : 実際に適用する配色（'light' | 'dark'）。CSS はこちらを見る
 * - data-theme-preference : ユーザーの選択（'light' | 'system' | 'dark'）。スイッチの current 表示に使う
 */
export const THEME_STORAGE_KEY = 'theme';

// スイッチ上の並び順（Figma: theme-switch）
export const THEME_PREFERENCES = ['light', 'system', 'dark'] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';

export const isThemePreference = (value: unknown): value is ThemePreference =>
  THEME_PREFERENCES.includes(value as ThemePreference);
