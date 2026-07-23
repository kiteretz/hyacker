import type { CollectionEntry } from 'astro:content';

import { getSortedPosts } from './sortedPosts';

type tag = {
  name: string;
  posts: CollectionEntry<'posts'>[];
};

const computePostsByTag = async (): Promise<tag[]> => {
  const posts = await getSortedPosts();
  const uniqTags = new Set<string>(
    posts.flatMap(({ data }) => data.tags).filter((tag): tag is string => typeof tag === 'string'),
  );

  const tags: tag[] = [];
  uniqTags.forEach((tag) => {
    tags.push({
      name: tag,
      posts: posts.filter(({ data }) => data.tags?.includes(tag)),
    });
  });

  return tags.sort((a, b) => b.posts.length - a.posts.length);
};

// 静的ビルド中は全ページで結果が同一のため、module-level でメモ化する
let postsByTagPromise: Promise<tag[]> | null = null;

export const getPostsByTag = (): Promise<tag[]> => {
  if (!postsByTagPromise) {
    postsByTagPromise = computePostsByTag();
  }
  return postsByTagPromise;
};
