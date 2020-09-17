const fs = require('fs');
const { images } = require('../cloudinary.js');
const writeItems = fs.createWriteStream('mongoImages.tsv');

let globalCounter = 99
let numberOfEntries = 10000100
let index = 0


console.time('Time to Generate Data: ');

writeItems.write('itemId\tpic1Small\tpic1Med\tpic1Large\tpic2Small\tpic2Med\tpic2Large\t\n', 'utf8');


function writeTenMillionPhotoGalleries(writer, encoding, callback) {
  function write() {
    let ok = true;
    while (globalCounter < numberOfEntries && ok) {
      if (index === images.length - 2) {
        index = 0
      }
      globalCounter++
      // The itemId is just the global counter
      itemId = globalCounter
      pic1Small = "https://res.cloudinary.com/dq3iywusm/image/upload/w_54,h_54/" + images[index].public_id + "." + images[index].format
      pic1Med = "https://res.cloudinary.com/dq3iywusm/image/upload/w_400,h_400/" + images[index].public_id + "." + images[index].format
      pic1Large = "https://res.cloudinary.com/dq3iywusm/image/upload/w_1000,h_1000/" + images[index].public_id + "." + images[index].format
      pic2Small = "https://res.cloudinary.com/dq3iywusm/image/upload/w_54,h_54/" + images[index + 1].public_id + "." + images[index + 1].format
      pic2Med = "https://res.cloudinary.com/dq3iywusm/image/upload/w_400,h_400/" + images[index + 1].public_id + "." + images[index + 1].format
      pic2Large = "https://res.cloudinary.com/dq3iywusm/image/upload/w_1000,h_1000/" + images[index + 1].public_id + "." + images[index + 1].format

      let data = `${itemId}\t${pic1Small}\t${pic1Med}\t${pic1Large}\t${pic2Small}\t${pic2Med}\t${pic2Large}\n`;
      // This just loops the 1000 pictures through the 10M created records
      if (globalCounter === numberOfEntries) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        index += 2
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
