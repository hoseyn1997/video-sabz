"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import Loader from "@/app/components/ui/loader/loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useUserStore from "@/lib/stores/userStore";

export default function RegisterStudent() {
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  const { setPhoneNumber } = useUserStore();

  const initialValues = {
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    error: null,
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("این فیلد ضروری است"),
    phoneNumber: Yup.string()
      .matches(/^0\d{10}$/, "شماره تلفن باید با صفر شروع شود")
      .required("این فیلد ضروری است"),
    email: Yup.string(),
    password: Yup.string().required("پسورد را وارد کنید"),
  });

  const handleSubmit = async (info: {
    username: string;
    password: string;
    phoneNumber: string;
    email?: string;
  }) => {
    setRegistering(true);
    const response = await axios.post("/api/register", {
      username: info.username,
      password: info.password,
      phoneNumber: info.phoneNumber,
      email: info.email,
    });
    setPhoneNumber(info.phoneNumber)
    router.push("/auth/login/phone");
  };

  return (
    <div className="mx-auto flex h-[90vh] w-[98%] flex-col items-center justify-start rounded-2xl py-20 sm:w-1/2 lg:w-1/3 text-sm">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setErrors }) => {
          toast
            .promise(
              handleSubmit({
                username: values.username,
                password: values.password,
                phoneNumber: values.phoneNumber,
                email: values.phoneNumber,
              }),
              {
                loading: "در حال ثبت نام",
                success: <b>ثبت نام موفق</b>,
                error: <b>عملیات ناموفق</b>,
              }
            )
            .catch((error) => {
              setErrors({ error: error.response.data.message });
              setRegistering(false);
              return error;
            });
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, isValid }) => (
          <Form
            className="error grid gap-2 text-center w-[330px] p-4 rounded-xl shadow-[0px_0px_2px_0px_#a1a3a8]"
            onSubmit={handleSubmit}
          >
            <div className="rtl mb-4 flex items-center justify-center">
              <Image
                className="float-right w-10 scale-150 rounded-full"
                src="/logo192.png"
                alt="myIcon"
                width={40}
                height={40}
                priority
              />
              <span className="font-danaBold mx-auto font-[1000]">
                ثبت نام در ویدیو سبز
              </span>
              {/* <Link href="/auth/login/phone">
                <Icons.arrow_left className="backward-btn h-7 w-7 cursor-pointer stroke-[#a1a3a8] text-slate-500" />
              </Link> */}
            </div>
            <div className="relative grid">
              <Field
                name="username"
                placeholder="نام کاربری"
                className="ltr rounded-xl bg-gray-200 dark:bg-black px-2 py-3 text-center placeholder:text-center focus-visible:outline-none shadow-[0px_0px_2px_0px_#a1a3a8]"
              />
              <Icons.user className="absolute left-2 top-2.5 h-6 w-6 stroke-[#a1a3a8] stroke-[2px]" />
            </div>
            <div className="relative grid">
              <Field
                name="phoneNumber"
                type="text"
                placeholder="شماره تلفن"
                inputMode="tel"
                minLength={11}
                maxLength={11}
                className="ltr rounded-xl bg-gray-200 dark:bg-black px-2 py-3 text-center placeholder:text-center focus-visible:outline-none shadow-[0px_0px_2px_0px_#a1a3a8]"
              />
              <Icons.phone className="absolute left-2 top-2.5 h-6 w-6 stroke-[#a1a3a8] stroke-[2px]" />
            </div>
            <div className="relative grid">
              <Field
                name="email"
                type="email"
                placeholder="ایمیل (اختیاری)"
                className="ltr rounded-xl bg-gray-200 dark:bg-black px-2 py-3 text-center placeholder:text-center focus-visible:outline-none shadow-[0px_0px_2px_0px_#a1a3a8]"
              />
              <Icons.email className="absolute left-2 top-2.5 h-6 w-6 stroke-[#a1a3a8] stroke-[2px]" />
            </div>
            <div className="relative grid">
              <Field
                name="password"
                type="password"
                placeholder="رمز"
                className="ltr rounded-xl bg-gray-200 dark:bg-black px-2 py-3 text-center placeholder:text-center focus-visible:outline-none shadow-[0px_0px_2px_0px_#a1a3a8]"
              />
              <Icons.lock className="absolute left-0 top-1 h-10 w-10" />
            </div>
            {errors.error && (
              <div className="relative flex justify-center w-full">
                <ErrorMessage
                  name="error"
                  render={() => (
                    <span className="ring-[0.5px] ring-red-300 to-rose-400 mx-3 text-xs text-red-400 font-bold w-full rounded py-2">
                      {errors.error}
                    </span>
                  )}
                />
                <div className="w-1.5 h-1.5 aspect-square rounded-full ring-1 ring-red-300 absolute top-1 right-4"></div>
              </div>
            )}
            <button
              disabled={registering || !isValid}
              type="submit"
              className="flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-teal-300 to-green-300 p-1.5 font-bold 
                text-white shadow disabled:opacity-50 "
            >
              <span className="mx-auto">ورود</span>
              <div>
                {registering ? (
                  <Loader fill="#fff" className="w-7" />
                ) : (
                  <Icons.login className="h-7 w-7 rounded-full stroke-[2px] pr-1" />
                )}
              </div>
            </button>
          </Form>
        )}
      </Formik>
      <p className="my-5">
        حساب کاربری دارید؟
        <Link
          href={"/auth/login/phone"}
          className="mx-1 text-sm font-bold text-green-500 hover:text-green-500 "
        >
          ورود
        </Link>
      </p>
      <div className="rtl mx-auto mt-3 w-full max-w-[330px] text-center ">
        با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات
        <Link className="text-green-500" href="/">
          {" "}
          ویدیو سبز{" "}
        </Link>
        را پذیرفته اید.
      </div>
    </div>
  );
}
