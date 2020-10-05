require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index.js');
const cors = require('cors');
const redis = require('redis');
const client = redis.createClient({ 'host': 'redis' });
// Uncomment the 2 lines below when running the service locally
// const client = redis.createClient();
// const RedisServer = require('redis-server');

// const server = new RedisServer(6379);
const PORT = 3003;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));


let redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  client.get(key, function (err, reply) {
    if (reply) {
      // Needs to be parsed first because its getting a stringified object out of its own database so it can be returned in the proper shape
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  });
};

app.get('/images/urls/:itemId', redisMiddleware, (req, res) => {
  // app.get('/images/url/:itemId', redisMiddleware, (req, res) => {
  db.fetchItemImages(req.params.itemId)
    .then((data) => {
      if (data) {
        client.set(req.params.itemId, JSON.stringify({ data }))
        res.status(200).send({ data });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log('error with app.get: ', err);
      res.status(500).send(err);
    })
})

app.post('/images/urls/:itemId', (req, res) => {
  // console.log('this is the req.body: ', req.body)
  db.insertRecords(req.body)
    .then((data) => {
      if (data) {
        // console.log('this is the data from post: ', data)
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
})


app.put('/images/urls/:itemId', (req, res) => {
  console.log('req.params.itemId: ', req.params.itemId)
  db.updateOne({ itemId: req.params.itemId }, req.body)
    .then((data) => {
      console.log('this is the data: ', data)
      if (data) {
        // console.log('data from updateOne: ', data)
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('error with put request: ', err);
    })
})

app.delete('/itemImages/:itemId', (req, res) => {
  db.deleteOne(req.params.itemId)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('error with patch request: ', err);
    })
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app