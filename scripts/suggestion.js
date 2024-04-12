//Displays charts for weight and reps
function displayChart(collection) {
  firebase.auth().onAuthStateChanged(async (user) => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    var exerciseHistory = db
      .collection("users")
      .doc(user.uid)
      .collection("history"); //get the history of exercise
    var weightChart = []; //array of the weight chart
    var repChart = []; //array of the rep chart
    //getting data from workout history
    await exerciseHistory
      .orderBy("start_time")
      .get()
      .then(async (allhistory) => {
        await allhistory.forEach(async (doc) => {
          var time = doc.data().end_time; //get the end_time
          var end_time = time.toDate().toDateString(); //changing end_time to dayOftheWeek month day year format
          //getting data from exercise history
          await exerciseHistory
            .doc(doc.id)
            .collection("exercises")
            .get()
            .then(async (allexercises) => {
              await allexercises.forEach((exerciseDoc) => {
                var id = exerciseDoc.data().id; //getting an exercise id
                //comparing exercise id with the value of URL
                if (id === ID) {
                  var set1 = exerciseDoc.data().set1;
                  var set2 = exerciseDoc.data().set2;
                  var set3 = exerciseDoc.data().set3;
                  var weight = exerciseDoc.data().weight;
                  //adding all three set data
                  var set =
                    parseInt(set1, 10) +
                    parseInt(set2, 10) +
                    parseInt(set3, 10);

                  //pushing the data from firebase to the weight chart
                  weightChart.push({
                    label: end_time,
                    data: weight,
                  });
                  //pushing the data from firebase to the rep chart
                  repChart.push({
                    label: end_time,
                    data: set,
                  });
                }
              });

              //displaying the weight chart with some details
              var ctxWeight = document
                .getElementById("wChart")
                .getContext("2d");
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

              //displaying the rep chart with some details
              var ctx = document.getElementById("rChart").getContext("2d");

              var config = {
                type: "line",
                data: {
                  labels: repChart.map((data) => data.label),
                  datasets: [
                    {
                      label: "reps",
                      borderColor: "rgb(75,192,192)",
                      data: repChart.map((data) => data.data),
                    },
                  ],
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

//displaying the title of each exercise on each suggestion page
function displayTitle(collection) {
  firebase.auth().onAuthStateChanged((user) => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    var exercise = db.collection("users").doc(user.uid).collection("exercises");
    exercise.get().then((allTemplates) => {
      allTemplates.forEach((eachName) => {
        var exerciseId = eachName.id; //get the exercise id
        //comparing the exercise id with the value of URL
        if (exerciseId == ID) {
          var name = eachName.data().name;
          document.getElementById("exercise").innerHTML = `${name}`; //display name on HTML
        }
      });
    });
  });
}

//calling functions to display the data
displayChart("abc");
displayTitle("name");

