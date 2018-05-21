var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var students = require("./routes/students.js")
var subjects = require("./routes/subjects.js")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/students',students) 
app.use('/subjects',subjects) 


app.listen(3000,function(req,res) {
	console.log("listen")
})