import React, { useState } from 'react';
import { Globe, Search, MapPin, Calendar, Users } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">TravelBuddy</h1>
            </div>
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('explore')}
                className={`${activeTab === 'explore' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'} pb-1 font-medium`}
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab('mytrips')}
                className={`${activeTab === 'mytrips' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'} pb-1 font-medium`}
              >
                My Trips
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'} pb-1 font-medium`}
              >
                Profile
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Travel Companion</h2>
          <p className="text-gray-600 mb-6">Discover amazing trips and connect with fellow travelers</p>
          
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Trip Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ladakh Bike Expedition</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Leh, Nubra Valley</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Jun 10 - Jun 24, 2026</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">3/6 spots filled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">₹35,000</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Sample Trip Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-orange-400 to-pink-600"></div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Goa Beach Retreat</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">North Goa, South Goa</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Dec 20 - Dec 30, 2025</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">2/4 spots filled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">₹15,000</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Sample Trip Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-600"></div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rajasthan Heritage Tour</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Jaipur, Udaipur, Jodhpur</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Feb 5 - Feb 20, 2026</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">1/5 spots filled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">₹28,000</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
