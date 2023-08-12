'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Attendance.init({
    clockIn: DataTypes.DATE,
    clockOut: DataTypes.DATE,
    daySalary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};