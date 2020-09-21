const insertImages = require('../database-fec/insert_images.js');
const Images = require('../database-fec/Images.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/index.js');

beforeAll(() => {
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
      return Images.deleteAll()
    })
    .then(() => {
      let imageDataForSingleItem =
      {
        itemId: '10',
        itemImages: [{
          small: 'https://images.unsplash.com/photo-1?w=54',
          medium: 'https://images.unsplash.com/photo-1?w=400',
          large: 'https://images.unsplash.com/photo-1?w=1000'
        },
        {
          small: 'https://images.unsplash.com/photo-2?w=54',
          medium: 'https://images.unsplash.com/photo-2?w=400',
          large: 'https://images.unsplash.com/photo-2?w=1000'
        }]
      }
      return request(app).post('/itemImages/1000').send(imageDataForSingleItem)
      // return Images.insertRecords([imageDataForSingleItem])
    })
})

afterAll(() => {
  return mongoose.connection.close();
})

test('successfully retrieves image data for item 10', () => {
  return request(app).get('/itemImages/10')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.itemId).toBe('10');
      expect(response.body.itemImages.length).toBe(2);
      expect(response.body.itemImages[0].small).toBe('https://images.unsplash.com/photo-1?w=54');
      expect(response.body.itemImages[0].medium).toBe('https://images.unsplash.com/photo-1?w=400');
      expect(response.body.itemImages[0].large).toBe('https://images.unsplash.com/photo-1?w=1000');
      expect(response.body.itemImages[1].small).toBe('https://images.unsplash.com/photo-2?w=54');
      expect(response.body.itemImages[1].medium).toBe('https://images.unsplash.com/photo-2?w=400');
      expect(response.body.itemImages[1].large).toBe('https://images.unsplash.com/photo-2?w=1000');
    })
});

test('successfully retrieves main image url for item 10', () => {
  return request(app).get('/itemImages/10/mainImage')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.image).toBe('https://images.unsplash.com/photo-1?w=54')
    })
});

test('returns 404 status code if item not found', () => {
  return request(app).get('/itemImages/200')
    .then((response) => {
      expect(response.status).toBe(404);
    })
});

test('returns 404 status code if main image not found', () => {
  return request(app).get('/itemImages/200/mainImage')
    .then((response) => {
      expect(response.status).toBe(404);
    })
});

test('successfully changes the data in an image ', () => {
  let changedData = {
    itemImages: [{
      small: 'test',
      medium: 'test',
      large: 'test'
    },
    {
      small: 'test',
      medium: 'test',
      large: 'test'
    }]
  }
  return request(app).put('/itemImages/10')
    .send(changedData)
    .then(() => { return request(app).get('/itemImages/10') })
    .then((response) => {
      console.log('this is the response: ', response.body)
      expect(response.status).toBe(200);
      expect(response.body.itemId).toBe('10')
      expect(response.body.itemImages[0].small).toBe('test')
    })
});

test('successfully removes image data for item 10', () => {
  return request(app).delete('/itemImages/10')
    .then(() => {
      request(app).get('/itemImages/10')
        .then((response) => {
          expect(response.status).toBe(404);
        })
    })
});
