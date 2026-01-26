/*
  Warnings:

  - A unique constraint covering the columns `[ref_number]` on the table `sp2_services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ref_number` to the `sp2_services` table without a default value. This is not possible if the table is not empty.
  - Made the column `pin_gate` on table `sp2_services` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "sp2_services_nomor_sp2_key";

-- AlterTable
ALTER TABLE "sp2_services" ADD COLUMN     "depo_pengembalian" TEXT,
ADD COLUMN     "jenis_pengeluaran" TEXT,
ADD COLUMN     "lokasi_kontainer" TEXT,
ADD COLUMN     "nomor_sppb" TEXT,
ADD COLUMN     "ref_number" TEXT NOT NULL,
ADD COLUMN     "status_admin_pelayaran" TEXT,
ADD COLUMN     "status_segel_bc" TEXT,
ADD COLUMN     "status_storage" TEXT,
ADD COLUMN     "status_uang_jaminan" TEXT,
ALTER COLUMN "nomor_do_pelayaran" DROP NOT NULL,
ALTER COLUMN "nomor_bl" DROP NOT NULL,
ALTER COLUMN "nama_penerima" DROP NOT NULL,
ALTER COLUMN "pin_gate" SET NOT NULL,
ALTER COLUMN "tgl_awal_berlaku" DROP NOT NULL,
ALTER COLUMN "tgl_akhir_berlaku" DROP NOT NULL,
ALTER COLUMN "status_hold" DROP NOT NULL,
ALTER COLUMN "status_hold" DROP DEFAULT,
ALTER COLUMN "status_hold" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sp2_services_ref_number_key" ON "sp2_services"("ref_number");
