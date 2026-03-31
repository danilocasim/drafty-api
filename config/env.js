import 'dotenv/config';

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const getJwtSecret = () =>
  process.env.SECRET_KEY || process.env.JWT_ACCESS_SECRET || '';

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DATABASE_URL || '';
  }

  if (process.env.NODE_ENV === 'production') {
    return process.env.PRODUCTION_DATABASE_URL || process.env.DATABASE_URL || '';
  }

  return process.env.DATABASE_URL || process.env.PRODUCTION_DATABASE_URL || '';
};

export const env = {
  port: parseInteger(process.env.PORT, 8000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: getJwtSecret(),
  bcryptSaltRounds: parseInteger(process.env.BCRYPT_SALT_ROUNDS, 10),
  databaseUrl: getDatabaseUrl(),
};
