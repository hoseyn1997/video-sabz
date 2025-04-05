"use client";
import Loading from "@/app/components/ui/loader/loading";
import React, { ReactNode, useState } from "react";

interface Props {
  className: string;
  title?: string;
  icon?: ReactNode;
  content?: ReactNode;
  onClick?: any;
  loading?: boolean;
}

const InteractButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        props.onClick && props.onClick();
      }}
      title={props.title}
      className={props.className}
    >
      {props.loading ? <Loading className="w-4" /> : props.icon}
      {props.content}
    </button>
  );
};

export default InteractButton;
