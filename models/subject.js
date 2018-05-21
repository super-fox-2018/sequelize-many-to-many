'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, { tableName: 'subjects' });
  Subject.associate = function(models) {
    Subject.belongsToMany(models.Student, {
      as: 'students',
      through: 'StudentSubject',
      foreignKey: 'subjectId', 
      otherKey: 'studentId'
    });

    Subject.hasMany(models.Teacher, {
      foreignKey: 'subjectId',
      as: 'teachers'
    });
  };
  
  return Subject;
};