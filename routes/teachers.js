'use strict'
const express = require('express')
const router = express.Router()
const models = require('./../models')

router.get('/teachers', function(req, res){
	models.Teacher.findAll({
		order : [['id','ASC']],
		include: [models.Subject] 
	})
    .then(teachersData => {
		// console.log(teachersData[0].Subject.subjectName)
        res.render('teachers/teachers.ejs', {teachersData:teachersData})
    })

    .catch(err => {
		res.send('There is something wrong', err)
	})
})

router.get('/teacher/add', function(req, res){
    res.render('teachers/addTeacher.ejs')
})

router.post('/teacher/add', function(req, res){
	models.Teacher.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		subjectId: req.body.subjectId,
        createAt: new Date(),
        updateAt: new Date()
	})
	.then(newSubject => {
		res.redirect('/teachers')
	})
	.catch(err => {
		res.send(err.message)
	})
})	

router.get('/teacher/edit/:id',function(req,res) {
	let id = req.params.id
	models.Teacher.findById(id)
	.then(editTeacher =>{
		res.render("teachers/editTeacher.ejs",{editTeacher:editTeacher})
    })
    .catch(err => {
		res.send(err)
	})
})

router.post('/teacher/edit/:id',function(req,res) {
	models.Teacher.update({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
	subjectId: req.body.subjectId,
    },{
     where:{
     id:req.params.id
    }
    })
	.then(() =>{
		res.redirect("/teachers")
    })
    .catch(err => {
		res.send(err)
	})
})

router.get('/teacher/delete/:id',function(req,res) {
	let id = req.params.id
	models.Teacher.destroy({
		where:{id : id}
	})
	.then(()=>{
		res.redirect('/teachers')
    })
    .catch(err => {
		res.send('There is something wrong', err)
	})
})

module.exports = router