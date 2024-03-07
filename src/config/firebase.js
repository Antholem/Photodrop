// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJDBM7RO-Zv2mKzjE-KXW1jbwCezEOt_w",
    authDomain: "photodrop-project.firebaseapp.com",
    projectId: "photodrop-project",
    storageBucket: "photodrop-project.appspot.com",
    messagingSenderId: "289325975348",
    appId: "1:289325975348:web:e5b83a2cee3b1763ab0761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();