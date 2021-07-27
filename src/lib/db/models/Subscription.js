import Sequelize from 'sequelize';

export default (sequelize, DataTypes) =>
  sequelize.define('Subscription', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateOfSubscription: {
      type: Sequelize.DATE,
      required: true,
    },
  });
