

//main 
function site(e) {
  console.log(e);
  let url = "Desktop.html?" + e.src;
  window.location.assign(url);
}


var usrName;
var loggedIn = false
var connection;

var ipServer = "192.168.8.243"


function officialRights(e, error) {
  if (loggedIn == true) {
    console.log(e);
    var url = "contact.html?" + e.src;
    window.location.assign(url);
  } else {
    console.log(error)
  }
}

function fullInfo(error) {
  document.getElementById("ipAdress").innerHTML = " " + ipServer + " ";
  
  if (loggedIn == true) {
    connection = "open";
  } else {
    connection = "closed";
  }
  document.getElementById("connection?").innerHTML = connection + " ";
}

function userName() {
  
  usrName = usrName ?? "anonymous";
  document.getElementById("usrl").innerHTML = usrName + ": ";

  console.log(usrName)
}

function creatorname() {
  document.getElementById("creatorName").innerHTML = usrName;
  console.log("Hallo" + usrName)
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    
    chatabname()
  }
})

function chatabname() {
  var lastmesage = document.getElementById("input")
  var wert = lastmesage.value
  console.log("last command: " + wert)
  writeLastCommand(wert)
  
}

function writeLastCommand(arg) {
  
  document.getElementById("lastCommandSpace").innerHTML =  arg;
  
}