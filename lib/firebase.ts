import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANrIGGFC1ypPjTqRKJJfiFIHPx2PkOTTo",
  authDomain: "teleio-45628.firebaseapp.com",
  projectId: "teleio-45628",
  storageBucket: "teleio-45628.appspot.com",
  messagingSenderId: "1010702049530",
  appId: "1:1010702049530:web:32f09ee593162924bba943",
  measurementId: "G-WJXDMXSJS1",
  databaseURL: 'https://teleio-45628-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics: any = null;
let messaging: any = null;

if (typeof window !== "undefined") {
  // Client-side only code
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });

  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error("Firebase messaging is not supported in this environment:", error);
  }
}

export { app, auth, db, storage, analytics, messaging };