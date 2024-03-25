//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayHistoryDynamically(collection) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      //define a variable for the collection you want to create in Firestore to populate data
      var history = db.collection("users").doc(user.uid).collection("history");
      let historyTemplate = document.getElementById("historyTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.

      history
        .get() //the collection called "history"
        .then((allHistory) => {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allHistory.forEach((doc) => {
            //iterate thru each doc
            var workout = doc.data().workout; // get value of the "workout" key
            var start_time = doc.data().start_time.toDate(); // get value of the "start_time" key
            var end_time = doc.data().end_time.toDate(); // get value of the "end_time" key
            var exercise1 = doc.data().exercise1; // get value of the "exercise1" key
            var exercise1set1 = doc.data().exercise1set1; // get value of the "exercise1set1" key
            var exercise1set2 = doc.data().exercise1set2; // get value of the "exercise1set2" key
            var exercise1set3 = doc.data().exercise1set3; // get value of the "exercise1set3" key
            var exercise2 = doc.data().exercise2; // get value of the "exercise1" key
            var exercise2set1 = doc.data().exercise2set1; // get value of the "exercise1set1" key
            var exercise2set2 = doc.data().exercise2set2; // get value of the "exercise1set2" key
            var exercise2set3 = doc.data().exercise2set3; // get value of the "exercise1set3" key
            var exercise3 = doc.data().exercise3; // get value of the "exercise1" key
            var exercise3set1 = doc.data().exercise3set1; // get value of the "exercise1set1" key
            var exercise3set2 = doc.data().exercise3set2; // get value of the "exercise1set2" key
            var exercise3set3 = doc.data().exercise3set3; // get value of the "exercise1set3" key
            var docID = doc.id;
            let historyCard = historyTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
            //update title and text and image
            historyCard.querySelector(".workout").innerHTML = `Workout: ${workout}`;
            historyCard.querySelector(".start_time").innerHTML = `Start Time: ${start_time}`;
            historyCard.querySelector(".end_time").innerHTML = `End Time: ${end_time}`;
            historyCard.querySelector(".exercise1").innerHTML = `Exercise1: ${exercise1}`;
            historyCard.querySelector(".exercise1set1").innerHTML =
              `Exercise1 Set1: ${exercise1set1}`;
            historyCard.querySelector(".exercise1set2").innerHTML =
              `Exercise1 Set2: ${exercise1set2}`;
            historyCard.querySelector(".exercise1set3").innerHTML =
              `Exercise1 Set3: ${exercise1set3}`;
              historyCard.querySelector(".exercise2").innerHTML = `Exercise2: ${exercise2}`;
              historyCard.querySelector(".exercise2set1").innerHTML =
                `Exercise2 Set1: ${exercise2set1}`;
              historyCard.querySelector(".exercise2set2").innerHTML =
                `Exercise2 Set2: ${exercise2set2}`;
              historyCard.querySelector(".exercise2set3").innerHTML =
                `Exercise2 Set3: ${exercise2set3}`;
                historyCard.querySelector(".exercise3").innerHTML = `Exercise3: ${exercise3}`;
                historyCard.querySelector(".exercise3set1").innerHTML =
                  `Exercise3 Set1: ${exercise3set1}`;
                historyCard.querySelector(".exercise3set2").innerHTML =
                  `Exercise3 Set2: ${exercise3set2}`;
                historyCard.querySelector(".exercise3set3").innerHTML =
                  `Exercise3 Set3: ${exercise3set3}`;
            //Optional: give unique ids to all elements for future use
            // history.querySelector('.card-title').setAttribute("id", "ctitle" + i);
            // history.querySelector('.card-text').setAttribute("id", "ctext" + i);
            // history.querySelector('.card-image').setAttribute("id", "cimage" + i);

            //attach to gallery, Example: "hikes-go-here"
            document
              .getElementById(collection + "-go-here")
              .appendChild(historyCard);

            //i++;   //Optional: iterate variable to serve as unique ID
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

displayHistoryDynamically("history"); //input param is the name of the collection
