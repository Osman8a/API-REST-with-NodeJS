'use strict'


module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017:/terapin',
  SECRET_TOKEN: '?-=.73194682TDAH'
}