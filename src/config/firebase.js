// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPBwewbI6djnkYMvtyARHHoLp9nJXKX2k",
    authDomain: "photodrop-js.firebaseapp.com",
    projectId: "photodrop-js",
    storageBucket: "photodrop-js.appspot.com",
    messagingSenderId: "911919554583",
    appId: "1:911919554583:web:bf195572ea07ae5ea5bc52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();