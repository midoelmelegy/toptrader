import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function ProfileComponent() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center py-8">
        <Avatar className="w-32 h-32 mb-4">
          <AvatarImage src="/placeholder-user.jpg" alt="@oliviadavis" />
          <AvatarFallback>OD</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-2">Olivia Davis</h1>
        <div className="flex items-center gap-4 mb-4">
          <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
            <TwitterIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
            <GithubIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
            <GlobeIcon className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Crypto enthusiast, SocialFi pioneer, and community builder.
        </p>
        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Level 42</span>
            <span>6000 / 10000 XP</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 md:p-8">
        <GameCard
          title="Reputation Score"
          value={4800}
          icon={<StarIcon className="w-6 h-6 text-yellow-400" />}
          progress={80}
          nextMilestone="5000"
        />
        <GameCard
          title="Followers"
          value="12.3K"
          icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
          progress={65}
          nextMilestone="15K"
        />
        <GameCard
          title="Following"
          value="1.2K"
          icon={<UserPlusIcon className="w-6 h-6 text-green-400" />}
          progress={40}
          nextMilestone="2K"
        />
        <GameCard
          title="Rank"
          value="Gold"
          icon={<TrophyIcon className="w-6 h-6 text-yellow-600" />}
          progress={75}
          nextMilestone="Platinum"
        />
        <GameCard
          title="Achievements"
          value={24}
          icon={<MedalIcon className="w-6 h-6 text-purple-400" />}
          progress={60}
          nextMilestone="30"
        />
        <GameCard
          title="Joined"
          value="Oct 12, 2021"
          icon={<CalendarDaysIcon className="w-6 h-6 text-indigo-400" />}
          daysActive={730}
        />
      </div>
      <Card className="mx-6 md:mx-8 mb-6 md:mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold">Activity Timeline</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <TimelineItem
              title="Shared Trade BTC/USDT"
              description="Shared a trade analysis on BTC/USDT pair."
              time="2 hours ago"
              type="normal"
            />
            <TimelineItem
              title="Reached 1,000 Followers"
              description="Achieved the milestone of reaching 1,000 followers on the platform."
              time="1 day ago"
              type="success"
            />
            <TimelineItem
              title="Lost Trade ETH/USDT"
              description="Experienced a loss on ETH/USDT trade due to unexpected market volatility."
              time="2 days ago"
              type="problem"
            />
            <TimelineItem
              title="Earned Community Builder Badge"
              description="Awarded the Community Builder badge for actively engaging and supporting the community."
              time="3 days ago"
              type="success"
            />
            <TimelineItem
              title="Shared Market Trends Analysis"
              description="Published an in-depth analysis of the current market trends."
              time="1 week ago"
              type="normal"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GameCard({ title, value, icon, progress, nextMilestone, daysActive }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  nextMilestone?: string;
  daysActive?: number;
}) {
  return (
    <Card className="bg-card shadow-sm border border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {icon}
        </div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        {progress !== undefined && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Next milestone: {nextMilestone}
            </p>
          </div>
        )}
        {daysActive !== undefined && (
          <p className="text-sm text-muted-foreground">
            {daysActive} days active
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function TimelineItem({ title, description, time, type }: { title: string; description: string; time: string; type: 'normal' | 'problem' | 'success' }) {
  const dotColor = {
    normal: 'bg-gray-400',
    problem: 'bg-red-500',
    success: 'bg-green-500'
  }

  return (
    <div className="grid gap-1 relative pl-6">
      <div className={`absolute w-4 h-4 ${dotColor[type]} rounded-full -left-2 top-1.5 border-2 border-background`} />
      <div className="font-medium">{title}</div>
      <div className="text-muted-foreground">{description}</div>
      <div className="text-sm text-muted-foreground">{time}</div>
    </div>
  )
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}


function MedalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  )
}


function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


  function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
