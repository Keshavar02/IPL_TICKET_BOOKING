import React, { useState, useEffect } from 'react';
import { Calendar, CreditCard, Users, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { matches } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalMatches: 0,
    upcomingMatches: 0,
    totalRevenue: 0,
    totalBookings: 0,
    averageBookingsPerMatch: 0
  });
  
  useEffect(() => {
    // In a real app, this would be an API call to get dashboard stats
    const totalMatches = matches.length;
    const today = new Date();
    const upcomingMatches = matches.filter(match => new Date(match.match_date) > today).length;
    
    // Mock data for demonstration purposes
    const totalRevenue = 250000;
    const totalBookings = 450;
    
    setStats({
      totalMatches,
      upcomingMatches,
      totalRevenue,
      totalBookings,
      averageBookingsPerMatch: Math.round(totalBookings / totalMatches)
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Matches</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalMatches}</p>
              </div>
            </div>
            <div className="mt-4 text-xs font-medium text-green-600">
              {stats.upcomingMatches} upcoming matches
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Ticket className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalBookings}</p>
              </div>
            </div>
            <div className="mt-4 text-xs font-medium text-green-600">
              {stats.averageBookingsPerMatch} avg. bookings per match
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 text-xs font-medium text-green-600">
              ₹{Math.round(stats.totalRevenue / stats.totalMatches).toLocaleString()} per match
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-blue-900">120</p>
              </div>
            </div>
            <div className="mt-4 text-xs font-medium text-green-600">
              15 new users this week
            </div>
          </div>
        </div>
        
        {/* Quick Access */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/admin/matches" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Manage Matches</h3>
              <p className="text-gray-600 text-sm">Add, edit, or remove upcoming matches</p>
            </Link>
            
            <Link to="/admin/stadiums" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Manage Stadiums</h3>
              <p className="text-gray-600 text-sm">Update stadium information and seating layouts</p>
            </Link>
            
            <Link to="/admin/teams" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Manage Teams</h3>
              <p className="text-gray-600 text-sm">Update team information and player rosters</p>
            </Link>
          </div>
        </div>
        
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-900 text-white p-4">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample booking data - in a real app, this would come from an API */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #3956
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    john.doe@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    MI vs CSK
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    A12
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹1,500
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #3955
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    jane.smith@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    RCB vs KKR
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    B23
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹1,800
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #3954
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    mark.johnson@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    DC vs PBKS
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    C05
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹1,200
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View all bookings →</a>
          </div>
        </div>
        
        {/* Upcoming Matches */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-900 text-white p-4">
            <h2 className="text-lg font-semibold">Upcoming Matches</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stadium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matches.slice(0, 3).map((match) => (
                  <tr key={match.match_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={match.team1?.logo} alt={match.team1?.team_name} className="h-8 w-8 object-contain" />
                        <span className="mx-2 font-semibold">vs</span>
                        <img src={match.team2?.logo} alt={match.team2?.team_name} className="h-8 w-8 object-contain" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(match.match_date).toLocaleDateString()} - {new Date(match.match_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {match.stadium?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Mock data for tickets sold */}
                      {Math.floor(Math.random() * 1000)} / {match.stadium?.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Mock data for revenue */}
                      ₹{(Math.floor(Math.random() * 150) * 1000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link to="/admin/matches" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Manage all matches →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;