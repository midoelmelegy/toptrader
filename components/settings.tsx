'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Lock, Link, Twitter, Github, Linkedin, Instagram } from 'lucide-react'
import { useAuth } from '@/lib/useAuth'
import { db, storage, auth } from '@/lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth'

interface ConnectedAccounts {
  twitter: boolean;
  github: boolean;
  linkedin: boolean;
  instagram: boolean;
}

export function SettingsPage() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '')
  const [newPassword, setNewPassword] = useState('')
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccounts>({
    twitter: false,
    github: false,
    linkedin: false,
    instagram: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      const fetchSettings = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userDocRef)
          if (userDoc.exists()) {
            const data = userDoc.data()
            setDisplayName(data.displayName || '')
            setProfilePicture(data.photoURL || '')
            setConnectedAccounts(data.connectedAccounts || {
              twitter: false,
              github: false,
              linkedin: false,
              instagram: false
            })
          }
        } catch (error) {
          console.error('Error fetching user settings:', error)
          setError('Failed to load user settings.')
        }
      }
      fetchSettings()
    }
  }, [user])

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)
    try {
      if (!user) {
        throw new Error('User not authenticated')
      }
      const userDocRef = doc(db, 'users', user.uid)
      await updateDoc(userDocRef, {
        displayName: displayName,
        photoURL: profilePicture,
        connectedAccounts,
      })
      setSuccessMessage('Your changes have been saved.')
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to save changes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        setIsLoading(true);
        
        // Generate a unique file name
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = `profile_${Date.now()}.${fileExtension}`;
        
        const storageRef = ref(storage, `profilePictures/${user.uid}/${uniqueFileName}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePicture(downloadURL);        
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        setError('Failed to upload profile picture. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleChangePassword = async () => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    if (!isPasswordValid(newPassword)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, user.email!)
      setSuccessMessage('A password reset email has been sent to your email address. Please check your inbox and follow the instructions to change your password.')
    } catch (error) {
      console.error('Error sending password reset email:', error)
      setError('Failed to send password reset email. Please try again.')
    }
  }

  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
  }

  const handleConnectedAccountToggle = async (account: keyof ConnectedAccounts) => {
    // This is a placeholder for the actual OAuth flow
    // You would typically redirect to the OAuth provider here
    console.log(`Connecting to ${account}...`)
    // After successful OAuth, you would update the state and database
    setConnectedAccounts(prev => ({
      ...prev,
      [account]: !prev[account]
    }))
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="mb-4 text-red-500 border border-red-600 rounded-lg p-2 bg-red-100">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 text-green-600 p-2 bg-green-100 rounded-full transition-all duration-300 ease-in-out">
          {successMessage}
        </div>
      )}

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 rounded-full cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <AvatarImage alt="Profile picture" src={profilePicture || ""} />
              <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleChangePassword} disabled={isLoading}>
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button
            variant={connectedAccounts.twitter ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => handleConnectedAccountToggle('twitter')}
            disabled={isLoading}
          >
            <Twitter className="h-4 w-4" />
            {connectedAccounts.twitter ? 'Connected' : 'Connect'} Twitter
          </Button>
          <Button
            variant={connectedAccounts.github ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => handleConnectedAccountToggle('github')}
            disabled={isLoading}
          >
            <Github className="h-4 w-4" />
            {connectedAccounts.github ? 'Connected' : 'Connect'} GitHub
          </Button>
          <Button
            variant={connectedAccounts.linkedin ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => handleConnectedAccountToggle('linkedin')}
            disabled={isLoading}
          >
            <Linkedin className="h-4 w-4" />
            {connectedAccounts.linkedin ? 'Connected' : 'Connect'} LinkedIn
          </Button>
          <Button
            variant={connectedAccounts.instagram ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => handleConnectedAccountToggle('instagram')}
            disabled={isLoading}
          >
            <Instagram className="h-4 w-4" />
            {connectedAccounts.instagram ? 'Connected' : 'Connect'} Instagram
          </Button>
        </CardContent>
      </Card>

      {/* Apply Changes Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="apple-button rounded-full"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Apply Changes'}
        </Button>
      </div>
    </div>
  )
}