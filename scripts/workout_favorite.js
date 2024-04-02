// Displays Workout Cards
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
// calling the function
displayWorkoutCard();

