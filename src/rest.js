const express = require('express')
var bodyParser = require('body-parser')

const PORT = 81

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/', router);

app.listen(PORT);
console.log('ReST Server running on ' + PORT);
