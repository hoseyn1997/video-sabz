import React from "react";

interface Props {
  className: string;
}

const Addtolist = ({ className }: Props) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 18h4" />
      <path d="M11 6H3" />
      <path d="M15 6h6" />
      <path d="M18 9V3" />
      <path d="M7 12h8" />
    </svg>
  );
};

export default Addtolist;
