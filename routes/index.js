const express = require('express');
const router = express.Router();
const homeRoute = require('./home-route');
const studentsRoute = require('./students-route');
const subjectsRoute = require('./subjects-route');
const teachersRoute = require('./teachers-route');

router.use('/students', studentsRoute);
router.use('/subjects', subjectsRoute);
router.use('/teachers', teachersRoute);
router.use('/', homeRoute);

module.exports = router;