'use strict';
module.exports = (sequelize, DataTypes) => {
  const Moment = sequelize.define('Moment', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    moment_definition_id: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {});
  Moment.associate = function(models) {
    // associations can be defined here
  };
  return Moment;
};