// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD69JlpniF47KEFRxUf4mhyeqEzwtY3vSw",
  authDomain: "react-cursos-4dab6.firebaseapp.com",
  projectId: "react-cursos-4dab6",
  storageBucket: "react-cursos-4dab6.appspot.com",
  messagingSenderId: "602210067532",
  appId: "1:602210067532:web:d98672bbeb26e510d780e9"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
