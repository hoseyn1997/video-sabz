"use client";

import { useModal } from "@/lib/contexts/modalContext";

export default function Modal() {
  const { isOpen, closeModal, modalContent } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="py-10 px-2 md:px-5 rounded-xl shadow-lg w-full max-w-[90%] md:max-w-md relative bg-white dark:bg-dark dark:shadow-[0px_0px_0.5px_0.5px_gray]">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-10 bg-gray-100 dark:bg-black/50 dark:text-white text-xl dark:shadow-[0px_0px_0.5px_0.5px_gray] rounded-lg pt-0.5"
        >
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  );
}
