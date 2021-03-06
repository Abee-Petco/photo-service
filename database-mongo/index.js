var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

const imageSchema = new mongoose.Schema({
  itemId: Number,
  pic1Small: String,
  pic1Med: String,
  pic1Large: String,
  pic2Small: String,
  pic2Med: String,
  pic2Large: String
});

const Image = mongoose.model('url', imageSchema);

function insertRecords(records) {
  // console.log("records:", records);
  return Image.insertMany(records);
}

function fetchItemImages(itemId) {
  // console.log('fetchImages invoked')
  return Image.find({ 'itemId': Number(itemId) })
}

function fetchAll() {
  return Image.find({});
}

function deleteOne(id) {
  return Image.deleteOne({ 'itemId': id });
}

function deleteAll() {
  return Image.remove({});
}

function updateOne(filter, update) {
  return Image.findOneAndUpdate(filter, update)
}

module.exports = Image;
module.exports.insertRecords = insertRecords;
module.exports.fetchItemImages = fetchItemImages;
module.exports.fetchAll = fetchAll;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;
module.exports.deleteAll = deleteAll;
module.exports.db = db;