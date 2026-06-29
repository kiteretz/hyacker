import type { Card } from "@components/Card";
import dummyResult from "./dummyResult";

/**
 * Pagefind での検索を行う関数
 * Pagefind の読み込み・初期化は React コンポーネントで行う必要がある
 * そのため引数に Pagefind オブジェクトを取る
 */
const search = async ( query: string, pagefind: any ): Promise<Card[]> => {

  // ビルドしないとPagefindのインデックスやJSが生成されない
  // 開発環境では適当に0～3つのPostを返す
  if (import.meta.env.DEV) {
    return dummyResult()
  }

  const search = await pagefind.search(query);

  const results = await Promise.all(
    search.results.map(async (r: any) => {
      const data = await r.data();
        return {
          href: data.url,
          title: data.meta.title,
          date: data.meta.pubDate,
          answer: data.meta.answer ? decodeURIComponent((data.meta.answer as string).trim()) : undefined,
          isCode: !!data.meta.answerLang,
          lang: data.meta.answerLang as string | undefined,
        };
    })
  );

  return results
}

export default search;
