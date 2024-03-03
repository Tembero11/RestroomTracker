-- CreateTable
CREATE TABLE `restroom_locations` (
    `id` INTEGER NOT NULL,
    `lat` DECIMAL(6, 3) NOT NULL,
    `lon` DECIMAL(6, 3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restrooms` (
    `id` INTEGER NOT NULL,
    `fee` DECIMAL(65, 30) NULL,
    `sex` ENUM('WOMEN', 'MEN', 'BOTH') NULL,
    `accessible` BOOLEAN NULL,
    `code` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
