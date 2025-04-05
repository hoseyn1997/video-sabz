import React from "react";
import { customIcons, Icons } from "../icons/Icons";

interface Props {
  name: string;
  icon?: customIcons;
  accept?: string;
}

const CustomFileInput = ({ name, icon, accept }: Props) => {
  const input_icon = icon && Icons[icon];
  return (
    <div className="flex justify-between items-center w-full gap-2 ring-[0.5px] ring-gray-300 rounded-md p-1.5 text-center rtl text-xs">
      <input
        type="file"
        name={name}
        accept={accept}
        className="text-gray-500
          file:mr-4 file:py-1 file:px-2
          file:rounded-full file:border-0
          file:text-xs file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 text-xs"
      />
      {input_icon ? (
        input_icon({ className: "w-5 stroke-gray-500" })
      ) : (
        <Icons.text_input className="w-5 stroke-gray-500" />
      )}
    </div>
  );
};

export default CustomFileInput;
