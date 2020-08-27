const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeItems = fs.createWriteStream('images.csv');

let globalCounter = 1

// Items 1-2000 in loremflickr are cat photos, so looping through themw ith a simple counter
// will create 1000 unique animal images
// https://loremflickr.com/320/240/dog?lock=100

console.time("data generation test");

writeItems.write('itemId,itemImages\n', 'utf8');

function writeTenMillionPhotoGalleries(writer, encoding, callback) {

  function write() {

    let ok = true;

    let pictureId = 1

    while (globalCounter < 100 && ok) {

      itemId = globalCounter
      // Backticks didn't work, so the data needs to be formed as a string this way
      // Double quotes are needed because of the commas in the object
      itemImages = "[{small: https://loremflickr.com/54/54?lock=" + pictureId + ", medium: https://loremflickr.com/400/400?lock=" + pictureId + ", large: https://loremflickr.com/1000/1000?lock=" + pictureId + "}, {small: https://loremflickr.com/54/54?lock=" + (pictureId + 1) + ", medium: https://loremflickr.com/400/400?lock=" + (pictureId + 1) + ", large: https://loremflickr.com/1000/1000?lock=" + (pictureId + 1) + "}]"

      const data = `${itemId},${itemImages}\n`;

      console.log('data: ', data);

      if (globalCounter === 100) {
        writer.write(data, encoding, callback);

      } else {
        ok = writer.write(data, encoding);
        pictureId += 2
        globalCounter++
        if (pictureId > 2000) {
          pictureId = 0
        }
      }
    }

    if (globalCounter < 100) {
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionPhotoGalleries(writeItems, 'utf-8', () => {
  writeItems.end();
});

console.timeEnd("data generation test");