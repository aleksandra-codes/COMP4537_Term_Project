
window.onload=()=>{
    
    const token = window.localStorage.getItem('token')
    if(token != null){
        const load_movies = document.getElementById("load_movies")
        load_movies.addEventListener("click", loadMovies)
        const load_actors = document.getElementById("load_actors")
        load_actors.addEventListener("click", loadActors)
    } else {
        window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login_client.html")
    }
    
    
};

createTable = () => {
    const container_res = document.getElementById("container_responsive")
    let table = document.getElementById("main_table")
    if(table != null){
        table.innerHTML = ""
    } else {
        table = document.createElement("table")
        table.setAttribute("id", "main_table")
        table.setAttribute("class", "table table-bordered table-hover")
        container_res.appendChild(table)
    }
}


createHeader = (table_id, headers) => {
    // table_id - string id for table
    // header - array of headers for the table columns

    createTable()
    const tr_head = document.createElement("tr")
    
    for(let value of headers){
        const th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.setAttribute("id", "col_" + value + "_id")
        th.innerHTML = value
        tr_head.appendChild(th)
    }
    let t_body = document.getElementsByTagName("tbody")[0]
    let t_head = document.getElementById("table_head")
    
    if (document.body.contains(t_body) && document.body.contains(t_head)){
        main_table.removeChild(t_body)
        t_head.innerHTML = ""
        main_table.removeChild(t_head)
        
        thead = document.createElement("thead")
        t_body = document.createElement("tbody")
        
        t_head.setAttribute("class", "thead-dark")
        t_head.setAttribute("id", "table_head")
        t_body.setAttribute("id", table_id)
        
        t_head.appendChild(tr_head)
        main_table.appendChild(t_head)
        main_table.appendChild(t_body)
        
    } else {
        t_body = document.createElement("tbody")
        t_head = document.createElement("thead")
        t_head.setAttribute("class", "thead-dark")
        t_head.setAttribute("id", "table_head")
        t_body.setAttribute("id", table_id)
        t_body.setAttribute("id", table_id)
        t_head.appendChild(tr_head)
        main_table.appendChild(t_head)
        main_table.appendChild(t_body)
    }

}



loadMovies = () => {
        const container_res = document.getElementById("container_responsive")
        container_res.innerHTML = ""
        const xhttp = new XMLHttpRequest();
        const url = "https://young-u6.azurewebsites.net/API/v1/movie";
        const token = window.localStorage.getItem('token')
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        const res_arr = JSON.parse(this.responseText)
        createHeader("movie_rows", ["ID", "Movie", "Year", "Genre", "Actions"])
        for (let value of res_arr) {
    	const row = document.createElement("tr");
    	const th = document.createElement("th");
    	th.setAttribute("scope", "row")
    
    	const td_name = document.createElement("td");
    	const td_year = document.createElement("td");
    	const td_genre = document.createElement("td");
    	const td_actions = document.createElement("td");
    	
    
    	
    	const anchor_delete = document.createElement("a");
    	anchor_delete.setAttribute("id", "delete" + value["movieId"])
    	
    	const delete_btn = document.createElement("input");
    	delete_btn.setAttribute("type", "button")
    	delete_btn.setAttribute("class", "btn btn-info table_btn")
    	delete_btn.setAttribute("value", "Delete")
    	
    	anchor_delete.appendChild(delete_btn)
    	anchor_delete.addEventListener("click", () => {deleteMovie(value["movieId"])})
    	
    	const anchor_view = document.createElement("a");
    	anchor_view.setAttribute("id", "view" + value["movieId"])
    	
    	const view_btn = document.createElement("input");
    	view_btn.setAttribute("type", "button")
    	view_btn.setAttribute("class", "btn btn-info")
    	view_btn.setAttribute("value", "View")
    	
    	
    	anchor_view.appendChild(view_btn)
        anchor_view.addEventListener("click", () => {
            event.preventDefault()
            viewMovie(value["movieId"])
        })
    	
    	
    	th.innerHTML = value["movieId"]
    	td_name.innerHTML = value["title"]
    	td_year.innerHTML = value["year"]
    	td_genre.innerHTML = value["genre"]
    	td_actions.appendChild(anchor_delete)
    	td_actions.appendChild(anchor_view)
    
    	row.appendChild(th)
    	row.appendChild(td_name)
    	row.appendChild(td_year)
    	row.appendChild(td_genre)
    	row.appendChild(td_actions)
    
    	document.getElementById('movie_rows').appendChild(row);
    	console.log('value ' + value);
    }
    
    
    }
    }
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();
}

updateMovie = (movie_id) => {

    const container_responsive = document.getElementById("container_responsive")
    
    let movie_title = document.getElementById("movie_title")
    let movie_year = document.getElementById("movie_year")
    let movie_genre = document.getElementById("movie_genre")
    
    let movie_title_val = movie_title.innerHTML
    let movie_year_val = movie_year.innerHTML
    let movie_genre_val = movie_genre.innerHTML

    
    container_responsive.removeChild(movie_title)
    container_responsive.removeChild(movie_year)
    container_responsive.removeChild(movie_genre)
    
    const title_input = document.createElement("input")
    title_input.setAttribute("value", movie_title_val)
    title_input.setAttribute("id", "movie_title_val")
    
    const year_input = document.createElement("input")
    year_input.setAttribute("value", movie_year_val)
    year_input.setAttribute("id", "movie_year_val")
    
    const genre_input = document.createElement("input")
    genre_input.setAttribute("value", movie_genre_val)
    genre_input.setAttribute("id", "movie_genre_val")
    
    const put_btn = document.getElementById("put_movie_btn")
    container_responsive.insertBefore(title_input, put_btn)
    container_responsive.insertBefore(year_input, put_btn)
    container_responsive.insertBefore(genre_input, put_btn)
    console.log("movie_id")
    console.log(movie_id)
    
    const save_btn = document.createElement("input");
            	save_btn.setAttribute("type", "button")
            	save_btn.setAttribute("class", "btn btn-info")
            	save_btn.setAttribute("value", "Save")
            	save_btn.setAttribute("id", "put_movie_btn")
            	
            	
    save_btn.addEventListener("click", ()=> {
    	    event.preventDefault(); 
    	    putMovieUpdate(movie_id);})

    
    container_responsive.insertBefore(save_btn, put_btn)
    container_responsive.removeChild(put_btn)
    
}

putMovieUpdate = (movie_id) => {
    const token = window.localStorage.getItem('token')
    const xhttp = new XMLHttpRequest();
    const url = "https://young-u6.azurewebsites.net/API/v1/movie/";
    
    xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) { 
        console.log("state is good")
        
    
        }
    };
    
    const title_input = document.getElementById("movie_title_val")

    const year_input = document.getElementById("movie_year_val")
    
    const genre_input = document.getElementById("movie_genre_val")
    
    
    let data_to_post = new Object()
      data_to_post["title"] = title_input.value
      data_to_post["year"] = parseInt(year_input.value)
      data_to_post["genre"] = genre_input.value
      // convert to JSON string
    let stringData = JSON.stringify(data_to_post); 
    console.log(stringData)
    console.log(url + movie_id)
    xhttp.open("PUT", url + movie_id, true);  
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("Authorization", "Bearer " + token);
    xhttp.send(stringData);
}

putActorUpdate = (actor_id) => {
        const token = window.localStorage.getItem('token')
        const xhttp = new XMLHttpRequest();
        const url = "https://young-u6.azurewebsites.net/API/v1/actor/";
        
        xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) { 
            console.log("state is good")
            
        
            }
        };
        
        const title_input = document.getElementById("actor_name")
    
        const year_input = document.getElementById("born_year")
        
        const genre_input = document.getElementById("picutre_url")
        
        
        let data_to_post = new Object()
          data_to_post["fullname"] = title_input.value
          data_to_post["year"] = parseInt(year_input.value)
          data_to_post["pictureURL"] = genre_input.value
          // convert to JSON string
        let stringData = JSON.stringify(data_to_post); 
        console.log(stringData)
        console.log(url + actor_id)
        xhttp.open("PUT", url + actor_id, true);  
        xhttp.setRequestHeader("Content-type", "text/plain");
        xhttp.setRequestHeader("Authorization", "Bearer " + token);
        xhttp.send(stringData);
}





deleteMovie = (id) => {
    const token = window.localStorage.getItem('token')
    const xhttp = new XMLHttpRequest();
    const url = "https://young-u6.azurewebsites.net/API/v1/movie/";
    xhttp.open("DELETE", url + id, true);
    xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) { 
    }
    };
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("Authorization", "Bearer " + token);
    xhttp.send();
}

deleteActor = (id) => {
    const token = window.localStorage.getItem('token')
    const xhttp = new XMLHttpRequest();
    const url = "https://young-u6.azurewebsites.net/API/v1/actor/";
    xhttp.open("DELETE", url + id, true);
    xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) { 
    }
    };
    xhttp.setRequestHeader("Content-type", "text/plain");
     xhttp.setRequestHeader("Authorization", "Bearer " + token);
    xhttp.send();
}

viewMovie = (id) => {
    const token = window.localStorage.getItem('token')
    return new Promise(function (resolve, reject){
        const xhttp = new XMLHttpRequest();
        const url = "https://young-u6.azurewebsites.net/API/v1/movie/";
        
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res_obj = JSON.parse(this.responseText)
                console.log(res_obj)
                const features = document.getElementById("features")
                // const main_table = document.getElementById("main_table")
                // main_table.innerHTML = ""
                features.innerHTML = ""
                const container_movie = document.createElement("div")
                container_movie.setAttribute("id", "container_responsive")
                container_movie.setAttribute("class", "container table-responsive py-5")
                container_movie.innerHTML = ""
                
            	
            	const update_btn = document.createElement("input");
            	update_btn.setAttribute("type", "button")
            	update_btn.setAttribute("class", "btn btn-info table_btn")
            	update_btn.setAttribute("value", "Update")
            	update_btn.setAttribute("id", "put_movie_btn")
            	
            	
            	update_btn.addEventListener("click", ()=> {
            	    event.preventDefault(); 
            	    updateMovie(res_obj["movieId"]);})
            	
                            
                const header = document.createElement("h3")
                header.innerHTML = res_obj["title"]
                header.setAttribute("id", "movie_title")
                
                const year = document.createElement("p")
                year.innerHTML = res_obj["year"] 
                year.setAttribute("id", "movie_year")
                
                const genre = document.createElement("p")
                genre.innerHTML = res_obj["genre"] 
                genre.setAttribute("id", "movie_genre")
                
                
                container_movie.appendChild(header)
                container_movie.appendChild(year)
                container_movie.appendChild(genre)
                
                container_movie.appendChild(update_btn)
                
                showReviews(res_obj["movieId"])
                features.appendChild(container_movie)
                resolve(this.response)
                } else {
                    reject({
                      status: this.status,
                      statusText: xhttp.statusText
                    });
                }
            }
        
        xhttp.open("GET", url + id, true);
        xhttp.setRequestHeader("Authorization", "Bearer " + token);
        xhttp.setRequestHeader("Content-type", "text/plain");
        xhttp.send();
    }).then(function(value) {
        console.log(value + ' - A synchronous value works'); // 2 - A synchronous value works
        // window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/view_movie.html")
        
    }).catch(console.log("caught an error"));
}


viewActor = (id) => {
    const token = window.localStorage.getItem('token')
    return new Promise(function (resolve, reject){
        const xhttp = new XMLHttpRequest();
        const url = "https://young-u6.azurewebsites.net/API/v1/actor/";
        
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res_obj = JSON.parse(this.responseText)
                const features = document.getElementById("features")
                features.innerHTML = ""
                const container_movie = document.createElement("div")
                container_movie.setAttribute("id", "container_responsive")
                container_movie.setAttribute("class", "container table-responsive py-5")
                container_movie.innerHTML = ""
                
            	
            	const update_btn = document.createElement("input");
            	update_btn.setAttribute("type", "button")
            	update_btn.setAttribute("class", "btn btn-info table_btn")
            	update_btn.setAttribute("value", "Update")
            	update_btn.setAttribute("id", "put_movie_btn")
            	
            	
            	update_btn.addEventListener("click", ()=> {
            	    event.preventDefault(); 
            	    putActorUpdate(res_obj["actorId"]);})
            	
                            
                const header = document.createElement("input")
                header.value = res_obj["fullname"]
                header.setAttribute("id", "actor_name")
                
                const year = document.createElement("input")
                year.value = res_obj["year"] 
                year.setAttribute("id", "born_year")
                
                const genre = document.createElement("input")
                genre.value = res_obj["pictureURL"] 
                genre.setAttribute("id", "picutre_url")
                
                
                container_movie.appendChild(header)
                container_movie.appendChild(year)
                container_movie.appendChild(genre)
                
                container_movie.appendChild(update_btn)
                
                
                features.appendChild(container_movie)
                resolve(this.response)
                } else {
                    reject({
                      status: this.status,
                      statusText: xhttp.statusText
                    });
                }
            }
        
        xhttp.open("GET", url + id, true);
        xhttp.setRequestHeader("Authorization", "Bearer " + token);
        xhttp.setRequestHeader("Content-type", "text/plain");
        xhttp.send();
    }).then(function(value) {
        console.log(value + ' - A synchronous value works'); // 2 - A synchronous value works
        // window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/view_movie.html")
        
    }).catch(console.log("caught an error"));
}




showReviews = (id) => {
    const token = window.localStorage.getItem('token')
    return new Promise(function (resolve, reject){
        const xhttp = new XMLHttpRequest();
        const url = "https://young-u6.azurewebsites.net/API/v1/review/";
        
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res_obj = JSON.parse(this.responseText)
                console.log(res_obj)
                
                createHeader("review_rows", ["ID", "Comment", "Rating"])
                for(value in res_obj){
                    console.log("value " + res_obj[value])
                    const obj = res_obj[value]
                    const row = document.createElement("tr");
                	const th = document.createElement("th");
                	th.setAttribute("scope", "row")
                    
                    const td_id = document.createElement("td");
                	const td_comment = document.createElement("td");
                	const td_rating = document.createElement("td");

                	td_id.innerHTML = obj["reviewId"]
                	td_comment.innerHTML = obj["comment"]
                	td_rating.innerHTML = obj["rating"]
                	
                	row.appendChild(td_id)
                	row.appendChild(td_comment)
                	row.appendChild(td_rating)
                	let rows = document.getElementById("review_rows")
                	rows.appendChild(row)
                	
                	
                }
                resolve(this.response)
                } else {
                    reject({
                      status: this.status,
                      statusText: xhttp.statusText
                    });
                }
            }
        
        xhttp.open("GET", url + id, true);
        xhttp.setRequestHeader("Authorization", "Bearer " + token);
        xhttp.setRequestHeader("Content-type", "text/plain");
        xhttp.send();
    }).then(function(value) {
        console.log(value + ' - A synchronous value works'); // 2 - A synchronous value works
        // window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/view_movie.html")
        
    }).catch(console.log("caught an error"));
}


loadActors = () => {
    const token = window.localStorage.getItem('token')
    const xhttp = new XMLHttpRequest();
    const url = "https://young-u6.azurewebsites.net/API/v1/actor";
    
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const res_arr = JSON.parse(this.responseText)
    
    createHeader("actor_rows", ["ID", "Name", "Born", "photoUrl", "Actions"])
    

    
    for(let value of res_arr){
    
	
	const anchor_delete = document.createElement("a");
	anchor_delete.setAttribute("id", "delete" + value["actorId"])
	
	const delete_btn = document.createElement("input");
	delete_btn.setAttribute("type", "button")
	delete_btn.setAttribute("class", "btn btn-info table_btn")
	delete_btn.setAttribute("value", "Delete")
	
	anchor_delete.appendChild(delete_btn)
	anchor_delete.addEventListener("click", () => {deleteActor(value["actorId"])})
	
	const anchor_view = document.createElement("a");
	anchor_view.setAttribute("id", "view" + value["actorId"])
	
	const view_btn = document.createElement("input");
	view_btn.setAttribute("type", "button")
	view_btn.setAttribute("class", "btn btn-info")
	view_btn.setAttribute("value", "View")
	
	
	anchor_view.appendChild(view_btn)
    anchor_view.addEventListener("click", () => {
        event.preventDefault()
        viewActor(value["actorId"])
    })
    
    
    
    console.log(value)
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row")
    
    const td_name = document.createElement("td");
    const td_born = document.createElement("td");
    const td_photo_url = document.createElement("td")
    const td_actions = document.createElement("td")
    td_photo_url.setAttribute("class", "photo_container")
    
    th.innerHTML = value["actorId"]
    td_name.innerHTML = value["fullname"]
    td_born.innerHTML = value["year"]
    td_actions.appendChild(anchor_delete)
    td_actions.appendChild(anchor_view)
    
    const photo = document.createElement("img")
    photo.setAttribute("src", value["pictureURL"])
    photo.setAttribute("class", "actor_photo")
    td_photo_url.appendChild(photo)
    row.appendChild(th)
    row.appendChild(td_name)
    row.appendChild(td_born)
    row.appendChild(td_photo_url)
    row.appendChild(td_actions)
    
    document.getElementById('actor_rows').appendChild(row);
    console.log('value ' + value);
    }
    }
    }
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + token);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();

}