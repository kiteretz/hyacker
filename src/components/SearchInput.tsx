import { type FC, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import type { Card } from './Card';
import { useSetAtom } from 'jotai';
import { resultsAtom } from '@libs/jotai';
import dummyResult from '@libs/dummyResult';

interface Props {
  className?: string;
}

const SearchInput:FC<Props> = ({ className } :Props ) => {
  const [ pagefind, setPagefind ] = useState(null)

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

  // form の onSubmit で検索実行＆結果表示
  const setResults = useSetAtom(resultsAtom)
  const execSearch = async (query:string) => {
    const search = await pagefind?.search(query);

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
      <form onSubmit={(e)=>e.preventDefault()}>
      <label className={twMerge('relative flex items-center', className)}>
        <input
          className="w-full rounded-full border bg-white px-16 py-4"
          name="search"
          placeholder="Search"
          type="search"
          onInput={(e) => onInputHandle(e.currentTarget.value)}
        />
        <button
          className={twMerge(
            'absolute right-4 flex aspect-square w-28 shrink items-center justify-center rounded-full bg-black text-white'
          )}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="w-12">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.25 14.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm7.5 1.5-3.263-3.262"></path>
          </svg>
        </button>
      </label>
    </form>
  )
}

export default SearchInput
