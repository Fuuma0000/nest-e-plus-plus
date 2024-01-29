-- CreateTable
CREATE TABLE `Bookmark` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `work_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Bookmark_user_id_idx`(`user_id`),
    INDEX `Bookmark_work_id_idx`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `start_at` DATETIME(0) NULL,
    `end_at` DATETIME(0) NULL,
    `icon_url` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technology` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(255) NOT NULL,
    `username` VARCHAR(50) NULL,
    `courses_id` INTEGER UNSIGNED NULL,
    `enrollment_year` INTEGER NULL,
    `graduation_year` INTEGER NULL,
    `is_job_hunt_completed` BOOLEAN NULL DEFAULT false,
    `self_introduction` TEXT NULL,
    `icon_url` VARCHAR(255) NULL,
    `is_public_profile` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `User_courses_id_idx`(`courses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_job` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `job_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `User_job_job_id_idx`(`job_id`),
    INDEX `User_job_user_id_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_url` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `url_name` VARCHAR(30) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `User_url_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_event_id_idx`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `work_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `catch_copy` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `works_url` VARCHAR(255) NULL,
    `movie_url` VARCHAR(255) NULL,
    `system_diagram_url` VARCHAR(255) NULL,
    `detail` TEXT NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_work_id_idx`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data_genre` (
    `work_data_id` INTEGER UNSIGNED NOT NULL,
    `genre_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_genre_genre_id_idx`(`genre_id`),
    INDEX `Work_data_genre_work_data_id_idx`(`work_data_id`),
    PRIMARY KEY (`work_data_id`, `genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data_technology` (
    `work_data_id` INTEGER UNSIGNED NOT NULL,
    `technology_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_technology_technology_id_idx`(`technology_id`),
    INDEX `Work_data_technology_work_data_id_idx`(`work_data_id`),
    PRIMARY KEY (`work_data_id`, `technology_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data_user` (
    `work_data_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `role_explanation` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_user_user_id_idx`(`user_id`),
    INDEX `Work_data_user_work_data_id_idx`(`work_data_id`),
    PRIMARY KEY (`work_data_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tool` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event_user_role` (
    `event_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `role_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Event_user_role_event_id_idx`(`event_id`),
    INDEX `Event_user_role_role_id_idx`(`role_id`),
    INDEX `Event_user_role_user_id_idx`(`user_id`),
    PRIMARY KEY (`event_id`, `user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data_image` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `work_data_id` INTEGER UNSIGNED NOT NULL,
    `url` VARCHAR(255) NULL,
    `order` TINYINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_image_work_data_id_idx`(`work_data_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_data_tool` (
    `work_data_id` INTEGER UNSIGNED NOT NULL,
    `tool_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Work_data_tool_tool_id_idx`(`tool_id`),
    INDEX `Work_data_tool_work_data_id_idx`(`work_data_id`),
    PRIMARY KEY (`work_data_id`, `tool_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Signup_verification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expired_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_courses_id_fkey` FOREIGN KEY (`courses_id`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_job` ADD CONSTRAINT `User_job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_job` ADD CONSTRAINT `User_job_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_url` ADD CONSTRAINT `User_url_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data` ADD CONSTRAINT `Work_data_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_genre` ADD CONSTRAINT `Work_data_genre_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_genre` ADD CONSTRAINT `Work_data_genre_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_technology` ADD CONSTRAINT `Work_data_technology_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_technology` ADD CONSTRAINT `Work_data_technology_technology_id_fkey` FOREIGN KEY (`technology_id`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_user` ADD CONSTRAINT `Work_data_user_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_user` ADD CONSTRAINT `Work_data_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_user_role` ADD CONSTRAINT `Event_user_role_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_user_role` ADD CONSTRAINT `Event_user_role_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_user_role` ADD CONSTRAINT `Event_user_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_image` ADD CONSTRAINT `Work_data_image_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_tool` ADD CONSTRAINT `Work_data_tool_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work_data_tool` ADD CONSTRAINT `Work_data_tool_tool_id_fkey` FOREIGN KEY (`tool_id`) REFERENCES `Tool`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
