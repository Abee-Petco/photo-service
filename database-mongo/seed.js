//NOTE, THIS SEED SCRIPT DOES NOT RUN. TO SEED MONGODB, USE THE COMMANY LINE FUNCTION SEEN IN PACKAGE.JSON

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true })


var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
})
  // .then(() => { seedMongo() })
  .catch((err) => console.log('error with seeding mongo database: ', err))



var imageSchema = mongoose.Schema({
  itemId: { type: Number, unique: true },
  itemImages: [
    {
      small: String,
      medium: String,
      large: String
    },
    {
      small: String,
      medium: String,
      large: String
    }
  ]
})

var Image = mongoose.model('Image', imageSchema);

let seedMongo = () => {
  console.time('Time to seed Mongo Database: ')
  let counter = 99
  let totalEntries = 10100
  let pictureId = 1
  while (counter < totalEntries) {
    counter++
    var newImage = new Image({
      itemId: counter,
      itemImages: [
        {
          small: 'https://loremflickr.com/54/54?lock=' + pictureId,
          medium: 'https://loremflickr.com/400/400?lock=' + pictureId,
          large: 'https://loremflickr.com/1000/1000?lock=' + pictureId
        },
        {
          small: 'https://loremflickr.com/54/54?lock=' + pictureId + 1,
          medium: 'https://loremflickr.com/400/400?lock=' + pictureId + 1,
          large: 'https://loremflickr.com/1000/1000?lock=' + pictureId + 1
        }
      ]
    })
    newImage.save()
      .then(() => {
        if (counter === totalEntries) {
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

db.dropDatabase()