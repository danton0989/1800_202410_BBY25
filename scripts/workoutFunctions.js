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
  // var user = firebase.auth().currentUser;
  
  //name of the collection and documents should matach excatly with what you have in Firestore
  db.collection("users")
    .doc("HF36jrJMGkT5VSovUnuZlNb6it52")
    // .doc(user.uid)
    .collection("workouts")
    .doc("WEYxpZPoNCvym1ig4cXL")
    
    .onSnapshot(doc => {  //arrow notation
      var workout = doc.data();

      console.log(doc.data());  //.data() returns data object
      console.log(workout.name);
      // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
      document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
  })
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
  }

    // .onSnapshot(function(doc) {
    //     console.log("current data:" , doc.data());


    //     // document.getElementById("workoutName-goes-here").appendChild("ww ...");

    // })

displayWorkoutName();        //calling the function


// Write New Workout Name to db
function createWorkout() {
  //name of the collection and documents should matach excatly with what you have in Firestore
  db.collection("users")
    .doc("HF36jrJMGkT5VSovUnuZlNb6it52")
    .collection("workouts")
    // .doc("WEYxpZPoNCvym1ig4cXL")

    .add({
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

    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    
    .catch(function(error) {
      console.error("Error adding document: ", error);
    })
    ;
    // .onSnapshot(doc => {  //arrow notation
    //   var workout = doc.data();

    //   console.log(doc.data());  //.data() returns data object
    //   console.log(workout.name);
    //   // document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;  //using javascript to display the data on the right place
    //   document.getElementById("workoutName-goes-here").innerHTML = workout.name;  //using javascript to display the data on the right place
  
}
// createWorkout();        //calling the function