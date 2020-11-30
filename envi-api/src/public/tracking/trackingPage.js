/**
 *  TO DO
 *  Integrate new task layout with the database
 */




// function resetToEmpty() {
//   count = 0;
//   bottlesFilled = 0;
//   document.getElementById("bottle").src = "../assets/waterBottle.jpg";
//   document.getElementById("bottle_count").innerHTML = bottlesFilled;
// }

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
        axios.get(`/api/users/${id}/numTasks`)
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

function taskComplete() {
  count++;
  axios.post(baseUrl + "/api/users/" + username + "/completeTask", {}).then((response) => {
    console.log(response);
  });

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
  // document.getElementById("bottle_count").innerHTML = count;
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
  var task = [{ name: taskName, description: taskDesc, type: taskType }];


  // task.push({name: document.getElementById("taskName").value, description: document.getElementById("descr").value, type: document.getElementById("type").value});
  task.push({ name: taskName, description: taskDesc, type: taskType });
  console.log("task length = ", task.length);
  displayTasks();
}

var counter = 0;

function displayTasks() {
  // console.log("hi");

  // Displaying the tasks
  var taskName = document.getElementById("taskName").value;
  var taskDesc = document.getElementById("descr").value;
  var taskType = document.getElementById("type").value;

  // console.log("show name",taskName);
  // var task = [{ name: taskName, description: taskDesc, type: taskType }];


  // console.log("user is ",user);
  var output = "";
  // output = "<button class='button' onclick='loadTrackingInfo()' style='float: left; margin-left:100px;'>Complete Task</button>\;";

  // for (var i = 0; i < task.length; i++) {
  output = `
    <div class='theme-dark rounded-all card' id="counter" style="border: none">
                  <div class='card-header'>${taskName}
                    <div class='card-body'>
                      <p class='card-text' style='font-size: 12pt'> ${taskDesc + " " + taskType} 
                      </p>
                      <button class='button' onclick='completeTask()' >Complete Task</button>

                    </div>
                  </div>
                </div>`
  counter++;

  // console.log("displayTask i=",i);
  document.getElementById("tasks").innerHTML += output;

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

            axios({
              method: 'post',
              url: 'http://localhost:5000/api/users/' + user.id + '/addTask',
              data: {
                user_id: user.id,
                name: taskName,
                description: taskDesc,
                impact: taskType,
                times_completed: 0,
                completion_date: null,
                create_date: Date.now()
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
function completeTask() {
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

            // axios
            // .get(baseUrl + "/api/users/" + user.id + "/getTasks")
            // .then(function (response1) {
            //   // handle success
            //   let task = response1.data;
            //   console.log("task is ", task);
            // })

            axios({
              method: 'post',
              url: 'http://localhost:5000/api/users/' + user.username + '/completeTask',
              data: {
                user_id: user.id,
                impact: taskType,
                completion_date: Date.now()
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
