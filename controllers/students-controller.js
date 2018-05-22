const { Student } = require('./../models');
const { Subject } = require('./../models');

exports.getStudents = (req, res) => {
  return Student.findAll({
    order: [['id', 'ASC']],
  })
    .then(students => {
      res.render('students/index', { 
        title: 'Students Data', 
        records: students, 
      });
    })
    .catch(err => res.send(err));
}

exports.addStudent = (req, res) => {
  res.render('students/add', { 
    title: 'Add Student',
  })
  .catch(err => res.send(err));
}

exports.createStudent = (req, res) => {
  const newStudent = req.body;
  return Student.create(newStudent)
    .then(result => res.redirect('/students'))
    .catch(err => res.send(err));
}

exports.editStudent = (req, res) => {
  const { studentId } = req.params;
  return Student.findById(studentId)
    .then(student => res.render('students/edit', { 
      title: 'Edit Student', 
      record: student,
    }))
    .catch(err => res.send(err));
}

exports.updateStudent= (req, res) => {
  const { studentId } = req.params;
  const updatedStudent = req.body;
  return Student.update(updatedStudent, { where : { id : studentId }})
    .then(result => res.redirect('/students'))
    .catch(err => res.send(err));
}

exports.deleteStudent = (req, res) => {
  const { studentId } = req.params;
  return Student.destroy({ where : { id : studentId }})
    .then(result => res.redirect('/students'))
    .catch(err => res.send(err));
}

exports.addSubjectToStudent = (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .then(student => {
      Subject.findAll()
        .then(subjects => {
          res.render('students/add-subject', { 
            title : 'Add Subject to Student',
            student,
            subjects
          });
        });
    })
    .catch(err => res.send(err));
}

exports.createStudentSubject = (req, res) => {
  const { studentId } = req.params;
  const { subjectId } = req.body;
  Student.findById(studentId)
    .then(student => {
      Subject.findById(subjectId)
        .then(subject => {
          student.addSubject(subject)
            .then(result => res.redirect('/students'));
        });
    })
    .catch(err => res.send(err));
}