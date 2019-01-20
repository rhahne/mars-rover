// Rover Object Goes Here
// ======================
var gr = {
  name: "gr",
  year: "2019",
  direction: "E",
  x: 0,
  y: 0,
  travelLog: ["00"],
  currentField: "00"
}
var br = {
  name: "br",
  year: "1999",
  direction: "N",
  x: 9,
  y: 9,
  travelLog: ["99"]
}
var rr = {
  name: "rr",
  year: "2012",
  direction: "N",
  x: 6,
  y: 4,
  travelLog: ["09"]
}
// ======================
var obstacleArray = ["15","52", "66", "84"];

function turnLeft(rover){
  console.log("turnLeft was called!");
  switch(rover.direction){
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
  document.getElementById(rover.currentField).textContent = rover.direction;
  console.log("New Direction: " + rover.direction);
}

function turnRight(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log("New Direction: " + rover.direction);
  document.getElementById(rover.currentField).textContent = rover.direction;
}
function moveForward(rover){
  console.log("Move forward was called!");
  var endOfMap = false;
  var obstacle = false;
  switch(rover.direction){
    case "N":
      if (rover.x -1 < 0) {
        endOfMap = true;
      } else if (isThereAnObstacle(rover.x -1, rover.y)){
        obstacle = true;
      } else{
        rover.x -= 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "E":
      if (rover.y + 1 >= 10) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x, rover.y + 1)){
        obstacle = true;
      }else{
        rover.y += 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "S":
      if (rover.x + 1 >= 10) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x +1, rover.y)){
        obstacle = true;
      }else{
        
        rover.x += 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "W":
      if (rover.y -1 < 0) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x, rover.y-1)){
        obstacle = true;
      }else{
        
        rover.y -= 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
  }
  if (endOfMap) {
    console.log("This is the end of the Map!, Can't move forward here!");
  }
  if (obstacle) {
    console.log("There is an obstacle! Can't move forward here!");
  }
  console.log("The rover is now on " + rover.x + "," + rover.y + " direction: " + rover.direction);
  showTravelLog(rover);
  updateFrontend(rover, rover.x, rover.y);
  rover.currentField = rover.x.toString() + rover.y.toString();
  
  document.getElementById(rover.currentField).textContent = rover.direction;
}
function moveBackward(rover){
  console.log("Move backward was called!");
  endOfMap = false;
  obstacle = false;
  switch(rover.direction){
    case "N":
      if (rover.x + 1 >= 10) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x +1, rover.y)){
        obstacle = true;
      }else{
        rover.x += 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "E":
      if (rover.y - 1 < 0) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x, rover.y - 1)){
        obstacle = true;
      }else{
        rover.y -= 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "S":
      if (rover.x - 1 < 0) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x -1, rover.y)){
        obstacle = true;
      }else{
        rover.x -= 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
    case "W":
      if (rover.y + 1 >= 10) {
        endOfMap = true;
      }else if (isThereAnObstacle(rover.x, rover.y+1)){
        obstacle = true;
      }else{
        rover.y += 1;
        travelLog(rover, rover.x, rover.y);
      }
      break;
  }
  if (endOfMap) {
    console.log("This is the end of the Map!, Can't move backward here!");
  }
  if (obstacle) {
    console.log("There is an obstacle! Can't move forward here!");
  }
  console.log("The rover is now on " + rover.x + "," + rover.y + " direction: " + rover.direction);
  showTravelLog(rover);
  updateFrontend(rover, rover.x, rover.y);
  updateArrow(rover);
}

function isThereAnObstacle(xCord, yCord){
  var fieldToGo = xCord.toString() + yCord.toString();
  if (obstacleArray.includes(fieldToGo)) {
    return true;
  } else if(gr.travelLog.includes(fieldToGo) || br.travelLog.includes(fieldToGo) || rr.travelLog.includes(fieldToGo)){
    return true;
  } else{
    return false;
  }
}

function commands(rover, commands){
  var command = commands.split("");
  for (var i = 0; i < commands.length; i++) {
    if (command[i] == "r" || command[i] == "l" || command[i] == "f" || command[i] == "b"){
      validationError = false;
    }else{
      validationError = true;
    }
  }
  if (validationError) {
    console.log("incorrect commands! Please only use: r,l,f,b");    
  }else{
    for (var i = 0; i < commands.length; i++) {
      switch(command[i]){
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
      }
    }
  }
}

function travelLog(rover, xCord, yCord){
  var pastFieldId = rover.travelLog.slice(-1)[0];
  rover.travelLog.push(xCord.toString()+yCord.toString());
  var fieldHistory = document.getElementById(pastFieldId);
  if(rover.name == "gr"){
    fieldHistory.className = "history";
  }else if(rover.name == "br"){
    fieldHistory.className = "history2";
  }else if(rover.name == "rr"){
    fieldHistory.className = "history3";
  }
  fieldHistory.textContent = pastFieldId;
}

function showTravelLog(rover){
  var logString = "Past Places: ";
  for (var i = 0; i < rover.travelLog.length; i++) {
    logString += rover.travelLog[i] + " | ";
  }
  console.log(logString);
}

function updateFrontend(rover, xCord, yCord){
  id = xCord.toString() + yCord.toString();
  var fieldActive = document.getElementById(id);
  if(rover.name == "gr"){
    fieldActive.className = "active";
  }else if(rover.name == "br"){
    fieldActive.className = "active2";
  }else if(rover.name == "rr"){
    fieldActive.className = "active3";
  }
}

function OnChangeRadio () {
  var radios = document.getElementsByName('rover');
  if (radios[0].checked){
    therover = gr;
  }else if (radios[1].checked){
    therover = br;
  }else if (radios[2].checked){
    therover = rr;
  }
}

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        moveForward(therover);
    }
    else if (e.keyCode == '40') {
        moveBackward(therover);
    }
    else if (e.keyCode == '37') {
       turnLeft(therover);
    }
    else if (e.keyCode == '39') {
       turnRight(therover);
    }

}