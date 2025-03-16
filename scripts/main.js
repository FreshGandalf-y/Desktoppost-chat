//main 
function site(e) {
  console.log(e);
  let url = "Desktop.html?" + e.src;
  window.location.assign(url);
}


var usrName;
var password;
var loggedIn = true
var connection;
const date = Date()

var ipServer = "192.168.8.243"
var valueForWs;

const ws = new WebSocket("ws://localhost:8082")

ws.onopen = function () {
  console.log("we are connected");
};

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);

  if (data.type === 'contant') {
    console.log("html data arrived (Dashbord)", data)
    let blob = new Blob([data.html], { type: "text/html"});
    let url = URL.createObjectURL(blob);
    document.getElementById('dynamicDashbord').src = url;
    
  } else if (data.type === 'error') {
    console.error('Mistake', data.message);
  } else if (data.type === 'chatResponse') {
    console.log("chatresponse recived")
    var commanduser = data.data.myusrName
    var command = data.data.theLastCommand
    var timeUser = data.data.datetime

    console.log(commanduser, command, timeUser)
    //document.getElementById("lastCommandspace").innerHTML = commanduser, command, timeUser;
  } else if (data.type === 'desk-topsContant') {
    console.log("desktops recived", data.html)
    //for (const deskt in data.Dea)
  }
}

function desktopsContant() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({type: 'desktopsContant'}))
  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({type: 'desktopsContant'}))
    })
  }
}

function sendData( error) {
  const data = {
    myusrName: usrName,
    theLastCommand: valueForWs,
    datetime: date
  }
  ws.send(JSON.stringify({type: 'chatmessage', data: data}));
  if (error) {
    console.log("send arguments to ws does not function")
  } else {
    console.log("send arguments to ws enabled")
  }
}

function showDashbord(error) {
  if (loggedIn == true) {
    var url = "dashbord.html";
    window.location.assign(url);
  } else {
    document.getElementById("customAlert").style.display = "flex";
  }
}

function seeDashboard() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'getContentDashbord'}))
  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ type: 'getContentDashbord'}))
    })
  }
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

function commitSign_In(error) {
  const username = document.getElementById("userNameVerification")
  const password = document.getElementById("passwordVerification")

  const data = {
    userName: username,
    passWord: password,
  };
  ws.send(JSON.stringify(data));
  if (error) {
    console.log(error)
  } else {
    console.log("send usernames to Server succed")
  }
}

function fullInfo(error) {
  document.getElementById("ipAdress").innerHTML = " " + ipServer + " ";
  
  if (loggedIn == true) {
    connection = "open";
  } else {
    connection = "closed";
  }
  document.getElementById("connection?").innerHTML = " " + connection + " ";
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
    
    chatcontant()
  }
})

function chatcontant() {
  var lastmesage = document.getElementById("input")
  var value = lastmesage.value
  console.log("last command: " + value)
  commandToWs(value)
}

function commandToWs(arg) {
    valueForWs = arg
    sendData()
}