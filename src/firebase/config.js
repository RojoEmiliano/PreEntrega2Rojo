// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpxULt0mp_mzLWFWiYgdyMk-eH2RdpCXI",
  authDomain: "proyectofinalrjsrojo.firebaseapp.com",
  projectId: "proyectofinalrjsrojo",
  storageBucket: "proyectofinalrjsrojo.appspot.com",
  messagingSenderId: "178219128204",
  appId: "1:178219128204:web:c6f574f72f0b9a0013f2a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)