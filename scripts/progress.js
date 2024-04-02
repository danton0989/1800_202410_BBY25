function displayChart(collection) {
    firebase.auth().onAuthStateChanged((user) => {
      var exercises = db.collection("users").doc(user.uid).collection("exercises")
      let i = 1;

      exercises
      .get()
      .then((allExercises) => {
        allExercises.forEach((exerciseDoc) => { 
            let exerciseID = exerciseDoc.id;
            console.log(exerciseID);
            document.getElementById(i).setAttribute("onclick", "window.location='./suggestion.html?docID=" + exerciseID + "'");
            i++;
        });
      });
  
    });
  }
  
  displayChart("abc");