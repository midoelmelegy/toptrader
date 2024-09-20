// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth SDK
import { getFirestore } from "firebase/firestore"; // Import Firestore SDK
import { getAnalytics, isSupported } from "firebase/analytics"; // Import Firebase Analytics


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANrIGGFC1ypPjTqRKJJfiFIHPx2PkOTTo",
  authDomain: "teleio-45628.firebaseapp.com",
  projectId: "teleio-45628",
  storageBucket: "teleio-45628.appspot.com",
  messagingSenderId: "1010702049530",
  appId: "1:1010702049530:web:32f09ee593162924bba943",
  measurementId: "G-WJXDMXSJS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Conditionally initialize Firebase Analytics if the window object is available
let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
