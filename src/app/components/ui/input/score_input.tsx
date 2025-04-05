"use client";
import React, { useRef, useState } from "react";
import { Icons } from "../icons/Icons";

export default function ScoreInput() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [score, SetScore] = useState(0);

  return (
    <div>
      <input ref={ref} type="number" name="score" value={score} hidden />
      <div className="ltr flex items-center rounded-md p-2 py-2.5 ring-[0.5px] ring-gray-400">
        <button type="button" onClick={() => SetScore(1)}>
          <Icons.star
            className={`w-4 cursor-pointer ${score >= 1 && "fill-yellow-500"} stroke-gray-200 stroke-[1px]`}
          />
        </button>
        <button type="button" onClick={() => SetScore(2)}>
          <Icons.star
            className={`w-4 cursor-pointer ${score >= 2 && "fill-yellow-500"} stroke-gray-200 stroke-[1px]`}
          />
        </button>
        <button type="button" onClick={() => SetScore(3)}>
          <Icons.star
            className={`w-4 cursor-pointer ${score >= 3 && "fill-yellow-500"} stroke-gray-200 stroke-[1px]`}
          />
        </button>
        <button type="button" onClick={() => SetScore(4)}>
          <Icons.star
            className={`w-4 cursor-pointer ${score >= 4 && "fill-yellow-500"} stroke-gray-200 stroke-[1px]`}
          />
        </button>
        <button type="button" onClick={() => SetScore(5)}>
          <Icons.star
            className={`w-4 cursor-pointer ${score == 5 && "fill-yellow-500"} stroke-gray-200 stroke-[1px]`}
          />
        </button>
      </div>
    </div>
  );
}
