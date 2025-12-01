import { envSchema } from 'src/libs/utils/validations';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = () => ({
  // Server
  SERVER_PORT: parseInt(process.env.SERVER_PORT || '8080', 10),

  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_TLS_ENABLED: process.env.REDIS_TLS_ENABLED === 'true',
  REDIS_SNI: process.env.REDIS_SNI,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // Supabase
  // SUPABASE_URL: process.env.SUPABASE_URL,
  // SUPABASE_KEY: process.env.SUPABASE_KEY,
  // SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME,
  // SUPABASE_IMAGE_PATH: process.env.SUPABASE_IMAGE_PATH,

  // Mail
  // MAILER_HOST: process.env.MAILER_HOST,
  // MAILER_PORT: parseInt(process.env.MAILER_PORT || '465', 10),
  // MAILER_USER: process.env.MAILER_USER,
  // MAILER_PASS: process.env.MAILER_PASS,

  // S3
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_PUBLIC_DIR: process.env.S3_PUBLIC_DIR,
  S3_PUBLIC_PATH_PREFIX: process.env.S3_PUBLIC_PATH_PREFIX,
  S3_DOMAIN: process.env.S3_DOMAIN,
  S3_MAX_IMAGE_SIZE: parseInt(process.env.S3_MAX_IMAGE_SIZE || '5242880', 10), // 5MB default
  S3_MAX_VIDEO_SIZE: parseInt(process.env.S3_MAX_VIDEO_SIZE || '104857600', 10), // 100MB default

  // AI Services
  // OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  // OPENROUTER_PROVIDER_URL: process.env.OPENROUTER_PROVIDER_URL,

  // Bcrypt
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),

  // Logger
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NODE_ENV: process.env.NODE_ENV || 'development',
  USER_ROLE_ID: process.env.USER_ROLE_ID,
});

const validConfig = envSchema.safeParse(configuration());

if (validConfig.error) {
  throw new Error(validConfig.error.message);
}

const { data: configData } = validConfig;
export { configData };

export default configuration;
