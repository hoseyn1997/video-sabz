/*
  Warnings:

  - You are about to drop the `UserCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[IntId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ShortId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IntId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ShortId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ShortId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectionPhoto" DROP CONSTRAINT "CollectionPhoto_CollectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPhoto" DROP CONSTRAINT "CollectionPhoto_PhotoId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollection" DROP CONSTRAINT "UserCollection_CollectionId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollection" DROP CONSTRAINT "UserCollection_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UserPhoto" DROP CONSTRAINT "UserPhoto_PhotoId_fkey";

-- DropForeignKey
ALTER TABLE "UserPhoto" DROP CONSTRAINT "UserPhoto_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_CollectionId_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToUser" DROP CONSTRAINT "_CollectionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToUser" DROP CONSTRAINT "_CollectionToUser_B_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "IntId" SERIAL NOT NULL,
ADD COLUMN     "ShortId" CHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "IntId" SERIAL NOT NULL,
ADD COLUMN     "ShortId" CHAR(7) NOT NULL;

-- DropTable
DROP TABLE "UserCollection";

-- DropTable
DROP TABLE "_CollectionToUser";

-- CreateTable
CREATE TABLE "CollectionAttendee" (
    "Id" TEXT NOT NULL,
    "IsHost" BOOLEAN NOT NULL,
    "IsAllowed" BOOLEAN NOT NULL,
    "UserId" TEXT NOT NULL,
    "CollectionId" TEXT NOT NULL,
    "AttendanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionAttendee_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE INDEX "CollectionAttendee_AttendanceDate_idx" ON "CollectionAttendee"("AttendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionAttendee_UserId_CollectionId_key" ON "CollectionAttendee"("UserId", "CollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_IntId_key" ON "Collection"("IntId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_ShortId_key" ON "Collection"("ShortId");

-- CreateIndex
CREATE INDEX "Collection_Cost_DisCount_idx" ON "Collection"("Cost", "DisCount");

-- CreateIndex
CREATE INDEX "Collection_Title_Description_idx" ON "Collection"("Title", "Description");

-- CreateIndex
CREATE UNIQUE INDEX "Video_IntId_key" ON "Video"("IntId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_ShortId_key" ON "Video"("ShortId");

-- CreateIndex
CREATE INDEX "Video_CollectionId_Order_idx" ON "Video"("CollectionId", "Order");

-- AddForeignKey
ALTER TABLE "CollectionPhoto" ADD CONSTRAINT "CollectionPhoto_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPhoto" ADD CONSTRAINT "CollectionPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionAttendee" ADD CONSTRAINT "CollectionAttendee_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionAttendee" ADD CONSTRAINT "CollectionAttendee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
