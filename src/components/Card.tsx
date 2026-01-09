import type { FC } from 'react';

type Props = {
  href: string,
  title: string,
  img?: string
}

const Card:FC<Props> = ( { href, title, img } ) => {
  return (
    <div>
      <p><a href={href} />{title}</p>
    </div>
  )
}

export default Card
