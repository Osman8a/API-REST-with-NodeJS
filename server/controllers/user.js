'use strict'

const User = require('../models/user'),
      service = require('../services');

function getUser(req, res){
    User.find({},(err,user)=>{
        Patient.populate(user, {path:"pacientes"},(err,user)=>{
          if(err) res.status(500).send({message:`Error en la peticion ${err}`})
          if(!user) return res.status(404).send({message:'user no existen'})

          res.status(200).send({user: user})  
        });
    });
}

function createUser(req, res){
    console.log('POST /user');

    var user = new User();
        user.correo = req.body.correo
        user.clave = req.body.clave
        user.nombre= req.body.nombre;
        
        user.save((err, UserStored)=>{
              if(err) res.status(500).send(`Error al guardar el user porque ${err}`)
               res.status(200).send({message:'user guardado satisfactoriamente'})
       })
}

function deleteUser(req, res){
    var userId = req.params.userId

    User.findById(userId, function(err, user){
        if(err) return res.status(500).send({message:'Error al realizar la peticion'})

        user.remove(err =>{
            if(err) return res.status(500).send({message:'Error al eliminar el psicopedagogo'})
            res.status(200).send({message:'Psicopedagogo eliminado satisfactoriamente'})
        })
    })
}

function updateUser(req, res){
    var userId = req.params.userId
    var update = req.body

    User.findByIdAndUpdate(userId, update,(err, userUpdate)=>{
        if(err) return res.status(500).send({message:'Error al realizar la peticion'})

        res.status(200).send({message:userUpdate})
    })
}
/**Crear Usuario */
function signUp(req, res){
    const user = new User({
        email      : req.body.email,
        displayName: req.body.displayName,
        password   : req.body.password,
        patients   : req.body.patients
    });

    user.save((err) => {
        if(err) return res.status(500).send({message: `Error al crear el usuario:${err}`})

        return res.status(201).send({token: service.createToken(user)})
    });
}


function signIn(req, res){
    User.find({email: req.body.email}, (err, user) =>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message:'No existe el psicopedagogo'})

        req.user = user
        res.status(200).send({
          message: 'Te has logeado correctamente',
          token: service.createToken(user)
        })
    })
}


    module.exports = {
        getUser,
        deleteUser,
        updateUser,
        signUp,
        createUser,
        signIn
    }