/**
 *  TO DO
 *  Integrate new task layout with the database
 */

// import './user.ts';
// import { calculateNewAchievements } from './user.ts';

// const result = calculateNewAchievements("laja3167");

function resetToEmpty() {
   count = 0;
   bottlesFilled = 0;
   document.getElementById("bottle").src = "../assets/waterBottle.jpg";
   document.getElementById("bottle_count").innerHTML = bottlesFilled;
 }

var count = 0;
// var level = 0
var bottles_filled = 0;
var baseUrl = "http://localhost:5000"
var username = "mteets4"

$(document).ready(function () {
  loadBottles()
})

function loadBottles() {
  if (document.cookie.length > 0) {
    username = document.cookie.split('=')[1]
    axios
      .get(baseUrl + "/users/" + username)
      .then(function (response) {
        // handle success
        console.log(response.data);
        // level = Math.floor(response.data.num_bottles / 5);
        count = response.data.num_bottles % 5;
        setImage()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

function taskComplete(i) {
  count++;
  axios.post(baseUrl + "/api/users/" + username + "/completeTask", {}).then((response) => {
    console.log(response);
  });
  
  // result.calculateNewAchievements('laja3167');

  // Make the task card disappear
  // Call the deleteTask() function
  // deleteTask(i);


  // if (count % 5 == 0) {
  //   // level++;
  //   alert("Congratulations you leved up!");
  //   count = 0;
  // }
  setImage();
}

function setImage() {
  if (count == 0) {
    document.getElementById("bottle").src = "../assets/waterBottle.jpg";
  } else if (count == 1) {
    document.getElementById("bottle").src = "../assets/waterBottle1.jpg";
  } else if (count == 2) {
    document.getElementById("bottle").src = "../assets/waterBottle2.jpg";
  } else if (count == 3) {
    document.getElementById("bottle").src = "../assets/waterBottle3.jpg";
  } else if (count == 4) {
    document.getElementById("bottle").src = "../assets/waterBottle4.jpg";
  }
  document.getElementById("bottle_count").innerHTML = count;
  // document.getElementById("level").innerHTML = level + 1;
}

var task = [{name: 'a', description: 'b', type: 'reuse'}];


var taskName = document.getElementById("taskName").value;
var taskDesc = document.getElementById("descr").value;
var taskType = document.getElementById("type").value;
// var task = [{name: taskName, description: taskDesc, type:taskType}];
console.log("initial task length = ", task.length);

var task = [{name: taskName, description: taskDesc, type:taskType}];
var exUser = {
  taskCard: task,
};

function addTask(user) {
  // Opens a modal that will intake the information and then add the task into a list of tasks that will display as cards
  //.push() method

  /**
  task[task.length].name = document.getElementById("taskName").value;
  task[task.length].description = document.getElementById("descr").value;
  task[task.length].type = document.getElementById("type").value;
  */

  var taskName = document.getElementById("taskName").value;
  var taskDesc = document.getElementById("descr").value;
  var taskType = document.getElementById("type").value;
  user.taskCard = [{name: taskName, description: taskDesc, type:taskType}];


  // task.push({name: document.getElementById("taskName").value, description: document.getElementById("descr").value, type: document.getElementById("type").value});
  user.taskCard.push({name: taskName, description: taskDesc, type: taskType});
  console.log("task length = ", user.taskCard.length);
  displayTasks();
}

var counter = 0;
function displayTasks() {
console.log("hi");

  // Displaying the tasks
  var taskName = document.getElementById("taskName").value;
  var taskDesc = document.getElementById("descr").value;
  var taskType = document.getElementById("type").value;
  var task = [{name: taskName, description: taskDesc, type:taskType}];

  var output = "";

  for (var i = 0; i < task.length; i++) {
      output = "<div class='theme-dark rounded-all card' id="+ counter +"><div class='card-header' >" + task[i].name + "\
      <div class='card-body'><p class='card-text' style='font-size: 12pt'>" + task[i].description + " - " + task[i].type +"</p>\
      <button class='button' onclick='taskComplete(\""+counter+"\")' style='float: left; margin-left:100px;'>Complete Task</button>\
      <button class='button' onclick='deleteTask(\""+counter+"\")' style='float: right;'>Delete Task</button></div></div>";
      counter++;

      // console.log("displayTask i=",i);
      document.getElementById("tasks").innerHTML += output;
      
    
    // counter++;
  }

  // "<div style='background-color: #699696 ;' class='rounded-all card' id="+ counter +"><div class='card-header' >" + task[i].name + "\
  //   <div class='card-body'><p class='card-text' style='font-size: 12pt'>" + task[i].description + " - " + task[i].type +"</p></div>\
  //   <div class='card-footer'><button class='btn btn-primary' onclick='taskComplete(\""+counter+"\")' style='float: left'>Complete Task</button>\
  //   <button class='btn btn-danger' onclick='deleteTask(\""+counter+"\")' style='float: right'>Delete Task</button></div></div>";


}


// function displayTasks() {

//   // addTask();

//   // Displaying the tasks
//   var output = "";

//   for (var i = 0; i < task.length; i++) {
//     output = "<div class='card'><div class='card-header'>" + task[i].name + "</div>\
//     <div class='card-body'><p class='card-text' style='font-size: 12pt'>" + task[i].description + "</p></div></div>\
//     <div class='card-footer'><button class='btn btn-primary' onclick='taskComplete()' style='float: left'>Complete Task</button>\
//     <button type='button' class='btn btn-circle btn-sm btn-danger text-right' style=margin-right: 10px style=margin-top: 10px onclick='deleteTask()' style='float: right'></button></div>";

//     document.getElementById("tasks").innerHTML += output;
//     console.log("out = ", output);
// }
//}

function deleteTask(i) {
  // Delete the task number based on the taskid
  // an int i that should represent where in the array the task is

  // Setting the task to default

  console.log("delete Task being called");


  // console.log("task length = ", task.length);

  document.getElementById(i).remove();

}

// pass task id for a get task function 
function loadTrackingInfo(){
  let username = window.location.hash.split('#')[1]
  axios.get("http://localhost:5000/api/users/" + username+ "/:completeTasks")
  .then(function (response) {
    console.log(response);
    let user = response.data;
    console.log(user)
    addTask(user);

  })
  .catch(function (error) {
    console.log(error);
  });
}

window.onload = displayTasks();
