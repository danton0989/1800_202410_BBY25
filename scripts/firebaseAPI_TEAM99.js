//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDJ8dsdc-NZG_0dCy61mRExdiByxQnUIJE",
    authDomain: "comp1800-a7416.firebaseapp.com",
    projectId: "comp1800-a7416",
    storageBucket: "comp1800-a7416.appspot.com",
    messagingSenderId: "1055048588401",
    appId: "1:1055048588401:web:efaa47d209f2f35d0d4fd0"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
