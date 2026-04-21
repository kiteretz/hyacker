import Card from '@components/Card'
import { pageFindAtom, resultsAtom } from '@libs/jotai'
import { useAtom, useAtomValue } from 'jotai'
import { type FC, useEffect  } from 'react'
import dummyResult from '@libs/dummyResult';

const SearchResults:FC = () => {
  const [results,setResults] = useAtom(resultsAtom)
  const pagefind = useAtomValue(pageFindAtom)

  useEffect(()=>{
    const find = async () => {
      const query = new URLSearchParams(document.location.search || '')
      const searchWord = query.get("keyword") || ''
      if( import.meta.env.DEV && searchWord ) {
        setResults(dummyResult());
      } else {
        const search = await pagefind.search(searchWord);
        const results = await Promise.all(
          search.results.map(async (r: any) => {
            const data = await r.data();
            return {
              href: data.url,
              title: data.meta.title,
              date: data.meta.pubDate
            };
          }),
        );
        setResults(results)
      }
    }

    find()

  }, [])

  return results.length === 0
    ? (
    <div>
      該当する記事はありません
    </div>
    ) : (
    <div>
      { results.map((result)=>{
          return <Card {...result}/>
        })
      }
    </div>
  )
}

export default SearchResults
