-- CreateTable
CREATE TABLE `iteraratiivideo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titlesandhooks` TEXT NOT NULL,
    `keywords` VARCHAR(512) NOT NULL,
    `slides` TEXT NOT NULL,
    `narrative` TEXT NOT NULL,
    `imageprompts` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `stare` VARCHAR(24) NOT NULL DEFAULT 'activ',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
