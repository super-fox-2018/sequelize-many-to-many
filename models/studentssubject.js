'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentsSubject = sequelize.define('StudentsSubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {});
  StudentsSubject.associate = function(models) {
    StudentsSubject.belongsTo(models.Student)
    StudentsSubject.belongsTo(models.Subject)
  };
  return StudentsSubject;
};