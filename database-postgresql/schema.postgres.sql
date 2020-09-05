CREATE TABLE images (
  itemId INTEGER PRIMARY KEY,
  pictureId1 INTEGER NOT NULL,
  pictureId2 INTEGER NOT NULL,
  smallPic BOOLEAN,
  medPic BOOLEAN,
  largePic BOOLEAN
 );

 CREATE TABLE sizes (
   id INTEGER PRIMARY KEY,
   size VARCHAR(50),
   size_url VARCHAR(50)
 );