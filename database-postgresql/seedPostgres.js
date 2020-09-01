const { Client } = require('pg')
const client = new Client({
  user: "postgres",
  password: "password",
  port: 5432,
  database: "images"
})

client.connect()
  .then(() => console.log("Connected successfuly"))
  .then(() => client.query(`DROP TABLE IF EXISTS images`))
  .then(() => client.query(`CREATE TABLE images (
    item_id INTEGER PRIMARY KEY,
    pictureId1 INTEGER NOT NULL,
    pictureId2 INTEGER NOT NULL)`
  ))
  // .then(() => client.query('select * from images where name = $1', ['Edmond']))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end())