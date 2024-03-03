/*
  Warnings:

  - You are about to drop the column `lon` on the `restroom_locations` table. All the data in the column will be lost.
  - Added the required column `lng` to the `restroom_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `restrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restroom_locations` DROP COLUMN `lon`,
    ADD COLUMN `lng` DECIMAL(6, 3) NOT NULL;

-- AlterTable
ALTER TABLE `restrooms` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `code` VARCHAR(191) NULL;
