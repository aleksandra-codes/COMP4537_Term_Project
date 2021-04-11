
window.onload=()=>{
  const submit = document.getElementById("login_form");
  submit.setAttribute("onsubmit", 
       "event.preventDefault(); return postLogin();"
      );
};

const postLogin = () => {
    return new Promise(function (resolve, reject){
         const xhttp = new XMLHttpRequest();
         const url = "https://young-u6.azurewebsites.net/API/v1/login";
         xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(this.responseText)
                localStorage.setItem("token", response["access_token"])
                resolve(this.response)
            } else {
                reject({
                  status: this.status,
                  statusText: xhttp.statusText
                });
            }
          };
          const usr_name = document.getElementById("usr_name").value
          const pswrd = document.getElementById("pswrd").value
          data = {}
          data.username = usr_name
          data.password = pswrd
          
          // send the data as a POST request
          xhttp.open("POST", url, true);
          xhttp.setRequestHeader("Content-type", "text/json");
              
           xhttp.onerror = function () {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            };
        
        xhttp.send(JSON.stringify(data));
    }).then(function(value) {
        window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/admin.html")
    }).catch();
}


