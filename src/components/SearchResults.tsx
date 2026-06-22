/**
 * Fetches and displays Pagefind search results based on the URL query parameter `?keyword=`.
 * Uses Jotai (pageFindAtom, resultsAtom) to manage the Pagefind instance and result state.
 * Falls back to dummyResult in development where the Pagefind index is unavailable.
 */

import { type FC, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import Card from '@components/Card';
import { pageFindAtom, resultsAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

const SearchResults: FC = () => {
  const [results, setResults] = useAtom(resultsAtom);
  const pagefind = useAtomValue(pageFindAtom);

  useEffect(() => {
    const find = async () => {
      const query = new URLSearchParams(document.location.search || '');
      const searchWord = query.get('keyword') || '';
      if (import.meta.env.DEV && searchWord) {
        setResults(dummyResult());
      } else {
        const search = await pagefind.search(searchWord);
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
      }
    };

    find();
  }, []);

  return (
    <div aria-live="polite" className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {results.length === 0 ? <p>該当する記事はありません</p> : results.map((result) => <Card {...result} />)}
    </div>
  );
};

export default SearchResults;
