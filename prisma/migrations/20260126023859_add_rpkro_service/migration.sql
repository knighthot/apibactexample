/*
  Warnings:

  - Added the required column `kade_meter_akhir` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kade_meter_awal` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kegiatan_bongkar` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kegiatan_muat` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_ppkb` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_rkbm_bongkar` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_rkbm_muat` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `npkb_nomor` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_mulai_tambat` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_selesai_tambat` to the `rpkro_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rpkro_services" ADD COLUMN     "kade_meter_akhir" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kade_meter_awal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kegiatan_bongkar" TEXT NOT NULL,
ADD COLUMN     "kegiatan_muat" TEXT NOT NULL,
ADD COLUMN     "keterangan" TEXT,
ADD COLUMN     "nomor_gudang" TEXT,
ADD COLUMN     "nomor_ppkb" TEXT NOT NULL,
ADD COLUMN     "nomor_rkbm_bongkar" TEXT NOT NULL,
ADD COLUMN     "nomor_rkbm_muat" TEXT NOT NULL,
ADD COLUMN     "npkb_nomor" TEXT NOT NULL,
ADD COLUMN     "tanggal_mulai_tambat" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_selesai_tambat" TIMESTAMP(3) NOT NULL;
