import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('UserVideo', {
    feedback: Sequelize.BOOLEAN,
  });
