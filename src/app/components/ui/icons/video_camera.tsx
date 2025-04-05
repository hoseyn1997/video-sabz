import React from "react";

interface Props {
  className: string;
}

const VideoCamera = ({ className }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M432 356.16A32 32 0 0 0 384 384v256a32 32 0 0 0 48 27.84l224-128a32 32 0 0 0 0-55.68z m16 228.48v-145.6L576 512z"
          fill="#c7c7c7"
        />
        <path
          d="M864 32H160a128 128 0 0 0-128 128v704a128 128 0 0 0 128 128h704a128 128 0 0 0 128-128v-128H96V288h896V160a128 128 0 0 0-128-128z m-96 768h160v64a64 64 0 0 1-64 64h-96z m-224 0h160v128h-160z m-224 0h160v128h-160z m-64 0v128H160a64 64 0 0 1-64-64v-64zM256 224H96V160a64 64 0 0 1 64-64h96z m224 0h-160V96h160z m224 0h-160V96h160z m224 0h-160V96h96a64 64 0 0 1 64 64z"
          fill="#c7c7c7"
        />
        <path
          d="M960 384m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
          fill="#c7c7c7"
        />
        <path
          d="M960 480a32 32 0 0 0-32 32v128a32 32 0 0 0 64 0v-128a32 32 0 0 0-32-32z"
          fill="#c7c7c7"
        />
      </g>
    </svg>
  );
};

export default VideoCamera;
