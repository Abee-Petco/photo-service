var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true })


var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
})
  .then(() => { seedMongo() })
  .catch((err) => console.log('error with seeding mongo database: ', err))



var imageSchema = mongoose.Schema({
  itemId: { type: Number, unique: true },
  pictureId1: Number,
  pictureId2: Number
})

var Image = mongoose.model('Image', imageSchema);

let seedMongo = () => {
  console.time('Time to seed Mongo Database: ')
  let counter = 99
  let totalEntries = 10000100
  let pictureId = 1
  while (counter < totalEntries) {
    counter++
    var newImage = new Image({
      itemId: counter,
      pictureId1: pictureId,
      pictureId2: pictureId + 1
    })
    newImage.save()
      .then(() => {
        if (i === totalEntries - 1) {
          console.timeEnd('Time to seed Mongo Database: ')
          db.close()
        }
      })
      .catch(err => console.log('error with newImage.save: ', err))
    pictureId += 2
    if (pictureId > 2000) {
      pictureId = 1
    }
  }
}

// db.dropDatabase()