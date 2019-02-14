const mail = require('./mail')
const webserver = require('./webserver')
const Gpio = require('onoff').Gpio
const PiCamera = require('pi-camera');
const sqlite = require('sqlite3')

const camera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

const pir = new Gpio(17, 'in', 'both')

var mailEnabled = false

process.argv.slice(1).map((argument) => {
  if (argument == '-m' || argument == '--mail') {
    mailEnabled = true
  }
})

if (mailEnabled) {
  mail.sendMail()
    //open db connection
    let db = new sqlite.Database('./db/sensorDaten.db', (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Connected to the in-memory SQlite database.')
    })

    db.run("CREATE TABLE IF NOT EXISTS aufzeichnung (id INT primary key, timestamp DATE, bild TEXT);")

    var timestamp = new Date().getTime()

    //Close connection again
    db.close((err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Close the database connection.')
    })
}

// webserver.startServer()

pir.watch(function(err, value) {
  if (err) exit()

  console.log('Intruder detected')

  if (value == 1) {
    mail.sendMail()

    //open db connection
    let db = new sqlite.Database('sensorDaten.db', (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Connected to the in-memory SQlite database.')
    })

    db.run("CREATE TABLE IF NOT EXISTS aufzeichnung (id INT primary key, timestamp DATE, bild TEXT);")

    var stmt = db.prepare("INSERT INTO aufzeichung(timestamp,image) VALUES (?,?)");

    camera.snap().then(result => {
      var timestamp = new Date().getTime()
      stmt.run(timestamp, Buffer.from(result).toString('base64'))
    })

    //Close connection again
    db.close((err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Close the database connection.')
    })
  }
})

function exit() {
  pir.unexport()
  process.exit()
}
