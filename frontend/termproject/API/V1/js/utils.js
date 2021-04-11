
export const createTable = () => {
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


export const createHeader = (table_id, headers) => {
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



export const createYearOptions = (year, selected) => {
    const till = new Date().getFullYear();
    let options = "";
    for(let y=till; y>=year; y--){
        if(y == selected){
            options += "<option selected='selected'>"+ y +"</option>";
        } else {
            options += "<option>"+ y +"</option>";
        }
     }
    return options
}

export const createRatingOptions = () => {
    let options = "";
    for(let y=1; y<=5; y++){
      options += "<option>"+ y +"</option>";
      }
    return options
}

export const createMovieOptions = (movie_arr) => {
  let options = "";
  for(let y=0; y<movie_arr.length; y++){
  options += "<option id='" + movie_arr[y].id + "'>"+ movie_arr[y].title +"</option>";
  }
  return options
}

export const createMovieGenreOptions = (selected) => {
  const genre_arr = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western", "Sci-fi"]
  let options = "";
  for(let y=0; y<genre_arr.length; y++){
      if(genre_arr[y] == selected){
          options += "<option selected='selected'>"+ genre_arr[y] +"</option>";
      } else {
          options += "<option>"+ genre_arr[y] +"</option>";
      }
        
  }
  return options
}

export const loadMovieOptions = () => {
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

export const createAlert = (title, summary, details, severity, dismissible, autoDismiss, appendToId) => {
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


