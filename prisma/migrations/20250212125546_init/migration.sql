-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Bio" TEXT,
    "Password" TEXT NOT NULL,
    "Email" TEXT,
    "EmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "PhoneNumber" TEXT NOT NULL,
    "PhoneNumberConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "Role" TEXT NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Video" (
    "Id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "Order" INTEGER NOT NULL,
    "FilePath" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "CollectionId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "Id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Teacher" TEXT NOT NULL,
    "Cost" TEXT NOT NULL,
    "DisCount" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "Category" TEXT,
    "Level" TEXT,
    "Score" INTEGER,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "Id" TEXT NOT NULL,
    "FilePath" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserPhoto" (
    "Id" TEXT NOT NULL,
    "PhotoId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "UserPhoto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CollectionPhoto" (
    "Id" TEXT NOT NULL,
    "PhotoId" TEXT NOT NULL,
    "CollectionId" TEXT NOT NULL,

    CONSTRAINT "CollectionPhoto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "IsHost" BOOLEAN NOT NULL,
    "IsAllowed" BOOLEAN NOT NULL,
    "UserId" TEXT NOT NULL,
    "CollectionId" TEXT NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("UserId","CollectionId")
);

-- CreateTable
CREATE TABLE "_CollectionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CollectionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_PhoneNumber_key" ON "User"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_UserId_key" ON "UserPhoto"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_PhotoId_UserId_key" ON "UserPhoto"("PhotoId", "UserId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionPhoto_CollectionId_key" ON "CollectionPhoto"("CollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionPhoto_PhotoId_CollectionId_key" ON "CollectionPhoto"("PhotoId", "CollectionId");

-- CreateIndex
CREATE INDEX "_CollectionToUser_B_index" ON "_CollectionToUser"("B");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPhoto" ADD CONSTRAINT "CollectionPhoto_PhotoId_fkey" FOREIGN KEY ("PhotoId") REFERENCES "Photo"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPhoto" ADD CONSTRAINT "CollectionPhoto_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_CollectionId_fkey" FOREIGN KEY ("CollectionId") REFERENCES "Collection"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToUser" ADD CONSTRAINT "_CollectionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToUser" ADD CONSTRAINT "_CollectionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
