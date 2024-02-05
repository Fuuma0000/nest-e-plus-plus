/*
  Warnings:

  - You are about to drop the column `url_name` on the `User_url` table. All the data in the column will be lost.
  - Added the required column `name` to the `User_url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_url` DROP COLUMN `url_name`,
    ADD COLUMN `name` VARCHAR(30) NOT NULL;
