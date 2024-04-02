// Display Exercise Card
function displayExerciseCard() {
  firebase.auth().onAuthStateChanged(function (user) {

    let exerciseCardTemplate = document.getElementById("exerciseCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    // db.collection("users").doc(user.uid).collection("workouts").get()
    db.collection("exercisesTemplates").get()
      .then(allExercises => {
        allExercises.forEach(doc => {
          // var workoutName = doc.data().name;
          // var workout = doc.data();
          var title = doc.data().name;       // get value of the "name" key
          console.log(title);
          // var details = doc.data().details;  // get value of the "details" key
          var exerciseImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
          // var hikeLength = doc.data().length; //gets the length field
          var docID = doc.id;
          console.log(docID);
          
          let newcard = exerciseCardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


          console.log(doc.data());  //.data() returns data object
          // console.log(workout.name);

          //update title and text and image
          newcard.querySelector('.exercise-title').innerHTML = title;
          // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
          // newcard.querySelector('.card-text').innerHTML = details;
          newcard.querySelector('.exercise-image').src = `./images/${exerciseImage}.jpg`; //Example: NV01.jpg
          // newcard.querySelector('a').href = "workingOut.html?docID="+docID;
          

          // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
          // document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
          
          //attach to gallery, Example: "hikes-go-here"
          document.getElementById("exercises-go-here").appendChild(newcard);        });
      });

  });
}
// calling the function
// displayExerciseCard();


// Write New Workout Name to db
function createWorkout() {
  firebase.auth().onAuthStateChanged(function (user) {
    // var user = firebase.auth().currentUser;

  //name of the collection and documents should matach excatly with what you have in Firestore
  db.collection("users")
    // .doc("HF36jrJMGkT5VSovUnuZlNb6it52")
    .doc(user.uid)
    .collection("workouts")
    // .doc("WEYxpZPoNCvym1ig4cXL")

    .add({
      dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      favorite: false,
      imageName: "elmo",
      name: document.getElementById("formNewWorkoutName").value
    })

    // .set(
    //   // { name: document.getElementById("formNewWorkoutName").value }, 
    //   { 
    //     name: "Tuesday Workout",
    //     favorite: true
    //   }
    //   // ,{ merge: true}
    //   )

    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      // window.location.assign("workout_favorite.html");       //re-direct to workout_favorite after creating a new workout
      displayExerciseCard();
    })

    .catch(function (error) {
      console.error("Error adding document: ", error);
    })
    ;
  // .onSnapshot(doc => {  //arrow notation
  //   var workout = doc.data();

  //   console.log(doc.data());  //.data() returns data object
  //   console.log(workout.name);
  //   // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
  //   document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
});
}
// calling the function
// createWorkout();


// Add Exercise to Workout
// function addExercise() {
//   let btnAddExercise = document.querySelectorAll(".js-btnAddExercise");

//   btnAddExercise.forEach(button => {
//     button.classList.add("enabled");
//   });

//   // btnAddExercise.forEach(button => {
//   //   button.classList.remove("enabled");
//   // });

//   btnAddExercise.forEach(button => {
//     button.addEventListener("click", event => {

//         if(event.target.classList.contains("disabled")) {
//           event.target.textContent += "boo";
//         } else {
//           event.target.classList.replace("enabled", "disabled");
//         }
      
//     });
//   });

  
  // btnAddExercise.classList.add("enabled");

  // btnAddExercise.addEventListener("click", event => {
  //   if (event.target.classList.contains("disabled")) {
  //     event.target.classList.replace("enabled", "disabled");
  //   } else {
  //     event.target.classList.replace("enabled", "disabled");
  //   }

  // });
// }

// Save Exercise ID's?
var ExerciseList=[];

function addExercise(exID){
  firebase.auth().onAuthStateChanged(function (user) {

    db.collection("exercisesTemplates").get()
    .then(allExercises => {
      allExercises.forEach(doc => {
        // var workoutName = doc.data().name;
        // var workout = doc.data();
        // var title = doc.data().name;       // get value of the "name" key
        // console.log(title);
        // var details = doc.data().details;  // get value of the "details" key
        // var exerciseImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
        // var hikeLength = doc.data().length; //gets the length field
        var docID = doc.id;
        console.log(docID);
        
        // let newcard = exerciseCardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


        // console.log(doc.data());  //.data() returns data object
        // console.log(workout.name);

        //update title and text and image
        // newcard.querySelector('.exercise-title').innerHTML = title;
        // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
        // newcard.querySelector('.card-text').innerHTML = details;
        // newcard.querySelector('.exercise-image').src = `./images/${exerciseImage}.jpg`; //Example: NV01.jpg
        // newcard.querySelector('a').href = "workingOut.html?docID="+docID;
        

        // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
        // document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
        
        //attach to gallery, Example: "hikes-go-here"
        // document.getElementById("exercises-go-here").appendChild(newcard);
        console.log("inside addexercise, with ID: " + exID);
        ExerciseList.push(docID);
        console.log(ExerciseList);
      });

    });

  });
}

