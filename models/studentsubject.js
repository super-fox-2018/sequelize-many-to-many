'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, { tableName: 'studentsubjects' });
  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subjects'
    });

    StudentSubject.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'students'
    });
  };
  return StudentSubject;
};