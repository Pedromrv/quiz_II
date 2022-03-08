let firebaseConfig = {
    // Tu objeto de configuración aquí
    apiKey: "AIzaSyAq7NZdHFKCIBY1LBOXpKISUXyjgcYalEQ",
    authDomain: "pruebaweb-7cef4.firebaseapp.com",
    projectId: "pruebaweb-7cef4",
    storageBucket: "pruebaweb-7cef4.appspot.com",
    messagingSenderId: "263027467641",
    appId: "1:263027467641:web:dc7d4205500b6e525abba8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();// db representa mi BBDD





const botonLogin = document.getElementById("botonLogin");

//login con google (pop up)
const loginWithGoogle = function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;
        const token = credential.accessToken;
        const user = result.user.displayName;
        console.log(user, "on login");
        localStorage.setItem("usuario", user);
        console.log("login con google de ", user);
        pintarGrafica();
        mostrar(grafica);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorMessage);
      });
  };
