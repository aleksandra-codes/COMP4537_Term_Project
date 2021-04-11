CREATE TABLE reviews (
    reviewId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    movieId int NOT NULL,
    comment VARCHAR(500),
    rating int check (rating between 1 and 5),
    FOREIGN KEY(movieId) REFERENCES movies(movieId)
);