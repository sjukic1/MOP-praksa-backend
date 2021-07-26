import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth';
import db from './lib/db/';

import { PORT, INITIAL_DB_SETUP } from './config/constants';

dotenv.config();

const app = express();

const APPLICATION_NAME = 'youtube-clone';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

(async () => {
  try {
    await db.sequelize.sync({ force: INITIAL_DB_SETUP });
    console.log('All good');
  } catch (err) {
    console.log(err);
  }
})();

app.listen(PORT, () => console.log(`[${APPLICATION_NAME}] Listening on port ${PORT}!`));

export default app;
