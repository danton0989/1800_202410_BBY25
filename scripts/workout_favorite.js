//------------------------------>
//-- DISPLAY WORKOUT CARDS
//------------------------------>
function displayWorkoutCard() {
  firebase.auth().onAuthStateChanged(function (user) {
    // Retrieve the HTML element with the ID "workoutCardTemplate" and store it in the cardTemplate variable.
    let cardTemplate = document.getElementById("workoutCardTemplate");  

    // Retrieve workouts documents
    db.collection("users")
      .doc(user.uid)
      .collection("workouts")
      .get()
      
      .then(allWorkouts => {
        allWorkouts.forEach(doc => {
          var docID = doc.id;
          var title = doc.data().name;       // get value of the "name" key
          var workoutImage = doc.data().imageName;    //get unique ID to each hike to be used for fetching right image
          // var details = doc.data().details;  // get value of the "details" key
          // var hikeLength = doc.data().length; //gets the length field
          
          // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
          let newcard = cardTemplate.content.cloneNode(true); 

          console.log(doc.data());  //.data() returns data object

          // Update link, title and image
          newcard.querySelector('a').href = "workingOut.html?docID="+docID;
          newcard.querySelector('.workout-title').innerHTML = title;
          newcard.querySelector('.workout-image').src = `./images/${workoutImage}.jpg`; //Example: NV01.jpg
          // newcard.querySelector('.card-text').innerHTML = details;
          // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
          
          // Attach to gallery, Example: "hikes-go-here"
          document.getElementById("workouts-go-here").appendChild(newcard);
        });
      });
  });
}
// Calling the function
displayWorkoutCard();

