/*
  Warnings:

  - You are about to alter the column `biaya` on the `realisasi_tambat` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - A unique constraint covering the columns `[ref_number]` on the table `coarri_services` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ref_number]` on the table `codeco_services` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "realisasi_tambat" ADD COLUMN     "nomor_pkk_tugboat" TEXT,
ALTER COLUMN "biaya" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "coarri_services_ref_number_key" ON "coarri_services"("ref_number");

-- CreateIndex
CREATE UNIQUE INDEX "codeco_services_ref_number_key" ON "codeco_services"("ref_number");
