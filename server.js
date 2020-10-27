//sets up express
var express = require('express');
var app = express();
var path = require('path');
//allows app to access directories
app.use(express.static(path.join(__dirname)));
app.use("/Code", express.static(__dirname + '/Code'));
app.use("/assets", express.static(__dirname + '/Code' + '/assets'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/homePage.html'));
});

//route to signup form
app.get('/signupForm.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/signupForm.html'));
});
//route to home page
app.get('/homePage.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/homePage.html'));
});
//route to login form
app.get('/loginForm.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/loginForm.html'));
});
//route to userprofile
app.get('/userProfile.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/userProfile.html'));
});
//route to tracking page
app.get('/tracking.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/tracking.html'));
});
//path to donate page
app.get('/donate.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/donate.html'));
});
//path to friends page
app.get('/friends.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/friends.html'));
});
//path to javascripts
app.get('/userProfile.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/userProfile.js'));
});
app.get('/loadProfile.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/loadProfile.js'));
});
app.get('/friendProfile.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/friendProfile.js'));
});
app.get('/search.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/search.js'));
});
app.get('/tracker.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/Code/tracker.js'));
});


//where the app is hosted
app.listen(process.env.PORT || 8080);
//app.listen(process.env.PORT || enviserver.herokuapp.com);