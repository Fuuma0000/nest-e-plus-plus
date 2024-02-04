/*
  Warnings:

  - The primary key for the `Work_share_url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access_token` on the `Work_share_url` table. All the data in the column will be lost.
  - You are about to drop the column `public_path` on the `Work_share_url` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Work_share_url` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(36)`.
  - A unique constraint covering the columns `[token]` on the table `Work_share_url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Work_share_url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Work_share_url_access_token_key` ON `Work_share_url`;

-- DropIndex
DROP INDEX `Work_share_url_public_path_key` ON `Work_share_url`;

-- AlterTable
ALTER TABLE `Work_share_url` DROP PRIMARY KEY,
    DROP COLUMN `access_token`,
    DROP COLUMN `public_path`,
    ADD COLUMN `token` VARCHAR(36) NOT NULL,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Work_share_url_token_key` ON `Work_share_url`(`token`);
