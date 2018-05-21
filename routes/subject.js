let express = require('express');
let routes = express.Router();

let models = require('./../models');
let Subjects = models.Subject;
let StudentSubject = models.StudentSubject;

// subject homepage
routes.get('/', function(req, res) {
  Subjects.findAll({
    order: [['id', 'ASC']],
    include: [{
      model: models.Teacher
    }]
  }).then(subjects => {
    res.render('subject/home', {subjects});
  });
});

// subject add page
routes.get('/add', function(req, res) {
  res.render('subject/form' , {
    title: 'This is new subject form'
  });
});

routes.post('/add', function(req, res) {
  let subjectName = req.body.subjectName;
  Subjects.create({
    subjectName,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.redirect('/subject');
  });
});

// subject edit page
routes.get('/edit/:id', function(req, res) {
  let subjectId = req.params.id;
  Subjects.findById(subjectId).then(function(subject) {
    res.render('subject/edit' , {subject});
  });
});

routes.post('/edit/:id', function(req, res) {
  let subjectId = req.params.id;
  let subjectName = req.body.subjectName;
  Subjects.update({
    subjectName,
    updatedAt: new Date()
  }, {where: {id: subjectId}}).then(() => {
    res.redirect('/subject');
  });
});

// subject delete page
routes.get('/delete/:id', function(req, res) {
  let subjectId = req.params.id;
  Subjects.destroy({where: {id: subjectId}}).then(() => {
    res.redirect('/subject');
  });
});

// subject enrolled students page
routes.get('/:id/students', function(req, res) {
  let subjectId = req.params.id;
  Subjects.findOne({
    where: {id: subjectId},
    include: [{
      model: models.Student
    }]
  })
    .then((subject) => {
      console.log(subject);
      res.render('subject/enrolled-students', {subject});
    });
});

// subject give score page
routes.get('/:subjectId/give-score/:studentId', function(req, res) {
  let subjectId = req.params.subjectId;
  let studentId = req.params.studentId;
  Subjects.findOne({
    where: {id: subjectId},
    include: [{
      model: models.Student,
      where: {id: studentId}
    }]
  })
    .then((subject) => {
      let student = subject.Students[0];
      res.render('subject/give-score', {subject, student});
    });
});

routes.post('/:subjectId/give-score/:studentId', function(req, res) {
  let subjectId = req.params.subjectId;
  let studentId = req.params.studentId;
  let studentScore = req.body.score;
  StudentSubject.update({
    studentScore,
    updatedAt: new Date(),
  }, {
    where: {subjectId, studentId}
  }).then(() => {
    res.redirect(`/subject/${subjectId}/students`);
  });
});

module.exports = routes;
