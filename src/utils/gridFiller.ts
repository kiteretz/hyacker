const BREAKPOINT_VISIBILITY = [
  { key: 'sm', cols: 2, classes: ['sm:hidden', 'sm:block'] as const },
  { key: 'md', cols: 3, classes: ['md:hidden', 'md:block'] as const },
  { key: 'lg', cols: 4, classes: ['lg:hidden', 'lg:block'] as const },
  { key: '2xl', cols: 5, classes: ['2xl:hidden', '2xl:block'] as const },
] as const;

/**
 * 列数の帯ごとの最大表示件数。
 * base = 1 列、sm = 2 列、md = 3 列、lg = 4 列（xl も同じ）、2xl = 5 列。
 */
export type ResponsiveLimit = { base: number } & Record<(typeof BREAKPOINT_VISIBILITY)[number]['key'], number>;

// リスト下部に残った高さを列単位の空セルで埋めるストレッチフィラー用。
// 各セルは自分の列が存在するブレークポイント帯でのみ表示させる
export const STRETCH_FILLER_CELL_CLASSES = [
  '',
  'hidden sm:block',
  'hidden md:block',
  'hidden lg:block',
  'hidden 2xl:block',
] as const;

// 各ブレークポイントの列数に対する余りセル数だけ filler を用意し、該当するブレークポイント帯でのみ表示させる。
// limit を渡すと、帯ごとの表示件数（getResponsiveLimitClasses で絞った後の件数）を基準に余りを数える
export function getGridFillerClasses(total: number, limit?: ResponsiveLimit): string[] {
  const fillerCounts = BREAKPOINT_VISIBILITY.map(({ key, cols }) => {
    const visible = limit ? Math.min(total, limit[key]) : total;
    return (cols - (visible % cols)) % cols;
  });
  const maxFillers = Math.max(...fillerCounts);

  return Array.from({ length: maxFillers }, (_, i) => {
    const slot = i + 1;
    const visibility = BREAKPOINT_VISIBILITY.map(
      ({ classes }, index) => classes[fillerCounts[index] >= slot ? 1 : 0], // [0]=hidden, [1]=block
    );
    return ['hidden', ...visibility].join(' ');
  });
}

// index 番目（0 始まり）のアイテムを、limit の件数に収まるブレークポイント帯でのみ表示させるクラスを返す。
// 直前の帯から表示状態が変わるところにだけクラスを出す（全帯で表示なら空文字）
export function getResponsiveLimitClasses(index: number, limit: ResponsiveLimit): string {
  let visible = index < limit.base;
  const result: string[] = visible ? [] : ['hidden'];

  for (const { key, classes } of BREAKPOINT_VISIBILITY) {
    const next = index < limit[key];
    if (next !== visible) result.push(classes[next ? 1 : 0]);
    visible = next;
  }

  return result.join(' ');
}
