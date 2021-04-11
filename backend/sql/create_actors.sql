CREATE TABLE actors (
    actorId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    year INT,
    pictureURL VARCHAR(400),
);