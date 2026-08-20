import { type CollectionEntry, getCollection } from 'astro:content';

import { sortPosts } from '@utils/sort';

// 静的ビルド中は全ページで結果が同一のため、module-level でメモ化する
let sortedPostsPromise: Promise<CollectionEntry<'posts'>[]> | null = null;

export const getSortedPosts = (): Promise<CollectionEntry<'posts'>[]> => {
  if (!sortedPostsPromise) {
    sortedPostsPromise = getCollection('posts', ({ data }) => {
      return import.meta.env.PROD ? data.status === 'publish' : true;
    }).then((posts) => sortPosts(posts, 'dateDesc'));
  }
  return sortedPostsPromise;
};
