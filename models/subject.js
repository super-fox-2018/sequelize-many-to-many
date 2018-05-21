'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    models.Subject.hasMany(models.Teacher, {foreignKey: 'subjectId'});
    models.Subject.belongsToMany(models.Student, {foreignKey: 'subjectId', through: 'StudentSubject'});
    models.Subject.hasMany(models.StudentSubject, {foreignKey: 'subjectId'});
  };
  return Subject;
};
