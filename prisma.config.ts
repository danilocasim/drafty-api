import { defineConfig } from 'prisma/config';
import 'dotenv/config';

function getConnectionString(): string {
  const url =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE_URL
      : process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_DATABASE_URL
        : process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      `DATABASE_URL is not set for NODE_ENV="${process.env.NODE_ENV}"`,
    );
  }

  return url;
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: getConnectionString(),
  },
});
