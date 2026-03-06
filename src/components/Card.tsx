import type { FC } from 'react';
import { formatDate } from '@utils/formatDate';

export type Card = {
  href: string;
  title: string;
  date: Date;
  tags: string[];
  img?: string;
};

const Card: FC<Card> = ({ href, title, date, tags, img }) => {
  return (
    <a href={href} className="block bg-white p-8">
      <h3>{title}</h3>
      <p className="font-space-grotesk text-14 text-fg-400">{formatDate(date)}</p>
      <ul className="flex flex-wrap font-inter text-14 text-fg-400">
        {tags.map((tag) => (
          <li key={tag} className='after:mr-2 after:content-[","] last:after:content-none'>
            <span className="">{tag}</span>
          </li>
        ))}
      </ul>
      {img && <img src={img} alt={title} className="rounded-8" />}
    </a>
  );
};

export default Card;
