
//main 
function site(e) {
  console.log(e);
  let url = "Desktop.html?" + e.src;
  window.location.assign(url);
}


console.log("Hallo!!!!! gehts noch?")

var usrName;

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
  console.log(arg)
  
}