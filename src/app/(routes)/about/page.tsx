import Link from "next/link";
import React from "react";
import { FaGraduationCap, FaLightbulb, FaUsers, FaVideo } from "react-icons/fa";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 rtl">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="text-center mb-20 space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white drop-shadow-md">
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              درباره ما
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
            پلتفرم آموزشی نسل جدید یادگیری تعاملی
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-teal-100 dark:bg-teal-900 rounded-2xl">
                <FaGraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                رسالت ما
              </h2>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              ما در تلاشیم تا با ایجاد بستری مدرن و کاربرپسند، یادگیری را برای
              فارسی‌زبانان جهان لذت‌بخش و اثرگذار کنیم. تیم ما متشکل از متخصصان
              آموزش دیجیتال، برنامه‌نویسان حرفه‌ای و مربیان باتجربه است که با
              اشتیاق کامل در حال توسعه این پلتفرم هستند.
            </p>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaVideo className="text-teal-600" />
                آمار کلیدی
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-xl font-bold text-teal-600">۵۰۰+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    دوره آموزشی
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-xl font-bold text-teal-600">۱M+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    دانشجو
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-xl font-bold text-teal-600">۹۸٪</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    رضایتمندی
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                <FaUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                تیم ما
              </h2>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              تیم ما ترکیبی منحصر به فرد از کارشناسان حوزه‌های مختلف است:
            </p>

            <div className="space-y-6">
              {[
                "متخصصان آموزش",
                "مهندسین نرم‌افزار",
                "طراحان تجربه کاربری",
                "پشتیبانی فنی",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      idx % 2 === 0
                        ? "bg-teal-100 dark:bg-teal-900"
                        : "bg-purple-100 dark:bg-purple-900"
                    }`}
                  >
                    <FaLightbulb
                      className={`w-5 h-5 ${
                        idx % 2 === 0 ? "text-teal-600" : "text-purple-600"
                      }`}
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 lg:p-8 shadow-2xl mb-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            ارزش‌های اصلی ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "کیفیت محتوا", icon: "📚", color: "bg-teal-100" },
              { title: "تجربه کاربری", icon: "🎨", color: "bg-purple-100" },
              { title: "پشتیبانی ۲۴/۷", icon: "🛠️", color: "bg-teal-100" },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${value.color} dark:bg-gray-700 transition-transform hover:scale-105`}
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-2xl text-sm ltr font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            شروع یادگیری امروز →
          </Link>
        </div>
      </div>
    </div>
  );
}
