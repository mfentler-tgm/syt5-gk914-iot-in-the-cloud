const http = require('http')
const PiCamera = require('pi-camera')
const ip = require('ip')
const fs = require('fs')
const url = require('url')


const PORT = 80

var imgpath = `${__dirname}/test.jpg`
var address = ip.address()

const myCamera = new PiCamera({
  mode: 'photo',
  output: imgpath,
  width: 640,
  height: 480,
  nopreview: true
})

module.exports = {
  startServer: function() {
    const server = http.createServer((req, res) => {
      myCamera.snap()
        .then((result) => {
          var img = fs.readFileSync(imgpath)
          res.writeHead(200, {'Content-Type': 'image/jpg'})
          res.end(img, 'binary')
          return
        })
        .catch((error) => {
          res.end(`Error! ${error}`)
        })
    }).listen(PORT)

    server.on('close', () => {
      console.log('Server shut down')
    })

    console.log(`Server running on localhost:${PORT}`)
  }
}
