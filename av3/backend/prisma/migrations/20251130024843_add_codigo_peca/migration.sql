/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Peca` will be added. If there are existing duplicate values, this will fail.
  - The required column `codigo` was added to the `Peca` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `peca` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Peca_codigo_key` ON `Peca`(`codigo`);
