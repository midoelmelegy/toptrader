import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  // Firebase Auth properties
  // Add custom properties
  bio?: string
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase User to UserData
        const basicUserData: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }

        // Fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userDataFromFirestore = userDoc.data();
          setUser({ ...basicUserData, ...userDataFromFirestore });
        } else {
          // User document doesn't exist
          setUser(basicUserData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}