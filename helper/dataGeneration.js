const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// var writer = csvWriter()
const writeItems = fs.createWriteStream('images.csv');

let globalCounter = 99
let numberOfEntries = 10000000
let pictureId = 1

// Items 1-2000 in loremflickr are cat photos, so looping through themw ith a simple counter
// will create 1000 unique animal images

console.time('****************************************');

writeItems.write('itemId,itemImages\n', 'utf8');


function writeTenMillionPhotoGalleries(writer, encoding, callback) {
  function write() {
    let ok = true;
    while (globalCounter < numberOfEntries && ok) {
      globalCounter++
      itemId = globalCounter
      // This just loops the 2000 pictures through the 10M created records
      if (pictureId > 2000) {
        pictureId = 1
      }
      // Backticks didn't work, so the data needs to be formed as a string this way
      // Double quotes are needed because of the commas in the object
      itemImages = "[{small: https://loremflickr.com/54/54?lock=" +
        pictureId + ", medium: https://loremflickr.com/400/400?lock=" +
        pictureId + ", large: https://loremflickr.com/1000/1000?lock=" +
        pictureId + "}, {small: https://loremflickr.com/54/54?lock=" +
        (pictureId + 1) + ", medium: https://loremflickr.com/400/400?lock=" +
        (pictureId + 1) + ", large: https://loremflickr.com/1000/1000?lock=" +
        (pictureId + 1) +
        "}]"

      let data = `${itemId},${itemImages}\n`;
      if (globalCounter === numberOfEntries) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        pictureId += 2
      }
    }
    if (globalCounter < numberOfEntries) {
      // console.log('DRAINED!', globalCounter)
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionPhotoGalleries(writeItems, 'utf-8', () => {
  console.timeEnd('****************************************');
  writeItems.end();
});