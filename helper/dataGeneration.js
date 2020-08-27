const fs = require('fs');

const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeItems = fs.createWriteStream('images.csv');

//Sample function to get 10,000,000 entries with only 2,000 unique pictures
let globalCounter = 1

let insertUrls = () => {
  let pictureId = 1
  let output = []
  while (globalCounter < 100) {
    let item = {}
    item.itemId = globalCounter
    item.itemImages = []
    item.itemImages[0] = {
      smalll: `https://loremflickr.com/54/54lock=${pictureId}`,
      medium: `https://loremflickr.com/400/400?lock=${pictureId}`,
      large: `https://loremflickr.com/1000/1000?lock=${pictureId}`
    }
    item.itemImages[1] = {
      smalll: `https://loremflickr.com/54/54lock=${pictureId + 1}`,
      medium: `https://loremflickr.com/400/400?lock=${pictureId + 1}`,
      large: `https://loremflickr.com/1000/1000?lock=${pictureId + 1}`
    }
    output.push(item)
    pictureId += 2
    globalCounter++
    if (pictureId > 10) {
      pictureId = 0
    }
  }
  return output
}

// Items 1-2000 in loremflickr are cat photos, so looping through themw ith a simple counter
// will create 1000 unique animal images
// https://loremflickr.com/320/240/dog?lock=100