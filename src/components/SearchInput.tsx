import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { type FC, useEffect, useState } from 'react';

import dummyResult from '@libs/dummyResult';
import { existActiveInputAtom, pageFindAtom, resultsAtom } from '@libs/jotai';
import { twMerge } from '@libs/twMerge';
import search from '@libs/search';

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
    const results = await search(query, pagefind)
    setResults(results);
  };

  // URL パラメターに含まれる検索ワードをセット
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
