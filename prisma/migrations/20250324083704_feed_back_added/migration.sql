-- CreateTable
CREATE TABLE "FeedBack" (
    "Id" TEXT NOT NULL,
    "LinkdinId" TEXT NOT NULL,
    "FeedBack" TEXT NOT NULL,
    "Score" INTEGER NOT NULL,
    "AddedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedBack_LinkdinId_key" ON "FeedBack"("LinkdinId");

-- CreateIndex
CREATE INDEX "FeedBack_AddedAt_idx" ON "FeedBack"("AddedAt");
