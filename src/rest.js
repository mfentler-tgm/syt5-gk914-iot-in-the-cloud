const express = require('express')
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose();

const PORT = 81

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    var db = new sqlite3.Database('./db/sensorDaten.db');

    db.serialize(function() {
        db.each('SELECT * FROM aufzeichnung', function(err, row) {
            console.log(row.id + ': ' + row.info);
            res.json({ message: row.id + ': ' + row.info});
        });
    });

    db.close();
    // res.json({ message: 'returned' });
});

app.use('/', router);

app.listen(PORT);
console.log('ReST Server running on ' + PORT);
