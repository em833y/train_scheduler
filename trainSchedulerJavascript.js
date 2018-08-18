var config = {
    apiKey: "AIzaSyBvmqPzjmOo8V1rRG3_d9WtxqYCkX40l7k",
    authDomain: "train-schedule-table-hw.firebaseapp.com",
    databaseURL: "https://train-schedule-table-hw.firebaseio.com",
    storageBucket: "train-schedule-table-hw.appspot.com",
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

// Clicking submit calls getData function
$("#submit").on("click", function(event){
	event.preventDefault();
  getData();
})

// Functions ===================================

// This function is called by the submit button being clicked
// This function gathers data and pushes it to firebase
function getData() {
trainName = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTrain = moment($("#firstTrain").val().trim(), "LT").format("X");
frequency = $("#frequency").val().trim();

// Pushing info to database
database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
  });

// Emptying divs after clicking submit
$("#trainName").val("");
$("#destination").val("");
$("#firstTrain").val("");
$("#frequency").val("");

};


// This function notices if a child is added to the database
// If a child is added the information is then added to the website
database.ref().on("child_added", function(snapshot){
var train = snapshot.val().trainName;
var dest = snapshot.val().destination;
var fTrain = snapshot.val().firstTrain;
var freq = parseInt(snapshot.val().frequency);
var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);
var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");
var nextAr= moment(nextA).format("LT");
var minAway = moment(nextA).diff(moment(), "minutes")+1;




$("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextAr + "</td><td>" + minAway + "</td></tr>");

});


// if (screen.width <= 480) {
//  document.getElementById("viewport").setAttribute("content", "width=400; initial-scale=0.5");
// }