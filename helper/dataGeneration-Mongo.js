const fs = require('fs');
const writeItems = fs.createWriteStream('mongoImages.csv');

let globalCounter = 99
let numberOfEntries = 10000100
let pictureId = 1

// Items 1-2000 in loremflickr are cat photos, so looping through them with a simple counter
// will create 2000 unique animal images

console.time('Time to Generate Data: ');

writeItems.write('itemId,pic1Small,pic1Med,pic1Large,pic2Small,pic2Med,pic2Large,\n', 'utf8');


function writeTenMillionPhotoGalleries(writer, encoding, callback) {
  function write() {
    let ok = true;
    while (globalCounter < numberOfEntries && ok) {
      globalCounter++
      itemId = globalCounter
      // This just loops the 1000 pictures through the 10M created records
      if (pictureId > 1000) {
        pictureId = 1
      }
      pic1Small = 'https://loremflickr.com/54/54?lock=' + pictureId
      pic1Med = 'https://loremflickr.com/400/400?lock=' + pictureId
      pic1Large = 'https://loremflickr.com/1000/1000?lock=' + pictureId
      pic2Small = 'https://loremflickr.com/54/54?lock=' + (pictureId + 1)
      pic2Med = 'https://loremflickr.com/400/400?lock=' + (pictureId + 1)
      pic2Large = 'https://loremflickr.com/1000/1000?lock=' + (pictureId + 1)

      let data = `${itemId},${pic1Small},${pic1Med},${pic1Large},${pic2Small},${pic2Med},${pic2Large}\n`;
      if (globalCounter === numberOfEntries) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        pictureId += 2
      }
    }
    if (globalCounter < numberOfEntries) {
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionPhotoGalleries(writeItems, 'utf-8', () => {
  console.timeEnd('Time to Generate Data: ');
  writeItems.end();
});
