const express = require('express');
const router = express.Router();
const { teachersController } = require('./../controllers');

router.get('/', teachersController.getTeachers);

router
  .get('/add', teachersController.addTeacher)
  .post('/add', teachersController.createTeacher);

router
  .get('/edit/:teacherId', teachersController.editTeacher)
  .put('/edit/:teacherId', teachersController.updateTeacher);

router
  .delete('/delete/:teacherId', teachersController.deleteTeacher);

module.exports = router;