'use strict';
module.exports = (sequelize, DataTypes) => {
  var studentSubject = sequelize.define('studentSubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  studentSubject.associate = function(models) {
    // associations can be defined here
  };
  return studentSubject;
};