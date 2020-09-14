CREATE TABLE images (
  itemId INTEGER PRIMARY KEY,
  pictureId1 VARCHAR (50) NOT NULL,
  pictureId2 VARCHAR (50) NOT NULL,
  smallPic BOOLEAN NOT NULL,
  medPic BOOLEAN NOT NULL,
  largePic BOOLEAN NOT NULL
 );

 CREATE TABLE sizeurls (
   id INTEGER PRIMARY KEY,
   size VARCHAR(50),
   size_url VARCHAR(50)
 );