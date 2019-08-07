'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aggregate = sequelize.define('Aggregate', {
    biking: DataTypes.JSON,
    car: DataTypes.JSON,
    flight: DataTypes.JSON,
    train: DataTypes.JSON,
    tram: DataTypes.JSON,
    walking: DataTypes.JSON
  }, {});
  Aggregate.associate = function(models) {
    // associations can be defined here
  };
  return Aggregate;
};