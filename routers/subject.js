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
router.get('/:id/enrolledstudent',(req,res)=>{
    StudentsSubject.findAll({include:[Subject,Student],where:{SubjectId:req.params.id}})
    .then(studentsEnrolled=>{
        res.render('enrolledStudent',{data:studentsEnrolled})
    })
})
router.get('/:id/givescore',(req,res)=>{
    StudentsSubject.find({include:[Subject,Student],where:{id:req.params.id}})
    .then(scoreRecord=>{
        res.render('giveScore',{data:scoreRecord})
    })
})
router.post('/:id/givescore',(req,res)=>{
    let giveScore ={
        score : parseInt(req.body.score),
    }
    StudentsSubject.update(giveScore,{where:{id:req.params.id}})
    .then(result => res.redirect('/subject'))
    .catch(error=>{
        console.log(error)
    })
})
router.get('/')
module.exports = router