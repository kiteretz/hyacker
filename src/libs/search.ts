import type { Card } from "@components/Card";

/**
 * Pagefind での検索を行う関数
 * Pagefind の読み込み・初期化は React コンポーネントで行う必要がある
 * そのため引数に Pagefind オブジェクトを取る
 */
const search = async ( query: string, pagefind: any ): Promise<Card[]> => {

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
