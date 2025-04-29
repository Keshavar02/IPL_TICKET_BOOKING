import React, { useState, useEffect } from 'react';
import { Seat } from '../../types';
import { generateSeats } from '../../data/mockData';

interface SeatSelectorProps {
  matchId: number;
  stadiumId: number;
  onSeatSelection: (selectedSeats: Seat[]) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ matchId, stadiumId, onSeatSelection }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch seats from an API
    const availableSeats = generateSeats(matchId, stadiumId);
    setSeats(availableSeats);
  }, [matchId, stadiumId]);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'Booked') return;
    
    setSelectedSeatIds(prevSelected => {
      if (prevSelected.includes(seat.seat_id)) {
        return prevSelected.filter(id => id !== seat.seat_id);
      } else {
        return [...prevSelected, seat.seat_id];
      }
    });
  };

  useEffect(() => {
    const selectedSeats = seats.filter(seat => selectedSeatIds.includes(seat.seat_id));
    onSeatSelection(selectedSeats);
  }, [selectedSeatIds, seats, onSeatSelection]);

  // Group seats by row letter
  const seatsByRow = seats.reduce((acc: { [key: string]: Seat[] }, seat) => {
    const rowLetter = seat.seat_number.charAt(0);
    if (!acc[rowLetter]) {
      acc[rowLetter] = [];
    }
    acc[rowLetter].push(seat);
    return acc;
  }, {});

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg text-white text-center font-bold">
        PITCH
      </div>
      
      <div className="space-y-3 mb-6">
        {Object.entries(seatsByRow).map(([rowLetter, rowSeats]) => (
          <div key={rowLetter} className="flex items-center space-x-1">
            <div className="w-6 text-center font-bold text-blue-900">{rowLetter}</div>
            <div className="flex flex-wrap gap-1">
              {rowSeats.map(seat => (
                <button
                  key={seat.seat_id}
                  className={`w-8 h-8 text-xs flex items-center justify-center rounded 
                    ${seat.status === 'Booked' 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : selectedSeatIds.includes(seat.seat_id)
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  onClick={() => toggleSeatSelection(seat)}
                  disabled={seat.status === 'Booked'}
                >
                  {seat.seat_number.substring(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 text-sm mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 mr-2 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 mr-2 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Select seats by clicking on them
      </div>
    </div>
  );
};

export default SeatSelector;