const Request = require('tedious').Request;

const app = require('./movie');
const endPoint = "/API/v1/";

class Review {
    constructor(reviewInfo) {
        this.reviewId = reviewInfo[0].value;
        this.movieId = reviewInfo[1].value;
        this.comment = reviewInfo[2].value;
        this.rating = reviewInfo[3].value;
    }
}

function addReview(connection, response, reviewInfo) {
    const INSERTREVIEW = `IF NOT EXISTS (SELECT * FROM reviews WHERE review = '${reviewInfo.comment}')
    INSERT INTO actors (comment, rating) VALUES ('${actorInfo.fullname}', ${actorInfo.age}, '${actorInfo.pictureURL}');`;
    let requestInsert = new Request(INSERTREVIEW, function(err) {
        if(err) throw err;
    });

    requestInsert.on('requestCompleted', function() {
        
    });

    connection.execSql(requestInsert);
    console.log("Insertion completed!");
}

app.post(endPoint + "review",  function(req, res) {
    console.log('Adding a review!');
    let body = '';
    req.on('data', data => {
        body += data;
        body = JSON.parse(body);
        console.log(body);
    });

    req.on('end', () => {
        addReview(connection, res, body);
    });
});