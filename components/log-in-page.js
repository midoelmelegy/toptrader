"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Buttonlogin } from "@/components/ui/buttonlogin";
import { InputField } from "@/components/ui/InputField";
import {
  CardComponent,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/CardComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the Firebase Auth functions
import { signUpUser, loginUser } from "@/lib/firebaseAuth";

// Function to map Firebase error codes to more user-friendly messages
const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please try logging in.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use a stronger password.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      default:
        console.error(`Unhandled error code: ${errorCode}`); // Log the unhandled error code
        return 'An unexpected error occurred. Please try again later.';
    }
  };
  

export function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event, type) => {
    event.preventDefault();
  
    if (type === 'signup') {
      const { user, error } = await signUpUser(email, password);
      if (error) {
        console.log(error); // Log the error object to check the code
        setError(getErrorMessage(error.code)); // Use friendly error message
      } else {
        // Redirect to dashboard after successful signup
        router.push('/dashboard'); // Navigate to dashboard
      }
    } else if (type === 'login') {
      const { user, error } = await loginUser(email, password);
      if (error) {
        console.log(error); // Log the error object to check the code
        setError(getErrorMessage(error.code)); // Use friendly error message
      } else {
        // Redirect to dashboard after successful login
        router.push('/dashboard'); // Navigate to dashboard
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <CardComponent className="w-[400px] bg-zinc-950 text-white border border-zinc-800 rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-900 rounded-full p-1">
              <TabsTrigger
                value="login"
                className="rounded-full py-2 px-4 transition-all duration-200"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-full py-2 px-4 transition-all duration-200"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Display error message if any */}
            {error && (
              <div className="mb-4 text-red-500 text-center border border-red-600 rounded-lg p-2 bg-red-100 text-black">
                {error}
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Buttonlogin
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-3 font-semibold"
                >
                  Login
                </Buttonlogin>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Buttonlogin
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-3 font-semibold"
                >
                  Create Account
                </Buttonlogin>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </CardComponent>
    </div>
  );
}
