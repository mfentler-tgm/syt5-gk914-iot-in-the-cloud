var nodemailer = require("nodemailer")
var ip = require("ip")

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shittingPreventionAgent@gmail.com",
    pass: "NoShittingAnymore"
  },
  tls: {
    rejectUnauthorized: false
  }
})

var mailOptions = {
  from: "shittingPreventionAgent@gmail.com",
  to: ["michaelborko@gmail.com", "chrispad2k@gmail.com"],
  subject: "Email von unserem Raspi",
  text: `we wish you a merry christmas - IP: ${ip.address()}`
}

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log("Email sent: " + info.response)
  }
})
