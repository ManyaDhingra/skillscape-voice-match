
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Clock, DollarSign, Briefcase, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const isProvider = user?.role === 'provider';
  
  // Profile data state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-123-4567',
    address: '123 Main St, Cityville, CA',
    bio: isProvider 
      ? 'Experienced professional with over 5 years of expertise in my field. I pride myself on quality work and customer satisfaction.'
      : 'Looking for skilled professionals to help with various projects around my home and business.',
    // Provider-specific fields
    skills: ['Plumbing', 'Electrical', 'Carpentry'],
    rate: '35',
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    experience: '5 years',
  });

  const [editing, setEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Here you would typically save the data to your backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="mb-4">Please log in to view your profile.</p>
          <Button>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile header */}
            <div className="bg-[#1EAEDB] text-white p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                  <div className="w-24 h-24 bg-white text-[#1EAEDB] rounded-full flex items-center justify-center text-4xl font-bold mb-4 md:mb-0">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="md:ml-6 text-center md:text-left">
                    <h1 className="text-3xl font-bold">{formData.name}</h1>
                    <p className="text-blue-100">{isProvider ? 'Skill Provider' : 'Skill Seeker'}</p>
                    {isProvider && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-white/20 text-white text-xs rounded-full px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {!editing && (
                  <Button 
                    onClick={() => setEditing(true)}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#1EAEDB]"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
            
            {/* Profile content */}
            <div className="p-8">
              {editing ? (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#1EAEDB] focus:outline-none focus:ring-[#1EAEDB]"
                    />
                  </div>
                  
                  {isProvider && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Hourly Rate ($)
                        </label>
                        <Input
                          name="rate"
                          type="number"
                          value={formData.rate}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Experience
                        </label>
                        <Input
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Availability
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                          {Object.entries(formData.availability).map(([day, isAvailable]) => (
                            <div key={day} className="flex items-center">
                              <input
                                type="checkbox"
                                id={day}
                                checked={isAvailable}
                                onChange={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    availability: {
                                      ...prev.availability,
                                      [day]: !isAvailable
                                    }
                                  }));
                                }}
                                className="h-4 w-4 text-[#1EAEDB] focus:ring-[#33C3F0] rounded"
                              />
                              <label htmlFor={day} className="ml-2 text-sm text-gray-700 capitalize">
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-[#1EAEDB] hover:bg-[#33C3F0]"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="text-[#1EAEDB] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{formData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="text-[#1EAEDB] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-[#1EAEDB] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="text-[#1EAEDB] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{formData.address}</p>
                        </div>
                      </div>
                      
                      {isProvider && (
                        <>
                          <div className="flex items-center">
                            <DollarSign className="text-[#1EAEDB] mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Hourly Rate</p>
                              <p className="font-medium">${formData.rate}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="text-[#1EAEDB] mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Experience</p>
                              <p className="font-medium">{formData.experience}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700">{formData.bio}</p>
                  </div>
                  
                  {isProvider && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Award className="mr-2 text-[#1EAEDB]" size={18} />
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-blue-100 text-[#1EAEDB] text-sm rounded-full px-3 py-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Clock className="mr-2 text-[#1EAEDB]" size={18} />
                          Availability
                        </h3>
                        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                          {Object.entries(formData.availability).map(([day, isAvailable]) => (
                            <div 
                              key={day} 
                              className={`text-center p-2 rounded-md ${
                                isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              <p className="capitalize">{day.slice(0, 3)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
