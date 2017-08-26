'use strict'

const jwt    = require('jwt-simple'),
      moment = require('moment'),
      config = require('../config/config');
   
function createToken(advisor){
    const payload = {
        sub: advisor._id,
        iat: moment().unix(),
        exp: moment().add(1, 'year').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token){
    const decoded = new Promise((resolve, reject) =>{
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){
                reject({
                    status:401,
                    message: 'El token ha expirado'
                })
            }
          resolve(payload.sub)
        } catch (error) {
            reject({
                status:500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
};
