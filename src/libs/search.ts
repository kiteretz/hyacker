import type { Card } from '@components/Card';

import dummyResult from './dummyResult';

/**
 * Pagefind での検索を行う関数
 * Pagefind の読み込み・初期化は React コンポーネントで行う必要がある
 * そのため引数に Pagefind オブジェクトを取る
 */
const search = async (query: string, pagefind: any): Promise<Card[] | null> => {
  // 空欄（空白のみ含む）のときは全件表示する
  const isEmptyQuery = query.trim() === '';

  // ビルドしないとPagefindのインデックスやJSが生成されない
  // 開発環境では適当に0～3つのPostを返す（空欄時は全件表示をエミュレート）
  if (import.meta.env.DEV) {
    return dummyResult(isEmptyQuery);
  }

  // Pagefind 未ロードで検索できないときは null（0件の [] と区別し、呼び出し側で無視できるように）
  if (!pagefind) {
    return null;
  }

  // Pagefind は null クエリでインデックス済みの全ページを返す
  const search = await pagefind.search(isEmptyQuery ? null : query);

  const results = await Promise.all(
    search.results.map(async (r: any) => {
      const data = await r.data();
      return {
        href: data.url,
        title: data.meta.title,
        date: data.meta.pubDate,
        img: data.meta.image as string | undefined,
        imgAlt: data.meta.imageAlt as string | undefined,
        answer: data.meta.answer ? decodeURIComponent((data.meta.answer as string).trim()) : undefined,
        isCode: !!data.meta.answerLang,
        lang: data.meta.answerLang as string | undefined,
      };
    }),
  );

  // 全件表示時は関連度順が意味を持たないため、投稿日の新しい順に並べ替える
  // date は「2026.7.23」形式の文字列（data-pagefind-meta="pubDate" のテキスト）
  if (isEmptyQuery) {
    const time = (date: Card['date']) => new Date(typeof date === 'string' ? date.replace(/\./g, '/') : date).getTime();
    return results.sort((a, b) => time(b.date) - time(a.date));
  }

  return results;
};

export default search;
