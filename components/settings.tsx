'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Eye, Github, HelpCircle, Instagram, Link, Linkedin, Lock, Twitter, User } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage alt="Profile picture" src="/placeholder-avatar.jpg" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Label htmlFor="name">Display Name</Label>
            <input 
              id="name" 
              className="block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              placeholder="John Doe" 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">Change Password</Button>
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
            <Switch id="2fa" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <Switch id="email-notif" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">Push Notifications</Label>
            <Switch id="push-notif" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="profile-visibility">Profile Visibility</Label>
            <Switch id="profile-visibility" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="activity-status">Activity Status</Label>
            <Switch id="activity-status" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">Help Center</Button>
          <Button variant="outline" className="w-full justify-start">Contact Us</Button>
        </CardContent>
      </Card>
    </div>
  )
}