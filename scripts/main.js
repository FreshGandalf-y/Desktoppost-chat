

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
var valueForWs;

const ws = new WebSocket("ws://localhost:8082")

ws.addEventListener("open", () => {
  console.log("we are connected");
});

function sendData( error) {
  const data = {
    myusrName: usrName,
    theLastCommand: valueForWs
  }
  ws.send(JSON.stringify(data));
  if (error) {
    console.log("send arguments to ws does not function")
  } else {
    console.log("send arguments to ws enabled")
  }
}

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

function username() {
  
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
  var value = lastmesage.value
  console.log("last command: " + value)
  writeLastCommand(value)
  commandToWs(value)
}

function writeLastCommand(arg) {
  
  document.getElementById("lastCommandSpace").innerHTML =  arg;
  
}

function commandToWs(arg) {
    valueForWs = arg
    console.log("valueForWs: " + valueForWs)
    sendData()
}