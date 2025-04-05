"use client";

import { Icons } from "@/app/components/ui/icons/Icons";
import Loading from "@/app/components/ui/loader/loading";
import { useModal } from "@/lib/contexts/modalContext";
import useDashStore from "@/lib/stores/dashStore";

interface Props {
  teacherId: string;
}

export function ManageTeacherDelete({ teacherId }: Props) {
  const { deleteTeacher, isDeletingTeahcer } = useDashStore();
  const { closeModal } = useModal();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-4">
      <p className="rtl rounded ring-1 ring-red-300 text-red-500 p-1 text-center text-xs">
        با حذف استاد تمامی اطلاعات مرتبط با استاد مربوط از جمله دوره ها، ویدئو
        ها و مطلقا همه چیز حذف خواهد شد.{" "}
      </p>
        <span className="font-bold text-teal-600 text-xs py-2"> آیا مطمئن هستی؟</span>
      {/* <p className="rtl py-1 text-center text-lg ">
       
      </p> */}
      <div className="flex gap-2">
        <button
          onClick={() => deleteTeacher(teacherId)}
          className="flex w-fit items-center justify-start gap-2 justify-self-end rounded px-2 py-1 text-xs ring-[0.5px] ring-gray-400"
        >
          بله
          {isDeletingTeahcer ? (
            <Loading className="w-4 stroke-1" />
          ) : (
            <Icons.check className="w-5 stroke-current stroke-2" />
          )}
        </button>
        <button
          onClick={() => closeModal()}
          className="flex w-fit items-center justify-start gap-2 justify-self-end rounded px-2 py-1 text-xs ring-[0.5px] ring-gray-400"
        >
          خیر
          <Icons.lock className="w-5 stroke-current stroke-1" />
        </button>
      </div>
    </div>
  );
}
