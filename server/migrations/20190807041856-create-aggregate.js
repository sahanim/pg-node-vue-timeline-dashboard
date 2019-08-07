'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aggregates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      biking: {
        type: Sequelize.JSON
      },
      car: {
        type: Sequelize.JSON
      },
      flight: {
        type: Sequelize.JSON
      },
      train: {
        type: Sequelize.JSON
      },
      tram: {
        type: Sequelize.JSON
      },
      walking: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Aggregates');
  }
};