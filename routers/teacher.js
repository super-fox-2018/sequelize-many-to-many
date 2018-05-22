const express = require('express');
const router = express.Router();
const Model = require('../models');
const {Teacher,Subject} = Model

router.use((req,res,next)=>{
    res.locals.status = 'teacher'
    Subject.findAll()
    .then(AllSubjects=>{ 
        res.locals.subjects = AllSubjects
        next()
    })
})

router.get('/',(req,res)=>{
    Teacher.findAll({include:[Subject]})
    .then(TeacherList=>{
        // let checkEach = (i)=>{
        //     if(i<TeacherList.length){
        //         if(TeacherList[i].SubjectId===null){
        //             TeacherList[i]["SubjectId"] = 'unassigned'
        //             return checkEach(i+1)
        //         }else{
        //             Subject.findById(TeacherList[i].SubjectId)
        //             .then(subjectfound=>{
        //                 TeacherList[i]["SubjectId"] = subjectfound.subject_name
        //                 return checkEach(i+1)
        //             })
        //         }
        //     }else{
        //         res.render('showData',{data:TeacherList})
        //     }
        // }
        // checkEach(0)
        res.render('showData',{data:TeacherList})
    })
})
router.get('/add',(req,res)=>{
    res.render('formData',{
        action:'add',
        data:{
        first_name:'',
        last_name:'',
        email:'',
        subject:''}
    })
})

router.post('/add',(req,res)=>{
    Teacher.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }).then(
        res.redirect('/teacher')
    )
})
router.get('/edit/:id',(req,res)=>{
    Teacher.find({include:[Subject],where:{id:req.params.id}})
    .then(teacherData =>{
        res.render('formData',{
            action:'edit/'+req.params.id,
            data:{
                first_name:teacherData.first_name,
                last_name:teacherData.last_name,
                email:teacherData.email,
                subject:teacherData.SubjectId===null?null:teacherData.Subject.subject_name
            }
        })
    })
    .catch(error=>{
        res.send(error)
    })
})
router.post('/edit/:id',(req,res)=>{
    Teacher.findById(req.params.id)
    .then(foundteacher=>{
        if(foundteacher.email === req.body.email){
            let teacherObj ={
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                SubjectId : req.body.subject==='null'?null:req.body.subject
            }
            Teacher.update(teacherObj,{where:{id:req.params.id}})
            .then(result => res.redirect('/teacher'))
            .catch(error=>{
                console.log(error)
            })
        }else{
            let teacherObj ={
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email : req.body.email,
                SubjectId : req.body.subject==='null'?null:req.body.subject
            }
            Teacher.update(teacherObj,{where:{id:req.params.id}})
            .then(result => res.redirect('/teacher'))
            .catch(error=>{
                console.log(error)
            });
        }
    }).then(()=>{
        res.redirect('/teacher')
    })
})
router.get('/delete/:id',(req,res)=>{
    Teacher.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect('/teacher')
    })
})

module.exports = router