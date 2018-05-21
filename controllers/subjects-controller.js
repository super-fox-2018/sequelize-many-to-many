const { Subject } = require('./../models');
const { Teacher } = require('./../models');
const { Student } = require('./../models');
const { StudentSubject } = require('./../models');

exports.getSubjects = (req, res) => {
  Subject.findAll({
    include: [{
      model: Teacher,
      as : 'teachers'
    }]
  })
    .then(subjects => {
      res.render('subjects/index', { 
        title: 'Subjects Data',
        records: subjects,
      })
    })
    .catch(err => console.log(err));
}

exports.addSubject = (req, res) => {
  res.render('form', { 
    title: 'Add Subject',
    mode: 'Add',
    tableName: 'subjects',
    columns: ['subject_name'],
    h : helpers,
  });
}

exports.createSubject = (req, res) => {
  const newSubject = req.body;
  return Subject.create(newSubject)
    .then(result => res.redirect('/subjects'));
}

exports.editSubject = (req, res) => {
  const { subjectId } = req.params;
  return Subject.findById(subjectId, { raw : true })
    .then(subject => res.render('form', { 
      title: 'Edit Subject', 
      mode: 'Edit',
      tableName: 'subjects',
      columns: ['subject_name'],
      record: subject,
    }));
}

exports.updateSubject= (req, res) => {
  const { subjectId } = req.params;
  const updatedSubject = req.body;
  return Subject.update(updatedSubject, { where : { id : subjectId }})
    .then(result => res.redirect('/subjects'));
}

exports.deleteSubject = (req, res) => {
  const { subjectId } = req.params;
  return Subject.destroy({ where : { id : subjectId }})
    .then(result => res.redirect('/subjects'));
}

exports.getEnrolledStudents = (req, res) => {
  const { subjectId } = req.params;
  StudentSubject.findAll({
    attributes: ['id', 'score'],
    include: ['students', 'subjects'],
    where : { subjectId }
  })
  .then(enrolledStudents => {
    res.render('subjects/enrolled-students', {
      title: enrolledStudents[0].subjects.subjectName,
      enrolledStudents,
    });
  });
};

exports.giveScore = (req, res) => {
  const { studentSubjectId } = req.params;
  StudentSubject.findOne({
    attributes: ['id', 'score'],
    include: ['students', 'subjects'],
    where : { id : studentSubjectId }
  })
  .then(enrolledStudent => {
    res.render('subjects/give-score', {
      title: 'Give Score',
      enrolledStudent
    })
  });
}

exports.setScore = (req, res) => {
  const { studentSubjectId } = req.params;
  const { score } = req.body;
  StudentSubject.update({ score: +score }, { where : { id : studentSubjectId }})
    .then(result => {
      res.redirect('/subjects');
    });
}