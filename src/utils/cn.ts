// 変数定義で使用 Prettierの整理対象に含める
// import { cn } from '../../utils/cn'; のようにして読み込み
// ex: const borderStyle = cn('border-2 border-solid border-black');
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export { cn };
