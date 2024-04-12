//Check if the user has logged in
function loginCheck() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) location.replace("./index.html");
    });
}
loginCheck(); //invoke the function