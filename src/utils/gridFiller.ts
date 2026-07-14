const BREAKPOINT_VISIBILITY = [
  { cols: 2, classes: ['sm:hidden', 'sm:block'] as const },
  { cols: 3, classes: ['md:hidden', 'md:block'] as const },
  { cols: 4, classes: ['lg:hidden', 'lg:block'] as const },
  { cols: 5, classes: ['2xl:hidden', '2xl:block'] as const },
] as const;

// 各ブレークポイントの列数に対する余りセル数だけ filler を用意し、該当するブレークポイント帯でのみ表示させる
export function getGridFillerClasses(total: number): string[] {
  const fillerCounts = BREAKPOINT_VISIBILITY.map(({ cols }) => (cols - (total % cols)) % cols);
  const maxFillers = Math.max(...fillerCounts);

  return Array.from({ length: maxFillers }, (_, i) => {
    const slot = i + 1;
    const visibility = BREAKPOINT_VISIBILITY.map(
      ({ classes }, index) => classes[fillerCounts[index] >= slot ? 1 : 0], // [0]=hidden, [1]=block
    );
    return ['hidden', ...visibility].join(' ');
  });
}
