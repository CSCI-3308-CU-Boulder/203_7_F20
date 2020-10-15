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
var baseUrl = "http://localhost:5000"

$(document).ready(function () {
  loadBottles()
})

function loadBottles() {
  axios
    .get(baseUrl + "/users/mteets4")
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

function taskComplete() {
  count = (count + 1) % 5;
  axios.post(baseUrl + "/users/mteets4/completeTask", {}).then((response) => {
    console.log(response);
  });
  if (count == 5) {
    level++;
    alert("Congratulations you leved up!");
  }
  setImage()
}

function setImage() {
  if (count == 0) {
    document.getElementById("bottle").src = "./assets/waterBottle1.jpg";
  } else if (count == 1) {
    document.getElementById("bottle").src = "./assets/waterBottle2.jpg";
  } else if (count == 2) {
    document.getElementById("bottle").src = "./assets/waterBottle3.jpg";
  } else if (count == 3) {
    document.getElementById("bottle").src = "./assets/waterBottle4.jpg";
  } else if (count == 4) {
    document.getElementById("bottle").src = "./assets/waterBottle.jpg";
  }
  document.getElementById("bottle_count").innerHTML = count + 1;
  document.getElementById("level").innerHTML = level + 1;
}

function resetToEmpty() {
  count = 0;
  bottlesFilled = 0;
  document.getElementById("bottle").src = "./assets/waterBottle.jpg";
  document.getElementById("bottle_count").innerHTML = bottlesFilled;
}
