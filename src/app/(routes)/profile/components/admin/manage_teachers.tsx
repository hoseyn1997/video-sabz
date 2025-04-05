import { listTeachers } from "@/lib/db/queries/teacher.query";
import React from "react";
import { Accordion } from "@/app/components/features/accordion";
import { Icons } from "@/app/components/ui/icons/Icons";
import { ManageTeacher } from "./manage_teacher";

const ManageTeachers = async () => {
  const teachers = await listTeachers();
  return (
    <div className="rtl rtl mx-auto max-w-2xl gap-2">
      <div className="mx-auto flex items-center justify-start gap-2 py-2">
        <Icons.graduate className="w-4 stroke-green-500" />
        <h1 className="py-1 text-xs font-bold text-green-500">مدیریت مدرسین</h1>
      </div>
      <Accordion
        items={teachers.map((teacher) => {
          return {
            title: teacher.FullName,
            content: <ManageTeacher teacher={teacher} />,
          };
        })}
      />
    </div>
  );
};

export default ManageTeachers;

{
  /* <div key={teacher.Id} className="grid h-full">
          <div className="grid gap-1 bg-gray-100 dark:bg-gray-50/5 rounded-t-xl text-xs p-2 shadow-[0px_0px_3px_0px_gray] h-44">
            <p
              className={`p-1 rounded-md text-center font-bold ${
                teacher.IsActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              فعال {teacher.IsActive ? "است" : "نیست"}
            </p>
            <p>نام: {teacher.FName}</p>
            <p>نام خانوادگی: {teacher.LName}</p>
            <p>نام کامل: {teacher.FullName}</p>
            <p>
              آخرین ویرایش:
              {teacher.UpdatedAt.toString()}
            </p>
            <p className="Just3Rows overflow-hidden">بایو: {teacher.Bio}</p>
          </div>
          <span className="text-[10px] p-1">افزودن تصویر:</span>
          <AddPhotoButton teacher={teacher} />
        </div> */
}
