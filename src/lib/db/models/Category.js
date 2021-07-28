import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('Category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    description: Sequelize.STRING,
  });
