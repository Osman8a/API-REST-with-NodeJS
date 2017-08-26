'use strict'
var EmailTemplates    = require('swig-email-templates');
var path   			  = require('path');
var dir    			  = path.dirname(require.main.filename);
var nodemailer        = require('nodemailer');


var templates = new EmailTemplates({
		root: dir + '/mailer/templates/'
	});

/*var transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth: {
            user: 'ochoaosman@gmail.com',
            pass: 'qylcxwqhacidepyn'
        }
    });*/

	var transporter  = nodemailer.createTransport({
	//service:'yandex',
	host: 'lista123.com',
	port: 587,
	secure: false, // use SSL
	auth:{
	    user:'ventas@lista123.com',
	    pass:'password_ventas@#$'
	}
});

var mailOptions = {
        from:    'ventas@lista123.com',  //from: 'Osman Ochoa <ochoaosman@gmail.com>',
       to:      '',  //to: 'oochoa@pinttosoft.com',
       subject: 'Lista123 - Solicitud enviada satisfactoriamente',   //subject: 'tienes un correo desde NodeJs',
        text:    '',    //text: 'Tienes un nuevo mjs',
        html:    ''        //html: '<h1> Hola, como estas?..</h1>'
 };


 var sender = function (req, reason) {
    templates.render(reason+'.html', req.context, function(err, html, text) {
		console.log("funcion sender"+req.body.correo);
			mailOptions.html = html;
      		mailOptions.text = text;
			mailOptions.to   = req.body.correo;
			transporter.sendMail(mailOptions,function(error, respuesta){
				if(error){
					console.log('Error al enviar correo de bienvenida'+error);
				}else{
					console.log('Mensaje de Bienvenida enviado');
				}
	    	});
		});   
};

 exports.sender     = sender;
