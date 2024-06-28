/*
  Warnings:

  - Added the required column `topic` to the `iteraratiivideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `iteraratiivideo` ADD COLUMN `topic` VARCHAR(512) NOT NULL;
