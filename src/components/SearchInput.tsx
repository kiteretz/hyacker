import type { CollectionEntry } from 'astro:content';
import React, { type FC, type SetStateAction, useEffect, useState, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string;
  setResults?: React.Dispatch<React.SetStateAction<any>>
}

const SearchInput:FC<Props> = ({ className, setResults } :Props ) => {
  const [ query, setQuery] = useState<string>("");
  const [ pagefind, setPagefind ] = useState(null)

  const pagefindPath = '/pagefind/pagefind.js'

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
  const handleSearch = async () => {
    const search = await pagefind?.search(query);
    //const results = search.map(({data,meta})=>{
    //})
    // setResults(...results)
    console.log(search)
  }

  // ビルドしないとPagefindのインデックスやJSが読み込めない
  // 開発環境では適当に0～3つのPostを返す
  const handleSearchStub = () => {
    console.log('for Dev')
  }

  const onSubmitHandle = () => {
    if( import.meta.env.PROD){
      handleSearch()
    } else {
      handleSearchStub()
    }
  }

  return (
      <form
        onSubmit={(e)=> {
          e.preventDefault()
          onSubmitHandle()
        }}
      >
      <label className={twMerge('relative flex items-center', className)}>
        <input
          className="w-full rounded-full border bg-white px-16 py-4"
          name="search"
          placeholder="Search"
          type="search"
          onInput={(e) => setQuery(e.currentTarget.value)}
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
