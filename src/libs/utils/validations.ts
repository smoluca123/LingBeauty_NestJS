import { z } from 'zod';

export const envSchema = z.object({
  // Server
  SERVER_PORT: z.number().min(1, 'Server port must be a positive integer'),

  // Redis
  REDIS_HOST: z.string().min(1, 'Redis host is required').optional(),
  REDIS_PORT: z
    .number()
    .min(1, 'Redis port must be a positive integer')
    .optional(),
  REDIS_PASSWORD: z.string().min(1, 'Redis password is required').optional(),
  REDIS_USERNAME: z.string().optional(),
  REDIS_TLS_ENABLED: z.boolean().optional(),
  REDIS_SNI: z.string().optional(),

  // JWT
  JWT_SECRET: z.string().min(1, 'JWT secret is required'),
  JWT_EXPIRES_IN: z.string().min(1, 'JWT expiration time is required'),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .min(1, 'JWT refresh token expiration time is required'),

  // Database
  DATABASE_URL: z.string().url('Database URL must be a valid URL'),

  // Supabase
  //   SUPABASE_URL: z.string().url('Supabase URL must be a valid URL'),
  //   SUPABASE_KEY: z.string().min(1, 'Supabase key is required'),
  //   SUPABASE_BUCKET_NAME: z.string().min(1, 'Supabase bucket name is required'),
  //   SUPABASE_IMAGE_PATH: z
  //     .string()
  //     .url('Supabase image path must be a valid URL'),

  // Mail
  //   MAILER_HOST: z.string().min(1, 'Mailer host is required'),
  //   MAILER_PORT: z.number().min(1, 'Mailer port must be a positive integer'),
  //   MAILER_USER: z.string().min(1, 'Mailer username is required'),
  //   MAILER_PASS: z.string().min(1, 'Mailer password is required'),

  // AI Services
  //   OPENROUTER_API_KEY: z.string().min(1, 'OpenRouter API key is required'),
  //   OPENROUTER_PROVIDER_URL: z
  //     .string()
  //     .url('OpenRouter provider URL must be a valid URL'),

  // S3
  S3_REGION: z.string().min(1, 'S3 region is required'),
  S3_ACCESS_KEY_ID: z.string().min(1, 'S3 access key ID is required'),
  S3_SECRET_ACCESS_KEY: z.string().min(1, 'S3 secret access key is required'),
  S3_BUCKET_NAME: z.string().min(1, 'S3 bucket name is required'),
  S3_DOMAIN: z.string().url('S3 domain must be a valid URL'),
  S3_ENDPOINT: z.string().url('S3 endpoint must be a valid URL'),
  S3_PUBLIC_DIR: z.string().min(1, 'S3 public directory is required'),
  S3_PUBLIC_PATH_PREFIX: z.string().min(1, 'S3 public path prefix is required'),
  S3_MAX_IMAGE_SIZE: z.number().min(1, 'S3 max image size must be positive'),
  S3_MAX_VIDEO_SIZE: z.number().min(1, 'S3 max video size must be positive'),

  // Bcrypt
  BCRYPT_SALT_ROUNDS: z.number().optional().default(10),

  // Logger
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .optional()
    .default('info'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),
  USER_ROLE_ID: z.string().min(1, 'User role ID is required'),
});

// Export type để sử dụng cho TypeScript
export type EnvConfig = z.infer<typeof envSchema>;
