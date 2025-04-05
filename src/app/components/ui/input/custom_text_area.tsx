import React from "react";
import { customIcons, Icons } from "../icons/Icons";

interface Props {
  name: string;
  placeholder?: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  icon?: customIcons;
  rows?: number;
}

const CustomTextArea = ({
  name,
  placeholder,
  inputMode,
  icon,
  rows,
}: Props) => {
  const input_icon = icon && Icons[icon];
  return (
    <div className="flex justify-between items-start w-full gap-2 ring-[0.5px] ring-gray-300 rounded-md p-1.5 text-center rtl text-xs">
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows || 5}
        inputMode={inputMode || "text"}
        className="w-full p-0.5 focus-visible:outline-none bg-transparent"
      />
      {input_icon ? (
        input_icon({ className: "w-5 stroke-gray-500" })
      ) : (
        <Icons.text_input className="w-5 stroke-gray-500" />
      )}
    </div>
  );
};

export default CustomTextArea;
