import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import authRoutes from './routes/auth';
import categoriesRouter from './routes/categories';
import videosRouter from './routes/videos';
import userRouter from './routes/user';

import db from './lib/db/';
import generateDatabaseData from './lib/helpers/databaseData';

import { PORT, INITIAL_DB_SETUP, SWAGGER_URL } from './config/constants';

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Youtube Clone API',
      contact: {
        name: 'Amazing Developer',
      },
      servers: [
        {
          url: SWAGGER_URL,
        },
      ],
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

const APPLICATION_NAME = 'youtube-clone';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/videos', videosRouter);
app.use('/api/v1/users', userRouter);

(async () => {
  try {
    const setupDatabase = await db.sequelize.sync({ force: INITIAL_DB_SETUP });

    if (!setupDatabase) {
      console.log('There seems to be problem with setting up the database!');
    } else {
      if (INITIAL_DB_SETUP) {
        await generateDatabaseData();
        console.log('Sequlize initial setup done!');
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

app.listen(PORT, () => console.log(`[${APPLICATION_NAME}] Listening on port ${PORT}!`));

export default app;
