//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            let elem = document.querySelector("#navbarPlaceholder");
            if (elem.childNodes.length == 0) {
                console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            } else {
                console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            }
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
        }
        if (user) {
          //if the pointer to "user" object is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
            let elem = document.querySelector("#navbarPlaceholder");
        if (elem.childNodes.length == 0) {
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            console.log($("#footerPlaceholder").load("./text/footer_before.html"));
        }
        } else {
          // No user is signed in.
        console.log($("#footerPlaceholder").load("./text/footer_before.html"));
        }
    });
}
loadSkeleton(); //invoke the function