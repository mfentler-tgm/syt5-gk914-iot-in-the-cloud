const ip = require('ip')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shittingPreventionAgent@gmail.com',
    pass: 'NoShittingAnymore'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = {
  sendMail: function() {
    const mailOptions = {
      from: 'shittingPreventionAgent@gmail.com',
      to: ['chrispad2k@gmail.com', 'marcrousavy@hotmail.com', 'mfentler@student.tgm.ac.at', 'mborko@tgm.ac.at'],
      subject: 'Basement Shitting Raspberry Camera Picture',
      text: `Here you can see a picture from our camera: ${ip.address()}`
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
