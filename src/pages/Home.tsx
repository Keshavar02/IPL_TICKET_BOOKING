import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import MatchCard from '../components/home/MatchCard';
import { Match } from '../types';
import { matches } from '../data/mockData';

const Home: React.FC = () => {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>(matches);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>(matches);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter matches based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMatches(upcomingMatches);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = upcomingMatches.filter(match => 
        match.team1?.team_name.toLowerCase().includes(searchTermLower) || 
        match.team2?.team_name.toLowerCase().includes(searchTermLower) ||
        match.stadium?.name.toLowerCase().includes(searchTermLower) ||
        match.stadium?.location.toLowerCase().includes(searchTermLower)
      );
      setFilteredMatches(filtered);
    }
  }, [searchTerm, upcomingMatches]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/2347011/pexels-photo-2347011.jpeg" 
          alt="Cricket Stadium" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            IPL 2025 <span className="text-orange-500">Tickets</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Experience the thrill of live cricket. Book your tickets now for the upcoming Indian Premier League matches.
          </p>
          
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search by team, stadium, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-16 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900 hover:text-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-white mt-2 p-4 rounded-lg shadow-lg max-w-xl animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">
                      <option value="">All Locations</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setShowFilters(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Upcoming Matches</h2>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </div>
        
        {filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-center">
              <div className="text-blue-900 text-5xl mb-4">😢</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map(match => (
              <div key={match.match_id} className="transform transition-all duration-300 hover:-translate-y-1">
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* IPL Features Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Book With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Seats</h3>
              <p className="text-gray-300">
                All our tickets come with a guarantee. We ensure that you get the exact seats you book.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-300">
                Your payment information is always secure. We use industry-leading encryption technologies.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-300">
                Our customer support team is available 24/7 to assist you with any queries or issues.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Teams Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">IPL Teams</h2>
            <div className="h-1 w-20 bg-orange-500 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The Indian Premier League features eight teams representing different cities across India.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Team logos */}
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/7NyPD0C/mi-logo.png" alt="Mumbai Indians" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Mumbai Indians</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/hR5V7px/csk-logo.png" alt="Chennai Super Kings" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Chennai Super Kings</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/m6yY8pS/rcb-logo.png" alt="Royal Challengers Bangalore" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Royal Challengers</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/ZGBzJYc/kkr-logo.png" alt="Kolkata Knight Riders" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Kolkata Knight Riders</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/gWbvHmr/dc-logo.png" alt="Delhi Capitals" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Delhi Capitals</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
              <img src="https://i.ibb.co/3yN9X01/pk-logo.png" alt="Punjab Kings" className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm font-medium text-center">Punjab Kings</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">How It Works</h2>
            <div className="h-1 w-20 bg-orange-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose a Match</h3>
              <p className="text-gray-600">
                Browse through our extensive list of upcoming IPL matches and select the one you want to attend.
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Select Seats</h3>
              <p className="text-gray-600">
                Pick your preferred seats from the stadium layout. You can see which seats are available in real-time.
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Make Payment</h3>
              <p className="text-gray-600">
                Complete your booking by making a secure payment using your preferred payment method.
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Ticket</h3>
              <p className="text-gray-600">
                Receive your confirmed e-ticket instantly. You can view and download it anytime from your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to experience the IPL live?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Don't miss out on the action. Book your tickets now and be part of the cricket extravaganza!
          </p>
          <button className="bg-white text-orange-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
            Book Tickets Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;