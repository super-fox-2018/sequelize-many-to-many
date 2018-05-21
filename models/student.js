'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, { tableName: 'students' });
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {
      as: 'subjects',
      through: 'StudentSubject',
      foreignKey: 'studentId', 
      otherKey: 'subjectId'
    });
  };
  return Student;
};