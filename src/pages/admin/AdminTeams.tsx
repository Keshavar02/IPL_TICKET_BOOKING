import React, { useState } from 'react';
import { Edit, Trash2, User, Users, Plus, Image } from 'lucide-react';
import { teams } from '../../data/mockData';
import { Team } from '../../types';

const AdminTeams: React.FC = () => {
  const [allTeams, setAllTeams] = useState<Team[]>(teams);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    team_name: '',
    coach: '',
    captain: '',
    logo: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddTeam = () => {
    // Reset form data
    setFormData({
      team_name: '',
      coach: '',
      captain: '',
      logo: ''
    });
    setIsAddModalOpen(true);
  };
  
  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    
    // Set form data with selected team details
    setFormData({
      team_name: team.team_name,
      coach: team.coach || '',
      captain: team.captain || '',
      logo: team.logo || ''
    });
    
    setIsEditModalOpen(true);
  };
  
  const handleDeleteTeam = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };
  
  const submitAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new team object
    const newTeam: Team = {
      team_id: allTeams.length + 1,
      team_name: formData.team_name,
      coach: formData.coach,
      captain: formData.captain,
      logo: formData.logo
    };
    
    // Add new team to the list
    setAllTeams([...allTeams, newTeam]);
    setIsAddModalOpen(false);
  };
  
  const submitEditTeam = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeam) return;
    
    // Update team object
    const updatedTeam: Team = {
      ...selectedTeam,
      team_name: formData.team_name,
      coach: formData.coach,
      captain: formData.captain,
      logo: formData.logo
    };
    
    // Update teams list
    setAllTeams(allTeams.map(team => 
      team.team_id === selectedTeam.team_id ? updatedTeam : team
    ));
    
    setIsEditModalOpen(false);
  };
  
  const confirmDeleteTeam = () => {
    if (!selectedTeam) return;
    
    // Remove team from the list
    setAllTeams(allTeams.filter(team => team.team_id !== selectedTeam.team_id));
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Teams</h1>
          <button
            onClick={handleAddTeam}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Team
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTeams.map(team => (
            <div key={team.team_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {team.logo ? (
                    <img src={team.logo} alt={team.team_name} className="w-20 h-20 object-contain" />
                  ) : (
                    <Users className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-blue-900 mb-2">{team.team_name}</h2>
                
                <div className="space-y-2 mb-4 w-full">
                  <div className="flex items-center justify-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-blue-900" />
                    <span>Coach: {team.coach || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-900" />
                    <span>Captain: {team.captain || 'Not specified'}</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => handleEditTeam(team)}
                    className="p-2 text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team)}
                    className="p-2 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Team Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Add New Team</h2>
            
            <form onSubmit={submitAddTeam}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleInputChange}
                    placeholder="Mumbai Indians"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="coach"
                      value={formData.coach}
                      onChange={handleInputChange}
                      placeholder="Mahela Jayawardene"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Captain</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="captain"
                      value={formData.captain}
                      onChange={handleInputChange}
                      placeholder="Rohit Sharma"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Logo URL</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="url"
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      placeholder="https://example.com/logo.png"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Team Modal */}
      {isEditModalOpen && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Edit Team</h2>
            
            <form onSubmit={submitEditTeam}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleInputChange}
                    placeholder="Mumbai Indians"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="coach"
                      value={formData.coach}
                      onChange={handleInputChange}
                      placeholder="Mahela Jayawardene"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Captain</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="captain"
                      value={formData.captain}
                      onChange={handleInputChange}
                      placeholder="Rohit Sharma"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Logo URL</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="url"
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      placeholder="https://example.com/logo.png"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
      
      {/* Delete Team Modal */}
      {isDeleteModalOpen && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Team</h2>
            
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete <span className="font-semibold">{selectedTeam.team_name}</span>?
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
                onClick={confirmDeleteTeam}
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

export default AdminTeams;