
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Calendar, DollarSign, CreditCard, Star, MessageSquare, User, Settings, Award, Bookmark } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

// Mock data for bookings
const MOCK_BOOKINGS = [
  {
    id: 'b1',
    providerName: 'Alex Johnson',
    skill: 'Plumbing',
    date: '2025-04-15',
    time: '10:00 AM',
    status: 'upcoming',
    price: 75.00,
    paid: true,
  },
  {
    id: 'b2',
    providerName: 'Samantha Lee',
    skill: 'Tutoring',
    date: '2025-04-18',
    time: '2:00 PM',
    status: 'upcoming',
    price: 60.00,
    paid: false,
  },
  {
    id: 'b3',
    providerName: 'Marcus Williams',
    skill: 'Electrical',
    date: '2025-04-10',
    time: '11:30 AM',
    status: 'completed',
    price: 105.00,
    paid: true,
  },
];

// Mock data for jobs (for providers)
const MOCK_JOBS = [
  {
    id: 'j1',
    clientName: 'John Smith',
    skill: 'Plumbing',
    date: '2025-04-15',
    time: '10:00 AM',
    status: 'confirmed',
    price: 75.00,
    payment: 'pending',
  },
  {
    id: 'j2',
    clientName: 'Emily Davis',
    skill: 'Plumbing',
    date: '2025-04-16',
    time: '3:00 PM',
    status: 'pending',
    price: 90.00,
    payment: 'not paid',
  },
  {
    id: 'j3',
    clientName: 'Michael Brown',
    skill: 'Plumbing',
    date: '2025-04-09',
    time: '9:00 AM',
    status: 'completed',
    price: 60.00,
    payment: 'paid',
  },
];

// Mock data for earnings
const MOCK_EARNINGS = {
  total: 1250.00,
  pending: 175.00,
  lastMonth: 450.00,
  thisMonth: 625.00,
};

// Mock data for reviews
const MOCK_REVIEWS = [
  {
    id: 'r1',
    from: 'John Smith',
    rating: 5,
    date: '2025-04-10',
    comment: 'Excellent service! Very professional and completed the job quickly.',
  },
  {
    id: 'r2',
    from: 'Emily Davis',
    rating: 4,
    date: '2025-04-05',
    comment: 'Good work and reasonable price. Would hire again.',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="mb-4">Please log in to access your dashboard.</p>
          <Button>Go to Login</Button>
        </div>
      </div>
    );
  }

  const isProvider = user?.role === 'provider';

  const handlePayNow = (bookingId: string) => {
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
  };

  const handleComplete = (jobId: string) => {
    toast({
      title: "Job Marked as Complete",
      description: "The client will be notified to leave a review.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#1EAEDB] rounded-full flex items-center justify-center text-white text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name || user.email}</h1>
                <p className="text-gray-600">{isProvider ? 'Skill Provider' : 'Skill Seeker'}</p>
              </div>
            </div>
            <div>
              <Button className="bg-[#1EAEDB] hover:bg-[#33C3F0]">
                <Settings className="mr-2" size={16} />
                Account Settings
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-sm rounded-lg p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            {isProvider ? (
              <TabsTrigger value="jobs" className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white">
                My Jobs
              </TabsTrigger>
            ) : (
              <TabsTrigger value="bookings" className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white">
                My Bookings
              </TabsTrigger>
            )}
            {isProvider && (
              <TabsTrigger value="earnings" className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white">
                Earnings
              </TabsTrigger>
            )}
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500">
                      {isProvider ? 'Upcoming Jobs' : 'Upcoming Bookings'}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {isProvider ? MOCK_JOBS.filter(j => j.status === 'confirmed').length : MOCK_BOOKINGS.filter(b => b.status === 'upcoming').length}
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="text-[#1EAEDB]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500">
                      {isProvider ? 'Completed Jobs' : 'Completed Bookings'}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {isProvider ? MOCK_JOBS.filter(j => j.status === 'completed').length : MOCK_BOOKINGS.filter(b => b.status === 'completed').length}
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="text-green-600" />
                  </div>
                </div>
              </div>

              {isProvider ? (
                <>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500">Total Earnings</p>
                        <h3 className="text-2xl font-bold mt-2">${MOCK_EARNINGS.total}</h3>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <DollarSign className="text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500">Average Rating</p>
                        <div className="flex items-center mt-2">
                          <h3 className="text-2xl font-bold">4.8</h3>
                          <Star className="ml-1 text-yellow-400" size={18} />
                        </div>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Award className="text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500">Pending Payments</p>
                        <h3 className="text-2xl font-bold mt-2">
                          ${MOCK_BOOKINGS.filter(b => !b.paid).reduce((sum, booking) => sum + booking.price, 0)}
                        </h3>
                      </div>
                      <div className="bg-red-100 p-3 rounded-full">
                        <CreditCard className="text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500">Saved Providers</p>
                        <h3 className="text-2xl font-bold mt-2">5</h3>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <Bookmark className="text-indigo-600" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                {isProvider ? 'Recent Jobs' : 'Recent Bookings'}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isProvider ? 'Client' : 'Provider'}</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(isProvider ? MOCK_JOBS : MOCK_BOOKINGS).slice(0, 3).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{isProvider ? item.clientName : item.providerName}</TableCell>
                      <TableCell>{item.skill}</TableCell>
                      <TableCell>{item.date} at {item.time}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'upcoming' || item.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {!isProvider && !item.paid && item.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            className="bg-[#1EAEDB] hover:bg-[#33C3F0]"
                            onClick={() => handlePayNow(item.id)}
                          >
                            Pay Now
                          </Button>
                        )}
                        {isProvider && item.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleComplete(item.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value={isProvider ? "jobs" : "bookings"} className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                {isProvider ? 'My Jobs' : 'My Bookings'}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isProvider ? 'Client' : 'Provider'}</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(isProvider ? MOCK_JOBS : MOCK_BOOKINGS).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{isProvider ? item.clientName : item.providerName}</TableCell>
                      <TableCell>{item.skill}</TableCell>
                      <TableCell>{item.date} at {item.time}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'upcoming' || item.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {!isProvider && !item.paid && item.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            className="bg-[#1EAEDB] hover:bg-[#33C3F0]"
                            onClick={() => handlePayNow(item.id)}
                          >
                            Pay Now
                          </Button>
                        )}
                        {isProvider && item.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleComplete(item.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {isProvider && (
            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-500">Total Earnings</p>
                  <h3 className="text-3xl font-bold mt-2">${MOCK_EARNINGS.total}</h3>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-500">This Month</p>
                  <h3 className="text-3xl font-bold mt-2">${MOCK_EARNINGS.thisMonth}</h3>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-500">Pending Payments</p>
                  <h3 className="text-3xl font-bold mt-2">${MOCK_EARNINGS.pending}</h3>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_JOBS.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>{job.clientName}</TableCell>
                        <TableCell>{job.skill}</TableCell>
                        <TableCell>${job.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.payment === 'paid' ? 'bg-green-100 text-green-800' :
                            job.payment === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {job.payment}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          )}

          <TabsContent value="reviews" className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                {isProvider ? 'Client Reviews' : 'My Reviews'}
              </h3>
              {MOCK_REVIEWS.length > 0 ? (
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="mr-3 bg-gray-100 p-2 rounded-full">
                            <User className="text-gray-600" size={18} />
                          </div>
                          <div>
                            <p className="font-medium">{review.from}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} 
                                  fill={i < review.rating ? 'currentColor' : 'none'}
                                />
                              ))}
                              <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
