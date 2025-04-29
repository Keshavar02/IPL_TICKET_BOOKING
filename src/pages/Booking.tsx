import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, MapPin, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import SeatSelector from '../components/booking/SeatSelector';
import { Match, Seat, Ticket } from '../types';
import { matches } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Booking: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [match, setMatch] = useState<Match | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (matchId) {
      const matchIdNum = parseInt(matchId);
      const foundMatch = matches.find(m => m.match_id === matchIdNum);
      if (foundMatch) {
        setMatch(foundMatch);
      } else {
        // Match not found, redirect to home
        navigate('/');
      }
    }
  }, [matchId, navigate]);
  
  const handleSeatSelection = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };
  
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to continue.');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call to create a ticket
    setTimeout(() => {
      // Generate a mock ticket
      const mockTicket: Ticket = {
        ticket_id: Math.floor(Math.random() * 10000),
        user_id: currentUser?.user_id || 0,
        match_id: match?.match_id || 0,
        seat_id: selectedSeats[0].seat_id, // For simplicity, just use the first selected seat
        booking_date: new Date().toISOString(),
        status: 'Confirmed',
        match: match || undefined,
        seat: selectedSeats[0]
      };
      
      setLoading(false);
      navigate(`/payment/${mockTicket.ticket_id}`, { 
        state: { 
          ticket: mockTicket,
          match: match,
          selectedSeat: selectedSeats[0],
          totalAmount: (match?.ticket_price || 0) * selectedSeats.length
        } 
      });
    }, 1500);
  };
  
  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  const matchDate = new Date(match.match_date);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Match Details */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white p-4">
                <h2 className="text-xl font-bold">Match Details</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={match.team1?.logo} 
                      alt={match.team1?.team_name} 
                      className="h-12 w-12 object-contain"
                    />
                    <span className="font-bold text-gray-800 text-lg">VS</span>
                    <img 
                      src={match.team2?.logo} 
                      alt={match.team2?.team_name} 
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                </div>
                
                <div className="my-4 border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-blue-900" />
                    <span>{format(matchDate, 'EEEE, d MMMM yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-blue-900" />
                    <span>{format(matchDate, 'h:mm a')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-blue-900" />
                    <div>
                      <p>{match.stadium?.name}</p>
                      <p className="text-sm">{match.stadium?.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-5 w-5 mr-3 text-blue-900" />
                    <span>₹{match.ticket_price.toLocaleString()} per ticket</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white p-4">
                <h2 className="text-xl font-bold">Booking Summary</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Selected Seats</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Ticket Price</span>
                    <span>₹{match.ticket_price.toLocaleString()} x {selectedSeats.length}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>₹{(match.ticket_price * selectedSeats.length).toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0 || loading}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                    selectedSeats.length === 0 || loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Seat Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white p-4">
                <h2 className="text-xl font-bold">Select Seats</h2>
              </div>
              
              <div className="p-4">
                {/* Selected seats display */}
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-blue-900 font-medium">
                    {selectedSeats.length > 0 
                      ? `You've selected ${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''}: ${selectedSeats.map(seat => seat.seat_number).join(', ')}` 
                      : 'Click on available seats to select them'}
                  </p>
                </div>
                
                {/* Seat selector component */}
                <SeatSelector 
                  matchId={match.match_id} 
                  stadiumId={match.stadium_id} 
                  onSeatSelection={handleSeatSelection} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;