import { type FC, useState, useEffect } from 'react';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';
import { resultsAtom, pageFindAtom, existActiveInputAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

type Props = {
  className?: string;
};

const SearchInput: FC<Props> = ({ className }) => {
  const [queried, setQueried] = useState<string>('');

  // SearchInput の有効・無効を処理するためのフラグ群
  const [isInputting, setInputting] = useState<boolean>(false);
  const [existActiveInput, setActiveInput] = useAtom(existActiveInputAtom);
  const shouldDisable = existActiveInput && !isInputting;

  // 検索処理のための Atom 群
  const pagefind = useAtomValue(pageFindAtom);
  const setResults = useSetAtom(resultsAtom);

  const execSearch = async (query: string) => {
    const search = await pagefind.search(query);
    const results = await Promise.all(
      search.results.map(async (r: any) => {
        const data = await r.data();
        return {
          href: data.url,
          title: data.meta.title,
          date: data.meta.pubDate,
        };
      }),
    );

    setResults(results);
  };

  useEffect(() => {
    const query = new URLSearchParams(document.location.search || '');
    const searchWord = query.get('keyword') || '';
    setQueried(searchWord);
  }, []);

  const onInputHandle = (query: string) => {
    if (query === '') {
      setActiveInput(false);
      setInputting(false);
    } else {
      setActiveInput(true);
      setInputting(true);
    }

    if (import.meta.env.PROD) {
      execSearch(query);
    } else {
      // ビルドしないとPagefindのインデックスやJSが生成されない
      // 開発環境では適当に0～3つのPostを返す
      setResults(dummyResult());
    }
  };

  return (
    <input
      className={twMerge(
        'size-full h-[stretch] px-16 py-4',
        'placeholder:font-inter placeholder:text-16 placeholder:leading-none placeholder:font-medium placeholder:text-neutral-400',
        'disabled:bg-gray-200',
        '[&::-webkit-search-cancel-button]:hidden',
        className,
      )}
      name="keyword"
      placeholder="Search"
      type="search"
      onInput={(e) => onInputHandle(e.currentTarget.value)}
      disabled={shouldDisable}
      defaultValue={queried}
    />
  );
};

export default SearchInput;
