-- CreateTable
CREATE TABLE "pkk_services" (
    "id" SERIAL NOT NULL,
    "nomor_pkk" TEXT NOT NULL,
    "nama_kapal" TEXT NOT NULL,
    "call_sign" TEXT NOT NULL,
    "tanda_pendaftaran_kapal" TEXT NOT NULL,
    "tanggal_eta" TIMESTAMP(3) NOT NULL,
    "tanggal_etd" TIMESTAMP(3) NOT NULL,
    "jenis_trayek" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pkk_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportation_services" (
    "id" SERIAL NOT NULL,
    "no_kendaraan" TEXT NOT NULL,
    "nama_perusahaan" TEXT NOT NULL,
    "nama_perorangan" TEXT NOT NULL,
    "available" TEXT NOT NULL,
    "masa_expired" TIMESTAMP(3) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transportation_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sppb_services" (
    "id" SERIAL NOT NULL,
    "nomor_sppb" TEXT NOT NULL,
    "tanggal_sppb" TIMESTAMP(3) NOT NULL,
    "nomor_kontainer" TEXT NOT NULL,
    "nomor_bl" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sppb_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sp2_services" (
    "id" SERIAL NOT NULL,
    "nomor_sp2" TEXT NOT NULL,
    "nomor_do_pelayaran" TEXT NOT NULL,
    "nomor_kontainer" TEXT NOT NULL,
    "nomor_bl" TEXT NOT NULL,
    "iso_code" TEXT,
    "pemilik_kontainer" TEXT,
    "nama_penerima" TEXT NOT NULL,
    "npwp_penerima" TEXT,
    "perusahaan_trucking" TEXT,
    "stid_truk" TEXT,
    "nopol_truk" TEXT,
    "nama_supir" TEXT,
    "pin_gate" TEXT,
    "tgl_awal_berlaku" TIMESTAMP(3) NOT NULL,
    "tgl_akhir_berlaku" TIMESTAMP(3) NOT NULL,
    "batas_waktu_storage" TIMESTAMP(3),
    "status_hold" BOOLEAN NOT NULL DEFAULT false,
    "status_gate" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sp2_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codeco_services" (
    "id" SERIAL NOT NULL,
    "ref_number" TEXT NOT NULL,
    "id_gatepass" TEXT NOT NULL,
    "transportation_id" TEXT NOT NULL,
    "no_kendaraan" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "kd_transaksi" TEXT NOT NULL,
    "ref_transaksi" TEXT,
    "kd_dok_inout" TEXT,
    "car" TEXT,
    "no_dok_inout" TEXT,
    "tgl_dok_inout" TIMESTAMP(3),
    "no_pengajuan" TEXT,
    "tgl_pengajuan" TIMESTAMP(3),
    "nm_angkut" TEXT,
    "call_sign" TEXT,
    "spj_no" TEXT,
    "spj_date" TIMESTAMP(3),
    "no_voy_flight" TEXT,
    "jml_total" INTEGER,
    "jml_out" INTEGER,
    "gate_in" TIMESTAMP(3),
    "gate_out" TIMESTAMP(3),
    "kd_pelabuhan" TEXT,
    "kd_gudang" TEXT,
    "kd_tps" TEXT,
    "kd_pbm" TEXT,
    "kd_shipping" TEXT,
    "kd_shipping_line" TEXT,
    "kd_status" TEXT,
    "kd_kelompok" TEXT,
    "no_cont" TEXT NOT NULL,
    "uk_cont" TEXT NOT NULL,
    "jns_cont" TEXT NOT NULL,
    "jns_cont_nm" TEXT,
    "fl_cont_kosong" TEXT,
    "fl_cont_kosong_nm" TEXT,
    "no_bl_awb" TEXT NOT NULL,
    "tgl_bl_awb" TIMESTAMP(3),
    "no_bc11" TEXT,
    "tgl_bc11" TIMESTAMP(3),
    "no_pos_bc11" TEXT,
    "no_segel_bc" TEXT,
    "id_consignee" TEXT,
    "consignee" TEXT,
    "bruto" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "ref_id_detil" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "codeco_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coarri_services" (
    "id" SERIAL NOT NULL,
    "ref_number" TEXT NOT NULL,
    "kd_status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "coarri_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realisasi_tambat" (
    "id" SERIAL NOT NULL,
    "nomor_pkk" TEXT NOT NULL,
    "nomor_ppk" TEXT NOT NULL,
    "no_ppkb_tambat" TEXT NOT NULL,
    "tgl_mulai_tambat" TIMESTAMP(3) NOT NULL,
    "tgl_selesai_tambat" TIMESTAMP(3) NOT NULL,
    "dermaga" TEXT NOT NULL,
    "gt" DOUBLE PRECISION NOT NULL,
    "biaya" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "realisasi_tambat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rpkro_services" (
    "id" SERIAL NOT NULL,
    "nomor_rpkro" TEXT NOT NULL,
    "nomor_ppk" TEXT NOT NULL,
    "nomor_layanan" TEXT NOT NULL,
    "kode_dermaga" TEXT NOT NULL,
    "tanggal_rencana" TIMESTAMP(3) NOT NULL,
    "komoditi" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rpkro_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submit_manifests" (
    "id" SERIAL NOT NULL,
    "no_bl_awb" TEXT NOT NULL,
    "tgl_bl_awb" TIMESTAMP(3) NOT NULL,
    "consignee" TEXT NOT NULL,
    "bruto" DOUBLE PRECISION NOT NULL,
    "no_cont" TEXT NOT NULL,
    "uk_cont" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submit_manifests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npe_services" (
    "id" SERIAL NOT NULL,
    "no_npe" TEXT NOT NULL,
    "tg_npe" TIMESTAMP(3) NOT NULL,
    "no_peb" TEXT NOT NULL,
    "no_cont" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "nama_kapal" TEXT NOT NULL,
    "no_voy_flight" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "npe_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pkk_services_nomor_pkk_key" ON "pkk_services"("nomor_pkk");

-- CreateIndex
CREATE UNIQUE INDEX "sppb_services_nomor_sppb_key" ON "sppb_services"("nomor_sppb");

-- CreateIndex
CREATE UNIQUE INDEX "sp2_services_nomor_sp2_key" ON "sp2_services"("nomor_sp2");

-- CreateIndex
CREATE UNIQUE INDEX "rpkro_services_nomor_rpkro_key" ON "rpkro_services"("nomor_rpkro");

-- CreateIndex
CREATE UNIQUE INDEX "npe_services_no_npe_key" ON "npe_services"("no_npe");
