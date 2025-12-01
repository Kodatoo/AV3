/*
  Warnings:

  - You are about to drop the column `prazo` on the `etapa` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `etapa` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(3))`.
  - Added the required column `dataFinal` to the `Etapa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicial` to the `Etapa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsavel` to the `Etapa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `etapa` DROP FOREIGN KEY `Etapa_aeronaveId_fkey`;

-- AlterTable
ALTER TABLE `etapa` DROP COLUMN `prazo`,
    ADD COLUMN `dataFinal` DATETIME(3) NOT NULL,
    ADD COLUMN `dataInicial` DATETIME(3) NOT NULL,
    ADD COLUMN `responsavel` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE') NOT NULL DEFAULT 'PENDENTE',
    MODIFY `aeronaveId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Etapa` ADD CONSTRAINT `Etapa_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
