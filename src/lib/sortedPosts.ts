import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]>{
  const posts = await getCollection('posts');
  return posts.sort(( a, b ) => {
     return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });
}
