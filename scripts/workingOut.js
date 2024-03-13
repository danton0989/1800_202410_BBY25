//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayExercisesDynamically(collection) {
    let params = new URL(window.location.href); //get URL of search bar
    // let ID = params.searchParams.get("docID"); //get value for key "id"
    let ID = "workout1"
    console.log(ID);

    let cardTemplate = document.getElementById("exerciseCardTemplate"); // Retrieve the HTML element with the ID "exerciseCardTemplate" and store it in the cardTemplate variable. 

    db.collection("workouts").doc(ID).get()
        .then(doc => {
            // only populate title
            workoutName = doc.data().name;
            document.getElementById("workoutName").innerHTML = workoutName;
        })

    // dynamically displays all the exercises
    db.collection("workouts").doc(ID).collection(collection).get()   //the collection called "hikes"
        .then(allExercises => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allExercises.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                // var details = doc.data().details;  // get value of the "details" key
                // var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                // var hikeLength = doc.data().length; //gets the length field
                // var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-length').innerHTML = hikeLength + "km";
                // newcard.querySelector('.card-text').innerHTML = details;
                // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                // newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })

}

displayExercisesDynamically("exercises");  //input param is the name of the collection
