import Card from '@components/Card'
import { resultsAtom } from '@libs/jotai'
import { useAtomValue } from 'jotai'
import { type FC  } from 'react'

const SearchResults:FC = () => {
  const results = useAtomValue(resultsAtom)

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
