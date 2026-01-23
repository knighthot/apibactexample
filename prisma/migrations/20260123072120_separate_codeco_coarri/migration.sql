/*
  Warnings:

  - You are about to drop the column `updated_by` on the `coarri_services` table. All the data in the column will be lost.
  - You are about to drop the column `call_sign` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `consignee` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `fl_cont_kosong_nm` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `jml_out` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `jml_total` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `jns_cont_nm` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `kd_dok_inout` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `kd_kelompok` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `kd_pbm` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `kd_shipping` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `kd_shipping_line` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `nm_angkut` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `no_pengajuan` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `no_pos_bc11` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `no_voy_flight` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `ref_id_detil` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `ref_transaksi` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_bl_awb` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_pengajuan` on the `codeco_services` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `codeco_services` table. All the data in the column will be lost.
  - Added the required column `category` to the `coarri_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jns_cont` to the `coarri_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kd_transaksi` to the `coarri_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_cont` to the `coarri_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uk_cont` to the `coarri_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coarri_services" DROP COLUMN "updated_by",
ADD COLUMN     "bruto" DOUBLE PRECISION,
ADD COLUMN     "call_sign" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fl_cont_kosong" TEXT,
ADD COLUMN     "id_consignee" TEXT,
ADD COLUMN     "jml_out" INTEGER,
ADD COLUMN     "jml_total" INTEGER,
ADD COLUMN     "jns_cont" TEXT NOT NULL,
ADD COLUMN     "kd_gudang" TEXT,
ADD COLUMN     "kd_pbm" TEXT,
ADD COLUMN     "kd_pelabuhan" TEXT,
ADD COLUMN     "kd_tps" TEXT,
ADD COLUMN     "kd_transaksi" TEXT NOT NULL,
ADD COLUMN     "nm_angkut" TEXT,
ADD COLUMN     "no_bc11" TEXT,
ADD COLUMN     "no_bl_awb" TEXT,
ADD COLUMN     "no_cont" TEXT NOT NULL,
ADD COLUMN     "no_dok_inout" TEXT,
ADD COLUMN     "no_segel_bc" TEXT,
ADD COLUMN     "no_voy_flight" TEXT,
ADD COLUMN     "tgl_bc11" TIMESTAMP(3),
ADD COLUMN     "tgl_dok_inout" TIMESTAMP(3),
ADD COLUMN     "uk_cont" TEXT NOT NULL,
ALTER COLUMN "kd_status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "codeco_services" DROP COLUMN "call_sign",
DROP COLUMN "consignee",
DROP COLUMN "fl_cont_kosong_nm",
DROP COLUMN "jml_out",
DROP COLUMN "jml_total",
DROP COLUMN "jns_cont_nm",
DROP COLUMN "kd_dok_inout",
DROP COLUMN "kd_kelompok",
DROP COLUMN "kd_pbm",
DROP COLUMN "kd_shipping",
DROP COLUMN "kd_shipping_line",
DROP COLUMN "nm_angkut",
DROP COLUMN "no_pengajuan",
DROP COLUMN "no_pos_bc11",
DROP COLUMN "no_voy_flight",
DROP COLUMN "ref_id_detil",
DROP COLUMN "ref_transaksi",
DROP COLUMN "tgl_bl_awb",
DROP COLUMN "tgl_pengajuan",
DROP COLUMN "volume",
ALTER COLUMN "no_bl_awb" DROP NOT NULL;
