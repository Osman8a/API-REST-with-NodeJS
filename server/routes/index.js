'use strict'

const express = require('express')
const api  = express.Router()
const auth = require('../middlewares/user')


//controladores
const userCtrl =  require('../controllers/user') 


//user
api.get('/user', userCtrl.getUser)
api.post('/signup',userCtrl.signUp) //crearusuario
api.post('/signin',userCtrl.signIn) //logearse
api.get('/private', auth , (req, res)=>{
    res.status(200).send({message:'Tienes acceso'})
})


module.exports = api 