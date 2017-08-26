'use strict' // importacion del modulo

const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      api = require('./routes'),
      hbs = require('express-handlebars');


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json()) //para poder hacer peticiones en formato Json
/*
app.use(permitirCrossDomain);
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
*/
/**Configuro mi motor de plantillas */
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine','.hbs') 
/**-------------------------------- */
app.use('', api)
app.get('/login',(req,res)=>{
   res.render('login')
})

module.exports = app

