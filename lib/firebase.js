// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth SDK

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
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Auth

// Export the necessary Firebase instances
export { app, auth };
