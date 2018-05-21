'use strict'
const express = require('express');
const routes = express.Router();
const models = require('../models');
const Teacher = models.Teacher;
const Subject = models.Subject;
const Student = models.Student;
const StudentSubject = models.StudentSubject;

routes.use(function(req,res,next){
    res.locals.oriUrl = req.originalUrl;
    next();
})

routes.get('/', (req, res) => {
    res.render('index')
});

routes.get('/teachers', (req, res) => {
    Teacher.findAll({
        include: [Subject],
        order: [['id', 'ASC']]
    })
        .then(function (teachers) {
            res.render('teachers', { teachers: teachers});
        })
        .catch(function (err) {
            res.send(err.message);
        })
})
// routes.get('/subjects', (req, res) =>{
//     Teacher.findAll({
//         include: [{model: Subject, required: true}]
//     })
//     .then (function (teachers){
//         res.render('teachers', { teachers: teachers});
//     })
//     .catch(function(err){
//         res.send(err.message);
//     })
// })

routes.get('/teachers/add', (req, res) => {
    res.render('formInput', {message: '', teacher : {}});
});

routes.post('/teachers/add', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    Teacher.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    })
        .then(function (teacher) {
            res.render('formInput', {message:'Add teacher success!', teacher:{}});
        })
        .catch(function (err) {
            res.render('formInput',{ message: err.message, teacher: {}})
        })
})

routes.get('/teachers/edit/:id', (req, res) => {
    let id = req.params.id;
    let url = req.originalUrl;
    Teacher.findById(id)
        .then((teacher) => {
            if (teacher) {
                res.render('formInput', {message: '', teacher : teacher});
            }
            else{
                res.render('formInput', {message: '', teacher : {}});
            }
        })
        .catch(function(err){
            res.render('formInput',{ message: err.message, teacher: {}})
        })
});

routes.post('/teachers/edit/:id', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let id = req.params.id;
    let updateTeacher = req.body;
    Teacher.update(
        {   id : id,
            firstName: firstName,
            lastName: lastName,
            email: email
        },
        { where: { id: id } }
    )
        .then(function (result) {
            res.render('formInput', {message: '', teacher : result});
        })
        .catch(function (err) {
            res.render('formInput',{ message: err.message, teacher: {}})
        });
});

routes.get('/teachers/delete/:id', (req,res) =>{
    let id = req.params.id;
    Teacher.destroy({
        where: {id}
    })
    .then((result)=>{
        res.send('Delete data teacher success!')
        // res.redirect('/teachers');
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

routes.get('/students', (req, res) => {
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

routes.get('/students/add', (req, res) => {
    res.render('formStudent', {message: '', student:{}});
});

routes.post('/students/add', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    Student.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    })
        .then(function (student) {
            res.render('formStudent', {message: 'Add Student Success', student:student});
        })
        .catch(function (err) {
            res.render('formStudent',{ message: err.message, student: {}})
        })
});

routes.get('/students/:id/addsubject', (req, res) => {
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

routes.post('/students/:id/addsubject', (req, res) => {
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

routes.get('/subjects', (req, res) => {
    Subject.findAll({
        include: [{model: Teacher, required: false}],
        order : [['id', 'ASC']]
    })
    .then(function(subjects){
        res.render('subjects', {message: '', subjects:subjects});
    })
    .catch(function(err){
        res.send(err.message);
    })
});

routes.get('/subjects/:id/enrolledstudents', (req, res) => {
    let subjectId = req.params.id;
    Subject.findAll({
        include: [{model: Student, required: true}],
        where: {id:subjectId},
        order : [['id', 'ASC']]
    })
    .then(function(subject){
        if (subject[0].Students){
            res.render('students', {message: '', students:subject[0].Students});
        }
    })
    .catch(function(err){
        res.send(err.message);
    })
});



module.exports = routes;