import Card, { type CardProps } from '@components/Card'
import React, { type FC, useState } from 'react'
import SearchInput from '@components/SearchInput'

const SearchSection:FC = () => {
  const [results, setResults] = useState<CardProps[] | undefined>([]);

  return (
    <>
      <SearchInput setResults={setResults} />
      <div>
        { results && results.map((result)=>{
            return <Card {...result}/>
          })
        }
      </div>
    </>
  )
}

export default SearchSection
