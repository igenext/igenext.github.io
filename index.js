import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyBY-flhJnM563JeOtVyeOcUMiY7YDPsiME",
  
    authDomain: "eb-billing.firebaseapp.com",
  
    projectId: "eb-billing",
  
    storageBucket: "eb-billing.appspot.com",
  
    messagingSenderId: "445611088788",
  
    appId: "1:445611088788:web:5e0cd7650bdd42ee904d81"
  
  };
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



var email = document.getElementById("email")
var password = document.getElementById("pass")




const btn = document.getElementById("signin")
const btn2 = document.getElementById("signout")

btn.onclick = () =>{

signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    
   
    const user = auth.currentUser
  
    alert("Signed in Successfully")
    
    location.href="success.html"
    
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert("Error "+ error.code)
  });

}

btn2.onclick = () =>{
    /*onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });*/
      alert("Refreshing")
      location.reload();
}