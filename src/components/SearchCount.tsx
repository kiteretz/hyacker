/**
 * Displays the total count of Pagefind search results.
 * Reads reactively from resultsAtom (Jotai) and updates as search results change.
 * Animates the number counting up/down when the result count changes.
 */

import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { resultsAtom } from '@libs/jotai';

import type { FC } from 'react';

const ANIMATION_DURATION = 300;

const SearchCount: FC = () => {
  const results = useAtomValue(resultsAtom);
  const target = results?.length ?? 0;
  // 0 起点にすることで、初回の検索完了時に 0 → n のカウントアップになる
  const [displayCount, setDisplayCount] = useState(0);
  // アニメーション中の中断（連続入力）でも現在表示中の値から続きを開始できるよう ref に保持する
  const displayCountRef = useRef(0);

  useEffect(() => {
    const from = displayCountRef.current;
    if (from === target) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayCountRef.current = target;
      setDisplayCount(target);
      return;
    }

    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
      const eased = 1 - (1 - progress) ** 3; // easeOutCubic
      const value = Math.round(from + (target - from) * eased);
      displayCountRef.current = value;
      setDisplayCount(value);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target]);

  // 検索完了前はカウントを出さない（「000」のフラッシュを避ける）
  if (results === null) return null;

  const countStr = String(displayCount).padStart(3, '0');

  return (
    <span className="hidden xl:absolute xl:bottom-0 xl:left-0 xl:block xl:font-space-grotesk xl:text-108 xl:leading-none xl:font-bold xl:text-neutral-900 xl:lining-nums xl:slashed-zero xl:tabular-nums xl:opacity-10">
      {countStr}
    </span>
  );
};

export default SearchCount;
