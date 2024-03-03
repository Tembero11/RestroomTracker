/*
  Warnings:

  - The primary key for the `restroom_locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restrooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `sex` on table `restrooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `restroom_locations` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `restrooms` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL,
    MODIFY `sex` ENUM('WOMEN', 'MEN', 'BOTH') NOT NULL,
    ADD PRIMARY KEY (`id`);
