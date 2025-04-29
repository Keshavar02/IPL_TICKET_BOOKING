import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/booking/PaymentForm';
import { Match, Seat, Ticket, Payment } from '../types';

interface LocationState {
  ticket: Ticket;
  match: Match;
  selectedSeat: Seat;
  totalAmount: number;
}

const PaymentPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to get ticket details
    if (location.state) {
      const state = location.state as LocationState;
      setTicket(state.ticket);
      setMatch(state.match);
      setSelectedSeat(state.selectedSeat);
      setTotalAmount(state.totalAmount);
      setLoading(false);
    } else if (ticketId) {
      // If we don't have state (e.g. user refreshed the page), fetch the data
      // This is a mock implementation - in a real app, it would be an API call
      setLoading(true);
      setTimeout(() => {
        // For demo purposes, redirect to home if we don't have state
        navigate('/');
      }, 1500);
    }
  }, [location.state, ticketId, navigate]);
  
  const handlePaymentComplete = (payment: Payment) => {
    // In a real app, this would be an API call to update the payment status
    console.log('Payment completed:', payment);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  if (!ticket || !match || !selectedSeat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">Ticket information not found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-900 text-white rounded-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Complete Your Payment</h1>
          <p className="text-gray-600">Secure your tickets for the match between {match.team1?.team_name} and {match.team2?.team_name}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center">
                <img src={match.team1?.logo} alt={match.team1?.team_name} className="h-10 w-10 object-contain" />
                <span className="mx-2 font-bold">VS</span>
                <img src={match.team2?.logo} alt={match.team2?.team_name} className="h-10 w-10 object-contain" />
              </div>
              
              <div>
                <span className="font-medium">{match.stadium?.name}, {match.stadium?.location}</span>
              </div>
              
              <div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Seat: {selectedSeat.seat_number}
                </span>
              </div>
            </div>
          </div>
          
          <PaymentForm 
            ticket={ticket} 
            amount={totalAmount} 
            onPaymentComplete={handlePaymentComplete} 
          />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your payment information is secure.</p>
            <p>We use industry-standard encryption to protect your personal data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;