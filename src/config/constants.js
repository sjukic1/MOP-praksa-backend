import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_TIME_TOKEN = process.env.JWT_EXPIRE_TIME_TOKEN;

export const DATABASE_URL = process.env.DATABASE_URL;
export const DB_DIALECT = process.env.DB_DIALECT;

export const INITIAL_DB_SETUP = process.env.INITIAL_DB_SETUP;
