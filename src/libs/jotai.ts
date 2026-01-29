import type { Card } from '@components/Card'
import { atom } from 'jotai'
import dummyResult from './dummyResult'

// pagefind の格納と初期化.
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

export const resultsAtom = atom<any>('')

export const queryAtom = atom<string>('')

