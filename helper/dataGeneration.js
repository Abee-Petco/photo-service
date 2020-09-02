const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// var writer = csvWriter()
const writeItems = fs.createWriteStream('images.csv');

let globalCounter = 99
let numberOfEntries = 10000100
let pictureId = 1

// Items 1-2000 in loremflickr are cat photos, so looping through them with a simple counter
// will create 2000 unique animal images

console.time('Time to Generate Data: ');

writeItems.write('itemId,pictureId1,pictureId2\n', 'utf8');


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
      pictureId1 = pictureId
      pictureId2 = pictureId + 1

      let data = `${itemId},${pictureId1},${pictureId2}\n`;
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
  console.timeEnd('Time to Generate Data: ');
  writeItems.end();
});