//------------------------------
//-- WRITE WORKOUT NAME TO DB
//------------------------------
function createWorkout() {

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async function (user) {
      // display modal to show user has finished workout
      const modal = document.getElementById("modal");
      modal.classList.add("open");
      //getting the amount of workouts on account
      var data;
      var length = await db.collection("users").doc(user.uid).get().then(doc => {
        data = doc.data().workouts;
        return data;
      });
      // update number of workouts on account 
      db.collection("users").doc(user.uid).update({ 'workouts': (data + 1) });
      // used to determine image used for this workout
      var imageNum = length % 7;
      var docRef = db.collection("users").doc(user.uid).collection("workouts");
      // create new workout doc
      docRef
        .add({
          dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
          favorite: false,
          imageName: "gym" + imageNum,
          name: document.getElementById("formNewWorkoutName").value,
          order: length
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          db.collection("users")
            .doc(user.uid)
            .collection("exercises")
            .get()
            .then((allExercises) => {
              const promises = [];
              // add in exercises to this new workout document
              allExercises.forEach((doc) => {
                const docData = { id: doc.id };
                promises.push(docRef.collection("exercises").add(docData));
              });
              Promise.all(promises)
                .then(() => {
                  console.log("All exercises added to workout");
                  resolve(); // Resolve the promise when everything is done
                })
                .catch((error) => {
                  console.error("Error adding exercises to workout: ", error);
                  reject(error); // Reject the promise if there's an error
                });
            })
            .catch((error) => {
              console.error("Error getting exercises: ", error);
              reject(error); // Reject the promise if there's an error
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          reject(error); // Reject the promise if there's an error
        });
    });
  });
}

var button = document.querySelector(".js-btnAddExercise");
// create a new workout upon button click
button.addEventListener("click", (event) => {
  event.target.classList.toggle("enabled");
  
  createWorkout()
    .then(() => {
      console.log("Workout created successfully");
    })
    .catch((error) => {
      console.error("Error creating workout: ", error);
      // Handle the error here, if needed
    });
});

// finalizes the creatiion sending user back to workouts page
function finalizeCreateWorkout() {
  window.location.href = "./workout_favorite.html";
}
