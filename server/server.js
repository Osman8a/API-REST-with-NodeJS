'use strict' // importacion del modulo

/** Passport Config **/
const mongoose = require('mongoose'),
      app = require('./app'),
      config = require('./config/config');
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////CONEXION MONGO/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(config.db)
    .then(() => {
        console.log('Conexion a la base de datos establecida');
        app.listen(config.port, () => {
            console.log('Api REST escuchando en el puerto ' + config.port);
        })
    })
    .catch(err => {
        console.log('Conexion a la base de datos establecida');
    });