/**
 * Fetches and displays Pagefind search results based on the URL query parameter `?keyword=`.
 * Uses Jotai (pageFindAtom, resultsAtom) to manage the Pagefind instance and result state.
 * Falls back to dummyResult in development where the Pagefind index is unavailable.
 */

import { useAtom, useAtomValue } from 'jotai';
import { type FC, useEffect } from 'react';

import Card from '@components/Card';

import dummyResult from '@libs/dummyResult';
import { pageFindAtom, resultsAtom } from '@libs/jotai';
import search from '@libs/search';

const SearchResults: FC = () => {
  const [results, setResults] = useAtom(resultsAtom);


  // URL パラメターに含まれる検索ワードの結果を格納
  const pagefind = useAtomValue(pageFindAtom);

  useEffect(() => {
    ( async () => {
      const query = new URLSearchParams(document.location.search || '');
      const searchWord = query.get('keyword') || '';
      const results = await search(searchWord, pagefind)
      setResults(results);
    })()
  }, []);

  return (
    <div aria-live="polite" className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {results.length === 0 ? <p>該当する記事はありません</p> : results.map((result) => <Card {...result} />)}
    </div>
  );
};

export default SearchResults;
