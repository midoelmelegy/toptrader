'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Twitter, Instagram, Linkedin, Github, Calendar, Users, UserPlus, Award, BarChart2, Crown } from 'lucide-react'

export function ProfileComponent() {
  const { user } = useAuth()
  const userName = user?.displayName || 'User'
  const userBio = user?.bio || 'Crypto enthusiast, SocialFi pioneer, and community builder.'

  // Mock data (replace with real data in production)
  const level = 5
  const experience = 75
  const joinedDate = '2023-01-15'
  const followers = 1234
  const following = 567
  const reputationScore = 89
  const rank = 'Gold'

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center py-8 border-b rounded-3xl">
        <Avatar className="w-32 h-32 mb-4 rounded-full">
          <AvatarImage src="/placeholder-user.jpg" alt={`@${userName}`} className="rounded-full" />
          <AvatarFallback className="rounded-full">{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-2">{userName}</h1>
        <Button className="mb-4 rounded-full">Follow</Button>
        <div className="flex space-x-4 mb-4">
          {[Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {userBio}
        </p>
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-2">
            <span>Level {level}</span>
            <span>{experience}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${experience}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[
          { title: 'Joined', value: joinedDate, icon: Calendar },
          { title: 'Followers', value: followers, icon: Users },
          { title: 'Following', value: following, icon: UserPlus },
          { title: 'Reputation', value: reputationScore, icon: Award },
          { title: 'Level', value: level, icon: BarChart2 },
          { title: 'Rank', value: rank, icon: Crown },
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg transition-all hover:shadow-xl hover:scale-105 p-4 flex items-center border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">{item.title}</h3>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Activity Timeline</h2>
        <div className="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
          {[
            { action: 'Edited trading widget', type: 'win', date: '2023-06-01', time: '14:30' },
            { action: 'Followed user @cryptoking', type: 'normal', date: '2023-05-28', time: '09:15' },
            { action: 'Made a trade', type: 'loss', date: '2023-05-25', time: '11:45' },
            { action: 'Updated dashboard layout', type: 'normal', date: '2023-05-20', time: '16:20' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start ml-6 relative">
              <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                activity.type === 'win' ? 'bg-green-500' :
                activity.type === 'loss' ? 'bg-red-500' : 'bg-gray-500'
              }`}></div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md p-4 w-full border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date} at {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
