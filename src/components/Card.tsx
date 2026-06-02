import type { FC } from 'react';
import { formatDate } from '@utils/formatDate';
import { twMerge } from 'tailwind-merge';

/**
 * Card コンポーネントは Astro での HTML ビルド時と、検索結果の表示のために React から呼び出される
 * 両対応にするために tsx ファイルとしている。
 * また、Astro が読み出す MarkDown コンテンツと、Pagefind の検索結果の2つがデータソースになる。
 */

export type Card = {
  href: string;
  title: string;
  date: Date | string;
  tags: string[];
  img?: string;
};

const Card: FC<Card> = ({ href, title, date, tags, img }) => {
  return (
    <a
      href={href}
      className={twMerge(
        'mb-px ml-px grid min-h-367 grid-rows-[auto_auto_auto_1fr] bg-white p-8',
        'focus-visible:ring-2 focus-visible:ring-fg-800 focus-visible:outline-none focus-visible:ring-inset',
      )}
    >
      <h3 className="mb-8 px-8 text-18 font-semibold">{title}</h3>
      <p className="px-8 font-space-grotesk text-14 text-fg-400">{formatDate(date)}</p>
      <ul className="flex flex-wrap px-8 font-inter text-14 text-fg-400">
        {tags?.map((tag) => (
          <li key={tag} className='after:mr-2 after:content-[","] last:after:content-none'>
            {tag}
          </li>
        ))}
      </ul>
      {img && <img src={img} width="" height="" alt={title} className="aspect-video self-end rounded-8 object-cover" />}
    </a>
  );
};

export default Card;
