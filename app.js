'use strict'

// Express
const express = require('express');
const bodyParser = require('body-parser');
const rootRoutes = require('./routes');
const studentRoutes = require('./routes/student.js');
const subjectRoutes = require('./routes/subject.js');
const teacherRoutes = require('./routes/teacher.js');
const models = require('./models');

let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', rootRoutes);
app.use('/student', studentRoutes);
app.use('/subject', subjectRoutes);
app.use('/teacher', teacherRoutes);

app.listen(3000, () => console.log('Express started on port 3000'));
