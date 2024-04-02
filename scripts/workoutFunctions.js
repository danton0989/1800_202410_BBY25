// // Function to read the quote of the day from the Firestore "quotes" collection
// // Input param is the String representing the day of the week, aka, the document name
// function readQuote(day) {
//   db.collection("quotes").doc(day)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
//     .onSnapshot(dayDoc => {                                                               //arrow notation
//          console.log("current document data: " + dayDoc.data());                          //.data() returns data object
//          document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

//          //Here are other ways to access key-value data fields
//          //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//          //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
//          //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
//     })
// }
// readQuote("tuesday");        //calling the function


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
          // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
          document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
        });
      });
    // var user = firebase.
    // auth().currentUser;

    //name of the collection and documents should matach excatly with what you have in Firestore
    /* db.collection("users")
      // .doc("HF36jrJMGkT5VSovUnuZlNb6it52")
      .doc(user.uid)
      .collection("workouts")
      .doc("WEYxpZPoNCvym1ig4cXL")
      // .doc(workouts.uid)

      .onSnapshot(doc => {  //arrow notation
        var workout = doc.data();

        console.log(doc.data());  //.data() returns data object
        console.log(workout.name);
        // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
        document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
      }) */
    // .collection("excercises").doc("v7GbxAU2Ct9CuwpFzosk")  
    // .get()
    // .then(workout => {


    //   workout.array.forEach(element => {
    //     console.log(element);
    //   });

    //   //   

    //   // var work = workout.data().name;

    //   console.log(workout);



    //   }

    //   )
  });
}

// .onSnapshot(function(doc) {
//     console.log("current data:" , doc.data());


//     // document.getElementById("workoutName-goes-here").appendChild("ww ...");

// })

// displayWorkoutName();        //calling the function


/*
function displayWorkoutCard() {
  firebase.auth().onAuthStateChanged(function (user) {

    let cardTemplate = document.getElementById("workoutCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection("users").doc(user.uid).collection("workouts").get()
      .then(allWorkouts => {
        allWorkouts.forEach(doc => {
          // var workoutName = doc.data().name;
          // var workout = doc.data();
          var title = doc.data().name;       // get value of the "name" key
          // var details = doc.data().details;  // get value of the "details" key
          var workoutImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
          // var hikeLength = doc.data().length; //gets the length field
          var docID = doc.id;
          
          let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


          console.log(doc.data());  //.data() returns data object
          // console.log(workout.name);

          //update title and text and image
          newcard.querySelector('.workout-title').innerHTML = title;
          // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
          // newcard.querySelector('.card-text').innerHTML = details;
          newcard.querySelector('.workout-image').src = `./images/${workoutImage}.jpg`; //Example: NV01.jpg
          newcard.querySelector('a').href = "workingOut.html?docID="+docID;
          

          // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
          // document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
          
          //attach to gallery, Example: "hikes-go-here"
          document.getElementById("workouts-go-here").appendChild(newcard);        });
      });

  });
}

displayWorkoutCard();        //calling the function
*/


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
          // var workoutImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
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
          // newcard.querySelector('.workout-image').src = `./images/${workoutImage}.jpg`; //Example: NV01.jpg
          newcard.querySelector('a').href = "workingOut.html?docID="+docID;
          

          // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
          // document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
          
          //attach to gallery, Example: "hikes-go-here"
          document.getElementById("exercises-go-here").appendChild(newcard);        });
      });

  });
}

displayExerciseCard();        //calling the function


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
// createWorkout();        //calling the function