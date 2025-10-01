import { getCollection, type CollectionEntry } from 'astro:content';
import { sortPosts } from 'src/utils/sort';

export const getSortedPosts = async (): Promise<CollectionEntry<'posts'>[]> => {
  const posts = await getCollection( 'posts', ({ data }) => {
    return import.meta.env.PROD ? data.status === 'publish' : true
  });

  return sortPosts( posts, 'dateDesc' );
}
