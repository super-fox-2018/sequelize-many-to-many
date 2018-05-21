var express = require("express")
var router = express.Router()
var models = require("../models")


router.get('/',function(req,res){
	models.Student.findAll()
	.then(dataStudents =>{
		res.render("./student/list_student",{dataStudents:dataStudents})
	})
})

router.get('/:id/addSubject',function(req,res) {
	models.Student.findById(req.params.id)
	.then(dataStudent =>{
		models.Subject.findAll()
		.then(dataSubjects=>{
			res.render("./student/addSubject_student",{dataStudent:dataStudent,dataSubjects:dataSubjects})	
		}) 
	})

})

router.post('/:id/addSubject',function(req,res){
	models.Student_Subject.create({
		SubjectId:req.body.SubjectId,
		StudentId:req.params.id
	})
	.then(()=>{
		res.redirect('/students')
	})
})


module.exports = router