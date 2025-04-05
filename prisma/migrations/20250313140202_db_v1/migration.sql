/*
  Warnings:

  - You are about to drop the column `Teacher` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `TeacherId` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlaylistType" AS ENUM ('REGULAR', 'FAVORITE', 'WATCH_LATER');

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "Teacher",
ADD COLUMN     "TeacherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Teacher" (
    "Id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "FName" TEXT NOT NULL,
    "LName" TEXT NOT NULL,
    "Bio" TEXT,
    "ContactEmail" TEXT,
    "ContactPhone" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TeacherPhoto" (
    "Id" TEXT NOT NULL,
    "PhotoId" TEXT NOT NULL,
    "TeacherId" TEXT NOT NULL,

    CONSTRAINT "TeacherPhoto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TeacherFollow" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "TeacherId" TEXT NOT NULL,
    "FollowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherFollow_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "Id" TEXT NOT NULL,
    "Text" TEXT NOT NULL,
    "IsApproved" BOOLEAN NOT NULL DEFAULT false,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "VideoId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "ParentId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CollectionSave" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "CollectionId" TEXT NOT NULL,
    "SavedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionSave_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "VideoSave" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "VideoId" TEXT NOT NULL,
    "SavedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoSave_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "VideoLike" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "VideoId" TEXT NOT NULL,
    "LikedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoLike_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PlaylistItem" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "VideoId" TEXT NOT NULL,
    "Type" "PlaylistType" NOT NULL DEFAULT 'REGULAR',
    "AddedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlaylistItem_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_ContactEmail_key" ON "Teacher"("ContactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_ContactPhone_key" ON "Teacher"("ContactPhone");

-- CreateIndex
CREATE INDEX "Teacher_FullName_idx" ON "Teacher"("FullName");

-- CreateIndex
CREATE INDEX "Teacher_ContactEmail_idx" ON "Teacher"("ContactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPhoto_TeacherId_key" ON "TeacherPhoto"("TeacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPhoto_PhotoId_TeacherId_key" ON "TeacherPhoto"("PhotoId", "TeacherId");

-- CreateIndex
CREATE INDEX "TeacherFollow_UserId_idx" ON "TeacherFollow"("UserId");

-- CreateIndex
CREATE INDEX "TeacherFollow_TeacherId_idx" ON "TeacherFollow"("TeacherId");

-- CreateIndex
CREATE INDEX "TeacherFollow_FollowedAt_idx" ON "TeacherFollow"("FollowedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherFollow_UserId_TeacherId_key" ON "TeacherFollow"("UserId", "TeacherId");

-- CreateIndex
CREATE INDEX "Comment_VideoId_idx" ON "Comment"("VideoId");

-- CreateIndex
CREATE INDEX "Comment_UserId_idx" ON "Comment"("UserId");

-- CreateIndex
CREATE INDEX "Comment_CreatedAt_idx" ON "Comment"("CreatedAt");

-- CreateIndex
CREATE INDEX "Comment_ParentId_idx" ON "Comment"("ParentId");

-- CreateIndex
CREATE INDEX "CollectionSave_UserId_idx" ON "CollectionSave"("UserId");

-- CreateIndex
CREATE INDEX "CollectionSave_CollectionId_idx" ON "CollectionSave"("CollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionSave_UserId_CollectionId_key" ON "CollectionSave"("UserId", "CollectionId");

-- CreateIndex
CREATE INDEX "VideoSave_UserId_idx" ON "VideoSave"("UserId");

-- CreateIndex
CREATE INDEX "VideoSave_VideoId_idx" ON "VideoSave"("VideoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoSave_UserId_VideoId_key" ON "VideoSave"("UserId", "VideoId");

-- CreateIndex
CREATE INDEX "VideoLike_UserId_idx" ON "VideoLike"("UserId");

-- CreateIndex
CREATE INDEX "VideoLike_VideoId_idx" ON "VideoLike"("VideoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoLike_UserId_VideoId_key" ON "VideoLike"("UserId", "VideoId");

-- CreateIndex
CREATE INDEX "PlaylistItem_UserId_Type_idx" ON "PlaylistItem"("UserId", "Type");

-- CreateIndex
CREATE INDEX "PlaylistItem_AddedAt_idx" ON "PlaylistItem"("AddedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistItem_UserId_VideoId_Type_key" ON "PlaylistItem"("UserId", "VideoId", "Type");

-- CreateIndex
CREATE INDEX "Video_CreatedAt_idx" ON "Video"("CreatedAt");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherPhoto" ADD CONSTRAINT "TeacherPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherPhoto" ADD CONSTRAINT "TeacherPhoto_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherFollow" ADD CONSTRAINT "TeacherFollow_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherFollow" ADD CONSTRAINT "TeacherFollow_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Comment"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionSave" ADD CONSTRAINT "CollectionSave_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionSave" ADD CONSTRAINT "CollectionSave_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoSave" ADD CONSTRAINT "VideoSave_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoSave" ADD CONSTRAINT "VideoSave_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLike" ADD CONSTRAINT "VideoLike_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLike" ADD CONSTRAINT "VideoLike_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
