'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    models.Student.belongsToMany(models.Subject, {through: 'StudentSubject', foreignKey: 'studentId'});
  };
  return Student;
};