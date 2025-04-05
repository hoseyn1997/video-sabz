import React from "react";

interface Props {
  className: string;
  fill: string;
}

const Loader = ({ className, fill }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || "#c2b7b7"}
    >
      <radialGradient
        cx=".66"
        cy=".3125"
        fx=".66"
        fy=".3125"
        gradientTransform="scale(1.5)"
        id="a10"
      >
        <stop offset="0" stopColor={fill || "#000000"} />
        <stop offset=".3" stopColor={fill || "#000000"} stopOpacity=".9" />
        <stop offset=".6" stopColor={fill || "#000000"} stopOpacity=".6" />
        <stop offset=".8" stopColor={fill || "#000000"} stopOpacity=".3" />
        <stop offset="1" stopColor={fill || "#000000"} stopOpacity="0" />
      </radialGradient>
      <circle
        cx="100"
        cy="100"
        fill="none"
        r="70"
        stroke="url(#a10)"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeWidth="11"
        transform-origin="center"
        //  transformOrigin="center"
      >
        <animateTransform
          attributeName="transform"
          calcMode="spline"
          dur="2"
          keySplines="0 0 1 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="360;0"
        />
      </circle>
      <circle
        cx="100"
        cy="100"
        fill="none"
        opacity=".2"
        r="70"
        stroke={fill || "#000000"}
        strokeLinecap="round"
        strokeWidth="11"
        transform-origin="center"
        // transformOrigin="center"
      />
    </svg>
  );
};

export default Loader;
