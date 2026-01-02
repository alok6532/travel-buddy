/**
 * TRAVEL BUDDY - HIGH-UTILITY CONTENT COMPONENTS
 * Ready-to-integrate React components for packing, hidden gems, weather, currency
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, X, Plus, Download, CloudDownload, Lightbulb, AlertTriangle,
  Sparkles, ThumbsUp, Bookmark, MapPin, Clock, DollarSign,
  Sun, Cloud, CloudRain, Wind, Droplets, CheckCircle,
  ChevronDown, ChevronUp, TrendingUp, Banknote, Calendar
} from 'lucide-react';

// ============================================
// PACKING CHECKLIST COMPONENT
// ============================================

export const PackingChecklist = ({ destination, tripType, season, darkMode = false }) => {
  const [checklist, setChecklist] = useState(null);
  const [progress, setProgress] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState({});
  
  useEffect(() => {
    // Load appropriate checklist template
    const template = getChecklistTemplate(destination, tripType, season);
    setChecklist(template);
    
    // Expand all categories by default
    const expanded = {};
    template.categories.forEach(cat => {
      expanded[cat.id] = true;
    });
    setExpandedCategories(expanded);
    
    calculateProgress();
  }, [destination, tripType, season]);
  
  const toggleItem = (categoryId, itemId) => {
    setChecklist(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId ? {
          ...cat,
          items: cat.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        } : cat
      )
    }));
    
    // Save to localStorage
    setTimeout(() => {
      localStorage.setItem(`checklist-${destination}`, JSON.stringify(checklist));
      calculateProgress();
    }, 0);
  };
  
  const calculateProgress = () => {
    if (!checklist) return;
    const total = checklist.categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checked = checklist.categories.reduce((sum, cat) => 
      sum + cat.items.filter(i => i.checked).length, 0
    );
    setProgress(Math.round((checked / total) * 100));
  };
  
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const exportPDF = () => {
    // Simple implementation - you can enhance with a PDF library
    const content = generateChecklistText(checklist);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination}-packing-list.txt`;
    a.click();
  };
  
  if (!checklist) return <ChecklistSkeleton />;
  
  return (
    <div className={`packing-checklist ${darkMode ? 'dark' : ''}`}>
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold mb-2">{checklist.destination} Packing List</h2>
        <p className="text-blue-100 mb-4">
          {checklist.tripType} • {checklist.season} • {checklist.duration}
        </p>
        
        {/* Progress Bar */}
        <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-blue-100">
          {progress}% Complete • {Math.ceil((100 - progress) * checklist.totalItems / 100)} items remaining
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 p-4 bg-gray-50 border-b">
        <button 
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button 
          onClick={() => {
            localStorage.setItem(`checklist-${destination}`, JSON.stringify(checklist));
            alert('Saved for offline use!');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
          <CloudDownload className="w-4 h-4" />
          Save Offline
        </button>
      </div>
      
      {/* Categories */}
      <div className="p-4 space-y-4">
        {checklist.categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">{getCategoryIcon(category.icon)}</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.items.filter(i => i.checked).length} / {category.items.length} packed
                  </p>
                </div>
              </div>
              {expandedCategories[category.id] ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {/* Category Items */}
            {expandedCategories[category.id] && (
              <div className="border-t border-gray-200">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 border-b last:border-0 hover:bg-gray-50 ${
                      item.checked ? 'bg-green-50' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(category.id, item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        item.checked 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300 hover:border-green-600'
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4 text-white" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          item.checked ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </span>
                        {item.critical && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                            Essential
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Tips Section */}
      {checklist.tips && checklist.tips.length > 0 && (
        <div className="mx-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Pro Tips
          </h3>
          <ul className="space-y-1">
            {checklist.tips.map((tip, idx) => (
              <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Common Mistakes */}
      {checklist.commonMistakes && checklist.commonMistakes.length > 0 && (
        <div className="mx-4 mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Common Mistakes to Avoid
          </h3>
          <ul className="space-y-1">
            {checklist.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✗</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================
// HIDDEN GEMS COMPONENT
// ============================================

export const HiddenGemsSection = ({ destination, darkMode = false }) => {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedGem, setSelectedGem] = useState(null);
  
  useEffect(() => {
    loadHiddenGems(destination);
  }, [destination]);
  
  const loadHiddenGems = (dest) => {
    // Load from mock data or API
    const mockGems = getMockHiddenGems(dest);
    setGems(mockGems);
  };
  
  const upvoteGem = (gemId) => {
    setGems(prev => prev.map(gem => 
      gem.id === gemId ? {
        ...gem,
        engagement: {
          ...gem.engagement,
          upvotes: gem.engagement.upvotes + 1
        }
      } : gem
    ));
  };
  
  const filteredGems = filter === 'all' 
    ? gems 
    : gems.filter(gem => gem.type === filter);
  
  return (
    <div className={`hidden-gems-section ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          Hidden Gems in {destination}
        </h2>
        <p className="text-gray-600">Secret spots discovered by real travelers</p>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'viewpoint', 'cafe', 'trail', 'experience'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Gems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGems.map(gem => (
          <div key={gem.id} className="card-interactive bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative">
              <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                {gem.type}
              </div>
              {gem.verification.verified && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{gem.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{gem.shortDescription}</p>
              
              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{gem.howToReach.distance} from {gem.howToReach.from}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{gem.bestTime.timeOfDay}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{gem.cost.typical}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => upvoteGem(gem.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{gem.engagement.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-sm font-medium">{gem.engagement.saves}</span>
                  </button>
                </div>
                <button
                  onClick={() => setSelectedGem(gem)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gem Detail Modal */}
      {selectedGem && (
        <GemDetailModal 
          gem={selectedGem} 
          onClose={() => setSelectedGem(null)} 
        />
      )}
    </div>
  );
};

// ============================================
// WEATHER WIDGET COMPONENT
// ============================================

export const WeatherWidget = ({ destination, compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchWeatherData(destination);
  }, [destination]);
  
  const fetchWeatherData = async (dest) => {
    // Check cache first
    const cached = localStorage.getItem(`weather-${dest}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < 30 * 60 * 1000) { // 30 minutes
        setWeather(data);
        setLoading(false);
        return;
      }
    }
    
    // Load mock data (replace with actual API call)
    setTimeout(() => {
      const mockData = getMockWeatherData(dest);
      setWeather(mockData);
      
      // Cache for 30 minutes
      localStorage.setItem(`weather-${dest}`, JSON.stringify({
        data: mockData,
        timestamp: Date.now()
      }));
      
      setLoading(false);
    }, 500);
  };
  
  if (loading) return <div className="animate-pulse bg-gray-200 h-40 rounded-lg" />;
  if (!weather) return null;
  
  if (compact) {
    return (
      <div className="weather-widget-compact bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.current.temperature}°C</div>
            <div className="text-sm text-blue-100">{weather.current.condition}</div>
          </div>
          <Sun className="w-12 h-12" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="weather-widget bg-white rounded-lg shadow-lg p-6">
      {/* Current Weather */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Current Weather</h3>
        
        <div className="flex items-center gap-6 mb-4">
          <Sun className="w-16 h-16 text-yellow-500" />
          <div>
            <div className="text-4xl font-bold text-gray-900">
              {weather.current.temperature}°C
            </div>
            <div className="text-gray-600">
              Feels like {weather.current.feelsLike}°C
            </div>
            <div className="text-lg text-gray-700 mt-1">
              {weather.current.condition}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <Wind className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Wind</div>
            <div className="font-semibold">{weather.current.windSpeed} km/h</div>
          </div>
          <div className="text-center">
            <Droplets className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Humidity</div>
            <div className="font-semibold">{weather.current.humidity}%</div>
          </div>
          <div className="text-center">
            <Sun className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <div className="text-sm text-gray-600">UV</div>
            <div className="font-semibold">{weather.current.uvIndex}</div>
          </div>
        </div>
      </div>
      
      {/* Best Time to Visit */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-bold text-green-900 mb-2">Best Time to Visit</h4>
        <p className="text-sm text-green-800">
          {weather.seasonal.bestMonths.join(', ')} • {weather.seasonal.reasonToVisit.summer}
        </p>
      </div>
    </div>
  );
};

// ============================================
// CURRENCY WIDGET COMPONENT
// ============================================

export const CurrencyWidget = ({ destination, userCurrency = 'USD' }) => {
  const [currency, setCurrency] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState('midRange');
  
  useEffect(() => {
    fetchCurrencyData(destination, userCurrency);
  }, [destination, userCurrency]);
  
  const fetchCurrencyData = async (dest, curr) => {
    // Load mock data (replace with actual API call)
    setTimeout(() => {
      const mockData = getMockCurrencyData(dest, curr);
      setCurrency(mockData);
    }, 300);
  };
  
  if (!currency) return <div className="animate-pulse bg-gray-200 h-60 rounded-lg" />;
  
  const budget = currency.dailyCosts[selectedBudget];
  
  return (
    <div className="currency-widget bg-white rounded-lg shadow-lg p-6">
      {/* Exchange Rate */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Currency</h3>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">1 {userCurrency} =</div>
            <div className="text-3xl font-bold text-gray-900">
              ₹{currency.exchangeRate.inverseRate.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily Budget */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 mb-3">Daily Budget</h4>
        
        {/* Budget Selector */}
        <div className="flex gap-2 mb-4">
          {['budget', 'midRange', 'luxury'].map(level => (
            <button
              key={level}
              onClick={() => setSelectedBudget(level)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                selectedBudget === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level === 'budget' && 'Budget'}
              {level === 'midRange' && 'Mid-Range'}
              {level === 'luxury' && 'Luxury'}
            </button>
          ))}
        </div>
        
        {/* Budget Breakdown */}
        <div className="space-y-3">
          {Object.entries(budget).map(([key, value]) => {
            if (key === 'total') return null;
            return (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-xs text-gray-500">{value.description}</div>
                </div>
                <div className="font-bold text-gray-900">
                  {userCurrency === 'INR' ? `₹${value.inr}` : `$${value.usd}`}
                </div>
              </div>
            );
          })}
          
          <div className="pt-3 border-t flex items-center justify-between">
            <div className="font-bold text-gray-900">Total per Day</div>
            <div className="text-2xl font-bold text-blue-600">
              {userCurrency === 'INR' 
                ? `₹${budget.total.inr}` 
                : `$${budget.total.usd}`}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cash Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
          <Banknote className="w-5 h-5" />
          Cash Tips
        </h5>
        <ul className="space-y-1">
          {currency.cashTips.slice(0, 3).map((tip, idx) => (
            <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================
// HELPER FUNCTIONS & MOCK DATA
// ============================================

const getCategoryIcon = (icon) => {
  const icons = {
    shield: '🛡️',
    layers: '👕',
    shoe: '👟',
    backpack: '🎒',
    'first-aid': '⚕️',
    battery: '🔋',
    more: '📦'
  };
  return icons[icon] || '📦';
};

const generateChecklistText = (checklist) => {
  let text = `${checklist.destination} Packing List\n`;
  text += `${checklist.tripType} • ${checklist.season}\n\n`;
  
  checklist.categories.forEach(cat => {
    text += `\n${cat.name}:\n`;
    cat.items.forEach(item => {
      text += `  ${item.checked ? '✓' : '☐'} ${item.name}\n`;
    });
  });
  
  return text;
};

// Mock data functions - replace with actual API calls
const getChecklistTemplate = (destination, tripType, season) => {
  // Return mock checklist template
  return {
    id: "himalayan-trek-winter",
    destination: destination,
    tripType: tripType,
    season: season,
    duration: "7-14 days",
    totalItems: 25,
    categories: [
      {
        id: "essentials",
        name: "Essential Documents",
        icon: "shield",
        items: [
          {
            id: "passport",
            name: "Passport / ID",
            checked: false,
            critical: true,
            notes: "Keep photocopies separate"
          },
          {
            id: "cash",
            name: "Cash (₹5,000-10,000)",
            checked: false,
            critical: true,
            notes: "ATMs rare in mountains"
          }
        ]
      },
      {
        id: "clothing",
        name: "Clothing",
        icon: "layers",
        items: [
          {
            id: "jacket",
            name: "Waterproof Jacket",
            checked: false,
            critical: true,
            notes: "Gore-Tex or similar"
          },
          {
            id: "layers",
            name: "Thermal Layers (2-3 sets)",
            checked: false,
            critical: true,
            notes: "Merino wool preferred"
          }
        ]
      }
    ],
    tips: [
      "Break in your boots 2 weeks before",
      "Pack layers - temperature swings 20°C daily",
      "Download offline maps before you go"
    ],
    commonMistakes: [
      "Wearing cotton (stays wet)",
      "New boots (guaranteed blisters)",
      "Overpacking (you'll regret every extra kg)"
    ]
  };
};

const getMockHiddenGems = (destination) => {
  return [
    {
      id: "gem-001",
      destination: destination,
      type: "viewpoint",
      name: "Sunrise Point Trail",
      shortDescription: "Watch sunrise paint the valley golden, zero tourists",
      howToReach: {
        from: "Main Market",
        distance: "2.5km",
        transportation: "Walk"
      },
      bestTime: {
        timeOfDay: "5:30 AM - 6:30 AM"
      },
      cost: {
        typical: "Free"
      },
      verification: {
        verified: true
      },
      engagement: {
        upvotes: 87,
        saves: 54
      }
    }
  ];
};

const getMockWeatherData = (destination) => {
  return {
    current: {
      temperature: 12,
      feelsLike: 10,
      condition: "Clear",
      humidity: 45,
      windSpeed: 8,
      uvIndex: 6
    },
    seasonal: {
      bestMonths: ["May", "June", "September", "October"],
      reasonToVisit: {
        summer: "Pleasant weather, all passes open"
      }
    }
  };
};

const getMockCurrencyData = (destination, userCurrency) => {
  return {
    exchangeRate: {
      rate: 0.012,
      inverseRate: 83.5
    },
    dailyCosts: {
      budget: {
        accommodation: { inr: 500, usd: 6, description: "Hostel dorm" },
        food: { inr: 300, usd: 4, description: "Local eateries" },
        transport: { inr: 200, usd: 2.50, description: "Shared taxis" },
        activities: { inr: 500, usd: 6, description: "Entries" },
        total: { inr: 1500, usd: 18 }
      },
      midRange: {
        accommodation: { inr: 2000, usd: 24, description: "Guesthouse" },
        food: { inr: 800, usd: 10, description: "Mix local/touristy" },
        transport: { inr: 1000, usd: 12, description: "Private taxi" },
        activities: { inr: 1500, usd: 18, description: "Tours" },
        total: { inr: 5300, usd: 64 }
      },
      luxury: {
        accommodation: { inr: 8000, usd: 96, description: "Hotel" },
        food: { inr: 2000, usd: 24, description: "Restaurants" },
        transport: { inr: 3000, usd: 36, description: "Private car" },
        activities: { inr: 5000, usd: 60, description: "Guided tours" },
        total: { inr: 18000, usd: 216 }
      }
    },
    cashTips: [
      "ATMs available in town only",
      "Many places cash-only",
      "Carry ₹500 and ₹100 notes"
    ]
  };
};

const ChecklistSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4">
    <div className="h-32 bg-gray-200 rounded-lg" />
    <div className="h-20 bg-gray-200 rounded-lg" />
    <div className="h-20 bg-gray-200 rounded-lg" />
  </div>
);

const GemDetailModal = ({ gem, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{gem.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-4">{gem.shortDescription}</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">How to Reach</h3>
            <p className="text-gray-700">{gem.howToReach.distance} from {gem.howToReach.from}</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Best Time</h3>
            <p className="text-gray-700">{gem.bestTime.timeOfDay}</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Cost</h3>
            <p className="text-gray-700">{gem.cost.typical}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
