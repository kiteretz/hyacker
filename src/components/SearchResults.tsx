/**
 * Fetches and displays Pagefind search results based on the URL query parameter `?keyword=`.
 * Uses Jotai (pageFindAtom, resultsAtom) to manage the Pagefind instance and result state.
 * Falls back to dummyResult in development where the Pagefind index is unavailable.
 */

import { useAtom, useAtomValue } from 'jotai';
import { type FC, useEffect } from 'react';
import { twJoin } from 'tailwind-merge';

import { pageFindAtom, queryAtom, resultsAtom } from '@libs/jotai';
import search from '@libs/search';

import { getGridFillerClasses, STRETCH_FILLER_CELL_CLASSES } from '@utils/gridFiller';

import Card from './Card';

const GRID_CLASSES = 'grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5';
const SKELETON_COUNT = 10; // 2xl の 5 列でちょうど 2 行

// 検索完了までのプレースホルダー。Card の front 面（h-367 / p-8 / 画像下寄せ）と同じ骨格
const SkeletonCard: FC = () => (
  <div className="grid h-367 animate-pulse grid-rows-[auto_auto_auto_1fr] bg-white p-8">
    <div className="mx-8 mb-8 h-18 rounded-4 bg-neutral-100" />
    <div className="mx-8 mb-4 h-14 w-1/3 rounded-4 bg-neutral-100" />
    <div className="mx-8 h-14 w-1/2 rounded-4 bg-neutral-100" />
    <div className="aspect-video self-end rounded-8 bg-neutral-100" />
  </div>
);

const SearchResults: FC = () => {
  const [results, setResults] = useAtom(resultsAtom);
  const [query, setQueried] = useAtom(queryAtom);
  const pagefind = useAtomValue(pageFindAtom);

  // null は「Pagefind 未ロードで検索できなかった」。結果を上書きせず、
  // ロード完了時に下のエフェクト（pagefind が deps）が現在のクエリで再検索する
  const execSearch = async () => {
    const searched = await search(query, pagefind);
    if (searched !== null) setResults(searched);
  };

  // pagefind も deps に含める：初期ロード時は Pagefind の読み込み完了前に実行されるため、
  // 読み込み完了後に再検索しないと空欄時の全件表示が反映されない
  useEffect(() => {
    execSearch();
  }, [query, pagefind]);

  // URL パラメターに含まれるワードをクエリにセット
  // 検索自体は上のエフェクトが行う（初回マウント時にも走る）
  useEffect(() => {
    const params = new URLSearchParams(document.location.search || '');
    setQueried(params.get('keyword') || '');
  }, []);

  return (
    <div aria-live="polite" aria-busy={results === null} className="flex flex-col">
      {results === null ? (
        <div aria-hidden="true" className={GRID_CLASSES}>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
          {getGridFillerClasses(SKELETON_COUNT).map((classes, i) => (
            <div key={i} className={twJoin('bg-white', classes)} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="flex-1 bg-white p-16 xl:p-32">
          <p>該当する記事はありません</p>
        </div>
      ) : (
        <>
          <div className={GRID_CLASSES}>
            {results.map((result) => (
              <Card key={result.href} {...result} />
            ))}
            {getGridFillerClasses(results.length).map((classes, i) => (
              <div key={i} aria-hidden="true" className={twJoin('bg-white', classes)} />
            ))}
          </div>
          {/*
            リストより SideLeft が高い場合に残る余白を、列ごとの空セルで埋めるストレッチフィラー。
            セル上端の横罫線は高さに寄与しないよう border ではなく inset shadow で描く。
          */}
          <div
            aria-hidden="true"
            className="grid flex-1 gap-x-px overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
          >
            {STRETCH_FILLER_CELL_CLASSES.map((classes, i) => (
              <div key={i} className={twJoin('bg-white shadow-[inset_0_1px_0_0_var(--color-neutral-800)]', classes)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
