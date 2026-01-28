import type { Card } from '@components/Card'
import { atom } from 'jotai'

export const resultsAtom = atom<Card[]>([])

export const queryAtom = atom<string>('')
