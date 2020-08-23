const express = require('express');
const bodyParser = require('body-parser');
const Images = require('../database-mongodb/Images.js');
const connect = require('../database-mongodb/connect.js')
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/itemImages/:itemId', function(req, res) {
  console.log(req.params.itemId);
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

app.get('/itemImages/:itemId/mainImage', function(req, res) {
  console.log(req.params.itemId);
  Images.fetchItemImages(req.params.itemId)
    .then((data) => {
      if (data) {
        res.status(200).send({image: data.itemImages[0].small});
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

module.exports = app
