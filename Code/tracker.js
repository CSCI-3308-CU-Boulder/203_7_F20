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

// function resetToEmpty() {
//   count = 0;
//   bottlesFilled = 0;
//   document.getElementById("bottle").src = "./assets/waterBottle.jpg";
//   document.getElementById("bottle_count").innerHTML = bottlesFilled;
// }

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
  axios.post(baseUrl + "/users/" + username + "/completeTask", {}).then((response) => {
    console.log(response);
  });

  // Make the task card disappear


  if (count % 5 == 0) {
    level++;
    alert("Congratulations you leved up!");
    count = 0;
  }
  setImage();
}

function setImage() {
  if (count == 0) {
    document.getElementById("bottle").src = "./assets/waterBottle.jpg";
  } else if (count == 1) {
    document.getElementById("bottle").src = "./assets/waterBottle1.jpg";
  } else if (count == 2) {
    document.getElementById("bottle").src = "./assets/waterBottle2.jpg";
  } else if (count == 3) {
    document.getElementById("bottle").src = "./assets/waterBottle3.jpg";
  } else if (count == 4) {
    document.getElementById("bottle").src = "./assets/waterBottle4.jpg";
  }
  document.getElementById("bottle_count").innerHTML = count;
  document.getElementById("level").innerHTML = level + 1;
}

/**
class task {
  var name;
  var description;
  var type;
  var bottlesWorth;
  contructor(name, description, type, bottlesWorth) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.bottlesWorth = bottlesWorth;
  }
  function getName() {
    return name;
  }
  function getDescription() {
    return description;
  }
  function getType() {
    return type;
  }
  function getWorth() {
    return bottlesWorth;
  }
}
*/

var task = [{name:'Brought reusable water bottle', description:'I brought a reusable water bottle instead of a plastic bottle.', type:'reuse'}];

function addTask() {
  // Opens a modal that will intake the information and then add the task into a list of tasks that will display as cards
  //.push() method


}

window.onload = function displayTasks() {
  for (var i = 0; i < task.length; i++) {
    document.getElementById("tasks").innerHTML += "<div class='card'><div class='card-title text-center'><h6>" + task[i].name + "</h6></div><div class='card-body><p>" + task[i].description + "</p></div>";
    document.getElementById("tasks").innerHTML += "<div class='card-footer'><button class='btn-sm btn-primary' onclick='taskComplete()'>Complete Task</button></div>";


    // Add the bottles added and then delete and complete task buttons
  }
}

function deleteTask() {

}
