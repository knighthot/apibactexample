require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Create Prisma Client instance
const prisma = new PrismaClient({ adapter });

// Graceful shutdown handler
const disconnectPrisma = async () => {
  await prisma.$disconnect();
  await pool.end();
};

module.exports = {
  prisma,
  pool,
  disconnectPrisma
};

