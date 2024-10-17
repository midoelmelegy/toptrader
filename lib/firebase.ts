import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlMxqutbE0agL13UXKaH0wq2wocv_spyU",
  authDomain: "toptrader-de6c8.firebaseapp.com",
  databaseURL: "https://toptrader-de6c8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toptrader-de6c8",
  storageBucket: "toptrader-de6c8.appspot.com",
  messagingSenderId: "792814475303",
  appId: "1:792814475303:web:50446d9bfe7df09a239602",
  measurementId: "G-VT3SNKFYSG"
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