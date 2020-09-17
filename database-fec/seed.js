const unsplash = require('../helper/unsplash.js');
const insertImages = require('./insert_images.js');
const connect = require('./connect.js');
const mongoose = require('mongoose');

connect()
  .then(() => {
    return unsplash.getUnsplashImages()
  })
  .then((urlsArray) => {
    return insertImages(urlsArray);
  })
  .then(() => {
      console.log('Successfully inserted images');
      mongoose.connection.close();
  })
  .catch(
    (error) => console.log(error)
  );
