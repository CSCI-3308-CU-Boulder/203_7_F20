// var count = 0;
// var bottlesFilled = 0;

// function loadBottles() {
//   axios
//     .get("/users/:mteets4")
//     .then(function (response) {
//       // handle success
//       console.log(response);
//       count = response.data.num_bottles;
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });
// }

// function taskComplete() {
//   count++;
//   if (count == 1) {
//     document.getElementById("bottle").src = "./assets/waterBottle1.jpg";
//   } else if (count == 2) {
//     document.getElementById("bottle").src = "./assets/waterBottle2.jpg";
//   } else if (count == 3) {
//     document.getElementById("bottle").src = "./assets/waterBottle3.jpg";
//   } else if (count == 4) {
//     document.getElementById("bottle").src = "./assets/waterBottle4.jpg";
//   } else if (count > 4) {
//     count = 0;
//     document.getElementById("bottle").src = "./assets/waterBottle.jpg";
//     bottlesFilled++;
//     document.getElementById("bottle_count").innerHTML = bottlesFilled;
//     if (bottlesFilled % 5 == 0) {
//       alert("Congratulations you leved up!");
//       level++;
//       axios.post("/users/:mteets4/completeTask");
//     }
//     document.getElementById("level").innerHTML = level;
//   }
// }

function resetToEmpty() {
   count = 0;
   bottlesFilled = 0;
   document.getElementById("bottle").src = "../assets/waterBottle.jpg";
   document.getElementById("bottle_count").innerHTML = bottlesFilled;
 }

var count = 0;
var level = 0
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
        level = Math.floor(response.data.num_bottles / 5);
        count = response.data.num_bottles % 5;
        setImage()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

function taskComplete() {
  count++;
  axios.post(baseUrl + "/api/users/" + username + "/completeTask", {}).then((response) => {
    console.log(response);
  });

  // Make the task card disappear
  // Call the deleteTask() function
  // deleteTask();


  if (count % 5 == 0) {
    level++;
    alert("Congratulations you leved up!");
    count = 0;
  }
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
  document.getElementById("level").innerHTML = level + 1;
}

var task = [{name: 'a', description: 'b', type: 'reuse'}];


var taskName = document.getElementById("taskName").value;
var taskDesc = document.getElementById("descr").value;
var taskType = document.getElementById("type").value;
// var task = [{name: taskName, description: taskDesc, type:taskType}];
console.log("initial task length = ", task.length);



function addTask() {
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
  var task = [{name: taskName, description: taskDesc, type:taskType}];


  // task.push({name: document.getElementById("taskName").value, description: document.getElementById("descr").value, type: document.getElementById("type").value});
  task.push({name: taskName, description: taskDesc, type: taskType});
  console.log("task length = ", task.length);
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
    output = "<div class='card' id="+ counter +"><div class='card-header' >" + task[i].name + "\
    <div class='card-body'><p class='card-text' style='font-size: 12pt'>" + task[i].description + " - " + task[i].type +"</p></div>\
    <div class='card-footer'><button class='btn btn-primary' onclick='taskComplete()' style='float: left'>Complete Task</button>\
    <button class='btn btn-danger' onclick='deleteTask(\""+counter+"\")' style='float: right'>Delete Task</button></div></div>";
    counter++;

    // console.log("displayTask i=",i);  
    document.getElementById("tasks").innerHTML += output;
  }

  
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


window.onload = displayTasks();
