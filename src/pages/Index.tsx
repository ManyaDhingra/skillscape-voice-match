
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Mic, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#1EAEDB] text-white py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SkillScape</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:text-blue-100">Home</a>
            <a href="#" className="hover:text-blue-100">How It Works</a>
            <a href="#" className="hover:text-blue-100">For Workers</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-[#1EAEDB]">
            Connect with Local Skills
          </h2>
          <p className="text-xl text-gray-700">
            Find verified local talent instantly. From handymen to tutors, skilled workers are just a tap away.
          </p>
          
          <div className="flex space-x-4">
            <Button variant="default" className="bg-[#1EAEDB] hover:bg-[#33C3F0]">
              <Users className="mr-2" /> Find Talent
            </Button>
            <Button variant="outline" className="border-[#1EAEDB] text-[#1EAEDB] hover:bg-blue-50">
              <Mic className="mr-2" /> Speak Your Skill
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-gray-600">
            <MapPin className="text-[#1EAEDB]" />
            <p>Hyperlocal skill matching powered by AI</p>
          </div>
        </div>

        <div className="bg-[#F4F7F6] rounded-2xl p-8 shadow-lg">
          <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
            <p className="text-gray-400">Map Placeholder</p>
          </div>
        </div>
      </main>

      <footer className="bg-[#33C3F0] text-white py-6">
        <div className="container mx-auto text-center">
          © 2025 SkillScape. Connect. Collaborate. Grow.
        </div>
      </footer>
    </div>
  );
};

export default Index;
