function displayChart(collection) {
  firebase.auth().onAuthStateChanged(async (user) => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    var exerciseHistory = db.collection("users").doc(user.uid).collection("history")
    var weightChart = [];
    var repChart = [];
    await exerciseHistory
      .orderBy("start_time")
      .get()
      .then(async (allhistory) => {
        await allhistory.forEach(async (doc) => {
          var time = doc.data().end_time;
          var end_time = time.toDate().toDateString();
          await exerciseHistory.doc(doc.id).collection("exercises")
            .get()
            .then(async (allexercises) => {
              await allexercises.forEach((exerciseDoc) => {
                var id = exerciseDoc.data().id;
                if (id === ID) {
                  var set1 = exerciseDoc.data().set1;
                  var set2 = exerciseDoc.data().set2;
                  var set3 = exerciseDoc.data().set3;
                  var weight = exerciseDoc.data().weight;
                  var set = parseInt(set1, 10) + parseInt(set2, 10) + parseInt(set3, 10); 

                  weightChart.push({
                    label: end_time,
                    data: weight,
                  });
                  repChart.push({
                    label: end_time,
                    data: set,
                  });                  
                }
              });
              var ctxWeight = document.getElementById("wChart").getContext("2d");

              var configWeight = {
                type: "line",
                data: {
                  labels: weightChart.map((data) => data.label),
                  datasets: [
                    {
                      label: "weights",
                      borderColor: "rgb(75,192,192)",
                      data: weightChart.map((data) => data.data),
                    },
                  ],
                },
                options: {
                  responsive: true,  
                },
              };
              var myChartWeight = new Chart(ctxWeight, configWeight);

              var ctx = document.getElementById("rChart").getContext("2d");

              var config = {
                type: 'line',
                data: {
                  labels: repChart.map(data => data.label),
                  datasets: [{
                    label: "reps",
                    borderColor: "rgb(75,192,192)",
                    data: repChart.map(data => data.data),
                  }],
                },
                options: {
                  responsive: true,
                },
              };
              var myChartRep = new Chart(ctx, config);

            });
        });
      });


  });
}

function displayTitle(collection) {
  firebase.auth().onAuthStateChanged(user => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
  var exercise = db
    .collection("users")
    .doc(user.uid)
    .collection("exercises");
  exercise
    .get()
    .then(allTemplates => {
      allTemplates.forEach(eachName => {
      var exerciseId = eachName.id;
      if (exerciseId == ID) {
        var name = eachName.data().name;
        document.getElementById("exercise").innerHTML = `${name}`;
      }
    });
  });
})
}
// function displayName(collection) {
//   firebase.auth().onAuthStateChanged(async (user) => {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     var id = localStorage.getItem("id");
//     var name = localStorage.getItem("name" + i);
//     if(id = ID) {
//       document.getElementById("exercise").innerHTML = name;
//     }
//   });
// }

displayChart("abc");
displayTitle("name");
// displayName("name");