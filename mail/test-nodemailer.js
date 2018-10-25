var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'shittingPreventionAgent@gmail.com',
		pass: 'NoShittingAnymore'
	},
	tls: {
		rejectUnauthorized: false
	}
});

var mailOptions = {
  from: 'shittingPreventionAgent@gmail.com',
  to: 'mfentler@student.tgm.ac.at',
  subject: 'Email von unserem Raspi',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 