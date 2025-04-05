"use client";
import { handlefeedback } from "@/lib/actions/feedback.action";
import { Icons } from "@/app/components/ui/icons/Icons";
import Loading from "@/app/components/ui/loader/loading";
import React, { useActionState } from "react";
import ScoreInput from "@/app/components/ui/input/score_input";

const initialState = {
  message: "",
  error: "",
};

const Feedback = () => {
  const [state, formAction, pending] = useActionState(
    handlefeedback,
    initialState,
  );
  return (
    <section className="submit-feedback relative my-2 mt-2 grid gap-3 p-3 pb-5 shadow-[0px_0.5px_0px_0px_#9ca3af] lg:p-5">
      <div className="flex items-center gap-3">
        <Icons.comment className="mb-2 w-12 rounded-lg bg-gray-100 stroke-gray-400 p-2 dark:bg-gray-100/30 dark:stroke-green-400" />
        <div className="mb-2 self-end">
          <p className="text-lg font-bold">Feedback</p>
          <p className="text-xs text-gray-400">Your Support Helps Me Go On</p>
        </div>
      </div>
      <form action={formAction} className="grid gap-1.5">
        <div className="flex flex-wrap items-center gap-1">
          <div className="block">
            <p className="px-1 text-xs text-gray-400/80 dark:text-gray-400">
              linkdin username
            </p>
            <input
              type="text"
              name="linkdin_id"
              placeholder="نام کاربری لینکدین (اختیاری*)"
              className="rounded-md px-0.5 py-2 ring-[0.5px] ring-gray-400 placeholder:text-xs placeholder:text-gray-300/60 focus-visible:shadow-[0px_0px_2px_gray] focus-visible:outline-none dark:bg-black dark:ring-gray-100/80"
            />
          </div>

          <div className="block">
            <p className="px-1 text-xs text-gray-400/80 dark:text-gray-400">
              give me a score
            </p>
            <ScoreInput />
          </div>
        </div>
        <div className="block">
          <p className="px-1 text-xs text-gray-400/80 dark:text-gray-400">
            How do you think I can do better
          </p>
          <textarea
            rows={4}
            name="feedback"
            placeholder="نظرت؟"
            className="w-full rounded-md p-2 ring-[0.5px] ring-gray-400 placeholder:text-xs placeholder:text-gray-300/60 focus-visible:shadow-[0px_0px_2px_gray] focus-visible:outline-none dark:bg-black dark:ring-gray-100/80"
          />
        </div>
        {state.error && (
          <div className="my-0.5">
            <p className="w-full rounded-md p-3 text-center text-xs font-bold text-red-400 ring-[0.5px] ring-red-400">
              {state.error}
            </p>
          </div>
        )}
        {state.message && (
          <div className="my-0.5">
            <p className="w-full rounded-md p-3 text-center text-xs font-bold text-green-400 ring-[0.5px] ring-green-400">
              {state.message}
            </p>
          </div>
        )}
        <button className="flex items-center justify-center gap-2">
          {/* <Icons.check className="w-10 stroke-white dark:bg-gray-100/50 bg-gray-300 p-1 rounded-md stroke-2" /> */}
          {pending ? (
            <Loading className="w-7" />
          ) : (
            <Icons.arrow_left className="w-7 rotate-180 stroke-teal-500" />
          )}
          <p className="w-full rounded-md bg-teal-500 p-1.5 text-xl font-bold text-white">
            Share FeedBack
          </p>
        </button>
      </form>
    </section>
  );
};

export default Feedback;
