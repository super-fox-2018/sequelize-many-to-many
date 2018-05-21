const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
// const teachers = require('./routes/teachers');
// const students = require('./routes/students');
// const subjects = require('./routes/subjects');



const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set ('view engine', 'ejs');
app.use('/', routes);
// app.use('/', teachers);
// app.use('/', students);
// app.use('/', subjects);


app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})