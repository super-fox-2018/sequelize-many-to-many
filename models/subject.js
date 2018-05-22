'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING,
    teacherId: DataTypes.INTEGER
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {
      foreignKey: "subjectId"})
      Subject.belongsToMany(models.Student, { through: models.studentSubject });
  };
  return Subject;
};