/**
 *  TO DO
 *  Integrate new task layout with the database
 */


// var count = 0;
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
        // count = response.data.num_bottles % 5;
        setImage()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

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
        axios.get(baseUrl + `/api/users/${id}/numTasks`)
          .then(function (response) {
            console.log(response)
            // let reduce = response.data.reduce[0].sum
            // let reuse = response.data.reuse[0].sum
            // let recycle = response.data.recycle[0].sum
            let reduce = 8;
            let reuse = 6;
            let recycle = 12;
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
  var count = points%5;
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
  var num_bottles = points/5;
  document.getElementById("bottle_count").innerHTML = "You have filled up " +num_bottles+ " bottles! Good job!";
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

  loggedIn()
    .then(user => {
      // console.log(user)
      loadLogoutModal(user)
      if (user) {
        let username = user.username;
        //LOAD PAGE HERE
        axios
          .get(baseUrl + "/api/users/" + username)
          .then(function (response) {
            // handle success
            let user = response.data;
            document.getElementById('impact_points').innerHTML = user.impact_points; // updating tracking page to display the correct number of impact points
            document.getElementById('impact_points').points = `${user.impact_points}`; // also update value
            // do a get request to get all info on tasks
            axios
              .post(baseUrl + "/api/users/" + username + '/addTask', task)
              .then(function(results) {
                console.log("results");
                console.log(results.data.task[0]);
                var addedTask = results.data.task[0];
                document.getElementById("tasks_display").innerHTML += createTaskDisplay(addedTask.name, addedTask.id, addedTask.description, addedTask.impact, addedTask.times_completed);
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }

    })
    .catch(error => {
      console.log(error)
    })

}

// var counter = 0;

function displayTasks() {
  console.log("displayTasks()");

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
  var output = "";
  // output = "<button class='button' onclick='loadTrackingInfo()' style='float: left; margin-left:100px;'>Complete Task</button>\;";

  // for (var i = 0; i < task.length; i++) {

  loggedIn()
    .then(user => {
      // console.log(user)
      loadLogoutModal(user)
      if (user) {
        let username = user.username;
        //LOAD PAGE HERE
        axios
          .get(baseUrl + "/api/users/" + username)
          .then(function (response) {
            // handle success
            let user = response.data;
            document.getElementById('impact_points').innerHTML = user.impact_points; // updating tracking page to display the correct number of impact points
            document.getElementById('impact_points').points = `${user.impact_points}`; // also update value
            document.getElementById('username').innerHTML = user.username;
            setImage(user.impact_points);
            // do a get request to get all info on tasks
            axios
              .get(baseUrl + "/api/users/" + username + '/getTasks')
              .then(function(results) {
                // gets an array of all the tasks -- load them in
                console.log("TASKS");
                console.log(results);
                var tasks = results.data.tasks;
                for(var i=0; i<results.data.tasks.length; i++) {
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
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }

    })
    .catch(error => {
      console.log(error)
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

  // update inner html to have times completed be correct
  timesComp++;
  document.getElementById('times_completed').innerHTML = `Times completed: ${timesComp}`;
  console.log("Times comp:" + timesComp);

  // update inner html to have the correct impact points displayed -- IS WORKING FOR SOME REASON (don't understand why but it works)
  if(task_type == 'reuse') {
    var impactValue = parseInt(document.getElementById('impact_points').points) +3;
    document.getElementById('impact_points').points = `${impactValue}`;
    document.getElementById('impact_points').innerHTML = impactValue;
    console.log("Impact value: " + impactValue);
    setImage(impactValue);
  }
  else if(task_type == 'reduce') {
    var impactValue = parseInt(document.getElementById('impact_points').points) +2;
    document.getElementById('impact_points').points = `${impactValue}`;
    document.getElementById('impact_points').innerHTML = impactValue;
    console.log("Impact value: " + impactValue);
    setImage(impactValue);
  }
  else if(task_type == 'recycle') {
    var impactValue = parseInt(document.getElementById('impact_points').points) +1;
    document.getElementById('impact_points').points = `${impactValue}`;
    document.getElementById('impact_points').innerHTML = impactValue;
    console.log("Impact value: " + impactValue);
    setImage(impactValue);
  }

  loggedIn()
    .then(user => {
      // console.log(user)
      loadLogoutModal(user)
      if (user) {
        let username = user.username;
        //LOAD PAGE HERE
        axios
          .get(baseUrl + "/api/users/" + username)
          .then(function (response) {
            // handle success
            // displayTasks();
            let user = response.data;
            // post method to completeTask, sending task_id and task_type
            axios({
              method: 'post',
              url: baseUrl + '/api/users/' + user.username + '/completeTask',
              data: {
                task_id: task_id,
                impact: task_type
              }
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }

    })
    .catch(error => {
      console.log(error)
    })

}

window.onload = displayTasks();
