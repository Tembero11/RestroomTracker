/*
  Warnings:

  - Added the required column `authorId` to the `restrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restrooms` ADD COLUMN `authorId` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `restrooms` ADD CONSTRAINT `restrooms_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
