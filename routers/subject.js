const express = require('express');
const router = express.Router();
const Model = require('../models');
const {Teacher,Subject} = Model

router.use((req,res,next)=>{
    res.locals.status = 'subject'
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
router.get('/add',(req,res)=>{
    res.render('formData',{
        action:'add',
        data:{
        subject_name:''
        }
    })
})

router.post('/add',(req,res)=>{
    Subject.create({
        subject_name:req.body.subject_name,
    }).then(
        res.redirect('/subject')
    )
})
router.get('/edit/:id',(req,res)=>{
    Subject.find({where:{id:req.params.id}})
    .then(subjectData =>{
        res.render('formData',{
            action:'edit/'+req.params.id,
            data:{
                subject_name:subjectData.subject_name,
            }
        })
    })
    .catch(error=>{
        res.send(error)
    })
})
router.post('/edit/:id',(req,res)=>{
    Subject.findById(req.params.id)
    .then(foundsubject=>{
        foundsubject.subject_name = req.body.subject_name
        foundsubject.save()
    }).then(()=>{
        res.redirect('/subject')
    })
})
router.get('/delete/:id',(req,res)=>{
    Subject.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect('/subject')
    })
})

module.exports = router