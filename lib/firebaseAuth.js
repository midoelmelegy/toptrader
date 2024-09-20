// Import Firebase modules
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase app (ensure you've initialized Firebase elsewhere in your app)
import { app } from './firebase'; 

// Get the Auth instance
const auth = getAuth(app);

// Function to handle user signup
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up successfully
    return { user: userCredential.user };
  } catch (error) {
    // Handle Errors here.
    return { error };
  }
};

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Logged in successfully
    return { user: userCredential.user };
  } catch (error) {
    // Handle Errors here.
    return { error };
  }
};
