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
      to: ['chrispad2k@gmail.com', 'marcrousavy@hotmail.com', 'mfentler@student.tgm.ac.at'],
      subject: '[Shitting Agent] Intruder detected',
      text: `Someone is trying to fill your box again.. </br></br>At: ${Date()} </br></br>IP: ${ip.address()}`
    }

    console.log('Sending Email ...')

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
