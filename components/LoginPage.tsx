"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { signUpUser, loginUser } from "@/lib/firebaseAuth";
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

const getErrorMessage = (errorCode: string) => {
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
      return 'An unexpected error occurred. Please try again later.';
  }
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent, type: 'signup' | 'login') => {
    event.preventDefault()
    
    if (type === 'signup') {
      const { user, error } = await signUpUser(email, password)
      if (error) {
        console.log(error)
        setError(getErrorMessage(error.code))
      } else if (user) {
        // Create a user document in Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: '',
            createdAt: new Date(),
            // ... other user properties
          })
          router.push('/dashboard')
        } catch (error) {
          console.error("Error creating user document:", error)
          setError("Failed to create user profile. Please try again.")
        }
      }
    } else if (type === 'login') {
      const { user, error } = await loginUser(email, password);

      if (error) {
        console.log(error);
        setError(getErrorMessage(error.code));
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-[400px] bg-zinc-950 text-white border border-zinc-800 rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-900 rounded-full p-1">
              <TabsTrigger value="login" className="rounded-full py-2 px-4 transition-all duration-200">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full py-2 px-4 transition-all duration-200">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 text-red-500 text-center border border-red-600 rounded-lg p-2 bg-red-100 text-black">
                {error}
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-3 font-semibold"
                >
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 rounded-xl py-3 px-4 w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-3 font-semibold"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}