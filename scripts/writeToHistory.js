const startTime = new Date();
//console.log(startTime);
let now = new Date().getTime();
console.log(now);
 
function writeToHistory(collection) {
  var user = firebase.auth().currentUser;
  //define a variable for the collection you want to create in Firestore to populate data
  var history = db.collection("users").doc(user.uid).collection("history");

  let ID = "initial";
  console.log(ID);

  db.collection("users").doc(user.uid).collection("workouts")
    .doc(ID)
    .get()
    .then((doc) => {
      // get workout name
      var workoutName = doc.data().name;
    });

  history.add({
    workout: workoutName,
    start_time: startTime,
    end_time: new Date(), //current system time
    counter: 0,
  });

  history
    .orderBy("start_time")
    .get()
    .then((workout) => {
      //workout.docs[workout.docs.length - 1].ref.update({ "exercise1": "squat" });

      db.collection("users").doc(user.uid).collection("workouts")
        .doc(ID)
        .collection(collection)
        .get()
        .then((allExercises) => {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          var i = 1;
          let length = allExercises.docs.length;
          var exercisesRef = workout.docs[workout.docs.length - 1].ref.collection("exercises");

          allExercises.forEach(async (doc) => {
            //iterate thru each doc
            let exerciseID = doc.data().id;
            let exerciseName;
            await db.collection("users").doc(user.uid).collection("exercises").doc(exerciseID).get()
              .then(exercise => {
                exerciseName = exercise.data().name;
                console.log("Exercise name: " + exerciseName);
              });
            let rep1 = document.getElementById("exercise" + i + "set1");
            let rep2 = document.getElementById("exercise" + i + "set2");
            let rep3 = document.getElementById("exercise" + i + "set3");
            let weight = document.getElementById("exercise" + i + "weight");
            console.log(i);
            console.log(rep1.value);
            console.log(rep2.value);
            console.log(rep3.value);
            exercisesRef.add({
              id: exerciseID,
              name: exerciseName,
              set1: rep1.value,
              set2: rep2.value,
              set3: rep3.value,
              weight: weight.value
            });

            /* let title = "exercise" + i;
            let field = allExercises.docs[length - i].data().name;
            workout.docs[workout.docs.length - 1].ref.update({
              [title]: field,
            });
            let name = title + "set1";
            let rep = document.getElementById("exercise" + i + "set1");
            workout.docs[workout.docs.length - 1].ref.update({
              [name]: rep.value,
            });
            name = title + "set2";
            rep = document.getElementById("exercise" + i + "set2");
            workout.docs[workout.docs.length - 1].ref.update({
              [name]: rep.value,
            });
            name = title + "set3";
            rep = document.getElementById("exercise" + i + "set3");
            workout.docs[workout.docs.length - 1].ref.update({
              [name]: rep.value,
            }); */

            i++; //Optional: iterate variable to serve as unique ID
            /* let workoutCount = document
              .getElementById("exercise" + i);
            workout.docs[workout.docs.length - 1].ref.update({
              [title]: workoutCount.value.increment(1),
            });
            localStorage.setItem("count", workoutCount.value); */
          });
        });
    });


  //console.log($("#forum").load("./text/finished_workout.html"));

  return false;
}

function counterTimer() {
  setInterval(function () {
    // Find the distance between now and the count down date
    let time = Date.now() - startTime;
    //console.log(time);
    let hours = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    console.log(hours + "h " + minutes + "m " + seconds + "s ");

    /* // Time calculations for days, hours, minutes and seconds
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
    } */
  }, 1000);
}

counterTimer();

// Wait for the document to load before executing JavaScript
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
