const express = require('express');
const router = express.Router();
const models = require('../models');
const Teacher = models.Teacher;
const Subject = models.Subject;

router.get('/', (req, res) => {
    Teacher.findAll({
        include: [Subject],
        order: [['id', 'ASC']]
    })
        .then(function (teachers) {
            res.render('teachers', { teachers: teachers});
        })
        .catch(function (err) {
            res.send(err.message);
        })
})

router.get('/add', (req, res) => {
    res.render('formTeacher', {message: '', person : {}});
});

router.post('/add', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    Teacher.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    })
        .then(function (teacher) {
            res.render('formTeacher', {message:'Add teacher success!', person:{}});
        })
        .catch(function (err) {
            res.render('formTeacher',{ message: err.message, person: {}})
        })
})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    let url = req.originalUrl;
    Teacher.findById(id)
        .then((teacher) => {
            if (teacher) {
                res.render('formTeacher', {message: '', person : teacher});
            }
            else{
                res.render('formTeacher', {message: '', person : {}});
            }
        })
        .catch(function(err){
            res.render('formTeacher',{ message: err.message, teacher: {}})
        })
});

router.post('/edit/:id', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let id = req.params.id;
    let updateTeacher = req.body;
    Teacher.update(
        {   id : id,
            firstName: firstName,
            lastName: lastName,
            email: email
        },
        { where: { id: id } }
    )
        .then(function (result) {
            res.render('formTeacher', {message: '', person : result});
        })
        .catch(function (err) {
            res.render('formTeacher',{ message: err.message, person: {}})
        });
});

router.get('/delete/:id', (req,res) =>{
    let id = req.params.id;
    Teacher.destroy({
        where: {id}
    })
    .then((result)=>{
        res.send('Delete data teacher success!')
        // res.redirect('/teachers');
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

module.exports = router;