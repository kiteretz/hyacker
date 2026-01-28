import { type FC, useEffect, useState } from 'react'
import type { Card } from './Card';
import { useSetAtom } from 'jotai';
import { resultsAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

const SearchInput:FC = () => {
  const [ pagefind, setPagefind ] = useState<any>(null)

  const pagefindPath = '/pagefind/pagefind.js'

  // Pagefind インスタンスの初期化
  useEffect( () => {
    const init = async () => {
      if( import.meta.env.DEV ) return
      const pagefind = (await import(/* @vite-ignore */ pagefindPath))
      await pagefind.init();
      setPagefind( pagefind )
    }

    init()
  }, [])

  const setResults = useSetAtom(resultsAtom)

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

  // ビルドしないとPagefindのインデックスやJSが生成されない
  // 開発環境では適当に0～3つのPostを返す
  const setDummyResult = () => {
    setResults(dummyResult())
  }

  const onInputHandle = (query: string) => {
    if( import.meta.env.PROD){
      execSearch(query)
    } else {
      setDummyResult()
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
