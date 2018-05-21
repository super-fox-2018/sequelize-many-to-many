'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.belongsToMany(models.Student,{through:models.Student_Subject})
    //Subject.hasMany(models.Student_Subject)
    Subject.hasMany(models.Teacher)
  };
  return Subject;
};