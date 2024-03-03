/*
  Warnings:

  - You are about to drop the `restroom_locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lat` to the `restrooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `restrooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `restrooms` DROP FOREIGN KEY `restrooms_id_fkey`;

-- AlterTable
ALTER TABLE `restrooms` ADD COLUMN `lat` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `lng` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `restroom_locations`;
