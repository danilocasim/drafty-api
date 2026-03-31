import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';
import { env } from '../../config/env.js';

const connectionString = env.databaseUrl;

if (!connectionString) {
  throw new Error(
    `Database connection string is missing for NODE_ENV="${process.env.NODE_ENV}"`,
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
