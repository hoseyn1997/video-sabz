import Link from "next/link";
import { FaBookOpen, FaFilm, FaRocket, FaStar, FaVideo } from "react-icons/fa";

const newsItems = [
  {
    id: 1,
    title: "پخش زنده با کیفیت 4K اضافه شد!",
    excerpt:
      "هم اکنون می‌توانید ویدیوهای خود را با کیفیت فوق‌العاده 4K به صورت زنده استریم کنید",
    category: "feature",
    date: "۱۴۰۲/۰۵/۲۰",
    icon: <FaRocket className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "مسابقه محتوای آموزشی",
    excerpt:
      "جوایز ویژه برای بهترین ویدیوهای آموزشی در حوزه‌های برنامه‌نویسی و طراحی",
    category: "education",
    date: "۱۴۰۲/۰۵/۱۸",
    icon: <FaBookOpen className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "سیستم نظرات پیشرفته",
    excerpt: "امکان پاسخ‌دهی به نظرات خاص و علامت‌گذاری نظرات مفید اضافه شد",
    category: "feature",
    date: "۱۴۰۲/۰۵/۱۵",
    icon: <FaStar className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "آموزش ساخت مستندات ویدیویی",
    excerpt: "راهنمای کامل ساخت ویدیوهای آموزشی موثر با استفاده از ابزارهای ما",
    category: "education",
    date: "۱۴۰۲/۰۵/۱۲",
    icon: <FaVideo className="w-6 h-6" />,
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 dark:from-teal-800 dark:to-purple-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            آخرین اخبار و ویژگی‌ها
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            همیشه از آخرین بروزرسانی‌ها و فرصت‌های ایجاد محتوای آموزشی مطلع
            باشید
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {["همه", "ویژگی‌ها", "آموزشی"].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400">
                  {item.icon}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="px-3 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                  {item.category === "feature" ? "ویژگی جدید" : "محتوای آموزشی"}
                </span>
                <Link
                  href="#"
                  className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-2"
                >
                  بیشتر بخوانید
                  <svg
                    className="w-4 h-4 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}

          {/* Skeleton Loading Placeholders */}
          {[5, 6, 7].map((id) => (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="w-3/4 h-6 mb-2 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors"
            >
              {page}
            </button>
          ))}
        </div>

        {/* Educational CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700 rounded-2xl text-center">
          <div className="max-w-2xl mx-auto">
            <FaFilm className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">
              ویدیوی آموزشی منتشر کنید، جایزه بگیرید!
            </h2>
            <p className="text-gray-100 mb-6">
              بهترین محتواهای آموزشی هر ماه جایزه نقدی و امتیازات ویژه دریافت
              می‌کنند
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              راهنمای ساخت محتوا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
