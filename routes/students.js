'use strict'
const express = require('express')
const router = express.Router()
const models = require('./../models')

router.get('/students', function(req, res){
	models.Student.findAll({
		order : [['id','ASC']]
	})
    .then(studentsData => {
        res.render('students/studentsData.ejs', {studentsData:studentsData})
    })

    .catch(err => {
		res.send('There is something wrong', err)
	})
})

router.get('/student/add', function(req, res){
    res.render('students/addStudent.ejs')
})

router.post('/student/add', function(req, res){
	models.Student.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
        email: req.body.email,
        createAt: new Date(),
        updateAt: new Date()
	})
	.then(newStudent => {
		res.redirect('/studentsData')
	})
	.catch(err => {
		res.send('There is something wrong', err)
	})
})

router.get('/edit/:id',function(req,res) {
	let id = req.params.id
	models.Student.findById(id)
	.then(editStudent =>{
		res.render("students/editStudent.ejs",{editStudent:editStudent})
    })
    .catch(err => {
		res.send(err)
	})
})

router.post('/edit/:id',function(req,res) {
	models.Student.update({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
    },{
     where:{
     id:req.params.id
    }
    })
	.then(() =>{
		res.redirect("/studentsData")
    })
    .catch(err => {
		res.send(err)
	})
})

router.get('/delete/:id',function(req,res) {
	let id = req.params.id
	models.Student.destroy({
		where:{id : id}
	})
	.then(()=>{
		res.redirect('/students')
    })
    .catch(err => {
		res.send('There is something wrong', err)
	})
})

router.get('/students/:id/addSubject',function(req,res) {
	let id = req.params.id
	models.Student.findById(id)
	.then(addSubject =>{
		res.render("students/addSubject.ejs",{addSubject:addSubject})
    })
    .catch(err => {
		res.send(err)
	})
})

router.post('/students/:id/addSubject', function(req, res){
	models.Student.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		subjectId: req.body.subjectId,
        createAt: new Date(),
        updateAt: new Date()
	})
	.then(newStudent => {
		res.redirect('/studentsData')
	})
	.catch(err => {
		res.send('There is something wrong', err)
	})

})

module.exports = router