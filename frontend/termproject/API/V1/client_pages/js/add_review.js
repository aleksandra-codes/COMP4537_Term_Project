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


loadMovieOptions = () => {
   return new Promise(function (resolve, reject){
      const xhttp = new XMLHttpRequest();
      const url = "https://young-u6.azurewebsites.net/API/v1/movie";
      const token = window.localStorage.getItem('token')
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const res_arr = JSON.parse(this.responseText)
          let opt_arr = [];
          for(value in res_arr){
              opt_arr[value] = {title: res_arr[value].title, 
                                  id: res_arr[value].movieId}
              
          }
          const movie_selector = document.getElementById("movie_title")
          movie_selector.innerHTML = createMovieOptions(opt_arr)

          createMovieOptions(opt_arr)
          console.log(res_arr)
      }
  }
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send();
       
   }).then(function(value) {
      console.log(value + ' - A synchronous value works'); // 2 - A synchronous value works
      // window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/view_movie.html")
      const movie_selector = document.getElementById("movie_title")
      movie_selector.innerHTML = createMovieOptions(value)
      
  }).catch(console.log("caught an error"));
}

createRatingOptions = () => {
  console.log("rating options")
let options = "";
for(let y=1; y<=5; y++){
  options += "<option>"+ y +"</option>";
  }
return options
}

postReview = () => {
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
console.log("movie_options")
console.log(current_option)

const comment = document.getElementById("comment").value

const rating = document.getElementById("rating").value

let data_to_post = new Object()
data_to_post["movieId"] = parseInt(current_option)
data_to_post["comment"] = comment
data_to_post["rating"] = parseInt(rating)
// convert to JSON string
let stringData = JSON.stringify(data_to_post);
console.log(stringData)

// send the data as a POST request
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Authorization", "Bearer " + token);
xhttp.setRequestHeader("Content-type", "text/plain");
xhttp.send(stringData);

}

createMovieOptions = (movie_arr) => {
  console.log("arr")
  console.log(movie_arr)
  let options = "";
  for(let y=0; y<movie_arr.length; y++){
  options += "<option id='" + movie_arr[y].id + "'>"+ movie_arr[y].title +"</option>";
  }
  return options
}

createMovieGenreOptions = () => {
  const genre_arr = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"]
  let options = "";
  for(let y=0; y<genre_arr.length; y++){
  options += "<option>"+ genre_arr[y] +"</option>";
  }
  return options
}

createAlert= (title, summary, details, severity, dismissible, autoDismiss, appendToId) => {
const iconMap = {
info: "fa fa-info-circle",
success: "fa fa-thumbs-up",
warning: "fa fa-exclamation-triangle",
danger: "fa ffa fa-exclamation-circle"
};

let iconAdded = false;

const alertClasses = ["alert", "animated", "flipInX"];
alertClasses.push("alert-" + severity.toLowerCase());

if (dismissible) {
alertClasses.push("alert-dismissible");
}

var msgIcon = $("<i />", {
"class": iconMap[severity] 
});

var msg = $("<div />", {
"class": alertClasses.join(" ") 
});

if (title) {
var msgTitle = $("<h4 />", {
  html: title
}).appendTo(msg);

if(!iconAdded){
  msgTitle.prepend(msgIcon);
  iconAdded = true;
}
}

if (summary) {
var msgSummary = $("<strong />", {
  html: summary
}).appendTo(msg);

if(!iconAdded){
  msgSummary.prepend(msgIcon);
  iconAdded = true;
}
}

if (details) {
var msgDetails = $("<p />", {
  html: details
}).appendTo(msg);

if(!iconAdded){
  msgDetails.prepend(msgIcon);
  iconAdded = true;
}
}


if (dismissible) {
var msgClose = $("<span />", {
  "class": "close", 
  "data-dismiss": "alert",
  html: "<i class='fa fa-times-circle'></i>"
}).appendTo(msg);
}

$('#' + appendToId).append(msg);

if(autoDismiss){
setTimeout(function(){
  msg.addClass("flipOutX");
  setTimeout(function(){
    msg.remove();
  },1000);
}, 5000);
}
}





