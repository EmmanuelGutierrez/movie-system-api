import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();
const envVars = {
  ENV: process.env.ENV!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  API_KEY: process.env.API_KEY!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
  DATABASE_PORT: process.env.DATABASE_PORT!,
  DATABASE_USER: process.env.DATABASE_USER!,
  DATABASE_PASS: process.env.DATABASE_PASS!,
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION!,

  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: process.env.REDIS_PORT!,
  REDIS_DB: process.env.REDIS_DB!,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
};
export const configInitJoi = () => {
  const envSchema = Joi.object().keys({
    ENV: Joi.string().default('dev'),
    PORT: Joi.number().default(3000),
    API_KEY: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASS: Joi.string().required(),
    DATABASE_CONNECTION: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_DB: Joi.number().required(),
    REDIS_PASSWORD: Joi.string(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  });
  const { error } = envSchema
    .prefs({ errors: { label: 'key' } })
    .validate(envVars);
  if (error) {
    console.error('Env vars error');
    error.details.map((e) => {
      console.error(`-${e.message}`);
    });
    throw new Error('Env variables validation failed');
  }
};

export const config = {
  api: {
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    apiKey: envVars.API_KEY,
    env: envVars.ENV,
  },
  database: {
    dbName: envVars.DATABASE_NAME,
    dbPort: envVars.DATABASE_PORT,
    dbUser: envVars.DATABASE_USER,
    dbPass: envVars.DATABASE_PASS,
    dbHost: envVars.DATABASE_HOST,
    dbConnection: envVars.DATABASE_CONNECTION,
  },
  redis: {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
    db: Number(process.env.REDIS_DB),
  },
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
};
