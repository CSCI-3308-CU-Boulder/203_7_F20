// Array of friend information
var friends = [{name:"Matthew Teta", level: 2, bottle_filled: 10, acheivements: "None"},
				{name:"Sarah Zendle", level: 5, bottle_filled: 25, acheivements: "None"},
        {name:"Charlie Koepke", level: 0, bottle_filled: 2, acheivements: "None"},
        {name:"Lakshya Jaishankar", level: 2, bottle_filled: 10, acheivements: "None"},
        {name:"Rebecca Coryell", level: 1, bottle_filled: 8, acheivements: "None"},
        {name:"Brian Mayer", level: 2, bottle_filled: 12, acheivements: "None"},
        {name:"Samuel Mast", level: 3, bottle_filled: 15, acheivements: "None"}];

window.onload = function displayFriends() {
  var load = "";
  for (var i = 0; i < friends.length; i++) {
    load += ('<div class="row"><div class="column" style="margin-right: auto; margin-left: auto"><div class="card"><h5 class="card-header" >');
    load += (friends[i].name);
    load += ('</h5><button type="button" class="card-footer btn btn-primary" onclick="friendProfile(' + i + ')" data-toggle="modal" data-target="#friendProfile">Open Profile</button></div></div></div>');
  }
  document.getElementById("friendDisplay").innerHTML = load;
}

function friendProfile(index) {
  document.getElementById("showName").innerHTML = friends[index].name;
  document.getElementById("level").innerHTML = friends[index].level;
  document.getElementById("bottles").innerHTML = friends[index].bottle_filled;
  document.getElementById("acheivements").innerHTML = friends[index].acheivements;
}
