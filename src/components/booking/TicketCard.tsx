import React from 'react';
import { format } from 'date-fns';
import { Ticket, Match, Seat } from '../../types';
import { Calendar, MapPin, CreditCard, Check, Users, X } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
  match: Match;
  seat: Seat;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, match, seat, paymentStatus }) => {
  const matchDate = new Date(match.match_date);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="font-bold">{format(matchDate, 'd MMMM yyyy')}</span>
        </div>
        <div>
          <span className="text-sm bg-orange-500 px-3 py-1 rounded-full">{format(matchDate, 'h:mm a')}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img src={match.team1?.logo} alt={match.team1?.team_name} className="h-12 w-12 object-contain" />
            <div className="font-bold text-lg text-blue-900">VS</div>
            <img src={match.team2?.logo} alt={match.team2?.team_name} className="h-12 w-12 object-contain" />
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            ticket.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {ticket.status}
          </div>
        </div>
        
        <div className="space-y-3 mb-6 text-gray-700">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-blue-800 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{match.stadium?.name}</span>
              <div className="text-sm">{match.stadium?.location}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-800" />
            <span><span className="font-semibold">Seat:</span> {seat.seat_number}</span>
          </div>
          
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-800" />
            <span><span className="font-semibold">Price:</span> ₹{match.ticket_price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Payment Status:</span>
            <div className={`flex items-center ${
              paymentStatus === 'Completed' ? 'text-green-600' : 
              paymentStatus === 'Failed' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {paymentStatus === 'Completed' ? (
                <Check className="h-5 w-5 mr-1" />
              ) : paymentStatus === 'Failed' ? (
                <X className="h-5 w-5 mr-1" />
              ) : (
                <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {paymentStatus}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Booking Date: {format(new Date(ticket.booking_date), 'dd/MM/yyyy')}
        </div>
        <div className="text-sm font-medium text-blue-600">
          Ticket ID: #{ticket.ticket_id}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;