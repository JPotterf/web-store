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
  //console.log(snapShot);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  
  //initial empty obj passed in, sets first property value to title.lowercase, returns obj
  //goes to second object and so on, building an object that this is equal to clothing collection
  //and the title of each is === to keys of the respective obj.
  return transformedCollection.reduce((accumulator,collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

//always trigger google popup whenever Google auth service is used
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
