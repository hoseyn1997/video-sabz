import React from "react";
import BlogCard from "./blogCard";

const Blogs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 gap-x-1 my-5">
      <BlogCard
        blog={{
          id: "x12GYOd1Y",
          index: 1,
          title: "آیا ممکن است زمانی ربات ها طغیان کنند؟",
          photo: "Ultran.png",
          summerizedDesc: "معرفی سری فیلم هایی با موضوع شورش رباتی",
          hostUsername: "hosein125",
          hostDisplayName: "حسین عباسی",
          category: "تکنولوژی",
          hostImage: "tc1.webp",
          type: "وبلاگ",
          commentsCount: 12,
          publishDate: new Date(),
        }}
      />
      <BlogCard
        blog={{
          id: "x12GYOd1g",
          index: 2,
          title: "ورود به دنیای انیمه",
          photo: "Animeh.png",
          summerizedDesc: "5 مورد از بهترین گزینه ها برای ورود به دنیای انیمه",
          hostUsername: "hosein125",
          hostDisplayName: "حسین عباسی",
          category: "انیمه",
          hostImage: "tc1.webp",
          type: "وبلاگ",
          commentsCount: 45,
          publishDate: new Date(),
        }}
      />
      <BlogCard
        blog={{
          id: "x12GTOd1g",
          index: 3,
          title: "بهترین فیلم های 2025",
          photo: "Movies2024.png",
          summerizedDesc: "فیلم هایی که نباید در سال 2025 از دست بدهید",
          hostUsername: "hosein125",
          hostDisplayName: "حسین عباسی",
          category: "فیلم و سریال",
          hostImage: "tc1.webp",
          type: "وبلاگ",
          commentsCount: 35,
          publishDate: new Date(),
        }}
      />
      <BlogCard
        blog={{
          id: "x12GTOU1g",
          index: 4,
          title: "نقشه راه طراحی سایت",
          photo: "web-development.png",
          summerizedDesc: "طراحی سایت از کجا شروع می شود و به کجا ختم می شود؟",
          hostUsername: "hosein125",
          hostDisplayName: "حسین عباسی",
          category: "برنامه نویسی",
          hostImage: "tc1.webp",
          type: "وبلاگ",
          commentsCount: 0,
          publishDate: new Date(),
        }}
      />
      <BlogCard
        blog={{
          id: "x12GT6U1g",
          index: 5,
          title: "شخصیت های سریال آلمانی دارک",
          photo: "XR2op46W8Ji.jpg",
          summerizedDesc: "حقایقی از سریال دارک که نمی دانید",
          hostUsername: "hosein125",
          hostDisplayName: "حسین عباسی",
          category: "فیلم و سریال",
          hostImage: "tc1.webp",
          type: "وبلاگ",
          commentsCount: 134,
          publishDate: new Date(),
        }}
      />
    </div>
  );
};

export default Blogs;
