function displayChart(collection) {
  firebase.auth().onAuthStateChanged(async (user) => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);
    var exerciseHistory = db.collection("users").doc(user.uid).collection("history")
    //var exercise = db.collection("users").doc(user.uid).collection("history").doc(doc.id).collection("exercises")
    var exerciseChart = [];
    await exerciseHistory
      .get()
      .then(async (allhistory) => {
        await allhistory.forEach(async (doc) => {
          var end_time = doc.data().end_time.toDate();
          console.log(end_time);
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

                  exerciseChart.push({
                    label: end_time,
                    data: weight,
                  });
                }

                /* var set1 = exerciseDoc.data().set1;
                var set2 = exerciseDoc.data().set2;
                var set3 = exerciseDoc.data().set3;
                var weight = exerciseDoc.data().weight;

                exerciseChart.push({
                  label: end_time,
                  data: weight,
                }); */
              });
              var ctx = document.getElementById("myChart").getContext("2d");

              console.log(exerciseChart);
              console.log(exerciseChart.map(data => data.label));
              console.log(exerciseChart.map(data => data.data));

              var config = {
                type: 'line',
                data: {
                  labels: exerciseChart.map(data => data.label),
                  datasets: [{
                    label: "exercise",
                    borderColor: "rgb(75,192,192)",
                    data: exerciseChart.map(data => data.data),
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


  });
}

displayChart("abc");