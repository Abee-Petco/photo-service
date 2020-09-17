var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

// db.dropDatabase()

module.exports.db = db;