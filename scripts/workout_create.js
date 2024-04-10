//------------------------------
//-- WRITE WORKOUT NAME TO DB
//------------------------------
function createWorkout() {
  
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async function (user) {
      var data;
      var length = await db.collection("users").doc(user.uid).get().then(doc => {
        data = doc.data().workouts;
        return data;
      });
      db.collection("users").doc(user.uid).update({'workouts': (data + 1)});
      var imageNum = length % 7;
      var docRef = db.collection("users").doc(user.uid).collection("workouts");
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
button.addEventListener("click", (event) => {
  event.target.classList.toggle("enabled");

  createWorkout()
    .then(() => {
      console.log("Workout created successfully");
      window.location.href = "./workout_favorite.html";
    })
    .catch((error) => {
      console.error("Error creating workout: ", error);
      // Handle the error here, if needed
    });
});
