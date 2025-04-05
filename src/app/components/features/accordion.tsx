"use client";

import { useState } from "react";
import { Icons } from "../ui/icons/Icons";
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

const AccordionItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-200 dark:bg-gray-500/20`}>
      <button
        className={`flex justify-between items-center w-full p-4 text-left text-sm transition-colors ${
          isOpen
            ? "bg-gray-50 dark:bg-gray-50/50"
            : "hover:bg-gray-50 dark:hover:bg-gray-50/50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <span
          className={`font-medium text-gray-900 ${
            isOpen ? "dark:text-gray-900" : "dark:text-gray-200"
          }`}
        >
          {title}
        </span>
        {isOpen ? (
          <Icons.arrow_left className="rotate-90 w-5 h-5" />
        ) : (
          <Icons.arrow_left className="-rotate-90 w-5 h-5" />
        )}
      </button>
      <div
        id={`accordion-content-${title}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`p-4 pt-0 text-gray-600 dark:text-gray-300`}>
          {children}
        </div>
      </div>
    </div>
  );
};
