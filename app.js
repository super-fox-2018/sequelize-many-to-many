'use strict'
const express = require('express')
let app = express()
const bodyParser = require('body-parser')
const router = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use('/', router )
app.set('view engine', 'ejs')
app.listen(3000, () => {
    console.log('App listening on port 3000')
})