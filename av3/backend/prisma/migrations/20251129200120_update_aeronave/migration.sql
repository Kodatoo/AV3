/*
  Warnings:

  - Added the required column `fabricante` to the `Aeronave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aeronave` ADD COLUMN `fabricante` VARCHAR(191) NOT NULL,
    MODIFY `alcance` INTEGER NULL;
