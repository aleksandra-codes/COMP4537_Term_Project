CREATE TABLE users (
    userId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    userName NVARCHAR(40) NOT NULL,
    pw NVARCHAR(128) NOT NULL
);