import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('UserComment', {
    feedback: Sequelize.BOOLEAN,
  });
