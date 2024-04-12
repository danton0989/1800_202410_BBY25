//When the user click on to each button on the progress page they will be directed to the suggestion page with each exercise's graphs showing
function displayChart(collection) {
    firebase.auth().onAuthStateChanged((user) => {
      var exercises = db.collection("users").doc(user.uid).collection("exercises")
      let i = 1;

      exercises
      .get()
      .then((allExercises) => {
        allExercises.forEach((exerciseDoc) => { 
            let exerciseID = exerciseDoc.id;
            let name = exerciseDoc.data().name;
            document.getElementById(i).setAttribute("onclick", "window.location='./suggestion.html?docID=" + exerciseID + "'");
            document.getElementById(i).innerHTML = name;
            i++;
        });
      });
  
    });
  }


  displayChart("abc");