import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

type tag = {
  name: string,
  posts: CollectionEntry<'posts'>[]
}

export const getAllTags = async (): Promise<tag[]> => {
  const posts = await getCollection('posts');
  const uniqTags = new Set<string>( posts
    .flatMap( ({data}) => data.tags )
    .filter( (tag): tag is string => typeof tag === 'string' )
  );

  const tags: tag[] = [];
  uniqTags.forEach( (tag) => {
    tags.push( {
      name: tag,
      posts: posts.filter( ({data}) => data.tags.includes(tag) )
    }
  )})

  return tags.sort((a,b)=> b.posts.length - a.posts.length );
}
