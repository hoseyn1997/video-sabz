"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import Comment from "./comment";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import agent from "@/lib/stores/agent";
import { Comment as CommentPrisma, Video } from "@prisma/client";
import axios from "axios";
import useVideoStore from "@/lib/stores/videoStore";

interface Props {
  className?: string;
  video: Video;
}

const Comments = (props: Props) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [comments, SetComments] = useState<CommentPrisma[]>();/
  const { comments, getComments, sendComment } = useVideoStore();
  useEffect(() => {
    getComments(props.video.Id);
  }, []);

  const hanldeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendComment(props.video.Id, inputRef.current?.value || "");
  };

  // const getComments = async () => {
  //   await axios
  //     .get(`/api/video/comment/list?videoId=${props.video.Id}`)
  //     .then((res) => {
  //       SetComments(res.data.comments);
  //     });
  // };

  return (
    <div
      className={`comments rtl relative pt-0 ${
        props.className && props.className
      }`}
    >
      <div className="sticky top-0 bg-gray-100 px-1 py-3 dark:bg-dark lg:bg-white">
        <form
          onSubmit={hanldeSubmit}
          className="send_commentw-full flex justify-between rounded-lg bg-[#ededf1] p-2 hover:shadow-[0px_0px_0.5px_0.5px_gray] dark:bg-[#f5f5f90f]"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="دیدگاه خود را وارد کنید..."
            className="w-full bg-transparent p-1 text-xs focus-visible:outline-none"
          />
          <button>
            <Icons.clock className="w-5" />
          </button>
        </form>
      </div>
      <div
        ref={commentsRef}
        className="comments_list flex flex-col gap-0 pb-12"
      >
        <p id="commentsHeader" className="px-3 text-sm font-bold">
          کامنت ها
        </p>
        {comments?.map((comment) => (
          <Comment comment={comment} key={comment.Id} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
