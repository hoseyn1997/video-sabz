// import { PrismaClient, User } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   // Check if the Admin user already exists
//   const existingAdmin = await prisma.user.findUnique({
//     where: { Email: "admin@prisma.io" },
//   });

//   if (!existingAdmin) {
//     await prisma.user.upsert({
//       where: { Email: "admin@prisma.io" },
//       update: {},
//       create: {
//         UserName: "admin",
//         Bio: "admin",
//         Password:
//           "$2b$10$3z84xUwypZAnZXt5WwZfN.Dvj0HPk.YDDl5.JW/FrTT.sEgP9rj3q",
//         Email: "admin@prisma.io",
//         EmailConfirmed: true,
//         PhoneNumber: "09145651334",
//         PhoneNumberConfirmed: true,
//         Role: "Admin",
//       },
//     });
//   }

//   const existingUser = await prisma.user.findUnique({
//     where: { PhoneNumber: "09397080885" },
//   });

//   if (existingUser) return;

//   const existingTeacher = await prisma.teacher.findUnique({
//     where: { ContactPhone: "09141252212" },
//   });

//   if (existingTeacher) return;
//   const newTeacher = {
//     ContactPhone: "09141252212",
//     FullName: "حسن عباسی",
//     FName: "حسن",
//     LName: "عباسی",
//     Bio: "ویژگی‌های اضافی: Tailwind بعنوان فریمورکی به حساب می‌آید که در بخش فرانت-اند وبسایت‌ها اجرا می‌شود. به همین دلیل توسعه‌دهندگان باید انتظارات حداکثری از این فریمورک داشته باشند. Tailwind نیز این انتظارات را به جای خواهد آورد چرا که توسعه‌دهندگان این فریمورک با دیگر فریمورک‌های قبل از خود کار کرده",
//     ContactEmail: "hasan122@gmail.com",
//     IsActive: true,
//   };

//   const createdCollection = await prisma.collection.create({
//     data: {
//       Title: "آموزش TailwindCss به زبان ساده",
//       Description:
//         "تمام المان‌ها و استایل‌های مربوط به Tailwind بصورت رسپانسیو شده به شما ارائه می‌شود به همین دلیل این فریمورک از میزان رسپانسیو و Mobile-First بودن بالایی برخوردار است. از نظر امنیت نیز باید بگویم که Tailwind نسبت به رقبا در زمان اجرا، از مشکلات کمتری برخوردار بوده و استایل‌های عجیب و غریب اعمال نخواهد شد.",
//       Cost: "350000",
//       DisCount: "51000",
//       Teacher: { create: newTeacher },
//       Category: "",
//       IsActive: true,
//       ShortId: "bjLnGoi",
//       Videos: {
//         create: [
//           {
//             Title: "کلیات دوره",
//             ShortId: "hwAXSuw",
//             Description:
//               " ویژگی‌های اضافی:  Tailwind بعنوان فریمورکی به حساب می‌آید که در بخش فرانت-اند وبسایت‌ها اجرا می‌شود. به همین دلیل توسعه‌دهندگان باید انتظارات حداکثری از این فریمورک داشته باشند. Tailwind نیز این انتظارات را به جای خواهد آورد چرا که توسعه‌دهندگان این فریمورک با دیگر فریمورک‌های قبل از خود کار کرده و می‌دانند که چه مشکلاتی را برای توسعه‌دهندگان ایجاد می‌کردند و حال آن‌ها را رفع نموده‌اند. شما در Tailwind می‌توانید با استفاده از PurgeCSS کلاس‌هایی که در پروژه خود مورد استفاده قرار نداده‌اید را به سادگی حذف کرده و بار وبسایت‌تان را کم دهید.",
//             FilePath: "2TSN0YETAE.mp4",
//             Order: 1,
//           },
//           {
//             Title: "نصب و راه اندازی نرم افزار",
//             ShortId: "WvuNGFe",
//             Description:
//               " ویژگی‌های اضافی:  Tailwind بعنوان فریمورکی به حساب می‌آید که در بخش فرانت-اند وبسایت‌ها اجرا می‌شود. به همین دلیل توسعه‌دهندگان باید انتظارات حداکثری از این فریمورک داشته باشند. Tailwind نیز این انتظارات را به جای خواهد آورد چرا که توسعه‌دهندگان این فریمورک با دیگر فریمورک‌های قبل از خود کار کرده و می‌دانند که چه مشکلاتی را برای توسعه‌دهندگان ایجاد می‌کردند و حال آن‌ها را رفع نموده‌اند. شما در Tailwind می‌توانید با استفاده از PurgeCSS کلاس‌هایی که در پروژه خود مورد استفاده قرار نداده‌اید را به سادگی حذف کرده و بار وبسایت‌تان را کم دهید.",
//             FilePath: "BJMWBCIPL6.mp4",
//             Order: 2,
//           },
//           {
//             Title: "مینی پروژه ی لندینگ اینستاگرام",
//             ShortId: "Qifoiwv",
//             Description:
//               " ویژگی‌های اضافی:  Tailwind بعنوان فریمورکی به حساب می‌آید که در بخش فرانت-اند وبسایت‌ها اجرا می‌شود. به همین دلیل توسعه‌دهندگان باید انتظارات حداکثری از این فریمورک داشته باشند. Tailwind نیز این انتظارات را به جای خواهد آورد چرا که توسعه‌دهندگان این فریمورک با دیگر فریمورک‌های قبل از خود کار کرده و می‌دانند که چه مشکلاتی را برای توسعه‌دهندگان ایجاد می‌کردند و حال آن‌ها را رفع نموده‌اند. شما در Tailwind می‌توانید با استفاده از PurgeCSS کلاس‌هایی که در پروژه خود مورد استفاده قرار نداده‌اید را به سادگی حذف کرده و بار وبسایت‌تان را کم دهید.",
//             FilePath: "KAT9HRERHK.mp4",
//             Order: 3,
//           },
//           {
//             Title: "مینی پروژه دارک مورد و سایت دوزبانه",
//             ShortId: "mKw1zJQ",
//             Description:
//               " ویژگی‌های اضافی:  Tailwind بعنوان فریمورکی به حساب می‌آید که در بخش فرانت-اند وبسایت‌ها اجرا می‌شود. به همین دلیل توسعه‌دهندگان باید انتظارات حداکثری از این فریمورک داشته باشند. Tailwind نیز این انتظارات را به جای خواهد آورد چرا که توسعه‌دهندگان این فریمورک با دیگر فریمورک‌های قبل از خود کار کرده و می‌دانند که چه مشکلاتی را برای توسعه‌دهندگان ایجاد می‌کردند و حال آن‌ها را رفع نموده‌اند. شما در Tailwind می‌توانید با استفاده از PurgeCSS کلاس‌هایی که در پروژه خود مورد استفاده قرار نداده‌اید را به سادگی حذف کرده و بار وبسایت‌تان را کم دهید.",
//             FilePath: "YVN1UOY5TT.mp4",
//             Order: 4,
//           },
//         ],
//       },
//     },
//   });

//   const Hassan: User = await prisma.user.create({
//     data: {
//       UserName: "shayan123456798",
//       Password: "$2b$10$3z84xUwypZAnZXt5WwZfN.Dvj0HPk.YDDl5.JW/FrTT.sEgP9rj3q",
//       PhoneNumber: "09397080885",
//       PhoneNumberConfirmed: true,
//       Photo: {
//         create: {
//           Photo: {
//             create: {
//               FilePath: "/assets/CXHZOVD2CGX.jpg",
//             },
//           },
//         },
//       },
//       Collections: {
//         create: [
//           {
//             IsAllowed: true,
//             IsHost: true,
//             CollectionId: createdCollection.Id,
//           },
//         ],
//       },
//     },
//   });

//   console.log("Seeded Users Are:/n", { Hassan }, "seeded teachers are: ", {
//     newTeacher,
//   });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
