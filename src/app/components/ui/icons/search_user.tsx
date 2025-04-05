import React from "react";

interface Props {
  className: string;
}

const SearchUser = ({ className }: Props) => {
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
      <circle cx={10} cy={7} r={4} />
      <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
      <circle cx={17} cy={17} r={3} />
      <path d="m21 21-1.9-1.9" />
    </svg>
  );
};

export default SearchUser;
