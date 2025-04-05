import React from "react";

interface Props {
  className: string;
}

const VerticalDots = ({ className }: Props) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      //   stroke="currentColor"
      strokeWidth={0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={0.7} />
      <circle cx={12} cy={5} r={0.7} />
      <circle cx={12} cy={19} r={0.7} />
    </svg>
  );
};

export default VerticalDots;
