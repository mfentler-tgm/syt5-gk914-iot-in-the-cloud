const ip = require('ip')
const path = require('path')
const express = require('express')

const PORT = 80
const ADDRESS = ip.address()

// var imgpath = `${__dirname}/test.jpg`

// const myCamera = new PiCamera({
//   mode: 'photo',
//   output: imgpath,
//   width: 640,
//   height: 480,
//   nopreview: true
// })

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = {
  // startServer: function() {
  //   const server = http.createServer((req, res) => {
  //     myCamera.snap()
  //       .then((result) => {
  //         var img = fs.readFileSync(imgpath)
  //         res.writeHead(200, {'Content-Type': 'image/jpg'})
  //         res.end(img, 'binary')
  //         return
  //       })
  //       .catch((error) => {
  //         res.end(`Error! ${error}`)
  //       })
  //   }).listen(PORT)

  //   server.on('close', () => {
  //     console.log('Server shut down')
  //   })

  //   console.log(`Server running on localhost:${PORT}`)
  // }
  startServer: function() {
    app.listen(PORT, () => {
      console.log(`Webserver with Livestream listening on ${ADDRESS}:${PORT}`)
    })
  }
}
