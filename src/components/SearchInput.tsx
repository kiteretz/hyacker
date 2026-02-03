import { type FC, useState } from 'react'
import type { Card } from './Card';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { resultsAtom, queryAtom, pageFindAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

const SearchInput:FC = () => {

  const setResults = useSetAtom(resultsAtom)
  const [ query, setQuery ] = useAtom(queryAtom)
  const [ isInputting, setInputting ] = useState<boolean>(false)

  const pagefind = useAtomValue(pageFindAtom)
  const execSearch = async (query:string) => {
    const search = await pagefind.search(query)
    const results: Card[] = await Promise
      .all( search.results.map( async (r: any) => {
          const data = await r.data()
          return {
            href: data.url,
            title: data.meta.title
          }
      })
    )

    setResults(results)
  }

  const shouldDisable = ! isInputting && query !== ''

  const onInputHandle = (query: string) => {
    setQuery(query)

    if( query === '' ){
      setInputting(false)
    } else {
      setInputting(true)
    }

    if( import.meta.env.PROD){
      execSearch(query)
    } else {
      // ビルドしないとPagefindのインデックスやJSが生成されない
      // 開発環境では適当に0～3つのPostを返す
      setResults(dummyResult())
    }
  }

  return (
    <input
      className="w-full rounded-full border bg-white px-16 py-4"
      name="search"
      placeholder="Search"
      type="search"
      onInput={(e) => onInputHandle(e.currentTarget.value)}
      disabled={ shouldDisable }
    />
  )
}

export default SearchInput
