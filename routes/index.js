'use strict'
const express = require('express');
const routes = express.Router();
const models = require('../models');
const Teacher = models.Teacher;
const Subject = models.Subject;
const Student = models.Student;
const StudentSubject = models.StudentSubject;


routes.get('/', (req, res) => {
    res.render('index')
});

module.exports = routes;