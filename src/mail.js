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
      from: '"President Donald Trump 💩" <og.donaldtrump@whitehouse.gov>',
      to: ['chrispad2k@gmail.com', 'marcrousavy@hotmail.com', 'mfentler@student.tgm.ac.at', 'mborko@tgm.ac.at'],
      subject: 'Basement Shitting Raspberry Camera Picture',
      text: `Here you can see a picture from our camera: http://${ip.address()}\n\r\n\r\n\rYours sincerly - Basement Shitting Prevention Team\n\r\n\r\n\r\n\r\n\r(For the automatic laser taser system please upgrade to a premium plan for $99.99/year)`,
      html: `Here you can see a picture from our camera: <a href="http://${ip.address()}">RASPBERRY PI SERVER</a><br />Embed: <img src="http://${ip.address()}"/><br/><br/><i>Yours sincerly - Basement Shitting Prevention Team <br/><br/><br/><br/>(For the automatic laser taser system please upgrade to a premium plan for $99.99/year)</i>`
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
