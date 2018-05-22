'use strict'
const express = require('express')
const router = express.Router()
const models = require('./../models')

router.get('/subjects', function(req, res){
	models.Subject.findAll({
		order : [['id','ASC']],
		include: [models.Teacher] 
	})
    .then(subjectData => {
		// console.log(subjectData[0].Teachers[0].firstName)
        res.render('subjects/subjects.ejs', {subjectData:subjectData})
    })

    .catch(err => {
		res.send('There is something wrong', err)
	})
})

router.get('/subject/add', function(req, res){
    res.render('subjects/addSubject.ejs')
})

router.post('/subject/add', function(req, res){
	models.Subject.create({
		subjectName: req.body.subjectName,
        createAt: new Date(),
        updateAt: new Date()
	})
	.then(newSubject => {
		res.redirect('/subjects')
	})
	.catch(err => {
		res.send('There is something wrong', err)
	})

})
router.get('/subject/edit/:id',function(req,res) {
	let id = req.params.id
	models.Subject.findById(id)
	.then(editSubject =>{
		res.render("subjects/editSubject.ejs",{editSubject:editSubject})
    })
    .catch(err => {
		res.send(err)
	})
})

router.post('/subject/edit/:id',function(req,res) {
	models.Subject.update({
	subjectName:req.body.subjectName,
    },{
     where:{
     id:req.params.id
    }
    })
	.then(() =>{
		res.redirect("/subjects")
    })
    .catch(err => {
		res.send(err)
	})
})

router.get('/subject/delete/:id',function(req,res) {
	let id = req.params.id
	models.Subject.destroy({
		where:{id : id}
	})
	.then(()=>{
		res.redirect('/subjects')
    })
    .catch(err => {
		res.send('There is something wrong', err)
	})
})

module.exports = router