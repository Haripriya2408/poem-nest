// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe_zfN_J5kuKJGsrcCIEFwczpjD8GzRZ4",
  authDomain: "creative-60543.firebaseapp.com",
  projectId: "creative-60543",
  storageBucket: "creative-60543.appspot.com",
  messagingSenderId: "146860334156",
  appId: "1:146860334156:web:0f48495a668a6eb53a28e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
