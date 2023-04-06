// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVQ4SnF1zOc5VxToHFPlz_snRwoWNcutQ",
  authDomain: "streae-65ded.firebaseapp.com",
  projectId: "streae-65ded",
  storageBucket: "streae-65ded.appspot.com",
  messagingSenderId: "249072783842",
  appId: "1:249072783842:web:0bce6de2f41e5f432ea9bb",
  measurementId: "G-FDXP5VREE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);