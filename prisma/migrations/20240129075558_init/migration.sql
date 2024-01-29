/*
  Warnings:

  - Added the required column `password` to the `Signup_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Signup_verification` ADD COLUMN `password` VARCHAR(255) NOT NULL;
