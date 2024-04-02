function displayChart(collection) {
  firebase.auth().onAuthStateChanged(async (user) => {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    var exerciseHistory = db.collection("users").doc(user.uid).collection("history")
    var exerciseChart = [];
    await exerciseHistory
      .orderBy("start_time")
      .get()
      .then(async (allhistory) => {
        await allhistory.forEach(async (doc) => {
          var end_time = doc.data().end_time.toDate();
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

              });
              var ctx = document.getElementById("myChart").getContext("2d");

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