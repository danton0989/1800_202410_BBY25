// constant to keep track of when workout was started
const startTime = new Date();
let params = new URL(window.location.href); //get URL of search bar
let ID = params.searchParams.get("docID"); //get value for key "id"

/* Creates a pop up for user, and writes all of the input data from the 
forum into history database */
async function writeToHistory() {
  // display modal to show user has finished workout
  const modal = document.getElementById("modal");
  modal.classList.add("open");
  // authenticates user and gets current user
  var user = await firebase.auth().currentUser;
  // defined variable for the collection we want to create in Firestore to populate data
  var history = await db.collection("users").doc(user.uid).collection("history");

  // reading workout name from the database
  await db.collection("users").doc(user.uid).collection("workouts")
    .doc(ID)
    .get()
    .then((doc) => {
      var workoutName = doc.data().name; // get workout name
    });

  // adding a new history document
  await history.add({
    workout: workoutName, // workout name we got from database
    start_time: startTime, // time workout was started
    end_time: new Date(), // current system time
    counter: 0, 
  });

  // writing in all the user inputted forum information into the newly created document
  await history
    .orderBy("start_time")
    .get()
    .then(async (workout) => {
      // grabs from database and runs through all the exercises in this particular workout 
      await db.collection("users").doc(user.uid).collection("workouts")
        .doc(ID)
        .collection('exercises')
        .get()
        .then(async (allExercises) => {
          var i = 1; // variable to count each exercise we are parsing through
          // reference to database location where we will store all the exercise information
          var exercisesRef = await workout.docs[workout.docs.length - 1].ref.collection("exercises"); 
          /* Running through all the exercises, reading information about exercise from database 
          and reads user inputs, to save into history. */
          await allExercises.forEach(async (doc) => {
            //iterate thru each doc
            let exerciseID = doc.data().id;
            let exerciseName;
            // grabs the exerciseName from database
            await db.collection("users").doc(user.uid).collection("exercises").doc(exerciseID).get()
              .then(exercise => {
                exerciseName = exercise.data().name;
              });
            // collects user inputs into variables
            let rep1 = document.getElementById("exercise" + i + "set1");
            let rep2 = document.getElementById("exercise" + i + "set2");
            let rep3 = document.getElementById("exercise" + i + "set3");
            let weight = document.getElementById("exercise" + i + "weight");
            // saving all of the information of this exercise into the history as a new document
            exercisesRef.add({
              id: exerciseID,
              name: exerciseName,
              set1: rep1.value,
              set2: rep2.value,
              set3: rep3.value,
              weight: weight.value
            });
            // increase counter for exercise ran through
            i++;
          });
        });
    });

  return false;
}

/* Finalizes workout when continue button is pressed and brings user to homepage. */
function finalizeWorkout() {
  window.location.assign("workout_favorite.html");
}

/* A counter displayed on page during workout to show how much time workout is taking. */
function counterTimer() {
  // Update the timer every 1 second
  setInterval(function () {
    // Find the distance between now and the count down date
    let time = Date.now() - startTime;
    // Time calculations for hours, minutes and seconds
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    // Output the timer result in an element with id="timer"
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
  }, 1000);
}

counterTimer();

// unused function that we have scrapped but decided to keep in code
/* 
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