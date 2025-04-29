import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, Download, Share2 } from 'lucide-react';
import TicketCard from '../components/booking/TicketCard';
import { Ticket, Match, Seat } from '../types';

const TicketConfirmation: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [seat, setSeat] = useState<Seat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to get ticket details
    // For demo purposes, we'll create a mock ticket
    if (ticketId) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // This is mock data - in a real app, this would come from an API
        const mockTicket: Ticket = {
          ticket_id: parseInt(ticketId),
          user_id: 1,
          match_id: 1,
          seat_id: 1,
          booking_date: new Date().toISOString(),
          status: 'Confirmed'
        };
        
        const mockMatch: Match = {
          match_id: 1,
          team1_id: 1,
          team2_id: 2,
          match_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          stadium_id: 1,
          ticket_price: 1500,
          team1: {
            team_id: 1,
            team_name: 'Mumbai Indians',
            coach: 'Mahela Jayawardene',
            captain: 'Rohit Sharma',
            logo: 'https://i.ibb.co/7NyPD0C/mi-logo.png'
          },
          team2: {
            team_id: 2,
            team_name: 'Chennai Super Kings',
            coach: 'Stephen Fleming',
            captain: 'MS Dhoni',
            logo: 'https://i.ibb.co/hR5V7px/csk-logo.png'
          },
          stadium: {
            stadium_id: 1,
            name: 'Wankhede Stadium',
            location: 'Mumbai',
            capacity: 33000,
            image: 'https://images.pexels.com/photos/2098071/pexels-photo-2098071.jpeg'
          }
        };
        
        const mockSeat: Seat = {
          seat_id: 1,
          stadium_id: 1,
          match_id: 1,
          seat_number: 'A12',
          status: 'Booked'
        };
        
        setTicket(mockTicket);
        setMatch(mockMatch);
        setSeat(mockSeat);
        setLoading(false);
      }, 1500);
    }
  }, [ticketId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  if (!ticket || !match || !seat) {
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full mb-4">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Your ticket has been confirmed. You can view and download it below.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 border border-gray-200">
          <div className="mb-6 flex justify-end space-x-2">
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
          
          <TicketCard 
            ticket={ticket}
            match={match}
            seat={seat}
            paymentStatus="Completed"
          />
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Please arrive at least 30 minutes before the match starts.</li>
              <li>Bring a valid ID proof along with your ticket for verification.</li>
              <li>Outside food and beverages are not allowed inside the stadium.</li>
              <li>Cameras and electronic devices are permitted, but their use must not interfere with others' view.</li>
              <li>In case of any queries, contact our support at support@ipltickets.com.</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Book Another Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;