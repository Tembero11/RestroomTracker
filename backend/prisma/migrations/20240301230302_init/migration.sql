-- AddForeignKey
ALTER TABLE `restrooms` ADD CONSTRAINT `restrooms_id_fkey` FOREIGN KEY (`id`) REFERENCES `restroom_locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
