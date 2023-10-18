/*
  Warnings:

  - You are about to drop the column `userAtId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_userAtId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userAtId";
