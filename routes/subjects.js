var express = require("express")
var router = express.Router()
var models = require("../models")


router.get('/',function(req,res){
	models.Subject.findAll({include:models.Teacher})
	.then((dataSubjects)=>{
		// res.send(dataSubjects)
		res.render("./subject/list_subject",{dataSubjects:dataSubjects})
	})
})

router.get('/:id/enrolledStudents',function(req,res) {
	models.Subject.findById(req.params.id,{include:models.Student})
	.then(dataSubject=>{
		// res.send(dataSubject)
		res.render("./subject/enrolledStudents",{dataSubject:dataSubject})
	})
})

router.get('/:id/giveScore/:StudentId',function(req,res){
	models.Student_Subject.findOne({
		where:{
			SubjectId:req.params.id,
			StudentId:req.params.StudentId
		}
	})
	.then(dataStudent=>{
		// res.send(dataStudent)
		res.render("./subject/giveScore",{dataStudent:dataStudent})
	})
})

router.post('/:id/giveScore/:StudentId',function(req,res){
	models.Student_Subject.update({
		score:req.body.score
		},{
			where:{
				SubjectId:req.params.id,
				StudentId:req.params.StudentId
			}
		})
	.then(()=>{
		res.redirect('/subjects/')
	})
})





module.exports = router
