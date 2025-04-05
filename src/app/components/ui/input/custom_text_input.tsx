import React from "react";
import { customIcons, Icons } from "../icons/Icons";

interface Props {
  type: string;
  name: string;
  accept?: string;
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
  minLength?: number;
  maxLength?: number;
}

const CustomTextInput = ({
  type,
  name,
  accept,
  placeholder,
  inputMode,
  icon,
  maxLength,
  minLength,
}: Props) => {
  const input_icon = icon && Icons[icon];
  return (
    <div className="flex justify-between items-center w-full gap-2 ring-[0.5px] ring-gray-300 rounded-md p-1.5 text-center rtl text-xs">
      <input
        type={type}
        name={name}
        accept={accept}
        placeholder={placeholder}
        inputMode={inputMode || "text"}
        maxLength={maxLength}
        minLength={minLength}
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

export default CustomTextInput;
