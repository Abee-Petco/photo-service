const express = require('express');
const bodyParser = require('body-parser');
const Images = require('../database-mongodb/Images.js');
const connect = require('../database-mongodb/connect.js')
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/itemImages/:itemId', function (req, res) {
  // console.log(req.params.itemId);
  Images.fetchItemImages(req.params.itemId)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

app.get('/itemImages/:itemId/mainImage', function (req, res) {
  // console.log(req.params.itemId);
  Images.fetchItemImages(req.params.itemId)
    .then((data) => {
      if (data) {
        res.status(200).send({ image: data.itemImages[0].small });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

app.post('/itemImages/:itemId', (req, res) => {
  console.log('this is the req.body: ')
  Images.insertRecords(data)
    .then((data) => {
      if (data) {
        console.log('this is the data from post: ', data)
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
})


app.put('/itemImages/:itemId', (req, res) => {
  Images.findByIdAndUpdate(req.params.itemId)
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

module.exports = app
