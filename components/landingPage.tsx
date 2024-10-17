'use client'; // Ensure this is a Client Component

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Updated import

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <Card className="bg-white dark:bg-gray-900">
    <CardHeader>
      <CardTitle className="flex flex-col items-center">
        {icon}
        <span className="mt-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-center text-gray-600 dark:text-gray-400">{description}</p>
    </CardContent>
  </Card>
)

const Step: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex items-start">
    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
)

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <Card className="bg-white dark:bg-gray-900">
    <CardContent className="pt-6">
      <p className="italic mb-4">"{quote}"</p>
      <p className="font-semibold">- {author}</p>
    </CardContent>
  </Card>
)

export const LandingPageComponent: React.FC = () => {
  const router = useRouter();

  // Updated function to handle different destinations
  const handleCommunityClick = (destination: string) => {
    if (destination === 'get-started') {
      router.push('/get-started');
    } else if (destination === 'sign-up') {
      router.push('/sign-up');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold">tele.io</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
            <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Unify Crypto Information, Build Trust</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">tele.io brings together fragmented crypto information and fosters a trustworthy community, empowering you to make informed decisions.</p>
          <Button 
            className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 text-lg px-8 py-3"
            onClick={() => handleCommunityClick('get-started')}
          >
            Get Started
          </Button>
        </section>

        <section id="features" className="bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-12 h-12 mb-4" />}
                title="Verified Information"
                description="Access crypto data and news from verified and trusted sources."
              />
              <FeatureCard
                icon={<Users className="w-12 h-12 mb-4" />}
                title="Community Insights"
                description="Engage with a knowledgeable community and share valuable insights."
              />
              <FeatureCard
                icon={<Shield className="w-12 h-12 mb-4" />}
                title="Trust Score"
                description="Build your reputation with our unique trust scoring system."
              />
              <FeatureCard
                icon={<Zap className="w-12 h-12 mb-4" />}
                title="Real-time Updates"
                description="Stay informed with real-time market data and news alerts."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <Step number={1} title="Sign Up" description="Create your account and set up your profile." />
              <Step number={2} title="Connect Sources" description="Link your trusted information sources and social media." />
              <Step number={3} title="Engage" description="Participate in discussions and share valuable insights." />
              <Step number={4} title="Build Trust" description="Earn trust points through positive community interactions." />
              <Step number={5} title="Stay Informed" description="Receive personalized, verified crypto information." />
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="tele.io has completely changed how I approach crypto information. It's my go-to platform for reliable insights."
                author="Alex Chen, Crypto Enthusiast"
              />
              <TestimonialCard
                quote="The community here is incredible. I've learned so much and feel more confident in my crypto decisions."
                author="Sarah Johnson, Blockchain Developer"
              />
              <TestimonialCard
                quote="Finally, a platform that brings together trustworthy information. tele.io is a game-changer!"
                author="Michael Lee, Crypto Investor"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Join the Trusted Crypto Community?</h2>
            <Button 
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 text-lg px-8 py-3"
              onClick={() => handleCommunityClick('sign-up')}
            >
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 dark:bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-bold">tele.io</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};
