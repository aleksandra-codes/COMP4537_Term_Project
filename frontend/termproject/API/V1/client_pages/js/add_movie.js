window.onload=()=>{
  const year_selector = document.getElementById("movie_year")
  year_selector.innerHTML = createYearOptions()

  const genre_selector = document.getElementById("movie_genre")
  genre_selector.innerHTML = createMovieGenreOptions()


  const submit_movie = document.getElementById("submit_movie")

  submit_movie.addEventListener("click", function(event){
    event.preventDefault()
    postMovie()
  });
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
        console.log("response exdecuted")
        createAlert('','','Movie was added to the database.','success',true,true,'add_movie_alert')
    }
  }
  console.log(this.status)
  const movie_title = document.getElementById("movie_title").value
  console.log(movie_title)
  const movie_year = document.getElementById("movie_year").value
  console.log(movie_year)
  const movie_genre = document.getElementById("movie_genre").value
  console.log(movie_genre)
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
  console.log("inside create alert function")
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
  "class": iconMap[severity] // you need to quote "class" since it's a reserved keyword
});

var msg = $("<div />", {
  "class": alertClasses.join(" ") // you need to quote "class" since it's a reserved keyword
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
    "class": "close", // you need to quote "class" since it's a reserved keyword
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


