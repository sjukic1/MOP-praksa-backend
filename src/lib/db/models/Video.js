import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('Video', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    url: Sequelize.STRING,
    thumbnail: Sequelize.STRING,
    views: {
      type: Sequelize.INTEGER,
      required: true,
    },
    videoDuration: {
      type: Sequelize.REAL,
      required: true,
    },
    description: Sequelize.STRING,
    uploadDate: {
      type: Sequelize.DATE,
      required: true,
    },
  });
