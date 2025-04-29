import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Clock, MapPin, CreditCard, Plus } from 'lucide-react';
import { matches, teams, stadiums } from '../../data/mockData';
import { Match } from '../../types';
import { format } from 'date-fns';

const AdminMatches: React.FC = () => {
  const [allMatches, setAllMatches] = useState<Match[]>(matches);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    team1_id: '',
    team2_id: '',
    match_date: '',
    match_time: '',
    stadium_id: '',
    ticket_price: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddMatch = () => {
    // Reset form data
    setFormData({
      team1_id: '',
      team2_id: '',
      match_date: '',
      match_time: '',
      stadium_id: '',
      ticket_price: ''
    });
    setIsAddModalOpen(true);
  };
  
  const handleEditMatch = (match: Match) => {
    setSelectedMatch(match);
    
    // Set form data with selected match details
    const matchDate = new Date(match.match_date);
    setFormData({
      team1_id: match.team1_id.toString(),
      team2_id: match.team2_id.toString(),
      match_date: format(matchDate, 'yyyy-MM-dd'),
      match_time: format(matchDate, 'HH:mm'),
      stadium_id: match.stadium_id.toString(),
      ticket_price: match.ticket_price.toString()
    });
    
    setIsEditModalOpen(true);
  };
  
  const handleDeleteMatch = (match: Match) => {
    setSelectedMatch(match);
    setIsDeleteModalOpen(true);
  };
  
  const submitAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a dateTime string from the date and time inputs
    const dateTimeString = `${formData.match_date}T${formData.match_time}:00`;
    
    // Create new match object
    const newMatch: Match = {
      match_id: allMatches.length + 1,
      team1_id: parseInt(formData.team1_id),
      team2_id: parseInt(formData.team2_id),
      match_date: dateTimeString,
      stadium_id: parseInt(formData.stadium_id),
      ticket_price: parseInt(formData.ticket_price),
      team1: teams.find(team => team.team_id === parseInt(formData.team1_id)),
      team2: teams.find(team => team.team_id === parseInt(formData.team2_id)),
      stadium: stadiums.find(stadium => stadium.stadium_id === parseInt(formData.stadium_id))
    };
    
    // Add new match to the list
    setAllMatches([...allMatches, newMatch]);
    setIsAddModalOpen(false);
  };
  
  const submitEditMatch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMatch) return;
    
    // Create a dateTime string from the date and time inputs
    const dateTimeString = `${formData.match_date}T${formData.match_time}:00`;
    
    // Update match object
    const updatedMatch: Match = {
      ...selectedMatch,
      team1_id: parseInt(formData.team1_id),
      team2_id: parseInt(formData.team2_id),
      match_date: dateTimeString,
      stadium_id: parseInt(formData.stadium_id),
      ticket_price: parseInt(formData.ticket_price),
      team1: teams.find(team => team.team_id === parseInt(formData.team1_id)),
      team2: teams.find(team => team.team_id === parseInt(formData.team2_id)),
      stadium: stadiums.find(stadium => stadium.stadium_id === parseInt(formData.stadium_id))
    };
    
    // Update matches list
    setAllMatches(allMatches.map(match => 
      match.match_id === selectedMatch.match_id ? updatedMatch : match
    ));
    
    setIsEditModalOpen(false);
  };
  
  const confirmDeleteMatch = () => {
    if (!selectedMatch) return;
    
    // Remove match from the list
    setAllMatches(allMatches.filter(match => match.match_id !== selectedMatch.match_id));
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Matches</h1>
          <button
            onClick={handleAddMatch}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Match
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Ticket Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allMatches.map((match) => {
                  const matchDate = new Date(match.match_date);
                  
                  return (
                    <tr key={match.match_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={match.team1?.logo} alt={match.team1?.team_name} className="h-8 w-8 object-contain" />
                          <span className="mx-2 font-semibold">vs</span>
                          <img src={match.team2?.logo} alt={match.team2?.team_name} className="h-8 w-8 object-contain" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(matchDate, 'MMM d, yyyy')} at {format(matchDate, 'h:mm a')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {match.stadium?.name}, {match.stadium?.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{match.ticket_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditMatch(match)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMatch(match)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add Match Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Add New Match</h2>
            
            <form onSubmit={submitAddMatch}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team 1</label>
                  <select
                    name="team1_id"
                    value={formData.team1_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team 2</label>
                  <select
                    name="team2_id"
                    value={formData.team2_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="date"
                        name="match_date"
                        value={formData.match_date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="time"
                        name="match_time"
                        value={formData.match_time}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      name="stadium_id"
                      value={formData.stadium_id}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Stadium</option>
                      {stadiums.map(stadium => (
                        <option key={stadium.stadium_id} value={stadium.stadium_id}>
                          {stadium.name}, {stadium.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price (₹)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      name="ticket_price"
                      value={formData.ticket_price}
                      onChange={handleInputChange}
                      placeholder="1500"
                      min="0"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                  Add Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Match Modal */}
      {isEditModalOpen && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Edit Match</h2>
            
            <form onSubmit={submitEditMatch}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team 1</label>
                  <select
                    name="team1_id"
                    value={formData.team1_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team 2</label>
                  <select
                    name="team2_id"
                    value={formData.team2_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="date"
                        name="match_date"
                        value={formData.match_date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="time"
                        name="match_time"
                        value={formData.match_time}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      name="stadium_id"
                      value={formData.stadium_id}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Stadium</option>
                      {stadiums.map(stadium => (
                        <option key={stadium.stadium_id} value={stadium.stadium_id}>
                          {stadium.name}, {stadium.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price (₹)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      name="ticket_price"
                      value={formData.ticket_price}
                      onChange={handleInputChange}
                      placeholder="1500"
                      min="0"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Match Modal */}
      {isDeleteModalOpen && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Match</h2>
            
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the match between <span className="font-semibold">{selectedMatch.team1?.team_name}</span> and <span className="font-semibold">{selectedMatch.team2?.team_name}</span>?
            </p>
            
            <p className="text-gray-700 mb-6">
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteMatch}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMatches;