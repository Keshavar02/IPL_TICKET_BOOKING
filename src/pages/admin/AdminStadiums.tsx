import React, { useState } from 'react';
import { Edit, Trash2, MapPin, Users, Plus, Image } from 'lucide-react';
import { stadiums } from '../../data/mockData';
import { Stadium } from '../../types';

const AdminStadiums: React.FC = () => {
  const [allStadiums, setAllStadiums] = useState<Stadium[]>(stadiums);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    image: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddStadium = () => {
    // Reset form data
    setFormData({
      name: '',
      location: '',
      capacity: '',
      image: ''
    });
    setIsAddModalOpen(true);
  };
  
  const handleEditStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    
    // Set form data with selected stadium details
    setFormData({
      name: stadium.name,
      location: stadium.location,
      capacity: stadium.capacity.toString(),
      image: stadium.image || ''
    });
    
    setIsEditModalOpen(true);
  };
  
  const handleDeleteStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setIsDeleteModalOpen(true);
  };
  
  const submitAddStadium = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new stadium object
    const newStadium: Stadium = {
      stadium_id: allStadiums.length + 1,
      name: formData.name,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      image: formData.image
    };
    
    // Add new stadium to the list
    setAllStadiums([...allStadiums, newStadium]);
    setIsAddModalOpen(false);
  };
  
  const submitEditStadium = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStadium) return;
    
    // Update stadium object
    const updatedStadium: Stadium = {
      ...selectedStadium,
      name: formData.name,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      image: formData.image
    };
    
    // Update stadiums list
    setAllStadiums(allStadiums.map(stadium => 
      stadium.stadium_id === selectedStadium.stadium_id ? updatedStadium : stadium
    ));
    
    setIsEditModalOpen(false);
  };
  
  const confirmDeleteStadium = () => {
    if (!selectedStadium) return;
    
    // Remove stadium from the list
    setAllStadiums(allStadiums.filter(stadium => stadium.stadium_id !== selectedStadium.stadium_id));
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Stadiums</h1>
          <button
            onClick={handleAddStadium}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Stadium
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allStadiums.map(stadium => (
            <div key={stadium.stadium_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${stadium.image || 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg'})` }}
              >
                <div className="h-full bg-gradient-to-t from-blue-900/80 to-transparent p-4 flex items-end">
                  <h2 className="text-white font-bold text-xl">{stadium.name}</h2>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-900" />
                    <span>{stadium.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-900" />
                    <span>Capacity: {stadium.capacity.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditStadium(stadium)}
                    className="p-2 text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteStadium(stadium)}
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
      
      {/* Add Stadium Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Add New Stadium</h2>
            
            <form onSubmit={submitAddStadium}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Wankhede Stadium"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="33000"
                      min="0"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Image URL</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/stadium.jpg"
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
                  Add Stadium
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Stadium Modal */}
      {isEditModalOpen && selectedStadium && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Edit Stadium</h2>
            
            <form onSubmit={submitEditStadium}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Wankhede Stadium"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="33000"
                      min="0"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Image URL</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/stadium.jpg"
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
      
      {/* Delete Stadium Modal */}
      {isDeleteModalOpen && selectedStadium && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Stadium</h2>
            
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete <span className="font-semibold">{selectedStadium.name}</span>?
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
                onClick={confirmDeleteStadium}
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

export default AdminStadiums;