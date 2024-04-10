//------------------------------>
//-- DISPLAY EXERCISE CARD
//------------------------------>
function displayExerciseCard() {
  firebase.auth().onAuthStateChanged(function (user) {
    // Retrieve the HTML element with the ID "exerciseCardTemplate" and store it in the cardTemplate variable. 
    let cardTemplate = document.getElementById("exerciseCardTemplate"); 

    // Retrieve exercise template documents
    db.collection("exercisesTemplates")
      .get()

      .then(allExercises => {
        allExercises.forEach(doc => {
          var docID = doc.id;
          var title = doc.data().name;       // get value of the "name" key
          var exerciseImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
          
          // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
          let newcard = cardTemplate.content.cloneNode(true); 

          console.log(doc.data());  //.data() returns data object

          // Update link?, title and image
          newcard.querySelector('.exercise-title').innerHTML = title;
          newcard.querySelector('.exercise-image').src = `./images/${exerciseImage}.jpg`; //Example: NV01.jpg
          
          // Attach to gallery, Example: "hikes-go-here"
          document.getElementById("exercises-go-here").appendChild(newcard);
        });
      });
  });
}
// Calling the function
// displayExerciseCard();


//------------------------------>
//-- WRITE WORKOUT NAME TO DB
//------------------------------>
function createWorkout() {
  firebase.auth().onAuthStateChanged(function (user) {

  // Location in Firebase to write data
  db.collection("users")
    .doc(user.uid)
    .collection("workouts")

    .add({
      dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      favorite: false,
      imageName: "gym",
      name: document.getElementById("formNewWorkoutName").value
    })

    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      
      // Page to redirect to after creating a new workout
      window.location.assign("workout_favorite.html");       
      
      // displayExerciseCard();
    })

    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  });
}
// calling the function
// createWorkout();


//------------------------------>
//-- ADD EXERCISES TO WORKOUT?
//-- SAVE EXERCISE ID's?
//------------------------------>
var ExerciseList=[];

function addExercise(exID){
  firebase.auth().onAuthStateChanged(function (user) {

    db.collection("exercisesTemplates")
      .get()
 
      .then(allExercises => {
        allExercises.forEach(doc => {
          // var workoutName = doc.data().name;
          // var title = doc.data().name;       // get value of the "name" key
          // console.log(title);
          // var exerciseImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
          // var details = doc.data().details;  // get value of the "details" key
          // var hikeLength = doc.data().length; //gets the length field
          var docID = doc.id;
          console.log(docID);
          
          // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
          // let newcard = exerciseCardTemplate.content.cloneNode(true); 

          // Update link, title and image
          // newcard.querySelector('a').href = "workingOut.html?docID="+docID;
          // newcard.querySelector('.exercise-title').innerHTML = title;
          // newcard.querySelector('.exercise-image').src = `./images/${exerciseImage}.jpg`; //Example: NV01.jpg
          // newcard.querySelector('.card-text').innerHTML = details;
          // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
          
          // Attach to gallery, Example: "hikes-go-here"
          // document.getElementById("exercises-go-here").appendChild(newcard);

          console.log("inside addexercise, with ID: " + exID);
          ExerciseList.push(docID);
          console.log(ExerciseList);
        });
      });
  });
}


//------------------------------>
//-- BUTTON CLICK CHANGE COLOR
//------------------------------>
var button = document.getElementsByClassName("js-btnAddExercise");

button.addEventListener("click", event => {

  event.target.classList.add("enabled");

  if (event.target.classList.contains("enabled")) {
    event.target.classList.replace("enabled", "disabled");
  } else {
    event.target.classList.replace("enabled", "disabled");
  }
});

