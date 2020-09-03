var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var mediaSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  pictureId1: Number,
  pictureId2: Number
})

var Item = mongoose.model('Item', mediaSchema);

module.exports.db = db;