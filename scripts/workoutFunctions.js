
// Function to read the quote of the day from the Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function displayWorkoutName() {
  firebase.auth().onAuthStateChanged(function (user) {

    db.collection("users").doc(user.uid).collection("workouts").get()
      .then(workouts => {
        workouts.forEach(doc => {
          // var workoutName = doc.data().name;
          var workout = doc.data();

          console.log(doc.data());  //.data() returns data object
          console.log(workout.name);
          document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
        });
      });
  });
}

function displayExerciseCard() {
  firebase.auth().onAuthStateChanged(function (user) {

    let exerciseCardTemplate = document.getElementById("exerciseCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    // db.collection("users").doc(user.uid).collection("workouts").get()
    db.collection("exercisesTemplates").get()
      .then(allExercises => {
        allExercises.forEach(doc => {
          var title = doc.data().name;       // get value of the "name" key
          console.log(title);
          var docID = doc.id;
          console.log(docID);
          
          let newcard = exerciseCardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


          console.log(doc.data());  //.data() returns data object

          //update title and text and image
          newcard.querySelector('.exercise-title').innerHTML = title;
          newcard.querySelector('a').href = "workingOut.html?docID="+docID;
  
          //attach to gallery, Example: "hikes-go-here"
          document.getElementById("exercises-go-here").appendChild(newcard);        });
      });

  });
}

displayExerciseCard();        //calling the function


// Write New Workout Name to db
function createWorkout() {
  firebase.auth().onAuthStateChanged(function (user) {

  //name of the collection and documents should matach excatly with what you have in Firestore
  db.collection("users")
    .doc(user.uid)
    .collection("workouts")

    .add({
      dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      favorite: false,
      imageName: "elmo",
      name: document.getElementById("formNewWorkoutName").value
    })


    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      displayExerciseCard();
    })

    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
}
