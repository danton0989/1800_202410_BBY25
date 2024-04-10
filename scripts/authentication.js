// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            var user = authResult.user;                            // get the user object from the Firebase authentication database
            if (authResult.additionalUserInfo.isNewUser) {         //if new user
                db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName,                    //"users" collection
                    email: user.email,                         //with authenticated user's ID (user.uid)
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
                writeExercises(user);
                writeWorkouts(user)
                    .then(function () {
                        console.log("New user added to firestore");
                        window.location.assign("homepage.html");       //re-direct to main.html after signup
                    });
                //db.collection("users").doc(user.uid).collection("history").doc('initial').set({         //write to firestore. We are using the UID for the ID in users collection
                //    start_time: firebase.firestore.FieldValue.serverTimestamp(),
                //})
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: "workout_favorite.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);

function writeExercises(u) {
    //define a variable for the collection you want to create in Firestore to populate data
    var exercisesRef = db.collection("users").doc(u.uid).collection("exercises");
    exercisesRef.add({
        name: "Bench Press",
        category: "Chest",
        details: "The bench press is a compound exercise that targets the muscles of the upper body. It involves lying on a bench and pressing weight upward using either a barbell or a pair of dumbbells. During a bench press, you lower the weight down to chest level and then press upwards while extending your arms.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
    exercisesRef.add({
        name: "Bicep Curl",
        category: "Arms",
        details: "To do a biceps curl with a dumbbell, hold a dumbbell with your palm facing upward. Slowly curl the weight up by bending your elbow, keeping your elbow close to your body. Then slowly lower the weight to the starting position. You'll feel tension in the muscles in the front of your upper arm.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
    exercisesRef.add({
        name: "Deadlift",
        category: "Legs",
        details: "The deadlift exercise is a relatively simple exercise to perform, a weight is lifted from a resting position on the floor to an upright position. The deadlift exercise utilizes multiple muscle groups to perform but has been used to strength the hips, thighs, and back musculature.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
    exercisesRef.add({
        name: "Overhead Press",
        category: "Legs",
        details: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
    exercisesRef.add({
        name: "Weightlift",
        category: "Cardio",
        details: "Running is the action of rapidly propelling yourself forward on foot. When running, there is a moment when both feet are off the ground (as opposed to walking, when one foot is always on the ground), making it a high-impact exercise.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
}

function writeWorkouts(u) {
  var workoutsRef = db.collection("users").doc(u.uid).collection("workouts");
   Promise.all([
     workoutsRef.add({
       name: "Monday Workout",
       category: "Full Workout",
       imageName: "gym",
     }),
     workoutsRef.add({
       name: "Tuesday Workout",
       category: "Full Workout",
       imageName: "gym2",
     }),
     workoutsRef.add({
       name: "Wednesday Workout",
       category: "Full Workout",
       imageName: "gym3",
     }),
     workoutsRef.add({
       name: "Thursday Workout",
       category: "Full Workout",
       imageName: "gym4",
     }),
     workoutsRef.add({
       name: "Friday Workout",
       category: "Full Workout",
       imageName: "gym5",
     }),
     workoutsRef.add({
       name: "Saturday Workout",
       category: "Full Workout",
       imageName: "gym6",
     }),
     workoutsRef.add({
       name: "Sunday Workout",
       category: "Full Workout",
       imageName: "gym7",
     }),
   ]).then((results) => {
     const mondayDocRef = results[0];
     const tuesdayDocRef = results[1];
     const wednesdayDocRef = results[2];
     const thursdayDocRef = results[3];
     const fridayDocRef = results[4];
     const saturdayDocRef = results[5];
     const sundayDocRef = results[6];
     console.log("Monday workout ID: ", mondayDocRef.id);
     console.log("Tuesday workout ID: ", tuesdayDocRef.id);
     console.log("Wednesday workout ID: ", wednesdayDocRef.id);
     console.log("Thursday workout ID: ", thursdayDocRef.id);
     console.log("Friday workout ID: ", fridayDocRef.id);
     console.log("Saturday workout ID: ", saturdayDocRef.id);
     console.log("Sunday workout ID: ", sundayDocRef.id);
     db.collection("users")
       .doc(u.uid)
       .collection("exercises")
       .get()
       .then((allExercises) => {
         //var i = 1;  //Optional
         allExercises.forEach(doc => {
           //iterate thru each doc
           const docData = {
             id: doc.id,
           };
            mondayDocRef.collection("exercises").add(docData);
            tuesdayDocRef.collection("exercises").add(docData);
            wednesdayDocRef.collection("exercises").add(docData);
            thursdayDocRef.collection("exercises").add(docData);
            fridayDocRef.collection("exercises").add(docData);
            saturdayDocRef.collection("exercises").add(docData);
            sundayDocRef.collection("exercises").add(docData);
         });
       });
   });
}