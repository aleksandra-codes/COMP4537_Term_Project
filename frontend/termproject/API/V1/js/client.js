window.onload=()=>{
    // const add_movie = document.getElementById("add_movie")
    // add_movie.href = "client_pages/add_movie.html"
};

loadMovies = () => {
	const xhttp = new XMLHttpRequest();
	const url = "https://young-u6.azurewebsites.net/API/v1/movie";

	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			const res_obj = JSON.parse(this.responseText)
			const res_arr = res_obj["movies"]
			for(let value of res_arr){
				const row = document.createElement("tr");
		        const th = document.createElement("th");
				th.setAttribute("scope", "row")

				const td_name = document.createElement("td");
				const td_year = document.createElement("td");
				const td_genre = document.createElement("td")
				
				th.innerHTML = value["movieId"]
		        td_name.innerHTML = value["title"]
		        td_year.innerHTML = value["year"]
		        td_genre.innerHTML = value["genre"]

				row.appendChild(th)
				row.appendChild(td_name)
				row.appendChild(td_year)
				row.appendChild(td_genre)

		        document.getElementById('movie_rows').appendChild(row);
		        console.log('value ' + value);
		  }
		}
	  }
	  xhttp.open("GET", url, true);
	  xhttp.setRequestHeader("Content-type", "text/plain");
	  xhttp.send();
  }

