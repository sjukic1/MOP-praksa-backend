import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('Reply', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      required: true,
    },
  });
