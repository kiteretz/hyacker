import type { Card } from '@components/Card'
import { atom } from 'jotai'
import dummyResult from './dummyResult'

/**
 * pagefind の格納と初期化。
 * atom() の引数にはできない。ビルド後でないと pagefind.js が存在しないため。
 * コンポーネントから pageFindAtom を呼び出すこと、でないと onMount は実行されない。
 */
export const pageFindAtom = atom<any>()
pageFindAtom.onMount = (setAtom) => {
  if( import.meta.env.DEV ) return
  const pagefind = ( async () => {
    const pagefindPath = '/pagefind/pagefind.js'
    const pagefind = (await import(/* @vite-ignore */ pagefindPath))
    await pagefind.init();
    return pagefind
  })()

  setAtom( pagefind )
}

export const resultsAtom = atom<Card[]>([])

export const queryAtom = atom<string>('')

