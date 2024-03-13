function writeToHistory(collection) {
    var user = firebase.auth().currentUser;
    //define a variable for the collection you want to create in Firestore to populate data
    var history = db.collection("users").doc(user.uid).collection("history");

    let ID = "workout1"
    console.log(ID);

    db.collection("workouts").doc(ID).get()
        .then(doc => {
            // get workout name
            var workoutName = doc.data().name;
        })

    history.add({
        workout: workoutName,
        start_time: firebase.firestore.FieldValue.serverTimestamp(),
        end_time: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    history.orderBy('start_time').get()
        .then(workout => {
            //workout.docs[workout.docs.length - 1].ref.update({ "exercise1": "squat" });

            db.collection("workouts").doc(ID).collection(collection).get()   //the collection called "hikes"
                .then(allExercises => {
                    //var i = 1;  //Optional: if you want to have a unique ID for each hike
                    var i = 1
                    let length = allExercises.docs.length;

                    allExercises.forEach(doc => { //iterate thru each doc
                        let title = "exercise" + i;
                        let field = allExercises.docs[length - i].data().name;
                        workout.docs[workout.docs.length - 1].ref.update({ [title]: field});
                        let name = title + "set1";
                        let rep = document.getElementById("exercise" + i + "set1");;
                        workout.docs[workout.docs.length - 1].ref.update({ [name]: rep.value});
                        name = title + "set2";
                        rep = document.getElementById("exercise" + i + "set2");;
                        workout.docs[workout.docs.length - 1].ref.update({ [name]: rep.value});
                        name = title + "set3";
                        rep = document.getElementById("exercise" + i + "set3");;
                        workout.docs[workout.docs.length - 1].ref.update({ [name]: rep.value});

                        i++;   //Optional: iterate variable to serve as unique ID
                    })
                })
        })

    return false;
}