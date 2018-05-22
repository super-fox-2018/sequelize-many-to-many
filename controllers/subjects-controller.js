const { Subject } = require('./../models');
const { Teacher } = require('./../models');
const { Student } = require('./../models');
const { StudentSubject } = require('./../models');

exports.getSubjects = (req, res) => {
  Subject.findAll({
    order: [['id', 'ASC']], 
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
  res.render('subjects/add', { 
    title: 'Add Subject',
  });
}

exports.createSubject = (req, res) => {
  const newSubject = req.body;
  return Subject.create(newSubject)
    .then(result => res.redirect('/subjects'));
}

exports.editSubject = (req, res) => {
  const { subjectId } = req.params;
  return Subject.findById(subjectId)
    .then(subject => res.render('subjects/edit', { 
      title: 'Edit Subject', 
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
    order: [['id', 'ASC']],
    attributes: ['id', 'score'],
    include: ['students', 'subjects'],
    where : { subjectId }
  })
  .then(enrolledStudents => {
    if (enrolledStudents[0]) {
      return [enrolledStudents[0].subjects.subjectName,
              enrolledStudents];
    } else {
      return Subject.findById(subjectId)
        .then(subject => [subject.subjectName, enrolledStudents])
    }
  })
  .then(result => res.render('subjects/enrolled-students', {
    title: result[0],
    enrolledStudents: result[1],
  }));
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