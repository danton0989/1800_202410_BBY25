//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayExercisesDynamically(collection) {
    firebase.auth().onAuthStateChanged((user) => {
        let params = new URL(window.location.href); //get URL of search bar
        // let ID = params.searchParams.get("docID"); //get value for key "id"
        let ID = "workout1"


        let cardTemplate = document.getElementById("exerciseCardTemplate"); // Retrieve the HTML element with the ID "exerciseCardTemplate" and store it in the cardTemplate variable. 

        /* db.collection("workouts").doc(ID).get()
            .then(doc => {
                // only populate title
                workoutName = doc.data().name;
                document.getElementById("workoutName").innerHTML = workoutName;
            }) */

        db.collection("users").doc(user.uid).collection("workouts").doc("initial").get()
            .then(doc => {
                // only populate title
                workoutName = doc.data().name;
                document.getElementById("workoutName").innerHTML = workoutName;
            })

        // dynamically displays all the exercises
        // db.collection("workouts").doc(ID).collection(collection).get()   //the collection called "hikes"
        db.collection("users").doc(user.uid).collection("workouts").doc("initial").collection(collection).get()
            .then(allExercises => {
                var i = 1;
                allExercises.forEach(doc => { //iterate thru each doc
                    var title;
                    db.collection("users").doc(user.uid).collection(collection).doc(doc.data().id).get()
                        .then(exercise => {
                            title = exercise.data().name;

                            let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                            //update title and text and image
                            newcard.querySelector('.card-title').innerHTML = title;

                            //Optional: give unique ids to all elements for future use
                            newcard.querySelector('.set1label').setAttribute("for", "exercise" + i + "set1");
                            newcard.querySelector('.set1').setAttribute("id", "exercise" + i + "set1");
                            newcard.querySelector('.set2label').setAttribute("for", "exercise" + i + "set2");
                            newcard.querySelector('.set2').setAttribute("id", "exercise" + i + "set2");
                            newcard.querySelector('.set3label').setAttribute("for", "exercise" + i + "set3");
                            newcard.querySelector('.set3').setAttribute("id", "exercise" + i + "set3");
                            newcard.querySelector('.weight').setAttribute("id", "exercise" + i + "weight");
                            
                            //attach to gallery, Example: "hikes-go-here"
                            document.getElementById(collection + "-go-here").appendChild(newcard);

                            i++;
                        })

                    //i++;   //Optional: iterate variable to serve as unique ID
                })
            })
    })
}

displayExercisesDynamically("exercises");  //input param is the name of the collection

function workoutDone() {
    location.replace("./workout_favorite.html");
}

