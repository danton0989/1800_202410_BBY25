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
    signInSuccessUrl: "homepage.html",
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
        name: "Squat",
        category: "Legs",
        details: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
        prevSet1: 0,
        prevSet2: 0,
        prevSet3: 0,
        prevWeight: 0,
        counter: 0
    });
    exercisesRef.add({
        name: "Running",
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
    workoutsRef.doc("initial").set({
        name: "Monday Workout",
        category: "Full Workout",
    });
    var workout = db.collection("users").doc(u.uid).collection("workouts").doc("initial");
    var workoutExercises = workout.collection("exercises");
    db.collection("users").doc(u.uid).collection("exercises").get()
        .then(allExercises => {
            //var i = 1;  //Optional
            allExercises.forEach(doc => { //iterate thru each doc
                let field = doc.id;
                workoutExercises.add({
                    id: field,
                });
            });
        });
}