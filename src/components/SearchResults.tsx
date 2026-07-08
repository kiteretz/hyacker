/**
 * Fetches and displays Pagefind search results based on the URL query parameter `?keyword=`.
 * Uses Jotai (pageFindAtom, resultsAtom) to manage the Pagefind instance and result state.
 * Falls back to dummyResult in development where the Pagefind index is unavailable.
 */

import { useAtom, useAtomValue } from 'jotai';
import { type FC, useEffect, useState } from 'react';

import { pageFindAtom, queryAtom, searchWordAtom } from '@libs/jotai';
import search from '@libs/search';
import Card from './Card';

const SearchResults: FC = () => {
  const [ results, setResults ] = useState<any[]>([])
  const [ query, setQueried ] = useAtom(queryAtom)
  const pagefind = useAtomValue(pageFindAtom);

  const execSearch = async () => setResults( await search(query, pagefind) )

  useEffect( () => {
    execSearch()
  }, [query])

  // URL パラメターに含まれるワードでの検索結果セット
  useEffect(() => {
    const query = new URLSearchParams(document.location.search || '');
    const searchWord = query.get('keyword') || '';
    setQueried(searchWord);
    execSearch()
  }, []);

  return (
    <div aria-live="polite" className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {results.length === 0 ? <p>該当する記事はありません</p> : results.map((result) => <Card {...result} />)}
    </div>
  );
};

export default SearchResults;
