const express = require('express');
const router = express.Router();
const models = require('../models');
const Subject = models.Subject;
const Student = models.Student;
const Teacher = models.Teacher;

router.get('/', (req, res) => {
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

router.get('/:id/enrolledstudents', (req, res) => {
    let subjectId = req.params.id;
    Subject.findAll({
        include: [{model: Student, required: true}],
        where: {id:subjectId},
        order : [['id', 'ASC']]
    })
    .then(function(subject){
        if (subject[0].Students){
            let studentSub = subject[0];
            // console.log ('student...',studentSub.Students[0].StudentSubject.score);
            res.render('student-subject', {message: '', studentSub:studentSub});
        }
    })
    .catch(function(err){
        res.send(err.message);
    })
});

module.exports = router;