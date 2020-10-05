const fs = require('fs');
const writeItems = fs.createWriteStream('images.csv');
const writeSizeUrls = fs.createWriteStream('sizeUrls.csv');

let globalCounter = 99
let numberOfEntries = 10000100
let pictureId = 1

// Items 1-2000 in loremflickr are cat photos, so looping through them with a simple counter
// will create 2000 unique animal images

console.time('Time to Generate Data: ');

writeItems.write('itemId,pictureId1,pictureId2,smallPic,mediumPic,largePic\n', 'utf8');
writeSizeUrls.write('id,size,sizeUrl\n', 'utf-8');


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
      // The structure is changed in an effort to reduce repeating, as well as increase speed
      // so only the pictureId is needed and it can be stuck to the end of the image url
      pictureId1 = pictureId
      pictureId2 = pictureId + 1
      smallPic = medPic = largePic = true

      let data = `${itemId},${pictureId1},${pictureId2},${smallPic},${medPic},${largePic}\n`;
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

function writeThreeSizeUrls(writer, encoding, callback) {
  let sizeObj = {
    'small': 'https://loremflickr.com/54/54?lock=',
    'medium': 'https://loremflickr.com/400/400?lock=',
    'large': 'https://loremflickr.com/1000/1000?lock='
  }
  for (size in sizeObj) {
    id = Object.keys(sizeObj).indexOf(size) + 1
    size = size
    size_url = sizeObj[size]
    let data = `${id},${size},${size_url}\n`;
    if (id === Object.keys(sizeObj).length) {
      writer.write(data, encoding, callback)
    } else {
      writer.write(data, encoding)
    }
  }
}

writeTenMillionPhotoGalleries(writeItems, 'utf-8', () => {
  console.timeEnd('Time to Generate Data: ');
  writeItems.end();
});

writeThreeSizeUrls(writeSizeUrls, 'utf-8', () => {
  writeSizeUrls.end();
});