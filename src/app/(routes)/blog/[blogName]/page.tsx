// import { createPost } from "@/actions/action";
// import { prisma } from "@/lib/db";
import { prisma } from "@/lib/db/db";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaComments,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaRegNewspaper,
  FaShare,
  FaTags,
  FaUserEdit,
  FaVideo,
} from "react-icons/fa";

interface Props {
  params: Promise<{ blogName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { blogName } = await params;
  return {
    title: ` ${blogName} - My Next.js Blog`,
    description: `Read the latest blog post about ${blogName} .`,
  };
};

const post = {
  title: "راهنمای جامع استریم آموزشی حرفه‌ای",
  content: `<p class="mb-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
            <h2 class="text-lg font-bold my-4">مقدمه</h2>
            <p class="mb-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>`,
  author: "تیم استریمینگ",
  date: "۱۴۰۲/۰۵/۳۰",
  readTime: "۱۵ دقیقه",
  views: "۲,۴۵۰",
  tags: ["استریم زنده", "آموزش", "تکنولوژی"],
  videoUrl: "https://example.com/video",
};

const relatedPosts = [
  { id: 1, title: "۱۰ نکته طلایی برای استریم آموزشی", category: "آموزشی" },
  { id: 2, title: "جدیدترین تکنولوژی‌های استریم ۲۰۲۳", category: "تکنولوژی" },
  { id: 3, title: "نقد و بررسی تجهیزات استریم", category: "نقد و بررسی" },
];

export default async function page({ params, searchParams }: Props) {
  const { blogName } = await params;
  const queryParams = await searchParams;
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 rtl">
      {/* Article Header */}
      <header className="border-b dark:border-gray-700">
        <div className="max-w-screen-container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/blog"
              className="text-teal-500 hover:text-teal-600 flex items-center gap-2"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">بازگشت به مقالات</span>
            </Link>
            <span className="text-xs text-gray-500">۱۵۸ نظر</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <FaUserEdit className="text-teal-500" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-teal-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-teal-500" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <FaEye className="text-teal-500" />
              {post.views} بازدید
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1">
            {/* Featured Image */}
            <div className="mb-8 relative rounded-xl overflow-hidden">
              <img
                src="/featured-image.jpg"
                alt={post.title}
                className="w-full h-64 sm:h-96 object-cover"
              />
              {post.videoUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-teal-500 text-white p-4 rounded-full hover:bg-teal-600">
                    <FaVideo className="text-xl" />
                  </button>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div
              className="prose dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs flex items-center gap-2"
                >
                  <FaTags className="text-teal-500" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <FaEdit className="text-white text-lg" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  درباره نویسنده
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                تیم استریمینگ متشکل از متخصصان حوزه استریم ویدیو و تولید محتوای
                آموزشی، با هدف ارتقای کیفیت محتوای فارسی فعالیت می‌کند.
              </p>
            </div>

            {/* Comments Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaComments className="text-teal-500" />
                نظرات کاربران
              </h2>

              {/* Comment Form */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-6">
                <textarea
                  placeholder="نظر خود را بنویسید..."
                  className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border dark:border-gray-600 mb-3"
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">
                    ارسال نظر
                  </button>
                  <span className="text-xs text-gray-500">
                    حداکثر ۵۰۰ کاراکتر
                  </span>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {[1, 2, 3].map((comment) => (
                  <div
                    key={comment}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                      <span className="font-semibold">کاربر مهمان</span>
                      <span className="text-xs text-gray-500">۲ روز پیش</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      مقاله بسیار مفیدی بود، ممنون از زحمات تیم استریمینگ
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 xl:w-80 space-y-8">
            {/* Share Options */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaShare className="text-teal-500" />
                اشتراک گذاری
              </h3>
              <div className="flex flex-wrap gap-2">
                {["توییتر", "لینکدین", "واتساپ", "تلگرام"].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg text-xs flex items-center gap-2"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaRegNewspaper className="text-teal-500" />
                مطالب مرتبط
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow transition-shadow"
                  >
                    <span className="text-xs text-teal-500">
                      {post.category}
                    </span>
                    <h4 className="text-gray-900 dark:text-white">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaEnvelope className="text-teal-500" />
                خبرنامه تخصصی
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="w-full p-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">
                  عضویت رایگان
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center py-8 border-t dark:border-gray-700">
          <Link
            href="/blog/prev-post"
            className="text-teal-500 hover:text-teal-600 flex items-center gap-2"
          >
            <FaArrowLeft />
            مطلب قبلی
          </Link>
          <Link
            href="/blog/next-post"
            className="text-teal-500 hover:text-teal-600 flex items-center gap-2"
          >
            مطلب بعدی
            <FaArrowLeft className="rotate-180" />
          </Link>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="max-w-screen-container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button className="text-gray-600 dark:text-gray-300 p-2">
              <FaComments className="text-sm" />
            </button>
            <button className="text-gray-600 dark:text-gray-300 p-2">
              <FaShare className="text-sm" />
            </button>
            <button className="bg-teal-500 text-white p-2 rounded-lg">
              <FaVideo className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
