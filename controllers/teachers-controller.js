const { Teacher } = require('./../models');
const { Subject } = require('./../models');

exports.getTeachers = (req, res) => {
  Teacher.findAll({ 
    order : [['id', 'ASC']],
    include: [Subject]
  })
    .then(teachers => {
      res.render('teachers/index', { 
        title: 'Teachers',
        records : teachers,
      });
    });
}

exports.addTeacher = (req, res) => {
  Subject.findAll()
    .then(subjects => {
      res.render('teachers/add', { 
        title: 'Add Teacher',
        subjects,
      });
    });
}

exports.createTeacher = (req, res) => {
  const newTeacher = req.body;
  Teacher.create(newTeacher)
    .then(result => res.redirect('/teachers'))
    .catch(err => {
      const message = err.errors[0].message;
      Subject.findAll()
      .then(subjects => {
        res.render('teachers/add', { 
          title: 'Add Teacher',
          subjects,
          message
        });
      });
    });
}

exports.editTeacher = (req, res) => {
  const { teacherId } = req.params;
  Teacher.findById(teacherId)
    .then(teacher => 
      Subject.findAll()
        .then(subjects => {
          res.render('teachers/edit', { 
            title : 'Edit Teacher', 
            subjects,
            record: teacher,
          })
        })
  );
}

exports.updateTeacher = (req, res) => {
  const { teacherId } = req.params;
  const updatedTeacher = req.body;
  updatedTeacher.id = teacherId;
  Teacher.update(updatedTeacher, { where : { id : teacherId }})
    .then(teacher => res.redirect('/teachers'))
    .catch(err => {
      const message = err.errors[0].message;
      Teacher.findById(teacherId)
        .then(teacher => 
          Subject.findAll()
            .then(subjects => {
              res.render('teachers/edit', { 
                title : 'Edit Teacher', 
                subjects,
                record: teacher,
                message
              })
            })
      );
    });
}

exports.deleteTeacher = (req, res) => {
  const { teacherId } = req.params;
  return Teacher.destroy({ where : { id : teacherId }})
    .then(result => res.redirect('/teachers'));
}