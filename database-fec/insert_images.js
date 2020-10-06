const Images = require('./Images.js');
const url = require('url');

let insertImages = function (urls) {
  let imageArray = modifyImageData(urls);
  let allImagesObject = groupImageData(imageArray);
  return Images.insertRecords(Object.values(allImagesObject));
}

let modifyImageData = function(imageUrls) {
  let imageArray = [];
  let sizesObj = {small: '54', medium: '400', large: '1000'}
  for (let value of imageUrls) {
    let imageObject = {};
    for (let size in sizesObj) {
      let parsed = url.parse(value, true);
      parsed.query.w = sizesObj[size];
      delete parsed.search;
      imageObject[size] = url.format(parsed);
    }
    imageArray.push(imageObject);
  }
  return imageArray;
}

let groupImageData = (imageArray) => {
  let allImagesObject = {};
  let itemId = 100;
  let imageNum = 1;
  for (let imageObj of imageArray) {
    if (itemId <= 199 && imageNum === 1) {
      allImagesObject[itemId] = {itemId: itemId, itemImages: [imageObj]};
    } else if (itemId > 199 && imageNum < 4) {
      itemId = 100;
      imageNum += 1;
      allImagesObject[itemId].itemImages.push(imageObj);
    } else if (itemId <= 199 && (imageNum > 1 && imageNum < 4)) {
      allImagesObject[itemId].itemImages.push(imageObj);
    } else {
      break;
    }
    itemId += 1;
  }
  return allImagesObject;
}

module.exports = insertImages;
