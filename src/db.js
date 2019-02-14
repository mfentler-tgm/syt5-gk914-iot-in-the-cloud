  const sqlite = require('sqlite3')
 //open db connection
 let db = new sqlite.Database('sensorDaten.db', (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the in-memory SQlite database.')
})

db.run("CREATE TABLE IF NOT EXISTS aufzeichnung (timestamp DATE, bild TEXT);")

var stmt = db.prepare("INSERT INTO aufzeichnung(timestamp,bild) VALUES (?,?)");

var timestamp = new Date().getTime()
stmt.run(timestamp,'Osman ist gay')
stmt.finalize();

//Close connection again
db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Close the database connection.')
})

