import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

// ソート関数の型定義
export type SortFunction = (a: PostEntry, b: PostEntry) => number;

// ソート方式の選択肢
export const sortOptions = {
  dateDesc: (a: PostEntry, b: PostEntry) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  dateAsc: (a: PostEntry, b: PostEntry) => new Date(a.data.pubDate).getTime() - new Date(b.data.pubDate).getTime(),
  title: (a: PostEntry, b: PostEntry) => a.data.title.localeCompare(b.data.title),
  updateDate: (a: PostEntry, b: PostEntry) => new Date(b.data.upDate).getTime() - new Date(a.data.upDate).getTime(),
} as const;

// ソート方式の型
export type SortType = keyof typeof sortOptions;

// ソート方式の説明（オプション）
export const sortDescriptions = {
  dateDesc: '投稿日順（新しい順）',
  dateAsc: '投稿日順（古い順）',
  title: 'タイトル順',
  updateDate: '更新日順',
} as const;

// メイン関数：投稿をソートする
export function sortPosts(posts: PostEntry[], sortType: SortType = 'dateDesc'): PostEntry[] {
  return [...posts].sort(sortOptions[sortType]);
}

// 複数のソート条件を組み合わせる場合（高度な使用例）
export function sortPostsMultiple(posts: PostEntry[], primarySort: SortType, secondarySort?: SortType): PostEntry[] {
  return [...posts].sort((a, b) => {
    const primaryResult = sortOptions[primarySort](a, b);
    if (primaryResult !== 0 || !secondarySort) return primaryResult;
    return sortOptions[secondarySort](a, b);
  });
}
