const express = require('express');
const router = express.Router();
const { subjectsController } = require('./../controllers');


router.get('/', subjectsController.getSubjects);

router
  .get('/add', subjectsController.addSubject)
  .post('/add', subjectsController.createSubject);

router
  .get('/edit/:subjectId', subjectsController.editSubject)
  .put('/edit/:subjectId', subjectsController.updateSubject);

router
  .delete('/delete/:subjectId', subjectsController.deleteSubject);

module.exports = router;