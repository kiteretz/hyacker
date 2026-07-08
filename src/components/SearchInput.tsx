import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { type FC, useEffect, useState } from 'react';

import { existActiveInputAtom, pageFindAtom, resultsAtom, searchWord, searchWordAtom } from '@libs/jotai';
import search from '@libs/search';
import { twMerge } from '@libs/twMerge';

type Props = {
  className?: string;
};

const SearchInput: FC<Props> = ({ className }) => {
  const [queried, setQueried] = useAtom(searchWordAtom);

  // SearchInput の有効・無効を処理するためのフラグ群
  const [isInputting, setInputting] = useState<boolean>(false);
  const [existActiveInput, setActiveInput] = useAtom(existActiveInputAtom);
  const shouldDisable = existActiveInput && !isInputting;

  const onInputHandle = async (query: string) => {
    if (query === '') {
      setActiveInput(false);
      setInputting(false);
    } else {
      setActiveInput(true);
      setInputting(true);
    }

    setQueried(query);
  };

  return (
    <input
      className={twMerge(
        'size-full h-[stretch] px-16 py-4',
        'placeholder:font-inter placeholder:text-16 placeholder:leading-none placeholder:font-medium placeholder:text-neutral-400',
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
