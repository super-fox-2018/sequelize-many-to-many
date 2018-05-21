const express = require('express');
const app = express();
const router = require('./routers')
const bodyParse = require('body-parser')


app.set("view engine", "ejs")
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use('',router)
app.listen(3000,function(){
    console.log('begitulah...')
})
