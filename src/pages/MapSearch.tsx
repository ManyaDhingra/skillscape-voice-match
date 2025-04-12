
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Clock, DollarSign, Filter, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import VoiceSearch from '@/components/VoiceSearch';
import { toast } from 'sonner';

// Mock data for skill providers
const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    skill: 'Plumbing',
    rating: 4.8,
    reviews: 127,
    hourlyRate: 25,
    distance: '0.5 miles',
    available: true,
    location: { lat: 37.7749, lng: -122.4194 },
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Samantha Lee',
    skill: 'Tutoring',
    rating: 4.9,
    reviews: 84,
    hourlyRate: 30,
    distance: '1.2 miles',
    available: true,
    location: { lat: 37.7749, lng: -122.4244 },
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Marcus Williams',
    skill: 'Electrical',
    rating: 4.7,
    reviews: 56,
    hourlyRate: 35,
    distance: '0.8 miles',
    available: false,
    location: { lat: 37.7749, lng: -122.4294 },
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    skill: 'Web Design',
    rating: 5.0,
    reviews: 41,
    hourlyRate: 40,
    distance: '2.1 miles',
    available: true,
    location: { lat: 37.7749, lng: -122.4344 },
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'David Chen',
    skill: 'Carpentry',
    rating: 4.6,
    reviews: 92,
    hourlyRate: 28,
    distance: '1.5 miles',
    available: false,
    location: { lat: 37.7749, lng: -122.4394 },
    avatar: 'https://i.pravatar.cc/150?img=5',
  }
];

const MapSearch = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  
  // Filter providers based on search and filters
  const filteredProviders = MOCK_PROVIDERS.filter(provider => {
    // Filter by search term
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      provider.skill.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected skill
    const matchesSkill = !selectedSkill || provider.skill === selectedSkill;
    
    // Filter by availability
    const matchesAvailability = !showAvailableOnly || provider.available;
    
    return matchesSearch && matchesSkill && matchesAvailability;
  });
  
  // Get unique skills for the filter
  const uniqueSkills = Array.from(new Set(MOCK_PROVIDERS.map(p => p.skill)));

  // Handle voice search results
  const handleVoiceSearchResult = (transcript: string) => {
    // Simulate language detection (in a real app, you'd use a language detection API)
    const languages = ['English', 'Hindi', 'Spanish', 'French', 'Mandarin'];
    const detectedLang = languages[Math.floor(Math.random() * languages.length)];
    
    setDetectedLanguage(detectedLang);
    setSearchTerm(transcript);
    
    toast.success(`Detected language: ${detectedLang}`);
    console.log(`Voice input: "${transcript}" (detected as ${detectedLang})`);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - Search and filters */}
          <div className="w-full md:w-80 bg-white rounded-xl shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <Globe size={20} className="text-[#1EAEDB]" />
                Speak Your Skill
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Speak in any language to search for skills
              </p>
              <div className="flex items-center justify-between">
                <VoiceSearch onSearchResult={handleVoiceSearchResult} />
                {detectedLanguage && (
                  <div className="text-xs bg-[#1EAEDB]/10 text-[#1EAEDB] px-2 py-1 rounded">
                    Detected: {detectedLanguage}
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                placeholder="Search skills or names..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <Filter size={16} />
                Filters
              </h3>
              
              <div className="mt-3">
                <label className="text-sm text-gray-600">Skill Type</label>
                <select 
                  className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="">All Skills</option>
                  {uniqueSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-3 flex items-center">
                <input
                  type="checkbox"
                  id="availableOnly"
                  className="rounded text-[#1EAEDB]"
                  checked={showAvailableOnly}
                  onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                />
                <label htmlFor="availableOnly" className="ml-2 text-sm text-gray-600">
                  Available now only
                </label>
              </div>
              
              <Button className="w-full mt-4 bg-[#1EAEDB] hover:bg-[#33C3F0]">
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Right content - Map and results */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-96 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Interactive Map Coming Soon</p>
                </div>
                
                {/* Mock map pins */}
                {MOCK_PROVIDERS.map((provider) => (
                  <div 
                    key={provider.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${provider.available ? 'bg-green-500' : 'bg-gray-400'}`}
                    style={{ 
                      left: `${30 + Math.random() * 600}px`, 
                      top: `${30 + Math.random() * 300}px` 
                    }}
                  >
                    <MapPin className="text-white" size={16} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Results list */}
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-xl shadow-md p-4 flex">
                  <div className="flex-shrink-0">
                    <img 
                      src={provider.avatar} 
                      alt={provider.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.skill}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="text-yellow-400" size={16} />
                        <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({provider.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{provider.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        <span>${provider.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span className={provider.available ? 'text-green-500' : 'text-gray-500'}>
                          {provider.available ? 'Available now' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        className="bg-[#1EAEDB] hover:bg-[#33C3F0]"
                        disabled={!user}
                      >
                        {user ? 'Book Now' : 'Login to Book'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredProviders.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-gray-500">No skill providers found for your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
