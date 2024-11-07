// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK2RHq7eB7nhEOcB0NAAiKwD36wzoGmcE",
  authDomain: "astro-auth-cda5a.firebaseapp.com",
  projectId: "astro-auth-cda5a",
  storageBucket: "astro-auth-cda5a.firebasestorage.app",
  messagingSenderId: "1070892039449",
  appId: "1:1070892039449:web:450cf3043877054dbf9988",
  measurementId: "G-PBYK7FKSLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebase = { app, auth };