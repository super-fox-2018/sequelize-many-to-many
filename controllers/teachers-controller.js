const { Teacher } = require('./../models');

exports.getTeachers = (req, res) => {
  return Teacher.findAll({
    order: [['id', 'ASC']],
    raw : true,
  })
    .then(teachers => {
      res.render('index', { 
        title: 'Subjects',
        tableName: 'teachers',
        records: teachers,
        h: helpers,
      })
    });
}

exports.addTeacher = (req, res) => {
  res.render('form', { 
    title: 'Add Teacher', 
    mode : 'Add',
    tableName: 'teachers',
    columns,
    h : helpers,
  });
}

exports.createTeacher = (req, res) => {
  const newTeacher = req.body;
  return Teacher.create(newTeacher)
    .then(result => res.redirect('/teachers'));
}

exports.editTeacher = (req, res) => {
  const { teacherId } = req.params;
  return Teacher.findById(teacherId, { raw : true })
    .then(teacher => res.render('form', { 
      title : 'Edit Teacher', 
      mode : 'Edit', 
      tableName: 'teachers',
      columns,
      record: teacher,
      h : helpers,
    }));
}

exports.updateTeacher = (req, res) => {
  const { teacherId } = req.params;
  const updatedTeacher = req.body;
  return Teacher.update(updatedTeacher, { where : { id : teacherId }})
    .then(result => res.redirect('/teachers'));
}

exports.deleteTeacher = (req, res) => {
  const { teacherId } = req.params;
  return Teacher.destroy({ where : { id : teacherId }})
    .then(result => res.redirect('/teachers'));
}