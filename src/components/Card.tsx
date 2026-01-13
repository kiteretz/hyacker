import type { FC } from 'react';

export type Card = {
  href: string,
  title: string,
  img?: string
}

const Card:FC<Card> = ( { href, title, img } ) => {
  return (
    <div>
      <p><a href={href} />{title}</p>
    </div>
  )
}

export default Card
