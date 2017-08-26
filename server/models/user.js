'use strict'

const  mongoose   = require('mongoose'),
       Schema     = mongoose.Schema ,
       validator  = require('validator'),
       bcrypt     = require('bcrypt-nodejs'),
       crypto     = require('crypto');

const UserSchema =  new Schema({
    email : {
        type: String,
        validate: {
            validator:function(email){
                    return validator.isEmail(email); 
            }, message: '{VALUE} no es un email valido!'
        }, 
        required: [true, 'Es necesario que agregue un email'],
        unique: true,
        lowercase: true
    },
    displayName: String,
    avatar     : String,
    password   : {
        type: String, 
        select: false
    },
    signupDate : {
        type: Date, 
        defaut: Date.now()
    }, //fecha en que se registra el usuario  
    lastLogin  : Date //dia en que inicia sesion 
});

UserSchema.pre('save', next =>{
    let user = this
    //if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if(err) return next()

                user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function() {
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('tb_user',UserSchema);