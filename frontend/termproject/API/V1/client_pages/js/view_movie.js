window.onload=()=>{
  const token = window.localStorage.getItem('token')
  if(token != null){
       
      } else {
          window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login_client.html")
      }
};


createYearOptions = () => {
const year = 1900;
const till = new Date().getFullYear();
let options = "";
for(let y=till; y>=year; y--){
  options += "<option>"+ y +"</option>";
  }
return options
}

postMovie = (data) => {
const xhttp = new XMLHttpRequest();
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
xhttp.send(stringData);

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





