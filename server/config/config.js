/*
'use stict'
// config.js
module.exports = {  
  TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto"
};

*/
//27017

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.PORT || 'mongodb://localhost:27017:/terapin',
  SECRET_TOKEN: '?-=.73194682TDAH'
}


/*module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://distribuidorasas:1qaz2wsxdsas@localhost:47500/dbdistribuidora'
}
*/
