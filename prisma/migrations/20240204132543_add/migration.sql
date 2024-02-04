/*
  Warnings:

  - You are about to drop the column `courses_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_public_profile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `works_url` on the `Work_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_courses_id_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `is_requires_password` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `need_proofreading` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `courses_id`,
    DROP COLUMN `is_public_profile`,
    ADD COLUMN `course_id` INTEGER UNSIGNED NULL,
    ADD COLUMN `show_profile_in_public_event` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `show_profile_in_shared_url` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Work_data` DROP COLUMN `works_url`,
    ADD COLUMN `work_url` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Password_reset_verification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expired_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Email_change_verification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expired_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `Email_change_verification_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_share_url` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `work_id` INTEGER UNSIGNED NOT NULL,
    `public_path` VARCHAR(36) NOT NULL,
    `access_token` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Work_share_url_work_id_key`(`work_id`),
    UNIQUE INDEX `Work_share_url_public_path_key`(`public_path`),
    UNIQUE INDEX `Work_share_url_access_token_key`(`access_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_course_id_idx` ON `User`(`course_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Password_reset_verification` ADD CONSTRAINT `Password_reset_verification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Email_change_verification` ADD CONSTRAINT `Email_change_verification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_share_url` ADD CONSTRAINT `Work_share_url_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
