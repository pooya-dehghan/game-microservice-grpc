/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "status" SET DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "Score_userId_gameId_key" ON "Score"("userId", "gameId");
