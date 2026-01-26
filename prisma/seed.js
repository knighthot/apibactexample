require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // Seed PKK Service
  console.log('📦 Seeding PKK Service...');
  
  const pkkData = [
    {
      nomor_pkk: 'PKK202601140001',
      nama_kapal: 'MV OCEAN BREEZE',
      call_sign: 'YBCD2',
      tanda_pendaftaran_kapal: '2024-LL-No.1234/1',
      tanggal_eta: new Date('2026-01-20T08:00:00Z'),
      tanggal_etd: new Date('2026-01-22T17:00:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140002',
      nama_kapal: 'MV PACIFIC STAR',
      call_sign: 'XABC1',
      tanda_pendaftaran_kapal: '2024-LL-No.1235/2',
      tanggal_eta: new Date('2026-01-21T10:30:00Z'),
      tanggal_etd: new Date('2026-01-23T15:00:00Z'),
      jenis_trayek: 'Tramper',
    },
    {
      nomor_pkk: 'PKK202601140003',
      nama_kapal: 'MV ASIAN GLORY',
      call_sign: 'ZDEF3',
      tanda_pendaftaran_kapal: '2024-LL-No.1236/3',
      tanggal_eta: new Date('2026-01-22T06:00:00Z'),
      tanggal_etd: new Date('2026-01-24T12:00:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140004',
      nama_kapal: 'MV MARITIME QUEEN',
      call_sign: 'QRST4',
      tanda_pendaftaran_kapal: '2024-LL-No.1237/4',
      tanggal_eta: new Date('2026-01-23T14:00:00Z'),
      tanggal_etd: new Date('2026-01-25T18:00:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140005',
      nama_kapal: 'MV BLUE HORIZON',
      call_sign: 'UVWX5',
      tanda_pendaftaran_kapal: '2024-LL-No.1238/5',
      tanggal_eta: new Date('2026-01-24T09:00:00Z'),
      tanggal_etd: new Date('2026-01-26T16:00:00Z'),
      jenis_trayek: 'Tramper',
    },
    {
      nomor_pkk: 'PKK202601140006',
      nama_kapal: 'MV GOLDEN WAVE',
      call_sign: 'MNOP6',
      tanda_pendaftaran_kapal: '2024-LL-No.1239/6',
      tanggal_eta: new Date('2026-01-25T11:30:00Z'),
      tanggal_etd: new Date('2026-01-27T14:30:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140007',
      nama_kapal: 'MV SILVER DOLPHIN',
      call_sign: 'GHIJ7',
      tanda_pendaftaran_kapal: '2024-LL-No.1240/7',
      tanggal_eta: new Date('2026-01-26T07:00:00Z'),
      tanggal_etd: new Date('2026-01-28T10:00:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140008',
      nama_kapal: 'MV EMERALD SEAS',
      call_sign: 'KLMN8',
      tanda_pendaftaran_kapal: '2024-LL-No.1241/8',
      tanggal_eta: new Date('2026-01-27T13:00:00Z'),
      tanggal_etd: new Date('2026-01-29T19:00:00Z'),
      jenis_trayek: 'Tramper',
    },
    {
      nomor_pkk: 'PKK202601140009',
      nama_kapal: 'MV RUBY NAVIGATOR',
      call_sign: 'PQRS9',
      tanda_pendaftaran_kapal: '2024-LL-No.1242/9',
      tanggal_eta: new Date('2026-01-28T08:30:00Z'),
      tanggal_etd: new Date('2026-01-30T11:30:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140010',
      nama_kapal: 'MV DIAMOND VOYAGER',
      call_sign: 'TUVW0',
      tanda_pendaftaran_kapal: '2024-LL-No.1243/10',
      tanggal_eta: new Date('2026-01-29T15:00:00Z'),
      tanggal_etd: new Date('2026-01-31T20:00:00Z'),
      jenis_trayek: 'Liner',
    },
    {
      nomor_pkk: 'PKK202601140011',
      nama_kapal: 'MV SAPPHIRE TRADER',
      call_sign: 'ABCD1',
      tanda_pendaftaran_kapal: '2024-LL-No.1244/11',
      tanggal_eta: new Date('2026-01-30T10:00:00Z'),
      tanggal_etd: new Date('2026-02-01T13:00:00Z'),
      jenis_trayek: 'Tramper',
    },
    {
      nomor_pkk: 'PKK202601140012',
      nama_kapal: 'MV CORAL PRINCESS',
      call_sign: 'EFGH2',
      tanda_pendaftaran_kapal: '2024-LL-No.1245/12',
      tanggal_eta: new Date('2026-01-31T12:00:00Z'),
      tanggal_etd: new Date('2026-02-02T16:00:00Z'),
      jenis_trayek: 'Liner',
    },
  ];

  for (const pkk of pkkData) {
    await prisma.pkkService.upsert({
      where: { nomor_pkk: pkk.nomor_pkk },
      update: {},
      create: pkk,
    });
  }

  console.log(`✅ Created ${pkkData.length} PKK Service records`);

  // Seed Transportation Service
  console.log('🚛 Seeding Transportation Service...');

  const transportationData = [
    {
      no_kendaraan: 'BP 1234 XX',
      nama_perusahaan: 'PT Batam Terminal Petikemas',
      nama_perorangan: 'Fikramul Bizli',
      available: 'Available',
      masa_expired: new Date('2026-12-31'),
    },
    {
      no_kendaraan: 'BP 5678 YY',
      nama_perusahaan: 'PT Pelindo Terminal Petikemas',
      nama_perorangan: 'Ahmad Suryanto',
      available: 'Available',
      masa_expired: new Date('2026-11-30'),
    },
    {
      no_kendaraan: 'BP 9012 ZZ',
      nama_perusahaan: 'PT Jaya Logistik Indonesia',
      nama_perorangan: 'Budi Santoso',
      available: 'Available',
      masa_expired: new Date('2026-10-15'),
    },
    {
      no_kendaraan: 'BP 3456 AA',
      nama_perusahaan: 'PT Maju Bersama Transport',
      nama_perorangan: 'Siti Nurhaliza',
      available: 'Not Available',
      masa_expired: new Date('2026-09-20'),
    },
    {
      no_kendaraan: 'BP 7890 BB',
      nama_perusahaan: 'PT Sejahtera Cargo',
      nama_perorangan: 'Dedi Kurniawan',
      available: 'Available',
      masa_expired: new Date('2026-08-25'),
    },
    {
      no_kendaraan: 'BP 2345 CC',
      nama_perusahaan: 'PT Nusantara Logistics',
      nama_perorangan: 'Rina Wati',
      available: 'Available',
      masa_expired: new Date('2027-01-15'),
    },
    {
      no_kendaraan: 'BP 6789 DD',
      nama_perusahaan: 'PT Global Transport Services',
      nama_perorangan: 'Hendra Wijaya',
      available: 'Available',
      masa_expired: new Date('2026-07-10'),
    },
    {
      no_kendaraan: 'BP 0123 EE',
      nama_perusahaan: 'PT Mandiri Trucking',
      nama_perorangan: 'Yudi Prasetyo',
      available: 'Not Available',
      masa_expired: new Date('2026-06-05'),
    },
    {
      no_kendaraan: 'BP 4567 FF',
      nama_perusahaan: 'PT Samudera Logistics',
      nama_perorangan: 'Dewi Lestari',
      available: 'Available',
      masa_expired: new Date('2027-02-28'),
    },
    {
      no_kendaraan: 'BP 8901 GG',
      nama_perusahaan: 'PT Anugrah Transport',
      nama_perorangan: 'Rudi Hartono',
      available: 'Available',
      masa_expired: new Date('2026-05-18'),
    },
    {
      no_kendaraan: 'BP 2468 HH',
      nama_perusahaan: 'PT Berkah Jaya Cargo',
      nama_perorangan: 'Lina Marlina',
      available: 'Available',
      masa_expired: new Date('2027-03-12'),
    },
    {
      no_kendaraan: 'BP 1357 II',
      nama_perusahaan: 'PT Sentosa Logistics',
      nama_perorangan: 'Agus Salim',
      available: 'Not Available',
      masa_expired: new Date('2026-04-22'),
    },
  ];

  for (const trans of transportationData) {
    await prisma.transportationService.create({
      data: trans,
    });
  }

  console.log(`✅ Created ${transportationData.length} Transportation Service records`);

  // Seed SPPB Service
  console.log('📋 Seeding SPPB Service...');

  const sppbData = [
    {
      nomor_sppb: '000006/SPPB/KPU.02/2026',
      tanggal_sppb: new Date('2026-01-22'),
      nomor_kontainer: 'MRKU3764460',
      nomor_bl: 'BL-9988-ABC'
    },
    {
      nomor_sppb: '000007/SPPB/KPU.02/2026',
      tanggal_sppb: new Date('2026-01-23'),
      nomor_kontainer: 'TCLU4567890',
      nomor_bl: 'BL-9989-DEF'
    },
    {
      nomor_sppb: '000008/SPPB/KPU.02/2026',
      tanggal_sppb: new Date('2026-01-23'),
      nomor_kontainer: 'MSCU8901234',
      nomor_bl: 'BL-9990-GHI'
    },
    {
      nomor_sppb: '000009/SPPB/KPU.02/2026',
      tanggal_sppb: new Date('2026-01-24'),
      nomor_kontainer: 'HLBU2345678',
      nomor_bl: 'BL-9991-JKL'
    },
    {
      nomor_sppb: '000010/SPPB/KPU.02/2026',
      tanggal_sppb: new Date('2026-01-24'),
      nomor_kontainer: 'CMAU6789012',
      nomor_bl: 'BL-9992-MNO'
    }
  ];

  for (const sppb of sppbData) {
    await prisma.sppbService.upsert({
      where: { nomor_sppb: sppb.nomor_sppb },
      update: {},
      create: sppb,
    });
  }

  console.log(`✅ Created ${sppbData.length} SPPB Service records`);

  // Seed NPE Service
  console.log('📄 Seeding NPE Service...');

  const npeData = [
    {
      no_npe: 'NPE-BTM-2026-0001',
      tg_npe: new Date('2026-01-22'),
      no_peb: 'PEB-000123',
      no_cont: 'TCNU1234567',
      size: '20',
      nama_kapal: 'MV. OCEAN BREEZE',
      no_voy_flight: 'V.2026.01'
    },
    {
      no_npe: 'NPE-BTM-2026-0002',
      tg_npe: new Date('2026-01-23'),
      no_peb: 'PEB-000124',
      no_cont: 'MSCU8765432',
      size: '40',
      nama_kapal: 'MV. PACIFIC STAR',
      no_voy_flight: 'V.2026.02'
    },
    {
      no_npe: 'NPE-BTM-2026-0003',
      tg_npe: new Date('2026-01-24'),
      no_peb: 'PEB-000125',
      no_cont: 'HLBU9876543',
      size: '40',
      nama_kapal: 'MV. ASIAN GLORY',
      no_voy_flight: 'V.2026.03'
    }
  ];

  for (const npe of npeData) {
    await prisma.npeService.upsert({
      where: { no_npe: npe.no_npe },
      update: {},
      create: npe,
    });
  }

  console.log(`✅ Created ${npeData.length} NPE Service records`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

