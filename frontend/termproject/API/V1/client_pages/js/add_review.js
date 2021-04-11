import {createRatingOptions, 
  createMovieOptions, 
  createMovieGenreOptions, 
  createAlert } from '../../js/utils.js'

window.onload=()=>{
const token = window.localStorage.getItem('token')
if(token != null){
 loadMovieOptions()
  const rating = document.getElementById("rating")
  rating.innerHTML = createRatingOptions()

  const submit_movie = document.getElementById("submit_movie")
  
  submit_movie.addEventListener("click", function(event){
    event.preventDefault()
    postReview()
  });
} else {
    window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login_client.html")
}
};


const loadMovieOptions = () => {
 return new Promise(function (resolve, reject){
    const xhttp = new XMLHttpRequest();
    const url = "https://young-u6.azurewebsites.net/API/v1/movie";
    const token = window.localStorage.getItem('token')
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const res_arr = JSON.parse(this.responseText)
        let opt_arr = [];
        for(let value in res_arr){
            opt_arr[value] = {title: res_arr[value].title, 
                                id: res_arr[value].movieId}
            
        }
        const movie_selector = document.getElementById("movie_title")
        movie_selector.innerHTML = createMovieOptions(opt_arr)

        createMovieOptions(opt_arr)
    }
}
xhttp.open("GET", url, true);
xhttp.setRequestHeader("Authorization", "Bearer " + token);
xhttp.setRequestHeader("Content-type", "text/plain");
xhttp.send();
     
 }).then(function(value) {
    const movie_selector = document.getElementById("movie_title")
    movie_selector.innerHTML = createMovieOptions(value)
    
}).catch();
}



const postReview = () => {
  const token = window.localStorage.getItem('token')
  const xhttp = new XMLHttpRequest();
  const url = "https://young-u6.azurewebsites.net/API/v1/review/";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        createAlert('','','Review was added to the database.','success',true,true,'add_movie_alert')
    }
  }
  const movie_options = document.getElementById("movie_title").options
  const selected_index = document.getElementById("movie_title").selectedIndex
  const current_option = movie_options[selected_index].id
  const comment = document.getElementById("comment").value
  
  const rating = document.getElementById("rating").value
  
  let data_to_post = new Object()
  data_to_post["movieId"] = parseInt(current_option)
  data_to_post["comment"] = comment
  data_to_post["rating"] = parseInt(rating)
  // convert to JSON string
  let stringData = JSON.stringify(data_to_post);
  
  // send the data as a POST request
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send(stringData);

}









