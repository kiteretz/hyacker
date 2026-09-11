import { twMerge } from '@libs/twMerge';

import type { FC } from 'react';

type Props = {
  className?: string;
};

const Arrow: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={twMerge('aspect-square', className)}
  >
    <path stroke="currentColor" strokeLinejoin="bevel" strokeWidth="2" d="M4 12h16m-8-8 8 8-8 8"></path>
  </svg>
);

export default Arrow;
