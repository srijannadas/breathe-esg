// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7iUWVc5YYxgEIeeq-iIlxIJZqimbY7I8",
    authDomain: "breathe-esg-firebase-assesment.firebaseapp.com",
    projectId: "breathe-esg-firebase-assesment",
    storageBucket: "breathe-esg-firebase-assesment.appspot.com",
    messagingSenderId: "523785205664",
    appId: "1:523785205664:web:338cf923787b60eb83d6c5",
    measurementId: "G-CD8GZKMQKZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };