import type { CollectionEntry } from 'astro:content';

const Card = ( post: CollectionEntry<'posts'> ) => {
  const { id, data } = post
  const { title } = data

  return (
    <div>
      <p><a href={`/post/${id}/`} />{title}</p>
    </div>
  )
}

export default Card
