const express = require('express');
const router = express.Router();
const teacherRouter = require('./teacher.js')
const subjectRouter = require('./subject.js')
const studentRouter = require('./student.js')

router.get('/',(req,res)=>{
    res.render('homepage')
})
router.use('/teacher',teacherRouter)
router.use('/subject',subjectRouter)
router.use('/student',studentRouter)
module.exports = router