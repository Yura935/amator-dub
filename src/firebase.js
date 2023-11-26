// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2YdsoxAeNunsz8-IMRaqpu6lYKmqZcWw",
  authDomain: "amator-dub.firebaseapp.com",
  databaseURL: "https://amator-dub-default-rtdb.firebaseio.com",
  projectId: "amator-dub",
  storageBucket: "amator-dub.appspot.com",
  messagingSenderId: "801117435746",
  appId: "1:801117435746:web:e7a71a161c651d70e15e3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
