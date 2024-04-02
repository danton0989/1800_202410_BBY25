//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
var j = 0;
var a = 0;

function displayHistoryDynamically(collection) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      var historyTemplate = document.getElementById("historyTemplate"); // Retrieve the HTML element with the ID "historyTemplate" and store it in the cardTemplate variable.
      var exerciseTemplate = document.getElementById("exerciseTemplate"); // Retrieve the HTML element with the ID "exerciseTemplate" and store it in the cardTemplate variable.
      //define a variable for the collection you want to create in Firestore to populate data
      //var history = db.collection("users").doc(user.uid).collection("history").doc("testHistory").collection("exercises");

      var history = db.collection("users").doc(user.uid).collection("history");
      let i = 0;
      history
        .orderBy("start_time")
        .get()
        .then((workouts) => {

          workouts.forEach(async (doc) => {
            var historyCard = historyTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
            let workout = doc.data().workout; // get value of the "workout" key
            let start_time = doc.data().start_time.toDate(); // get value of the "start_time" key
            let end_time = doc.data().end_time.toDate(); // get value of the "end_time" key
            //update title and text and image
            historyCard.querySelector(".workout_title").innerHTML = await `Workout: ${workout}`;
            historyCard.querySelector(".start_time").innerHTML = await `Start Time: ${start_time}`;
            historyCard.querySelector(".end_time").innerHTML = await `End Time: ${end_time}`;
            historyCard.querySelector('.exercises').setAttribute("id", "exercises-go-here" + a);
            console.log("a" + a)
            console.log("log:" + j);
            /* await document
              .getElementById(collection + "-go-here")
              .appendChild(historyCard); */
            appendingHistory(historyCard, function () {
              testFunction(history, doc, user, function () {
                increment();
              });
            });

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

function appending(e, i) {
  // console.log(i);
  console.log(document);
  document.getElementById("exercises-go-here" + i).appendChild(e);
}

function increment() {
  j++;
}

async function appendingHistory(h, callback) {
  a++;
  await document
    .getElementById("history-go-here")
    .appendChild(h);
  callback();
}

async function testFunction(h, doc, user, callback) {
  let exerciseList = h.doc(doc.id).collection("exercises");
  console.log("testfunc" + j);
  await exerciseList.get()
    .then((exercises) => {
      exercises.forEach(async (exercise) => {
        console.log(j);
        var exerciseCard = exerciseTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
        let exerciseName = exercise.data().name;
        // happens after all the other code rn gotta fix ***
        let set1 = exercise.data().set1; // get value of the "set1" key
        let set2 = exercise.data().set2; // get value of the "set2" key
        let set3 = exercise.data().set3; // get value of the "set3" key
        let weight = exercise.data().weight; // get value of the "weight" key

        exerciseCard.querySelector(".exercise-title").innerHTML = `${exerciseName}`;
        exerciseCard.querySelector(".set1").innerHTML = `Set 1: ${set1}`;
        exerciseCard.querySelector(".set2").innerHTML = `Set 2: ${set2}`;
        exerciseCard.querySelector(".set3").innerHTML = `Set 3: ${set3}`;
        exerciseCard.querySelector(".weight").innerHTML = `Weight: ${weight}`;

        appending(exerciseCard, j);
        //document.getElementById("exercises-go-here" + i).appendChild(exerciseCard);
      });
    });
  callback();
}
