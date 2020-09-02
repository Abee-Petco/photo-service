const { Client } = require('pg')
const client = new Client({
  user: "postgres",
  password: "password",
  port: 5432,
  database: "images"
})

let smallUrl = 'https://loremflickr.com/54/54?lock=';
let medUrl = 'https://loremflickr.com/400/400?lock=';
let largeUrl = 'https://loremflickr.com/1000/1000?lock=';

client.connect()
  .then(() => console.log("Connected successfuly"))
  // test to see if it console.logs correctly
  .then(() => client.query('select * from images where itemId = 100'))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end())
