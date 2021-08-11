import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_TIME_TOKEN = process.env.JWT_EXPIRE_TIME_TOKEN;

export const DATABASE_URL = process.env.DATABASE_URL;
export const DB_DIALECT = process.env.DB_DIALECT;

export const INITIAL_DB_SETUP = process.env.INITIAL_DB_SETUP;

export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
export const BUCKET_NAME = process.env.BUCKET_NAME;
export const CACHE_CONTROL = process.env.CACHE_CONTROL;

export const SWAGGER_URL = process.env.SWAGGER_URL;

export const REGEX_MATCHING_ALL_CHARACTERS = '(.*?)';
