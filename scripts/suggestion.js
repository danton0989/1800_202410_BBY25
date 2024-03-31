function displayChart(collection) {
  var user = firebase.auth().currentUser;
  var exerciseHistory = db.collection("users").doc(user.uid).collection("history")
  var exercise = db.collection("users").doc(user.uid).collection("history").doc(doc.id).collection("exercises")
  var exerciseChart = [];
  exerciseHistory
  .get()
  .then((allhistory) => {
  allhistory.forEach((doc) =>{
  var end_time = doc.data().end_time.toDate();
  exercise
  .get()
  .then((allexercises) => {
  allexercises.forEach((exerciseDoc) => {
  var id = exerciseDoc.data().id;
  var set1 = exerciseDoc.data().set1;
  var set2 = exerciseDoc.data().set2;
  var set3 = exerciseDoc.data().set3;
  var weight = exerciseDoc.data().weight;
  
  exerciseChart.push({
    label: end_time,
    data: weight,
  });
});
  var ctx = document.getElementById("myChart").getContext("2d");

  var config ={
    type: 'line',
    data:{
      labels: exerciseChart.map(data => data.label),
      datasets: [{
        label: "exercise",
        borderColor:"rgb(75,192,192)",
        data: exerciseChart.map(data => data.weight),
      }],
    },
      option: {
      responsive: true,
      },
  };
  var myChar = new Chart(ctx, config);

  });
});
});

}