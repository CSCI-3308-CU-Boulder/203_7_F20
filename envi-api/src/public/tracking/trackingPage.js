/**
*  TO DO
*  Integrate new task layout with the database
*/


// var count = 0;
// var level = 0
// var bottles_filled = 0;

// function loadBottles() {
//   loggedIn()
//   .then(user => {
//     if (user) {
//       setImage()
//     } else {
//       window.location.pathname = '/home'
//     }
//   })
//   .catch(err => console.log(err))
// }

//load pie chart package
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {//create pie chart from axios request
  loggedIn()
    .then(user => {
      console.log(user)
      if (user) {
        let id = user.id;
        let username = user.username;
        axios.get(`/api/users/${id}/numTasks`)
          .then(function (response) {
            console.log(response)
            let reduce = response.data.reduce[0].sum
            let reuse = response.data.reuse[0].sum
            let recycle = response.data.recycle[0].sum
            console.log(reduce)
            // let reduce = 8;
            // let reuse = 12;
            // let recycle = 27;
            console.log(reduce)
            if (reduce && reuse && recycle) {
              document.getElementById("piechart").innerHTML = ""
              var data = google.visualization.arrayToDataTable([
                ['Type', 'Times Completed'],
                ['Reduce', reduce],
                ['Reuse', reuse],
                ['Recycle', recycle]
              ]);

              var options = {
                colors: ['#ecb349', '#7ca6a6', '#d86b54'],
                legend: {
                  position: 'none'
                },
                pieSliceText: 'label',
                fontSize: '8px',
                chartArea: {
                  left: '7%',
                  top: '7%',
                  width: '86%',
                  height: '86%'
                }
              };

              var chart = new google.visualization.PieChart(document.getElementById('piechart'));

              chart.draw(data, options);
            }
            else {
              document.getElementById("piechart").innerHTML = '<p style="font-size: small; text-align: center;">Insufficient information to create chart. Start tracking tasks to see your progress!</p>'
            }
          })
          .catch(function (error) {
            console.log(error)
          })

      }
      else {
        console.log("user not logged in")
      }

    })
    .catch(error => {
      console.log(error)
    })

}

function setImage(points) {
  var count = points % 9;
  document.getElementById("bottle").src = waterBottle[count];
  var num_bottles = parseInt(points / 9);
  document.getElementById("bottle_count").innerHTML = "You have filled up " + num_bottles + " bottles! Good job!";
  // document.getElementById("level").innerHTML = level + 1;
}

var task = [{ name: 'a', description: 'b', type: 'reuse' }];


var taskName = document.getElementById("taskName").value;
var taskDesc = document.getElementById("descr").value;
var taskType = document.getElementById("type").value;
// var task = [{name: taskName, description: taskDesc, type:taskType}];
// console.log("initial task length = ", task.length);

var task = [{ name: taskName, description: taskDesc, type: taskType }];
var exUser = {
  taskCard: task,
};

function createTaskDisplay(taskName, taskId, taskDesc, taskType, timesTaskComp) {
  console.log("creating task");
  var output = `
  <div class='theme-dark rounded-all card' id="counter" style="border: none">
  <div class='card-header'>${taskName}
  <div class='card-body'>
  <p class='card-text' style='font-size: 12pt'> <i>${taskType}</i> -- ${taskDesc} </p>
  <p class='card-text' style='font-size: 12pt' id='times_completed' completed=${timesTaskComp}>Times Completed: ${timesTaskComp}</p>
  <button class='button' onclick='completeTask(${taskId}, "${taskType}", ${timesTaskComp})'>Complete Task</button>
  </div>
  </div>
  </div>
  </br>`;

  // console.log("displayTask i=",i);
  return output;
  // document.getElementById("tasks").innerHTML += output;
}

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
  var task = { name: taskName, description: taskDesc, impact: taskType };
  console.log("new task:");
  console.log(task);

  // task.push({name: document.getElementById("taskName").value, description: document.getElementById("descr").value, type: document.getElementById("type").value});
  // task.push({ name: taskName, description: taskDesc, type: taskType });
  // console.log("task length = ", task.length);
  // displayTasks();


  // console.log(user)
  if (currentUser) {
    let { username } = currentUser;
    // do a get request to get all info on tasks
    axios
      .post("/api/users/" + username + '/addTask', task)
      .then(function (results) {
        // update current user and update task list
        loggedIn()
          .then(displayTasks)
          .catch(err => console.log(err))
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  }
  $('#addTask').modal('hide')
}

// var counter = 0;

function displayTasks() {
  console.log("displayTasks");

  // Displaying the tasks
  // var taskName = document.getElementById("taskName").value;
  // var taskDesc = document.getElementById("descr").value;
  // var taskType = document.getElementById("type").value;

  // console.log("show name",taskName);
  // var task = [{ name: taskName, description: taskDesc, type: taskType }];

  var taskName;
  var taskDesc;
  var taskType;
  var taskId;
  var timesTaskComp;

  // console.log("user is ",user);
  // output = "<button class='button' onclick='loadTrackingInfo()' style='float: left; margin-left:100px;'>Complete Task</button>\;";

  // for (var i = 0; i < task.length; i++) {

  // console.log(user)
  // handle success
  if (!currentUser) return redirectHome()

  let { username, impact_points } = currentUser

  document.getElementById('impact_points').innerHTML = impact_points; // updating tracking page to display the correct number of impact points
  document.getElementById('impact_points').points = `${impact_points}`; // also update value
  document.getElementById('username').innerHTML = username;
  setImage(impact_points);

  // do a get request to get all info on tasks
  axios.get("/api/users/" + username + '/getTasks')
    .then(function (results) {
      // gets an array of all the tasks -- load them in
      console.log("TASKS");
      console.log(results);
      var output = ""
      var tasks = results.data.tasks;
      for (var i = 0; i < results.data.tasks.length; i++) {
        taskName = tasks[i].name;
        taskDesc = tasks[i].description;
        taskType = tasks[i].impact;
        timesTaskComp = tasks[i].times_completed;
        taskId = tasks[i].id;
        output += createTaskDisplay(taskName, taskId, taskDesc, taskType, timesTaskComp);
      }
      // add tasks to webpage
      document.getElementById("tasks_display").innerHTML = output;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

}

function deleteTask(i) {
  // Delete the task number based on the taskid
  // an int i that should represent where in the array the task is

  // Setting the task to default

  console.log("delete Task being called");


  // console.log("task length = ", task.length);

  document.getElementById(i).remove();

}

// pass task id for a get task function 
function completeTask(task_id, task_type, timesComp) {
  // maybe pop up with an alert or something that the task was completed?
  console.log("task type: ");
  console.log(task_type);
  console.log("task_id: ");
  console.log(task_id);

  if (currentUser) {
    let { username } = currentUser;
    // post method to completeTask, sending task_id and task_type
    axios({
      method: 'post',
      url: '/api/users/' + username + '/completeTask',
      data: {
        task_id: task_id,
        impact: task_type
      }
    })
      .then(loggedIn)
      .then(displayTasks)
      .catch(err => console.log(err))
  }

}

function redirectHome() {
  window.location.pathname = '/home'
}

function onLoadFunc() {
  loadLogoutModal()
    .then(() => console.log("DonE"))
    .then(() => displayTasks())
    .catch(err => console.log(err))
}

window.onload = onLoadFunc;


function enableButton() {
  var name = document.getElementById("taskName");
  var description = document.getElementById("descr");
  var type = document.getElementById("type");

  var valid = false;
  if (name.value && description.value && type.value) {
    var valid = true
  }
  let username = currentUser.username;
  axios.get(`/api/users/${username}/getTasks`)
    .then(function (response) {
      //console.log(response);
      let tasks = response.data.tasks;
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name == name.value) {
          valid = false;
          document.getElementById("error_msg").innerHTML = "You already have a task with this name."
          break;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  if (valid) {
    document.getElementById("my_submit_button").disabled = false;
  }
}
