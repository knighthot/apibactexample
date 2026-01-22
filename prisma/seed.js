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

