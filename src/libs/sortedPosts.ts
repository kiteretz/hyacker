import { getCollection, type CollectionEntry } from 'astro:content';

export const getSortedPosts = async (): Promise<CollectionEntry<'posts'>[]> => {
  const posts = await getCollection( 'posts', ({ data }) => {
    return import.meta.env.PROD ? data.status === 'publish' : true
  });

  return posts.sort(( a, b ) => {
     return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });
}
