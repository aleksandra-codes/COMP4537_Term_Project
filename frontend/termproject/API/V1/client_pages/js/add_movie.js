import {createYearOptions, 
  createAlert,
  createMovieGenreOptions} from '../../js/utils.js'


window.onload=()=>{
const token = window.localStorage.getItem('token')
if(token != null){
 const year_selector = document.getElementById("movie_year")
  year_selector.innerHTML = createYearOptions(1800, null)

  const genre_selector = document.getElementById("movie_genre")
  genre_selector.innerHTML = createMovieGenreOptions(null)


  const submit_movie = document.getElementById("submit_movie")

  submit_movie.addEventListener("click", function(event){
    event.preventDefault()
    postMovie()
  });
} else {
    window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login_client.html")
}


};

const postMovie = () => {
const xhttp = new XMLHttpRequest();
const token = window.localStorage.getItem('token')
const url = "https://young-u6.azurewebsites.net/API/v1/movie";
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    createAlert('','','Movie was added to the database.','success',true,true,'add_movie_alert')
}
}
const movie_title = document.getElementById("movie_title").value
const movie_year = document.getElementById("movie_year").value
const movie_genre = document.getElementById("movie_genre").value

let data_to_post = new Object()
data_to_post["title"] = movie_title
data_to_post["year"] = parseInt(movie_year)
data_to_post["genre"] = movie_genre
// convert to JSON string
let stringData = JSON.stringify(data_to_post);

// send the data as a POST request
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-type", "text/plain");
xhttp.setRequestHeader("Authorization", "Bearer " + token);
xhttp.send(stringData);

}





