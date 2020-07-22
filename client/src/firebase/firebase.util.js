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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if userAuth doesnt exist, exti from function
    if (!userAuth) return;

    //else Query if the user exists, async request
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        //create a user using document REFERENCE object, not snapShot
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            //set data in firebase
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    //always returns userRef as we might need it
    return userRef;
};

// USE THIS to add data to firebase non-manually 
// requests are async to firebase, make function async and await batch.commit() returns
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    //firebase always returns us a ref obj, even if does not exist on DB. use it to make a collection 
    // this returns a ref object with id: 'collectionKey', or in this case 'collections'
    const collectionRef = firestore.collection(collectionKey);

    //batch single request into one big request, as firebase only can set 1 object at a time
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //generating a new random document from this collecction
        const newDocRef = collectionRef.doc();
        //setting the value of newDocRef to the obj given, ie. each object in the collection array
        batch.set(newDocRef, obj);
    });

    //fire off batch request, returns a promise!
    return await batch.commit()
};

// get whole snapshot, convert to object plus additional properties
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        //.data() is important here to access the values in doc
        const { title, items } = doc.data();
        return {
            // encodeURI converts string passed into a readable URL string. 
            //  Here: used to convert 'Hats' into sth readable?
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        }
    });
    
    //use reduce to reduce 5 object into 1 object! GENIUS!
    return transformedCollection.reduce((accumulator, collection) => {
        //assigning value (collection) to key (accumulator[collection.title.toLowerCase()])
        accumulator[collection.title.toLowerCase()] = collection;
        //an explicit return statement here is needed because returning the previous line doenst do anything at all
        return accumulator;
    }, {})
}

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