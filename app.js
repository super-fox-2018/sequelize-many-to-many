const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const helpers = require('./helpers');
const teachers = require('./routes/teachers');
const students = require('./routes/students');
const subjects = require('./routes/subjects');
// const subjects = require('./routes/subjects');



const app = express();

app.use(function(req,res,next){
    res.locals.oriUrl = req.originalUrl;
    res.locals.upperCase = helpers.strUpperCase;
    res.locals.fullName = helpers.fullName;
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.set ('view engine', 'ejs');
app.use('/', routes);
app.use('/teachers', teachers);
app.use('/students', students);
app.use('/subjects', subjects);


app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})