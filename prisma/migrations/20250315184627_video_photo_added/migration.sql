-- CreateTable
CREATE TABLE "VideoPhoto" (
    "Id" TEXT NOT NULL,
    "PhotoId" TEXT NOT NULL,
    "VideoId" TEXT NOT NULL,

    CONSTRAINT "VideoPhoto_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoPhoto_VideoId_key" ON "VideoPhoto"("VideoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoPhoto_PhotoId_VideoId_key" ON "VideoPhoto"("PhotoId", "VideoId");

-- AddForeignKey
ALTER TABLE "VideoPhoto" ADD CONSTRAINT "VideoPhoto_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoPhoto" ADD CONSTRAINT "VideoPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
