/**
 * Displays the total count of Pagefind search results.
 * Reads reactively from resultsAtom (Jotai) and updates as search results change.
 */

import { useAtomValue } from 'jotai';

import { resultsAtom } from '@libs/jotai';

import type { FC } from 'react';

const SearchCount: FC = () => {
  const results = useAtomValue(resultsAtom);
  const countStr = String(results.length).padStart(3, '0');

  return (
    <span className="hidden xl:absolute xl:bottom-0 xl:left-0 xl:block xl:font-space-grotesk xl:text-108 xl:leading-none xl:font-bold xl:text-neutral-900 xl:lining-nums xl:slashed-zero xl:tabular-nums xl:opacity-10">
      {countStr}
    </span>
  );
};

export default SearchCount;
