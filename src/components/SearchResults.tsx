/**
 * Fetches and displays Pagefind search results based on the URL query parameter `?keyword=`.
 * Uses Jotai (pageFindAtom, resultsAtom) to manage the Pagefind instance and result state.
 * Falls back to dummyResult in development where the Pagefind index is unavailable.
 */

import { useAtom, useAtomValue } from 'jotai';
import { type FC, useEffect } from 'react';
import { twJoin } from 'tailwind-merge';

import { pageFindAtom, queryAtom, resultsAtom } from '@libs/jotai';
import search from '@libs/search';

import { getGridFillerClasses, STRETCH_FILLER_CELL_CLASSES } from '@utils/gridFiller';

import Card from './Card';

const SearchResults: FC = () => {
  const [results, setResults] = useAtom(resultsAtom);
  const [query, setQueried] = useAtom(queryAtom);
  const pagefind = useAtomValue(pageFindAtom);

  const execSearch = async () => setResults(await search(query, pagefind));

  useEffect(() => {
    execSearch();
  }, [query]);

  // URL パラメターに含まれるワードでの検索結果セット
  useEffect(() => {
    const query = new URLSearchParams(document.location.search || '');
    const searchWord = query.get('keyword') || '';
    setQueried(searchWord);
    execSearch();
  }, []);

  return (
    <div aria-live="polite" className="flex flex-col">
      {results.length === 0 ? (
        <div className="flex-1 bg-white p-16 xl:p-32">
          <p>該当する記事はありません</p>
        </div>
      ) : (
        <>
          <div className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {results.map((result) => (
              <Card {...result} />
            ))}
            {getGridFillerClasses(results.length).map((classes, i) => (
              <div key={i} aria-hidden="true" className={twJoin('bg-white', classes)} />
            ))}
          </div>
          {/*
            リストより SideLeft が高い場合に残る余白を、列ごとの空セルで埋めるストレッチフィラー。
            セル上端の横罫線は高さに寄与しないよう border ではなく inset shadow で描く。
          */}
          <div
            aria-hidden="true"
            className="grid flex-1 gap-x-px overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
          >
            {STRETCH_FILLER_CELL_CLASSES.map((classes, i) => (
              <div key={i} className={twJoin('bg-white shadow-[inset_0_1px_0_0_var(--color-neutral-800)]', classes)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
