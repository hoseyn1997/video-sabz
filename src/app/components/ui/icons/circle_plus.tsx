import React from 'react';

interface Props{
    className:string;
}

const CirclePlus = ({className}:Props) => {
    return (
        <svg
        className={className}
  xmlns="http://www.w3.org/2000/svg"

  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx={12} cy={12} r={10} />
  <path d="M8 12h8" />
  <path d="M12 8v8" />
</svg>

    );
}

export default CirclePlus;
