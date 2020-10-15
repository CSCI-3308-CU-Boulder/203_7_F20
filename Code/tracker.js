var count = 0;
var bottlesFilled = 0;

function loadBottles() {
  axios
    .get("/users/:mteets4")
    .then(function (response) {
      // handle success
      console.log(response);
      count = response.data.num_bottles;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function taskComplete() {
  count++;
  if (count == 1) {
    document.getElementById("bottle").src = "./assets/waterBottle1.jpg";
  } else if (count == 2) {
    document.getElementById("bottle").src = "./assets/waterBottle2.jpg";
  } else if (count == 3) {
    document.getElementById("bottle").src = "./assets/waterBottle3.jpg";
  } else if (count == 4) {
    document.getElementById("bottle").src = "./assets/waterBottle4.jpg";
  } else if (count > 4) {
    count = 0;
    document.getElementById("bottle").src = "./assets/waterBottle.jpg";
    bottlesFilled++;
    document.getElementById("bottle_count").innerHTML = bottlesFilled;
    if (bottlesFilled % 5 == 0) {
      alert("Congratulations you leved up!");
      level++;
      axios.post("/users/:mteets4/completeTask");
    }
    document.getElementById("level").innerHTML = level;
  }
}

function resetToEmpty() {
  count = 0;
  bottlesFilled = 0;
  document.getElementById("bottle").src = "./assets/waterBottle.jpg";
  document.getElementById("bottle_count").innerHTML = bottlesFilled;
}
