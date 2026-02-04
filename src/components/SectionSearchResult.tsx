import Card from '@components/Card'
import { existActiveInputAtom, resultsAtom } from '@libs/jotai'
import { useAtomValue } from 'jotai'
import { type FC  } from 'react'

const SearchResults:FC = () => {
  const results = useAtomValue(resultsAtom)
  const existActiveInput = useAtomValue(existActiveInputAtom)

  return existActiveInput && (
    <section className="border-t">
      <div className="container border-x">
        <h2>Search Results</h2>
          { results.length === 0
            ? <p>not found</p>
            : results.map((result)=>{
                return <Card {...result}/>
            })
          }
      </div>
    </section>
  )
}

export default SearchResults
