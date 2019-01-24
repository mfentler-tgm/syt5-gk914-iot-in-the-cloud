const mail = require('./mail')
const webserver = require('./webserver')
const Gpio = require('onoff').Gpio

const pir = new Gpio(17, 'in', 'both')

var mailEnabled = false

process.argv.slice(1).map((argument) => {
  if (argument == '-m' || argument == '--mail') {
    mailEnabled = true
  }
})

if (mailEnabled) {
  mail.sendMail()
}

// webserver.startServer()

pir.watch(function(err, value) {
  if (err) exit()

  console.log('Intruder detected')

  if (value == 1) {
    mail.sendMail()
  }
})

function exit() {
  pir.unexport()
  process.exit()
}
