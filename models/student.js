'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {});
  Student.associate = function (models) {
    Student.belongsToMany(models.Subject,{
      through: 'StudentSubject',
      foreignKey: 'studentId'
    });
  };
  return Student;
};