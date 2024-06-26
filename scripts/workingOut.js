//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
// Function displays all the exercises that is in the current started workout
//------------------------------------------------------------------------------
function displayExercisesDynamically(collection) {
    firebase.auth().onAuthStateChanged((user) => { // Authtenticate user sign in, and pass in the current user
        let params = new URL(window.location.href); //get URL of search bar
        let ID = params.searchParams.get("docID"); //get value for key "id"
        // Retrieve the HTML element with the ID "exerciseCardTemplate" and store it in the cardTemplate variable. 
        let cardTemplate = document.getElementById("exerciseCardTemplate"); 
        // Grabs name of current workout and displays on webpage
        db.collection("users").doc(user.uid).collection("workouts").doc(ID).get()
            .then(doc => {
                // populate title for workout
                workoutName = doc.data().name;
                document.getElementById("workoutName").innerHTML = workoutName;
            })
        /* reads all the exercises of the current workout from the database, and dynamically displays them
        with user inputs for each exercise */
        db.collection("users").doc(user.uid).collection("workouts").doc(ID).collection(collection).get()
            .then(allExercises => {
                var i = 1; // count each exercise ran through
                allExercises.forEach(doc => { //iterate thru each doc
                    var title;
                    db.collection("users").doc(user.uid).collection(collection).doc(doc.data().id).get()
                        .then(exercise => {
                            title = exercise.data().name;
                            // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                            let newcard = cardTemplate.content.cloneNode(true); 

                            // update title and text and image
                            newcard.querySelector('.card-title').innerHTML = title;

                            // give unique ids to all elements for future use
                            newcard.querySelector('.set1label').setAttribute("for", "exercise" + i + "set1");
                            newcard.querySelector('.set1').setAttribute("id", "exercise" + i + "set1");
                            newcard.querySelector('.set2label').setAttribute("for", "exercise" + i + "set2");
                            newcard.querySelector('.set2').setAttribute("id", "exercise" + i + "set2");
                            newcard.querySelector('.set3label').setAttribute("for", "exercise" + i + "set3");
                            newcard.querySelector('.set3').setAttribute("id", "exercise" + i + "set3");
                            newcard.querySelector('.weight').setAttribute("id", "exercise" + i + "weight");
                            
                            //attach to gallery, "exercises-go-here"
                            document.getElementById(collection + "-go-here").appendChild(newcard);

                            // increase count for each exercise
                            i++;
                        })

                })
            })
    })
}

displayExercisesDynamically("exercises");  //input param is the name of the collection


