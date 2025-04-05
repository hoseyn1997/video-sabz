import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaComments,
  FaEye,
  FaFilter,
  FaRegNewspaper,
  FaSearch,
  FaTags,
  FaUserEdit,
  FaVideo,
} from "react-icons/fa";

// Mock data - Replace with actual content
const blogs = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `راهنمای پیشرفته استریم ${2023 + i}`,
  excerpt:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  category: i % 2 === 0 ? "تکنولوژی" : "آموزشی",
  tags: ["استریم زنده", "آموزش", "تکنولوژی"],
  date: "۱۴۰۲/۰۵/۲۵",
  readTime: `${8 + i} دقیقه`,
  views: 2450 + i * 123,
  comments: 12 + i,
  author: "تیم استریمینگ",
}));

const Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 rtl">
      {/* Advanced Header */}
      <header className="border-b dark:border-gray-700">
        <div className="max-w-screen-container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <FaRegNewspaper className="text-teal-500" />
              <span className="text-gray-900 dark:text-white">مقالات تخصصی</span>
            </h1>
            
            <div className="w-full sm:w-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="جستجو مقالات..."
                  className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700 text-sm"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
              </div>
              
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg sm:hidden">
                <FaFilter className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <main className="max-w-screen-container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 xl:w-80 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <FaTags className="text-teal-500" />
                دسته‌بندی‌ها
              </h3>
              <ul className="space-y-2">
                {['همه', 'آموزشی', 'تکنولوژی', 'نقد و بررسی', 'اخبار'].map((cat) => (
                  <li key={cat}>
                    <button className="w-full text-right px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-between text-sm">
                      {cat}
                      <span className="text-gray-500 text-xs">{(Math.random()*100).toFixed(0)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <FaVideo className="text-teal-500" />
                محتوای ویدیویی
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                ما بستر استریم ویدیو هستیم، اما مقالات آموزشی مرتبط با تولید محتوا را ارجح می‌دانیم
              </p>
              <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 flex items-center justify-center gap-2 text-sm">
                <FaBookOpen className="text-sm" />
                مشاهده آموزش‌ها
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            <div className="bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl p-6 text-white mb-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <FaVideo className="w-4 h-4" />
                  <span>مقاله ویژه هفته</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-3">
                  ۱۰ نکته طلایی برای استریم‌های آموزشی تاثیرگذار
                </h2>
                <p className="text-xs opacity-90 mb-4">
                  چگونه محتوای آموزشی تولید کنیم که هم مخاطب جذب کند و هم در بستر استریم ویدیو عملکرد خوبی داشته باشد
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <FaUserEdit />
                    تیم استریمینگ
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />
                    ۱۴۰۲/۰۵/۲۵
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock />
                    ۱۵ دقیقه
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="border dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-teal-500 flex items-center gap-1">
                        <FaVideo className="w-3 h-3 sm:w-4 sm:h-4" />
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500">{blog.date}</span>
                    </div>
                    
                    <h3 className="font-semibold text-sm sm:text-base mb-2 text-gray-900 dark:text-white">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-500 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                          {blog.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComments className="w-3 h-3 sm:w-4 sm:h-4" />
                          {blog.comments}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t dark:border-gray-700 p-3 sm:p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {blog.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                    page === 1 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="max-w-md mx-auto text-center">
                <h3 className="font-semibold mb-3 flex items-center justify-center gap-2 text-sm">
                  <FaRegNewspaper className="text-teal-500" />
                  عضویت در خبرنامه تخصصی
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                  دریافت آخرین مقالات و آموزش‌های مرتبط با استریم ویدیو و تولید محتوا
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 text-sm"
                  />
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm">
                    ثبت نام
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="max-w-screen-container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button className="text-gray-600 dark:text-gray-300 p-2">
              <FaFilter className="text-lg" />
            </button>
            <button className="text-gray-600 dark:text-gray-300 p-2">
              <FaSearch className="text-lg" />
            </button>
            <button className="bg-teal-500 text-white p-2 rounded-lg">
              <FaVideo className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
