import React from "react";

interface Props {
  className: string;
}

export default function User({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={8} r={5} />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
