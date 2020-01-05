import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYBlVTtwPyW7o1fqGMMQABllNLslV-rx0",
  authDomain: "web-store-portfolio.firebaseapp.com",
  databaseURL: "https://web-store-portfolio.firebaseio.com",
  projectId: "web-store-portfolio",
  storageBucket: "web-store-portfolio.appspot.com",
  messagingSenderId: "649806626769",
  appId: "1:649806626769:web:452cd013887f5d83b16af0",
  measurementId: "G-0JQWN05VQ0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //no user object is found leave function
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

//always trigger google popup whenever Google auth service is used
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
