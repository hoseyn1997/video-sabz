import React from "react";

interface Props {
  className: string;
  fill?: string;
}

export default function Play({ className, fill }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.715 6.36694L16.4 10.6639C16.7719 10.9289 16.9927 11.3573 16.9927 11.8139C16.9927 12.2706 16.7719 12.699 16.4 12.9639L10.71 17.6639C10.2297 18.0453 9.5794 18.1339 9.01458 17.8948C8.44975 17.6558 8.06062 17.1273 8.00003 16.5169V7.51694C8.05845 6.90422 8.44802 6.37281 9.01478 6.13275C9.58154 5.89269 10.2343 5.9826 10.715 6.36694Z"
          stroke={fill || "#fff"}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
