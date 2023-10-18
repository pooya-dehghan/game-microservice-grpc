-- AlterTable
ALTER TABLE "User" ADD COLUMN     "leaderBoardId" INTEGER;

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_name_key" ON "LeaderBoard"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
