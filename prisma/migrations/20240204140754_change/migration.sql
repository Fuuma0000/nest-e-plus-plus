/*
  Warnings:

  - You are about to drop the column `course_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_course_id_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `course_id`,
    ADD COLUMN `affiliation_id` INTEGER UNSIGNED NULL;

-- DropTable
DROP TABLE `Course`;

-- CreateTable
CREATE TABLE `Affiliation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_affiliation_id_idx` ON `User`(`affiliation_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_affiliation_id_fkey` FOREIGN KEY (`affiliation_id`) REFERENCES `Affiliation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
