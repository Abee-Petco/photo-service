const axios = require('axios');

let config = require('./config.js');
let token = config.TOKEN;

let getUnsplashImages = () => {
  let promisesArray = [];
  let collections = ['8711276', '139386', '9718726', '1419973', '3816160', '3133888', '201009', '9118993', '3786223', '7469319', '136098'];
  for (let collection of collections) {
    let options = {
      method: 'get',
      url: `https://api.unsplash.com/collections/${collection}/photos?per_page=100&orientation=squarish`,
      headers: {
        'Authorization': `Client-ID ${token}`,
        'Accept-Version': 'v1'
      }
    }

    promisesArray.push(axios(options));
  }
  return Promise.all(promisesArray)
    .then(responses => {
      let urlsArray = [];
      for (let response of responses) {
        let data = response.data;
        for (value of data) {
          urlsArray.push(value.urls.regular);
        }
      }
      // console.log('Should be a url array', urlsArray)
      return urlsArray;
    });
}

module.exports.getUnsplashImages = getUnsplashImages;
