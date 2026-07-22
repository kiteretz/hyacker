/**
 * `/search/` ページ専用のインクリメンタルサーチ入力。
 * queryAtom を双方向バインドし、入力のたびに SearchResults が再検索する。
 * 虫眼鏡アイコンはボタンではなく装飾（label クリックで input へフォーカス）。
 */

import { useAtom } from 'jotai';

import { queryAtom } from '@libs/jotai';
import { twMerge } from '@libs/twMerge';

import type { FC } from 'react';

type Props = {
  className?: string;
};

const SearchPageInput: FC<Props> = ({ className }) => {
  const [query, setQuery] = useAtom(queryAtom);

  return (
    <label
      className={twMerge(
        'flex w-full cursor-text items-center justify-between gap-16 bg-white px-16 py-32 xl:p-32',
        className,
      )}
    >
      <span className="sr-only">サイト内検索</span>
      <input
        className={twMerge(
          'min-w-0 flex-1 bg-transparent font-space-grotesk text-clamp-32/80 leading-[0.8] font-normal tracking-[-0.05em] text-neutral-800',
          'placeholder:text-neutral-800 placeholder:opacity-30',
          '[&::-webkit-search-cancel-button]:hidden',
          // 入力が長い場合に右端 0.25em をグラデーションでマスクする
          '[mask-image:linear-gradient(to_right,#000_calc(100%-0.25em),transparent)]',
        )}
        name="keyword"
        type="search"
        placeholder="Search"
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
        autoComplete="off"
      />
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className='className="size-clamp-24/72 opacity-20" shrink-0 text-neutral-800'
        aria-hidden="true"
      >
        <path
          opacity="0.2"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M52.3636 29.4545C52.3636 42.1069 42.1069 52.3636 29.4545 52.3636C16.8022 52.3636 6.54545 42.1069 6.54545 29.4545C6.54545 16.8022 16.8022 6.54545 29.4545 6.54545C42.1069 6.54545 52.3636 16.8022 52.3636 29.4545ZM47.8397 52.4677C42.8008 56.4991 36.4092 58.9091 29.4545 58.9091C13.1873 58.9091 0 45.7218 0 29.4545C0 13.1873 13.1873 0 29.4545 0C45.7218 0 58.9091 13.1873 58.9091 29.4545C58.9091 36.4092 56.4991 42.8008 52.4677 47.8397L71.0417 66.4128C72.3194 67.6911 72.3194 69.7634 71.0417 71.0417C69.7634 72.3194 67.6911 72.3194 66.4128 71.0417L47.8397 52.4677Z"
          fill="#171717"
        />
      </svg>
    </label>
  );
};

export default SearchPageInput;
