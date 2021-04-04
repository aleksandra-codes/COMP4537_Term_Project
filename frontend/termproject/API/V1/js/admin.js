window.onload=()=>{
  postMovie()
  loadMovies()
};


postMovie = () => {
  const xhttp = new XMLHttpRequest();
  const url = "https://young-u6.azurewebsites.net/API/v1/movie";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText)
      let res_obj = JSON.parse(this.responseText)
      const num_req = res_obj["num_req"]
      document.getElementById("post_requests").innerHTML = num_req
    }
  }
  let data ={
    "title": "The Matrix",
    "year": 1999,
    "genre": "Science fiction",
  }
  // send the data as a POST request
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send(JSON.stringify(data));
}

loadMovies = () => {
const xhttp = new XMLHttpRequest();
const url = "https://young-u6.azurewebsites.net/API/v1/movie";

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const res_obj = JSON.parse(this.responseText)
    const num_req = res_obj["num_req"]
        document.getElementById("get_requests").innerHTML = num_req

  }
  }
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send();
}
