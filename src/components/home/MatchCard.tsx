import React from 'react';
import { Clock, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Match } from '../../types';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { currentUser } = useAuth();
  const matchDate = new Date(match.match_date);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Stadium Image */}
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${match.stadium?.image})` }}
      >
        <div className="h-full bg-gradient-to-t from-blue-900/80 to-transparent p-4 flex items-end">
          <h2 className="text-white font-bold text-lg">
            {match.team1?.team_name} vs {match.team2?.team_name}
          </h2>
        </div>
      </div>
      
      {/* Match Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={match.team1?.logo} 
              alt={match.team1?.team_name} 
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-blue-900">VS</span>
            <img 
              src={match.team2?.logo} 
              alt={match.team2?.team_name} 
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
            {format(matchDate, 'd MMM')}
          </div>
        </div>
        
        <div className="space-y-2 text-gray-600 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-900" />
            <span>{format(matchDate, 'h:mm a')}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-900" />
            <span>{match.stadium?.name}, {match.stadium?.location}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-blue-900" />
            <span>₹{match.ticket_price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          {currentUser && currentUser.role === 'user' ? (
            <Link 
              to={`/booking/${match.match_id}`} 
              className="block w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center rounded-md font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              Book Tickets
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="block w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-md font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
            >
              Login to Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;