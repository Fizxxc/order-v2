// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpv9uvfdUPKnyBKESB2fDEUwuDn9Nzmtg",
    authDomain: "orderr-625c2.firebaseapp.com",
    projectId: "orderr-625c2",
    storageBucket: "orderr-625c2.firebasestorage.app",
    messagingSenderId: "891679772111",
    appId: "1:891679772111:web:8def779e23e3bc3d7356ba",
    measurementId: "G-Y0GLE3RNM3"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
