CREATE TABLE cast (
    movieId INT NOT NULL,
    actorId INT NOT NULL,
    act_role CHAR(30)
    CONSTRAINT cast_pk
        PRIMARY KEY (movieId, actorId)
    
    CONSTRAINT movie_pk
        FOREIGN KEY(movieId)
        REFERENCES movies (movieId)
        ON DELETE CASCADE,
    CONSTRAINT actor_pk
        FOREIGN KEY(actorId)
        REFERENCES actors (actorId)
        ON DELETE CASCADE
);