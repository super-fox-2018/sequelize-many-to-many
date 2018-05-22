const express = require('express');
const router = express.Router();
const Model = require('../models');
const {Student,Subject,StudentsSubject} = Model;

router.use((req,res,next)=>{
    res.locals.status = 'student'
    Subject.findAll()
    .then(AllSubjects=>{ 
        res.locals.subjects = AllSubjects
        next()
    })
})

router.get('/',(req,res)=>{
    Student.findAll()
    .then(StudentList=>{
        res.render('showData',{data:StudentList})
    })
})
router.get('/add',(req,res)=>{
    res.render('formData',{
        action:'add',
        data:{
            first_name:'',
            last_name:'',
            email:''
        }
    })
})

router.post('/add',(req,res)=>{
    Student.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }).then(
        res.redirect('/student')
    )
})
router.get('/edit/:id',(req,res)=>{
    Student.find({where:{id:req.params.id}})
    .then(studentData =>{
        res.render('formData',{
            action:'edit/'+req.params.id,
            data:{
                first_name:studentData.first_name,
                last_name:studentData.last_name,
                email:studentData.email,
            }
        })
    })
    .catch(error=>{
        res.send(error)
    })
})
router.post('/edit/:id',(req,res)=>{
    Student.findById(req.params.id)
    .then(foundstudent=>{
        if(foundstudent.email === req.body.email){
            let studentObj ={
                first_name : req.body.first_name,
                last_name : req.body.last_name,
            }
            Student.update(studentObj,{where:{id:req.params.id}})
            .then(result => res.redirect('/student'))
            .catch(error=>{
                console.log(error)
            })
        }else{
            let studentObj ={
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email : req.body.email,
            }
            Student.update(studentObj,{where:{id:req.params.id}})
            .then(result => res.redirect('/student'))
            .catch(error=>{
                console.log(error)
            });
        }
    }).then(()=>{
        res.redirect('/student')
    })
})
router.get('/delete/:id',(req,res)=>{
    Student.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect('/student')
    })
})
router.get('/addsubject/:id',(req,res)=>{
    Student.findById(req.params.id)
    .then(studentData =>{
        res.render('addSubject',{data:studentData})
    })
})
router.post('/addsubject/:id',(req,res)=>{
    StudentsSubject.find({where:{StudentId:req.params.id,SubjectId:req.body.subject}})
    .then(studentFound=>{
        if(studentFound) {
            return res.send('anda sudah terdaftar')
        }
        StudentsSubject.create({
            StudentId:req.params.id,
            SubjectId:req.body.subject
        })
        .then(()=>{
            res.redirect('/student')
        })
    })
    .catch(error=>{
        res.send(error)
    })
})

module.exports = router