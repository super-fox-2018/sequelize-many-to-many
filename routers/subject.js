const express = require('express');
const router = express.Router();
const Model = require('../models');
const {Teacher,Subject,Student,StudentsSubject} = Model

router.use((req,res,next)=>{
    res.locals.status = 'subject'
    Teacher.findAll()
    .then(Allteachers=>{ 
        res.locals.teachers = Allteachers
    })
    next()
})

router.get('/',(req,res)=>{
    Subject.findAll()
    .then(SubjectList=>{
        res.render('showData.ejs',{
            data:SubjectList
        })
    })
})
router.get('/:id/givescore',(req,res)=>{
    StudentsSubject.findAll({include:[Subject,Student],where:{SubjectId:req.params.id}})
    .then(studentsEnrolled=>{
        res.render('enrolledStudent',{data:studentsEnrolled})
    })
})
module.exports = router