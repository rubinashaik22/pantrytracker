// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANhfCtccjvXRA4sOCDkmq3qAZ_o3IPdm0",
  authDomain: "pantrypro-d62c8.firebaseapp.com",
  projectId: "pantrypro-d62c8",
  storageBucket: "pantrypro-d62c8.appspot.com",
  messagingSenderId: "665024233174",
  appId: "1:665024233174:web:be7269eccfe89a972e5377",
  measurementId: "G-3371H16XP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};