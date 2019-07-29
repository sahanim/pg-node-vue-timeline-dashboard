'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    type: DataTypes.STRING,
    location: DataTypes.JSON,
    duration: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    mode: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};