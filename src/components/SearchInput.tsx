import React, { type FC } from 'react'
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const SearchInput:FC = ( props: Props ) => {
  const { className } = props;

  return (
    <form action="">
      <label className={twMerge('relative flex items-center', className)}>
        <input
          className="w-full rounded-full border bg-white px-16 py-4"
          id="search-input"
          name="search"
          placeholder="Search"
          type="search"
          onChange={(e)=>console.log(e.target.value)}
/>
        <button
          className={twMerge(
            'absolute right-4 flex aspect-square w-28 shrink items-center justify-center rounded-full bg-black text-white'
          )}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="w-12">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.25 14.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm7.5 1.5-3.263-3.262"></path>
          </svg>
        </button>
      </label>
    </form>
  )
}

export default SearchInput
