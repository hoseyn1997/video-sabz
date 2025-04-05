import React from "react";

interface Props {
  className: string;
}

export default function Grip({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={5} r={1} />
      <circle cx={19} cy={5} r={1} />
      <circle cx={5} cy={5} r={1} />
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
      <circle cx={5} cy={12} r={1} />
      <circle cx={12} cy={19} r={1} />
      <circle cx={19} cy={19} r={1} />
      <circle cx={5} cy={19} r={1} />
    </svg>
  );
}
