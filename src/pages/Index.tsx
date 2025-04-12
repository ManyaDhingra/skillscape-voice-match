
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Mic, Users, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Mock data for featured skill providers
const FEATURED_PROVIDERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    skill: 'Plumbing',
    rating: 4.8,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Samantha Lee',
    skill: 'Tutoring',
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Marcus Williams',
    skill: 'Electrical',
    rating: 4.7,
    avatar: 'https://i.pravatar.cc/150?img=3',
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-[#1EAEDB]">
              Connect with Local Skills
            </h2>
            <p className="text-xl text-gray-700">
              Find verified local talent instantly. From handymen to tutors, skilled workers are just a tap away.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/map">
                <Button variant="default" className="w-full sm:w-auto bg-[#1EAEDB] hover:bg-[#33C3F0]">
                  <Users className="mr-2" /> Find Talent
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full sm:w-auto border-[#1EAEDB] text-[#1EAEDB] hover:bg-blue-50">
                  <Mic className="mr-2" /> Speak Your Skill
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-gray-600">
              <MapPin className="text-[#1EAEDB]" />
              <p>Hyperlocal skill matching powered by AI</p>
            </div>
          </div>

          <div className="bg-[#F4F7F6] rounded-2xl p-8 shadow-lg">
            <div className="aspect-square bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 z-10 bg-black/20 rounded-xl"></div>
              <p className="absolute z-20 text-white text-lg font-semibold">Interactive Map</p>
              <div className="w-full h-full bg-[#1EAEDB]/10"></div>
              
              {/* Mock map pins */}
              {FEATURED_PROVIDERS.map((provider, index) => (
                <div 
                  key={provider.id}
                  className="absolute z-20 bg-white rounded-full p-1 shadow-md transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    left: `${20 + index * 30}%`, 
                    top: `${30 + index * 15}%` 
                  }}
                >
                  <div className="relative">
                    <img 
                      src={provider.avatar} 
                      alt={provider.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-[#F4F7F6] py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How SkillScape Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="w-16 h-16 bg-[#1EAEDB] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Search Skills</h3>
                <p className="text-gray-600">
                  Find verified local talent for any job, from home repairs to tutoring.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="w-16 h-16 bg-[#1EAEDB] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Connect Instantly</h3>
                <p className="text-gray-600">
                  Book appointments with available providers in your area.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="w-16 h-16 bg-[#1EAEDB] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Pay Securely</h3>
                <p className="text-gray-600">
                  Complete secure payments and leave reviews for completed work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Skill Providers */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Professionals</h2>
            <Link to="/map" className="text-[#1EAEDB] flex items-center hover:underline">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_PROVIDERS.map((provider) => (
              <div key={provider.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-[#1EAEDB]/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={provider.avatar} 
                      alt={provider.name} 
                      className="w-24 h-24 rounded-full border-4 border-white"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{provider.name}</h3>
                  <p className="text-gray-600 mb-2">{provider.skill} Expert</p>
                  <div className="flex items-center justify-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{provider.rating}</span>
                  </div>
                  <Link to={`/map?provider=${provider.id}`}>
                    <Button className="w-full mt-4 bg-[#1EAEDB] hover:bg-[#33C3F0]">View Profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#33C3F0] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SkillScape</h3>
              <p className="text-blue-100">
                Connect with local skills for all your needs. Our platform makes it easy to find verified experts in your area.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
                <li><Link to="/map" className="text-blue-100 hover:text-white">Find Skills</Link></li>
                <li><Link to="/skills" className="text-blue-100 hover:text-white">Skill Categories</Link></li>
                <li><Link to="/login" className="text-blue-100 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-blue-100 hover:text-white">Register</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-blue-100">
                Have questions or need support? Reach out to our team.
              </p>
              <Button className="mt-4 bg-white text-[#1EAEDB] hover:bg-blue-50">
                Contact Support
              </Button>
            </div>
          </div>
          <div className="border-t border-blue-300 mt-8 pt-8 text-center">
            <p>© 2025 SkillScape. Connect. Collaborate. Grow.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
