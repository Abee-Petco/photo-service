require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const Image = require('../database-mongo/index.js');
const cors = require('cors');
const redis = require('redis');
const client = redis.createClient();
const RedisServer = require('redis-server');

const server = new RedisServer(6379);
const PORT = 3003;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

server.open((err) => {
  if (err === null) {
    console.log('redis server working')
  }
})

let redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  client.get(key, function (err, reply) {
    if (reply) {
      res.send(reply);
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
  Image.fetchItemImages(Number(req.params.itemId))
    .then((data) => {
      if (data) {
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
  Images.insertRecords(req.body)
    .then((data) => {
      if (data) {
        console.log('this is the data from post: ', data)
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
})


app.put('/images/urls/:itemId', (req, res) => {
  console.log('req.params.itemId: ', req.params.itemId)
  Images.updateOne({ itemId: req.params.itemId }, req.body)
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
  Images.deleteOne(req.params.itemId)
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