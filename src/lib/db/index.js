import Sequelize from 'sequelize';

import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT, DB_NAME } from '../../config/constants';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

const db = {};

db.sequelize = sequelize;

db.User = sequelize.import(__dirname + '/models/User.js');

export default db;
