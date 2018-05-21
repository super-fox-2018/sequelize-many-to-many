'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
  };
  return StudentSubject;
};