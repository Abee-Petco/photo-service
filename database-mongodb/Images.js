const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const imageSchema = new mongoose.Schema({
  itemId: String,
  itemImages: [{ small: String, medium: String, large: String }]
});

const Image = mongoose.model('Image', imageSchema);

function insertRecords(records) {
  // console.log("records:", records);
  return Image.insertMany(records);
}

function fetchItemImages(itemId) {
  return Image.findOne({ itemId: itemId }, '-_id -__v');
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
