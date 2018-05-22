'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  }, { 
    tableName: 'teachers',
    hooks: {
      beforeBulkUpdate: (teacher, options) => {
        const keys = Object.keys(teacher.attributes);
        keys.slice(0,keys.length - 1).forEach(key => {
          console.log(key)
          teacher.attributes[key] = teacher.attributes[key].trim();
        });
      },
      beforeCreate: (teacher, options) => {
        const keys = Object.keys(teacher.dataValues);
        keys.slice(1,3).forEach(key => {
          teacher[key] = teacher[key].trim();
        });
      }
    }
  });
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
    });
  };

  Teacher.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  return Teacher;
};