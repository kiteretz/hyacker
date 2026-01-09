import React, { type FC, useState } from 'react'
import SearchInput from '@components/SearchInput'

const SearchSection:FC = () => {
  //TODO: Result の型定義
  const [results, setResults] = useState<any[]>([]);

  return (
    <>
      <SearchInput setResults={setResults} />
      <div>Result</div>
    </>
  )
}

export default SearchSection
