//importing firebase utility library (Core)
import firebase from 'firebase/app';
//Firebase services
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyC0DFxv9zxMlk7QM0pHfiPQ0wmg_mEDDI4",
    authDomain: "taobao-db.firebaseapp.com",
    databaseURL: "https://taobao-db.firebaseio.com",
    projectId: "taobao-db",
    storageBucket: "taobao-db.appspot.com",
    messagingSenderId: "603156310353",
    appId: "1:603156310353:web:2b04e542fa15580e39cb70",
    measurementId: "G-TD69KR23YH"
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Choosing google provider
const provider = new firebase.auth.GoogleAuthProvider();
//Not sure what this does
provider.setCustomParameters({ prompt: 'select_account' });
//function that pop ups new window w google login when called
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//exporting library incase we need
export default firebase;