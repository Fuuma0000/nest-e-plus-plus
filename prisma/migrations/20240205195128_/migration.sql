/*
  Warnings:

  - Made the column `is_job_hunt_completed` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `show_profile_in_public_event` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `show_profile_in_shared_url` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `is_job_hunt_completed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `show_profile_in_public_event` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `show_profile_in_shared_url` BOOLEAN NOT NULL DEFAULT false;
