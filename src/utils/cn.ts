/**
 * CSS クラス名結合ユーティリティ
 *
 * Astro.js のコードフェンス内で CSS クラス名を変数化し、
 * ESLintやPrettier の並び替えルール（eslint-plugin-tailwindcss など）に
 * 対応させるためのヘルパー関数
 *
 * @example
 * ```astro
 * ---
 * import { cn } from '../utils/cn';
 *
 * const buttonStyle = cn(
 *   'flex items-center justify-center',
 *   'px-4 py-2 rounded-md',
 *   'bg-blue-500 text-white hover:bg-blue-600'
 * );
 * ---
 * <button class={buttonStyle}>Click me</button>
 * ```
 *
 * @param classes - CSS クラス名の配列（falsy値は自動的に除去される）
 * @returns スペース区切りで結合されたクラス名文字列
 */
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export { cn };
