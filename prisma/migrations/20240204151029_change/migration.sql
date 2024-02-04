/*
  Warnings:

  - You are about to drop the `Event_user_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Event_user_role` DROP FOREIGN KEY `Event_user_role_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event_user_role` DROP FOREIGN KEY `Event_user_role_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event_user_role` DROP FOREIGN KEY `Event_user_role_user_id_fkey`;

-- DropTable
DROP TABLE `Event_user_role`;

-- DropTable
DROP TABLE `Role`;

-- CreateTable
CREATE TABLE `Authority` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event_user_authority` (
    `event_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `authority_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Event_user_authority_event_id_idx`(`event_id`),
    INDEX `Event_user_authority_authority_id_idx`(`authority_id`),
    INDEX `Event_user_authority_user_id_idx`(`user_id`),
    PRIMARY KEY (`event_id`, `user_id`, `authority_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event_user_authority` ADD CONSTRAINT `Event_user_authority_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_user_authority` ADD CONSTRAINT `Event_user_authority_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_user_authority` ADD CONSTRAINT `Event_user_authority_authority_id_fkey` FOREIGN KEY (`authority_id`) REFERENCES `Authority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
