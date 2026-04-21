import Card from '@components/Card'
import { pageFindAtom, resultsAtom } from '@libs/jotai'
import { useAtom, useAtomValue } from 'jotai'
import { type FC, useEffect  } from 'react'

const SearchResults:FC = () => {
  const [results,setResults] = useAtom(resultsAtom)
  const pagefind = useAtomValue(pageFindAtom)

  useEffect(()=>{
    if( import.meta.env.DEV ) return

    const find = async () => {
      const query = new URLSearchParams(document.location.search || '')
      const searchWord = query.get("keyword") || ''
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

    find()
  }, [])

  return results && (
    <div>
      { results.map((result)=>{
          return <Card {...result}/>
        })
      }
    </div>
  )
}

export default SearchResults
