import { type FC, useState } from 'react'
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { resultsAtom, pageFindAtom, existActiveInputAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

const SearchInput:FC = () => {

  // SearchInput の有効・無効を処理するためのフラグ群
  const [ isInputting, setInputting ] = useState<boolean>(false)
  const [ existActiveInput, setActiveInput ] = useAtom(existActiveInputAtom)
  const shouldDisable = existActiveInput && ! isInputting

  // 検索処理のための Atom 群
  const pagefind = useAtomValue(pageFindAtom)
  const setResults = useSetAtom(resultsAtom)

  const execSearch = async (query: string) => {
    const search = await pagefind.search(query)
    const results = await Promise
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

  const onInputHandle = (query: string) => {

    if( query === '' ){
      setActiveInput(false)
      setInputting(false)
    } else {
      setActiveInput(true)
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
      className="w-full rounded-full border bg-white px-16 py-4 disabled:bg-gray-200"
      name="search"
      placeholder="Search"
      type="search"
      onInput={(e) => onInputHandle(e.currentTarget.value)}
      disabled={ shouldDisable }
    />
  )
}

export default SearchInput
