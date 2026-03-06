import Card from '@components/Card';
import { existActiveInputAtom, resultsAtom } from '@libs/jotai';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const SearchResults: FC<Props> = ({ className }) => {
  const results = useAtomValue(resultsAtom);
  const existActiveInput = useAtomValue(existActiveInputAtom);

  return (
    existActiveInput && (
      <section className={twMerge('bg-white', className)}>
        <div>
          <h2>Search Results</h2>
          {results.length === 0 ? (
            <p>not found</p>
          ) : (
            results.map((result) => {
              return <Card {...result} />;
            })
          )}
        </div>
      </section>
    )
  );
};

export default SearchResults;
