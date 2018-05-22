const express = require('express');
const router = express.Router();
const models = require('../models');
const Student = models.Student;
const Subject = models.Subject;

router.get('/', (req, res) => {
    Student.findAll({
        order: [['id', 'ASC']]
    })
        .then(function (students) {
            console.log(students)
            res.render('students', { students: students});
        })
        .catch(function (err) {
            res.send(err.message);
        })
});

router.get('/add', (req, res) => {
    res.render('formStudent', {message: '', person:{}});
});

router.post('/add', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    Student.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    })
        .then(function (student) {
            res.render('formStudent', {message: 'Add Student Success', person:student});
        })
        .catch(function (err) {
            res.render('formStudent',{ message: err.message, person: {}})
        })
});

router.get('/:id/addsubject', (req, res) => {
    let studentId = req.params.id;
    Student.findById(studentId)
    .then(function(student){
        Subject.findAll()
        .then(function(subjects){
            res.render('formSubject', {message: '', student: student, subjects:subjects});
        })
        .catch(function(err){
            res.send(err.message);
        })
    })
    .catch(function(err){
        res.send(err.message);
    })
});

router.post('/:id/addsubject', (req, res) => {
    let subjectId = req.body.subjectId;
    let studentId = req.params.id;
    StudentSubject.create({
        studentId : studentId,
        subjectId : subjectId
    })
    .then(function(student){
        Subject.findAll()
        .then (function(subjects){
            res.render('formSubject', {message: 'Add Subject Success', student:student, subjects:subjects});
        })
        .catch(function(err){
            res.send(err.message)
        })
    })
    .catch(function(err){
        res.send(err.message);
    })
    
});

module.exports = router;