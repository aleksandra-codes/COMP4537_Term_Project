window.onload=()=>{
  const token = window.localStorage.getItem('token')
  if(token != null){
      //   postMovie()
      loadStats(token)
  } else {
      window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login.html")
  }

};


loadStats = (token) => {
const xhttp = new XMLHttpRequest();
const url = "https://young-u6.azurewebsites.net/API/v1/movie/requests";

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  const res_arr = JSON.parse(this.responseText)
  const table_body = document.getElementById("")
  for(value in res_arr){

      const obj = res_arr[value]
      const row = document.createElement("tr");
    const td_method = document.createElement("td");
    td_method.setAttribute("scope", "row")
    const td_endpoint = document.createElement("td");
    const td_requests = document.createElement("td");
    
    td_method.innerHTML = obj.reqType
    td_endpoint.innerHTML = "'/API/v1/" + obj.endPoint + "'"
    td_requests.innerHTML = obj.count

  
    row.appendChild(td_method)
    row.appendChild(td_endpoint)
    row.appendChild(td_requests)
  
    document.getElementById('stats_rows').appendChild(row);
      
  }

}
}
xhttp.open("GET", url, true);
xhttp.setRequestHeader("Authorization", "Bearer " + token )
xhttp.setRequestHeader("Content-type", "text/plain");
xhttp.send();
}
