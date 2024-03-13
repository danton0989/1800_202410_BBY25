function writeToHistory() {
    //define a variable for the collection you want to create in Firestore to populate data
    var history = db.collection("History");

    history.add({
        workout: "",
        start_time: firebase.firestore.FieldValue.serverTimestamp(),
        end_time: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        length: 60
    });

    return ture;
}