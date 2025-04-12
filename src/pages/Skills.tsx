
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Clock } from 'lucide-react';

// Mock data for skill categories
const SKILL_CATEGORIES = [
  {
    id: '1',
    name: 'Home & Repairs',
    icon: '🔧',
    count: 127,
    popular: ['Plumbing', 'Electrical', 'Carpentry', 'Painting'],
    color: 'bg-blue-100',
  },
  {
    id: '2',
    name: 'Education',
    icon: '📚',
    count: 94,
    popular: ['Math Tutoring', 'Language Learning', 'Science', 'Music Lessons'],
    color: 'bg-green-100',
  },
  {
    id: '3',
    name: 'Technology',
    icon: '💻',
    count: 85,
    popular: ['Web Development', 'App Design', 'IT Support', 'Data Analysis'],
    color: 'bg-purple-100',
  },
  {
    id: '4',
    name: 'Health & Wellness',
    icon: '🧘',
    count: 79,
    popular: ['Fitness Training', 'Nutrition', 'Massage', 'Yoga'],
    color: 'bg-red-100',
  },
  {
    id: '5',
    name: 'Creative & Design',
    icon: '🎨',
    count: 72,
    popular: ['Graphic Design', 'Photography', 'Video Editing', 'Illustration'],
    color: 'bg-yellow-100',
  },
  {
    id: '6',
    name: 'Business',
    icon: '💼',
    count: 68,
    popular: ['Accounting', 'Marketing', 'Consulting', 'Legal Advice'],
    color: 'bg-indigo-100',
  },
];

// Mock data for trending skills
const TRENDING_SKILLS = [
  {
    id: '1',
    name: 'Website Development',
    providers: 24,
    avgRating: 4.8,
    avgPrice: '$35/hr',
    growth: '+12%',
  },
  {
    id: '2',
    name: 'Handyman Services',
    providers: 36,
    avgRating: 4.7,
    avgPrice: '$28/hr',
    growth: '+9%',
  },
  {
    id: '3',
    name: 'Language Tutoring',
    providers: 19,
    avgRating: 4.9,
    avgPrice: '$25/hr',
    growth: '+15%',
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1EAEDB] mb-4">Explore Skills</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through various skill categories or search for specific talents. 
            Connect with local experts ready to help with your projects.
          </p>
        </div>

        {/* Trending skills section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Award className="mr-2 text-[#1EAEDB]" />
              Trending Skills
            </h2>
            <Link 
              to="/map" 
              className="text-[#1EAEDB] hover:underline flex items-center"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TRENDING_SKILLS.map((skill) => (
              <div key={skill.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                      {skill.growth} this month
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-[#1EAEDB]" />
                    <span>{skill.providers} providers</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400" />
                    <span>{skill.avgRating} avg</span>
                  </div>
                  <div>
                    <span className="font-medium">{skill.avgPrice}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link 
                    to={`/map?skill=${encodeURIComponent(skill.name)}`} 
                    className="block w-full text-center py-2 bg-[#1EAEDB] hover:bg-[#33C3F0] text-white rounded-md"
                  >
                    Find Providers
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Skill Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.id} className={`${category.color} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="mr-2 text-2xl">{category.icon}</span>
                    {category.name}
                  </h3>
                  <span className="text-sm text-gray-600">{category.count} providers</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Popular skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.popular.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-white/70 rounded-full px-3 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  to={`/map?category=${encodeURIComponent(category.name)}`}
                  className="flex items-center text-[#1EAEDB] hover:underline"
                >
                  Browse all <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skills;
