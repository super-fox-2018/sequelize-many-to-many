let express = require('express');
let routes = express.Router();

let models = require('./../models');
let Teachers = models.Teacher;

// teacher homepage
routes.get('/', function(req, res) {
  console.log(req);
  Teachers.findAll({
    order: [['id', 'ASC']],
    include: [{
      model: models.Subject
    }]
  }).then(teachers => {
    console.log(teachers);
    res.render('teacher/home', {teachers, msg: ''});
  });
});

// teacher add page
routes.get('/add', function(req, res) {
  res.render('teacher/form' , {
    title: 'This is new teacher form'
  });
});

routes.post('/add', function(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let subjectId = req.body.subjectId;
  let email = req.body.email;
  Teachers.create({
    firstName,
    lastName,
    email,
    subjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.redirect('/teacher');
  }).catch((error) => {
    Teachers.findAll({
      order: [['id', 'ASC']],
      include: [{
        model: models.Subject
      }]
    }).then(teachers => {
      res.render('teacher/home', {teachers, msg: error});
    });
  });
});

// teacher edit page
routes.get('/edit/:id', function(req, res) {
  let teacherId = req.params.id;
  Teachers.find({
    where: {id: teacherId},
    include: [{
      model: models.Subject
    }]
  })
   .then(function(teacher) {
    res.render('teacher/edit' , {teacher});
  });
});

routes.post('/edit/:id', function(req, res) {
  let updated = {};
  teacherId = req.params.id;
  updated.firstName = req.body.firstName;
  updated.lastName = req.body.lastName;
  updated.subjectId = req.body.subjectId;
  updated.updatedAt = new Date();
  let email = req.body.email;
  if (email !== '') {
    updated.email = email;
  }
  Teachers.update(updated, {where: {id: teacherId}})
   .then(() => {
    res.redirect('/teacher');
  })
   .catch((error) => {
    Teachers.findAll({
      order: [['id', 'ASC']],
      include: [{
        model: models.Subject
      }]
    }).then(teachers => {
      res.render('teacher/home', {teachers, msg: error});
    });
  });
});

// teacher delete page
routes.get('/delete/:id', function(req, res) {
  let teacherId = req.params.id;
  Teachers.destroy({where: {id: teacherId}}).then(() => {
    res.redirect('/teacher');
  });
});

module.exports = routes;
