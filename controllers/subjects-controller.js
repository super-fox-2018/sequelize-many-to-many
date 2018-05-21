const { Subject } = require('./../models');

exports.getSubjects = (req, res) => {
  return Subject.findAll({
    order: [['id', 'ASC']],
    raw : true
  })
    .then(subjects => {
      res.render('index', { 
        title: 'Subjects',
        tableName: 'subjects', 
        records: subjects,
        h: helpers,
      })
    });
}

exports.addSubject = (req, res) => {
  res.render('form', { 
    title: 'Add Subject',
    mode: 'Add',
    tableName: 'subjects',
    columns: ['subject_name'],
    h : helpers,
  });
}

exports.createSubject = (req, res) => {
  const newSubject = req.body;
  return Subject.create(newSubject)
    .then(result => res.redirect('/subjects'));
}

exports.editSubject = (req, res) => {
  const { subjectId } = req.params;
  return Subject.findById(subjectId, { raw : true })
    .then(subject => res.render('form', { 
      title: 'Edit Subject', 
      mode: 'Edit',
      tableName: 'subjects',
      columns: ['subject_name'],
      record: subject,
      h : helpers,
    }));
}

exports.updateSubject= (req, res) => {
  const { subjectId } = req.params;
  const updatedSubject = req.body;
  return Subject.update(updatedSubject, { where : { id : subjectId }})
    .then(result => res.redirect('/subjects'));
}

exports.deleteSubject = (req, res) => {
  const { subjectId } = req.params;
  return Subject.destroy({ where : { id : subjectId }})
    .then(result => res.redirect('/subjects'));
}