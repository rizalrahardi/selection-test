'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Attendance, {
        foreignKey: 'userId'
      })
      this.hasMany(models.MonthSalary, {
        foreignKey: 'userId'
      })
      this.hasOne(models.Salary, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })
      this.belongsTo(models.Shift, {
        foreignKey: 'shiftId'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    join: DataTypes.DATE,
    token: DataTypes.STRING,
    baseSalary: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};