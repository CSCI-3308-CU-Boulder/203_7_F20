var count = 0;
var bottlesFilled = 0;

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
  }
}
