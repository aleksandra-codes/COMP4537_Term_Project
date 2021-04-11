
window.onload=()=>{
  const token = window.localStorage.getItem('token')
 if(token != null){
      const year_selector = document.getElementById("born_year")
   year_selector.innerHTML = createYearOptions()
 
   const submit_actor= document.getElementById("submit_actor")
 
   submit_actor.addEventListener("click", function(event){
     event.preventDefault()
     addActor()
   });
 } else {
     window.location.replace("https://www.aleksandrasorokina.com/COMP4537/termproject/API/V1/login_client.html")
 }



};



createYearOptions = () => {
const year = 1800;
const till = new Date().getFullYear();
let options = "";
for(let y=till; y>=year; y--){
 options += "<option>"+ y +"</option>";
 }
return options
}

addActor= (data) => {
  const token = window.localStorage.getItem('token')
const xhttp = new XMLHttpRequest();
const url = "https://young-u6.azurewebsites.net/API/v1/actor";
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
     createAlert('','','Actor was added to the database.','success',true,true,'add_actor_alert')
 }
}
const actor_name = document.getElementById("actor_name").value

const born_year = document.getElementById("born_year").value

const photo_url = document.getElementById("photo_url").value

let data_to_post = new Object()
data_to_post["fullname"] = actor_name
data_to_post["year"] = parseInt(born_year)
data_to_post["pictureURL"] = photo_url
// convert to JSON string
let stringData = JSON.stringify(data_to_post);

// send the data as a POST request
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-type", "text/plain");
xhttp.setRequestHeader("Authorization", "Bearer " + token);
xhttp.send(stringData);

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





