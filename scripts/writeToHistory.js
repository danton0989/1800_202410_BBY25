const startTime = new Date();
let now = new Date().getTime();
const contBtn = document.getElementById("continue");
let params = new URL(window.location.href); //get URL of search bar
let ID = params.searchParams.get("docID"); //get value for key "id"

async function writeToHistory(collection) {
  // display modal to show user has finished workout
  const modal = document.getElementById("modal");
  modal.classList.add("open");
  var user = await firebase.auth().currentUser;
  //define a variable for the collection you want to create in Firestore to populate data
  var history = await db.collection("users").doc(user.uid).collection("history");

  await db.collection("users").doc(user.uid).collection("workouts")
    .doc(ID)
    .get()
    .then((doc) => {
      // get workout name
      var workoutName = doc.data().name;
    });

  await history.add({
    workout: workoutName,
    start_time: startTime,
    end_time: new Date(), //current system time
    counter: 0,
  });

  await history
    .orderBy("start_time")
    .get()
    .then(async (workout) => {
      //workout.docs[workout.docs.length - 1].ref.update({ "exercise1": "squat" });

      await db.collection("users").doc(user.uid).collection("workouts")
        .doc(ID)
        .collection(collection)
        .get()
        .then(async (allExercises) => {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          var i = 1;
          let length = allExercises.docs.length;
          var exercisesRef = await workout.docs[workout.docs.length - 1].ref.collection("exercises");

          await allExercises.forEach(async (doc) => {
            //iterate thru each doc
            let exerciseID = doc.data().id;
            let exerciseName;
            await db.collection("users").doc(user.uid).collection("exercises").doc(exerciseID).get()
              .then(exercise => {
                exerciseName = exercise.data().name;
              });
            let rep1 = document.getElementById("exercise" + i + "set1");
            let rep2 = document.getElementById("exercise" + i + "set2");
            let rep3 = document.getElementById("exercise" + i + "set3");
            let weight = document.getElementById("exercise" + i + "weight");
            exercisesRef.add({
              id: exerciseID,
              name: exerciseName,
              set1: rep1.value,
              set2: rep2.value,
              set3: rep3.value,
              weight: weight.value
            });
            i++;
          });
        });
    });

  return false;
}

function finalizeWorkout() {
  window.location.assign("workout_favorite.html");
}

function counterTimer() {
  // Update the timer every 1 second
  setInterval(function () {
    // Find the distance between now and the count down date
    let time = Date.now() - startTime;
    // Time calculations for hours, minutes and seconds
    let hours = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    // Output the timer result in an element with id="timer"
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
  }, 1000);
}

counterTimer();

/* // Wait for the document to load before executing JavaScript
function setCounterToZero() {
  // Get the count element
  const countElement = document.getElementById("counter");
  // Get the increment amount from localStorage, default to 0 if not set
  const count = localStorage.getItem("count") || 0;
  function updateTimer() {
    // Get the current date
    let currentDate = new Date();
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let currentDay = currentDate.getDay();
    // Calculate the number of days until the next Monday
    let daysUntilMonday = 1 - currentDay;
    if (daysUntilMonday <= 0) {
      daysUntilMonday += 7; // Add 7 days if today is Monday or later
    }
    // Set the countdown date (7 days from now)
    let countDownDate =
      currentDate.getTime() + 1000 * 60 * 60 * 24 * daysUntilMonday;
    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get the current date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="timer"
      document.getElementById("timer").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text and set countElement to 0
      if (distance <= 0) {
        clearInterval(x);
        count = 0;
      }
    }, 1000);
  }

  // Call updateTimer to start the countdown immediately
  updateTimer();
};
 */