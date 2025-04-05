"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import Loader from "@/app/components/ui/loader/loader";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/stores/userStore";

export default function page() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { login, loggingIn } = useUserStore();

  const handleSubmit = async (info: { username: string; password: string }) => {
    const response = login(info)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        throw err;
      });

    try {
      return response;
    } catch (error: any) {
      return error;
    }
  };
  return (
    <div className="mx-auto flex h-[90vh] w-[98%] flex-col items-center justify-start rounded-2xl py-20 sm:w-1/2 lg:w-1/3 text-sm">
      <Formik
        initialValues={{ username: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          toast
            .promise(
              handleSubmit({
                username: values.username,
                password: values.password,
              }),
              {
                loading: "در حال ورود",
                success: <b>با موفقیت وارد شدید</b>,
                error: <b>ورود ناموفق</b>,
              }
            )
            .catch((error) => {
              setErrors({ error: error.response.data.message });
              return error;
            })
        }
        validationSchema={Yup.object({
          username: Yup.string().required("این فیلد الزامی است"),
          password: Yup.string().required("این فیلد الزامی است"),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid }) => (
          <form
            className="error grid gap-2 text-center w-[330px] p-4 rounded-xl shadow-[0px_0px_2px_0px_#a1a3a8]"
            onSubmit={handleSubmit}
            autoComplete="off"
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
                ورود با نام کاربری
              </span>
              <Link href="/auth/login/phone">
                <Icons.arrow_left className="backward-btn h-7 w-7 cursor-pointer stroke-[#a1a3a8] dark:bg-gray-500/50 bg-gray-500/10 p-1 rounded-full" />
              </Link>
            </div>
            <div className="mb-4 text-xs">
              حساب کاربری ندارید؟
              <Link
                href={"/auth/register"}
                className="mx-2 font-bold text-green-500 hover:text-green-500 "
              >
                ثبت نام کنید
              </Link>
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
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="رمز"
                className="ltr rounded-xl bg-gray-200 dark:bg-black px-2 py-3 text-center placeholder:text-center focus-visible:outline-none shadow-[0px_0px_2px_0px_#a1a3a8]"
              />
              <Icons.lock className="absolute left-0 top-1 h-10 w-10" />
              {showPass ? (
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 m-2"
                  type="button"
                >
                  <Icons.eye_close className="w-7 stroke-[#a1a3a8] stroke-[2px] cursor-pointer" />
                </button>
              ) : (
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 m-2"
                  type="button"
                >
                  <Icons.eye className="w-7 stroke-[#a1a3a8] stroke-[2px] cursor-pointer" />
                </button>
              )}
            </div>
            {errors.error && (
              <div className="relative flex justify-center w-full">
                <ErrorMessage
                  name="error"
                  render={() => (
                    <span className="ring-[0.5px] ring-red-300 to-rose-400 text-center text-xs text-red-400 font-bold w-full rounded-lg py-2">
                      {errors.error}
                    </span>
                  )}
                />
                <div className="w-1.5 h-1.5 aspect-square rounded-full ring-1 ring-red-300 absolute top-1 right-1"></div>
              </div>
            )}
            <button
              disabled={loggingIn || !isValid}
              type="submit"
              className="flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-teal-300 to-green-300 p-1.5 font-bold 
                text-white shadow disabled:opacity-50 "
            >
              <span className="mx-auto">ورود</span>
              <div>
                {loggingIn ? (
                  <Loader fill="#fff" className="w-7" />
                ) : (
                  <Icons.login className="h-7 w-7 rounded-full stroke-[2px] pr-1" />
                )}
              </div>
            </button>
            <div className="flex justify-between items-center px-2 text-xs text-gray-500 cursor-pointer my-1">
              <span>فراموشی رمز</span>
              <span>ثبت ایمیل</span>
            </div>
          </form>
        )}
      </Formik>

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
