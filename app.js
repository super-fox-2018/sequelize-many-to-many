const express = require('express');
const app = express();
const router = require('./routers')
const bodyParse = require('body-parser')
const helper = require('./helper')


app.set("view engine", "ejs")
app.use((req,res,next)=>{
    res.locals.helper = helper
    next()
})
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use('',router)
app.listen(3000,function(){
    console.log('begitulah...')
})
