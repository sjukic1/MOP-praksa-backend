import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('UserReply', {
    feedback: Sequelize.BOOLEAN,
  });
