/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bookmark` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`work_id`, `user_id`);

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `password` VARCHAR(255) NULL;
