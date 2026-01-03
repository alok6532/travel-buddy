import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, DollarSign, Globe, Heart, MessageCircle, User, Plus, Filter, Shield, AlertTriangle, Clock, Edit, Trash2, Check, X, Package, Cloud, CloudRain, Wind, Sun, CloudSnow, AlertCircle, Send, Pin, BarChart3, Crown, UserCheck, Reply, Sparkles, Zap, Target, TrendingUp, Lightbulb, RefreshCw, Settings, BookOpen, Image, Video, Bookmark, Folder, Eye, ThumbsUp, Share2, ArrowRight, TrendingDown, TrendingUp as TrendUp, PieChart, FileText, Award, Tag, ChevronRight, Map, List, Grid, Sliders, ZoomIn, ZoomOut, Maximize2, RotateCcw, Star, Flame, Loader, UserPlus, Lock, Unlock, MessageSquare, TrendingUp as Trending, Medal, Trophy, CheckCircle, UserMinus, Bell, Flag, XCircle, Mountain, Download, Wifi, WifiOff, Moon, Monitor, Smartphone, Zap as Lightning, Coins, CreditCard, ArrowDownToLine, RefreshCcw, Menu } from 'lucide-react';


const TravelCompanionApp = () => {
  // Ref for search results section
  const searchResultsRef = useRef(null);
  // Ref for trips section (for auto-scroll when category filters change)
  const tripsSectionRef = useRef(null);
  
  // Debug - log when component mounts
  useEffect(() => {
    console.log('TravelCompanionApp mounted!');
  }, []);
  
  // Scroll to top on page load/refresh - more robust method
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try after a small delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    tripType: 'all',
    budget: 'all',
    duration: 'all',
    activities: [],
    languages: [],
    minRating: 0
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [tripSpots, setTripSpots] = useState({
    1: { total: 6, filled: 3 },
    2: { total: 4, filled: 2 },
    3: { total: 5, filled: 1 },
    4: { total: 4, filled: 2 },
    5: { total: 6, filled: 4 },
    6: { total: 4, filled: 1 },
    7: { total: 5, filled: 2 },
    8: { total: 3, filled: 0 }
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageSearch, setLanguageSearch] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // date, price-low, price-high, rating
  const [showFilters, setShowFilters] = useState(false);
  const [showTripPostForm, setShowTripPostForm] = useState(false);
  const [showMemberReviewForm, setShowMemberReviewForm] = useState(false);
  const [selectedMemberToReview, setSelectedMemberToReview] = useState(null);
  const [showExpenseTracker, setShowExpenseTracker] = useState(false);
  const [selectedTripForExpenses, setSelectedTripForExpenses] = useState(null);
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
    email: '',
    relation: ''
  });
  
  // Verification & Safety States
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState('choose'); // choose, id-upload, email-verify
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    verified: false,
    idVerified: false,
    emailVerified: false,
    universityEmail: false,
    trustScore: 65,
    tripsCompleted: 3,
    joinDate: "Jan 2024",
    rating: 4.5,
    reviewCount: 3
  });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportedUser, setReportedUser] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [showEmergencyContactForm, setShowEmergencyContactForm] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [selectedIdFile, setSelectedIdFile] = useState(null);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [sentVerificationCode, setSentVerificationCode] = useState(false);
  const [showProfileScoreInfo, setShowProfileScoreInfo] = useState(false);
  
  // Expense tracking state
  const [expenses, setExpenses] = useState({});
  
  // Trip Planning & Logistics state
  const [showLogistics, setShowLogistics] = useState(false);
  const [selectedTripForLogistics, setSelectedTripForLogistics] = useState(null);
  const [logisticsTab, setLogisticsTab] = useState('itinerary'); // itinerary, expenses, packing, weather
  
  // Itinerary state
  const [itineraries, setItineraries] = useState({});
  const [editingActivity, setEditingActivity] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  
  // Enhanced expense state for logistics
  const [tripExpenses, setTripExpenses] = useState({});
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  
  // Packing list state
  const [packingLists, setPackingLists] = useState({});
  const [showPackingForm, setShowPackingForm] = useState(false);
  
  // Weather state
  const [weatherData, setWeatherData] = useState({});
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  
  // Communication & Coordination state
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [selectedTripForChat, setSelectedTripForChat] = useState(null);
  const [tripMessages, setTripMessages] = useState({});
  const [tripRoles, setTripRoles] = useState({});
  const [pinnedMessages, setPinnedMessages] = useState({});
  const [polls, setPolls] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [showPollForm, setShowPollForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  
  // Language preferences state
  const [userLanguages, setUserLanguages] = useState(['English', 'Hindi']); // Current user's languages
  
  // AI Smart Features state
  const [userPreferences, setUserPreferences] = useState({
    interests: ['Trekking', 'Photography', 'Cultural Tours'],
    budgetRange: { min: 10000, max: 50000 },
    pace: 'moderate', // relaxed, moderate, fast
    tripDuration: 'week', // weekend, week, 2weeks
    preferredDestinations: ['Mountains', 'Beaches'],
    travelStyle: 'adventure' // adventure, leisure, cultural, party
  });
  const [viewedTrips, setViewedTrips] = useState([1, 2, 3]); // Trip IDs user has viewed
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [showAiItineraryBuilder, setShowAiItineraryBuilder] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [compatibilityScores, setCompatibilityScores] = useState({});
  const [showCompatibilityScore, setShowCompatibilityScore] = useState(true); // User privacy control
  const [aiPreferencesVisible, setAiPreferencesVisible] = useState(false);
  
  // Experience Sharing & Inspiration States
  const [tripStories, setTripStories] = useState([]);
  const [showStoryEditor, setShowStoryEditor] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [savedItems, setSavedItems] = useState({
    trips: [],
    stories: [],
    itineraries: []
  });
  const [bookmarkFolders, setBookmarkFolders] = useState([
    { id: 1, name: 'Future Trips', items: [] },
    { id: 2, name: 'Budget Ideas', items: [] },
    { id: 3, name: 'Dream Destinations', items: [] }
  ]);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [beforeAfterData, setBeforeAfterData] = useState({});
  const [showBeforeAfterModal, setShowBeforeAfterModal] = useState(false);
  const [selectedTripForComparison, setSelectedTripForComparison] = useState(null);
  const [storyFilters, setStoryFilters] = useState({
    destination: '',
    budgetRange: 'all',
    duration: 'all',
    sortBy: 'recent' // recent, popular, budget-low, budget-high
  });
  const [showCostAnalytics, setShowCostAnalytics] = useState(false);
  const [selectedTripForAnalytics, setSelectedTripForAnalytics] = useState(null);
  
  // Search, Filters & Discovery States
  const [viewMode, setViewMode] = useState('list'); // list, map, calendar
  const [advancedFilters, setAdvancedFilters] = useState({
    budgetRange: { min: 0, max: 100000, enabled: false },
    groupSize: { min: 1, max: 10, enabled: false },
    ageRange: { min: 18, max: 60, enabled: false },
    pace: [], // ['relaxed', 'moderate', 'fast']
    duration: { min: 1, max: 30, enabled: false }, // in days
    tripTypes: [], // multi-select
    verificationLevel: {
      idVerified: false,
      emailVerified: false,
      highTrustScore: false // >= 80
    },
    availability: 'all' // all, available, last-few-slots
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // India center
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedMapTrip, setSelectedMapTrip] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [discoverySection, setDiscoverySection] = useState('trending'); // trending, recent, high-rated, personalized
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [filterSticky, setFilterSticky] = useState(false);
  
  // Community & Growth States
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]); // Community IDs user has joined
  const [communityPosts, setCommunityPosts] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [isMentor, setIsMentor] = useState(false);
  const [mentorApplications, setMentorApplications] = useState([]);
  const [showMentorApplication, setShowMentorApplication] = useState(false);
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [badgeProgress, setBadgeProgress] = useState({});
  const [leaderboard, setLeaderboard] = useState({
    topContributors: [],
    risingMentors: [],
    communityLeaders: []
  });
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  
  // Convenience & Accessibility States
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState({});
  const [downloadedTrips, setDownloadedTrips] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lowDataMode, setLowDataMode] = useState(() => {
    const saved = localStorage.getItem('lowDataMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem('preferredCurrency') || 'INR';
  });
  const [exchangeRates, setExchangeRates] = useState({
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AUD: 0.018,
    CAD: 0.016,
    SGD: 0.016,
    AED: 0.044,
    JPY: 1.76,
    CNY: 0.086
  });
  const [lastRateUpdate, setLastRateUpdate] = useState(new Date().toISOString());
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const availableLanguages = [
    'English', 'Hindi', 'Spanish', 'French', 'Chinese', 'Russian', 
    'Japanese', 'Arabic', 'German', 'Italian', 'Bengali', 'Tamil', 
    'Telugu', 'Korean', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam'
  ];
  
  const availableActivities = [
    'Trekking', 'Hiking', 'Biking', 'Skiing', 'Snowboarding',
    'Scuba Diving', 'Snorkeling', 'Surfing', 'Kayaking', 'Rafting',
    'Rock Climbing', 'Paragliding', 'Camping', 'Wildlife Safari',
    'Cultural Tours', 'Food Tours', 'Photography', 'Yoga & Meditation',
    'Beach Activities', 'City Exploration', 'Shopping', 'Nightlife',
    'Historical Sites', 'Temple Visits', 'Mountain Biking', 'Road Trip'
  ];
  const [reviews, setReviews] = useState([
    {
      id: 1,
      tripId: 1,
      tripName: "Ladakh Bike Expedition",
      reviewer: "Arjun Mehta",
      reviewerAvatar: "AM",
      leader: "Rohan Kumar",
      leaderAvatar: "RK",
      rating: 5,
      date: "Nov 2024",
      review: "Rohan was an exceptional trip leader! His knowledge of the terrain and local culture made the experience unforgettable. He ensured everyone's safety and comfort throughout the journey. Highly recommend traveling with him!",
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"]
    },
    {
      id: 2,
      tripId: 2,
      tripName: "Goa Beach Retreat",
      reviewer: "Sneha Kapoor",
      reviewerAvatar: "SK",
      leader: "Priya Sharma",
      leaderAvatar: "PS",
      rating: 4,
      date: "Dec 2024",
      review: "Priya organized everything perfectly - from accommodations to beach activities. Great communication and fun personality. Only minor issue was some timing delays, but overall a fantastic trip!",
      images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop"]
    },
    {
      id: 3,
      tripId: 3,
      tripName: "Rajasthan Heritage Tour",
      reviewer: "Karthik Reddy",
      reviewerAvatar: "KR",
      leader: "Amit Singh",
      leaderAvatar: "AS",
      rating: 5,
      date: "Oct 2024",
      review: "Amit's passion for Rajasthani history and culture really shone through. He took us to amazing local spots that tourists usually miss. Professional, friendly, and knowledgeable - 10/10 would travel with him again!",
      images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=200&fit=crop"]
    },
    {
      id: 4,
      tripId: 4,
      tripName: "Kerala Backwaters & Hills",
      reviewer: "Deepika Nair",
      reviewerAvatar: "DN",
      leader: "Anjali Menon",
      leaderAvatar: "AM",
      rating: 5,
      date: "Sep 2024",
      review: "Anjali made this trip absolutely magical! Her local connections got us the best houseboat and authentic Kerala meals. She's organized, caring, and made sure everyone had an amazing time. Best trip ever!",
      images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop"]
    }
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [messages, setMessages] = useState([
    { id: 1, from: "Rohan Kumar", message: "Hey! Are you interested in the Ladakh trip?", time: "10:30 AM", avatar: "RK", unread: true },
    { id: 2, from: "Priya Sharma", message: "The Goa trip sounds amazing! When do we leave?", time: "Yesterday", avatar: "PS", unread: true },
    { id: 3, from: "Amit Singh", message: "Thanks for joining the Rajasthan tour!", time: "2 days ago", avatar: "AS", unread: false }
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, from: "Rohan Kumar", message: "Hey! Are you interested in the Ladakh trip?", time: "10:30 AM", isMe: false },
    { id: 2, from: "Me", message: "Yes! It looks amazing. What's the bike rental situation?", time: "10:35 AM", isMe: true },
    { id: 3, from: "Rohan Kumar", message: "We're getting Royal Enfields from a trusted dealer in Leh. All included in the price!", time: "10:40 AM", isMe: false },
    { id: 4, from: "Me", message: "Perfect! I'm definitely interested. How many people have confirmed so far?", time: "10:45 AM", isMe: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [memories, setMemories] = useState([
    {
      id: 1,
      user: "Rohan Kumar",
      avatar: "RK",
      trip: "Ladakh Bike Expedition",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      caption: "Day 3: Reached Pangong Lake! The view is absolutely breathtaking 🏔️",
      likes: 45,
      comments: 12,
      time: "2 hours ago"
    },
    {
      id: 2,
      user: "Priya Sharma",
      avatar: "PS",
      trip: "Goa Beach Retreat",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      caption: "Sunset at Palolem Beach 🌅 Best decision to join this trip!",
      likes: 67,
      comments: 18,
      time: "5 hours ago"
    },
    {
      id: 3,
      user: "Amit Singh",
      avatar: "AS",
      trip: "Rajasthan Heritage Tour",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
      caption: "Exploring the majestic Amber Fort in Jaipur 🏰 Rich history everywhere!",
      likes: 52,
      comments: 9,
      time: "1 day ago"
    },
    {
      id: 4,
      user: "Anjali Menon",
      avatar: "AM",
      trip: "Kerala Backwaters & Hills",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
      caption: "Houseboat life in Alleppey ⛵ So peaceful and beautiful!",
      likes: 78,
      comments: 15,
      time: "1 day ago"
    },
    {
      id: 5,
      user: "Vikram Malhotra",
      avatar: "VM",
      trip: "Himachal Trekking Adventure",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
      caption: "Made it to Kheerganga! The hot springs after the trek = heaven 🔥",
      likes: 91,
      comments: 21,
      time: "2 days ago"
    },
    {
      id: 6,
      user: "Neha Reddy",
      avatar: "NR",
      trip: "Andaman Islands Diving Trip",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      caption: "Scuba diving at Havelock! Saw so many colorful fish and coral 🐠🐙",
      likes: 103,
      comments: 24,
      time: "3 days ago"
    }
  ]);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Trip Blog Posts - detailed post-trip experiences
  const [tripPosts, setTripPosts] = useState([
    {
      id: 1,
      tripId: 1,
      tripName: "Ladakh Bike Expedition",
      author: "Rohan Kumar",
      authorAvatar: "RK",
      date: "Nov 15, 2024",
      rating: 5,
      summary: "An unforgettable journey through the highest motorable roads in the world",
      description: "This 14-day adventure was truly life-changing. From the moment we started in Leh, every day brought new challenges and breathtaking views. The camaraderie among our group made even the toughest climbs enjoyable. Khardung La Pass was an absolute highlight!",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
      ],
      expenses: {
        accommodation: 8000,
        transport: 12000,
        food: 6000,
        activities: 4000,
        misc: 5000,
        total: 35000
      },
      tips: [
        "Book your bike rentals in advance",
        "Acclimatize properly in Leh for 2 days minimum",
        "Carry basic medications for altitude sickness",
        "Pack warm clothes even in summer"
      ],
      likes: 156,
      comments: []
    }
  ]);

  const trips = [
    {
      id: 1,
      title: "Ladakh Bike Expedition",
      destination: "Leh, Nubra Valley, Pangong Lake",
      host: { 
        name: "Rohan Kumar", 
        age: 28, 
        avatar: "RK", 
        rating: 4.8, 
        reviewCount: 12,
        verified: true,
        idVerified: true,
        emailVerified: true,
        trustScore: 95,
        tripsCompleted: 12,
        responseRate: 98,
        responseTime: "within 1 hour"
      },
      dates: "Jun 10 - Jun 24, 2026",
      duration: "2 weeks",
      budget: "Mid-range",
      pricePerPerson: "₹35,000",
      spots: { total: 6, filled: 3 },
      type: "Adventure",
      minTrustScore: 80, // Minimum profile score required to join
      activities: ['Biking', 'Camping', 'Photography', 'Cultural Tours'],
      languages: ['English', 'Hindi'],
      rating: 4.7,
      reviewCount: 8,
      description: "Epic bike trip through the highest motorable roads. Explore monasteries, valleys, and stunning landscapes!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 25, max: 40 },
      groupSize: { current: 3, max: 6 },
      pace: "Moderate"
    },
    {
      id: 2,
      title: "Goa Beach Retreat",
      destination: "North Goa, South Goa",
      host: { 
        name: "Priya Sharma", 
        age: 25, 
        avatar: "PS", 
        rating: 4.6, 
        reviewCount: 15,
        verified: true,
        idVerified: false,
        emailVerified: true,
        trustScore: 88,
        tripsCompleted: 8,
        responseRate: 95,
        responseTime: "within 2 hours"
      },
      dates: "Dec 20 - Dec 30, 2025",
      duration: "10 days",
      budget: "Budget",
      pricePerPerson: "₹15,000",
      spots: { total: 4, filled: 2 },
      type: "Beach",
      activities: ['Beach Activities', 'Surfing', 'Nightlife', 'Food Tours'],
      languages: ['English', 'Hindi', 'Marathi'],
      rating: 4.5,
      reviewCount: 6,
      description: "Chill beach vibes, water sports, beach shacks, and amazing seafood. Perfect year-end getaway!",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 22, max: 35 },
      groupSize: { current: 2, max: 4 },
      pace: "Relaxed"
    },
    {
      id: 3,
      title: "Rajasthan Heritage Tour",
      destination: "Jaipur, Udaipur, Jodhpur, Jaisalmer",
      host: { 
        name: "Amit Singh", 
        age: 32, 
        avatar: "AS", 
        rating: 4.9, 
        reviewCount: 20,
        verified: true,
        idVerified: true,
        emailVerified: true,
        trustScore: 98,
        tripsCompleted: 20,
        responseRate: 99,
        responseTime: "within 30 min"
      },
      dates: "Feb 5 - Feb 20, 2026",
      duration: "2 weeks",
      budget: "Mid-range",
      pricePerPerson: "₹28,000",
      spots: { total: 5, filled: 1 },
      type: "Cultural",
      activities: ['Cultural Tours', 'Historical Sites', 'Photography', 'Food Tours'],
      languages: ['English', 'Hindi', 'Gujarati'],
      rating: 4.8,
      reviewCount: 10,
      description: "Explore majestic forts, palaces, and desert landscapes. Rich culture, heritage, and Rajasthani cuisine.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 25, max: 50 },
      groupSize: { current: 1, max: 5 },
      pace: "Moderate"
    },
    {
      id: 4,
      title: "Kerala Backwaters & Hills",
      destination: "Alleppey, Munnar, Kochi",
      host: { 
        name: "Anjali Menon", 
        age: 29, 
        avatar: "AM", 
        rating: 4.7, 
        reviewCount: 11,
        verified: true,
        idVerified: true,
        emailVerified: true,
        trustScore: 92,
        tripsCompleted: 11,
        responseRate: 97,
        responseTime: "within 1 hour"
      },
      dates: "Jan 12 - Jan 22, 2026",
      duration: "10 days",
      budget: "Mid-range",
      pricePerPerson: "₹22,000",
      spots: { total: 4, filled: 2 },
      type: "Nature",
      activities: ['Kayaking', 'Hiking', 'Food Tours', 'Photography'],
      languages: ['English', 'Malayalam', 'Hindi'],
      rating: 4.6,
      reviewCount: 7,
      description: "Experience God's Own Country! Houseboat stays, tea plantations, and authentic Kerala cuisine.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 23, max: 45 },
      groupSize: { current: 2, max: 4 },
      pace: "Relaxed"
    },
    {
      id: 5,
      title: "Himachal Trekking Adventure",
      destination: "Kasol, Tosh, Kheerganga",
      host: { 
        name: "Vikram Malhotra", 
        age: 26, 
        avatar: "VM", 
        rating: 4.8, 
        reviewCount: 14,
        verified: true,
        idVerified: false,
        emailVerified: true,
        trustScore: 85,
        tripsCompleted: 14,
        responseRate: 92,
        responseTime: "within 3 hours"
      },
      dates: "Apr 15 - Apr 28, 2026",
      duration: "2 weeks",
      budget: "Budget",
      pricePerPerson: "₹12,000",
      spots: { total: 6, filled: 4 },
      type: "Adventure",
      activities: ['Trekking', 'Camping', 'Photography', 'Yoga & Meditation'],
      languages: ['English', 'Hindi'],
      rating: 4.9,
      reviewCount: 12,
      description: "Trek through scenic Parvati Valley. Mountain views, hot springs, and riverside camping!",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 20, max: 35 },
      groupSize: { current: 4, max: 6 },
      pace: "Challenging"
    },
    {
      id: 6,
      title: "Andaman Islands Diving Trip",
      destination: "Port Blair, Havelock, Neil Island",
      host: { 
        name: "Neha Reddy", 
        age: 27, 
        avatar: "NR", 
        rating: 4.7, 
        reviewCount: 9,
        verified: true,
        idVerified: true,
        emailVerified: true,
        trustScore: 90,
        tripsCompleted: 9,
        responseRate: 94,
        responseTime: "within 2 hours"
      },
      dates: "Mar 10 - Mar 20, 2026",
      duration: "10 days",
      budget: "Luxury",
      pricePerPerson: "₹45,000",
      spots: { total: 4, filled: 1 },
      type: "Beach",
      activities: ['Scuba Diving', 'Snorkeling', 'Beach Activities', 'Photography'],
      languages: ['English', 'Hindi', 'Telugu'],
      rating: 4.8,
      reviewCount: 5,
      description: "Pristine beaches, scuba diving, and crystal clear waters. Paradise for beach and diving lovers!",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 24, max: 40 },
      groupSize: { current: 1, max: 4 },
      pace: "Moderate"
    },
    {
      id: 7,
      title: "Northeast India Explorer",
      destination: "Meghalaya, Sikkim, Darjeeling",
      host: { 
        name: "Karan Bose", 
        age: 30, 
        avatar: "KB", 
        rating: 4.6, 
        reviewCount: 8,
        verified: false,
        idVerified: false,
        emailVerified: true,
        trustScore: 78,
        tripsCompleted: 8,
        responseRate: 88,
        responseTime: "within 4 hours"
      },
      dates: "Oct 1 - Oct 21, 2026",
      duration: "3 weeks",
      budget: "Mid-range",
      pricePerPerson: "₹32,000",
      spots: { total: 5, filled: 2 },
      type: "Nature",
      activities: ['Trekking', 'Photography', 'Cultural Tours', 'Food Tours'],
      languages: ['English', 'Hindi', 'Bengali'],
      rating: 4.7,
      reviewCount: 6,
      description: "Discover the unexplored Northeast! Living root bridges, waterfalls, monasteries, and tea gardens.",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 25, max: 45 },
      groupSize: { current: 2, max: 5 },
      pace: "Moderate"
    },
    {
      id: 8,
      title: "Varanasi Spiritual Journey",
      destination: "Varanasi, Sarnath",
      host: { 
        name: "Divya Iyer", 
        age: 31, 
        avatar: "DI", 
        rating: 4.9, 
        reviewCount: 16,
        verified: true,
        idVerified: true,
        emailVerified: true,
        trustScore: 96,
        tripsCompleted: 16,
        responseRate: 98,
        responseTime: "within 1 hour"
      },
      dates: "Nov 10 - Nov 17, 2026",
      duration: "1 week",
      budget: "Budget",
      pricePerPerson: "₹10,000",
      spots: { total: 3, filled: 0 },
      type: "Cultural",
      activities: ['Cultural Tours', 'Temple Visits', 'Yoga & Meditation', 'Photography'],
      languages: ['English', 'Hindi'],
      rating: 4.8,
      reviewCount: 9,
      description: "Experience the spiritual heart of India. Ganga Aarti, ancient temples, and rich traditions.",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop",
      completed: false,
      ageRange: { min: 22, max: 60 },
      groupSize: { current: 0, max: 3 },
      pace: "Relaxed"
    }
  ];

  // Mock Trip Stories Data
  const mockTripStories = [
    {
      id: 1,
      tripId: 1,
      userId: "user123",
      author: { name: "Rohan Kumar", avatar: "RK", rating: 4.8 },
      title: "Conquering the Himalayas: My Ladakh Bike Journey",
      destination: "Leh, Ladakh",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
      publishedDate: "Oct 15, 2025",
      tripDates: "Jun 10 - Jun 24, 2025",
      duration: "14 days",
      visibility: "public", // public, trip-only, private
      likes: 342,
      bookmarks: 89,
      views: 1250,
      
      sections: {
        introduction: "The journey of a lifetime through the world's highest motorable roads...",
        
        route: {
          enabled: true,
          places: ["Delhi", "Manali", "Leh", "Nubra Valley", "Pangong Lake", "Tso Moriri", "Manali", "Delhi"],
          highlights: "Khardung La Pass, Magnetic Hill, Thiksey Monastery"
        },
        
        budget: {
          enabled: true,
          planned: 35000,
          actual: 38500,
          breakdown: [
            { category: "Transport", planned: 15000, actual: 16000 },
            { category: "Accommodation", planned: 8000, actual: 9000 },
            { category: "Food", planned: 7000, actual: 7500 },
            { category: "Activities", planned: 3000, actual: 4000 },
            { category: "Miscellaneous", planned: 2000, actual: 2000 }
          ],
          perDay: 2750,
          perPerson: 38500
        },
        
        timeline: {
          enabled: true,
          days: [
            { day: 1, title: "Delhi to Manali", activities: "Night bus journey", spending: 1500 },
            { day: 2, title: "Acclimatization in Manali", activities: "Bike check, local sightseeing", spending: 2000 },
            { day: 3, title: "Manali to Jispa", activities: "First ride, Rohtang Pass", spending: 3000 }
            // ... more days
          ]
        },
        
        lessons: {
          enabled: true,
          mistakes: [
            "Underestimated altitude sickness - should have acclimatized longer",
            "Packed too much - half the stuff never used",
            "Didn't book Pangong permits in advance"
          ],
          tips: [
            "Start Diamox 2 days before reaching high altitude",
            "Keep extra cash - ATMs don't work everywhere",
            "Waterproof phone covers are essential",
            "Download offline maps beforehand"
          ],
          wouldDoDifferently: [
            "Spend 3 days in Leh instead of rushing",
            "Carry a proper DSLR camera",
            "Book homestays instead of hotels for authentic experience"
          ]
        },
        
        media: {
          photos: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
            "https://images.unsplash.com/photo-1559044920-ac91e09f4e33?w=600"
          ],
          videos: [] // Optional video URLs
        },
        
        recommendations: {
          enabled: true,
          bestFor: ["Adventure seekers", "Bike enthusiasts", "Photography lovers"],
          notRecommendedFor: ["Altitude-sensitive people", "Comfort travelers"],
          bestTime: "June to September",
          fitnessLevel: "Moderate to High"
        }
      },
      
      comments: 45,
      tags: ["Adventure", "Biking", "Himalaya", "Budget-Friendly"]
    },
    {
      id: 2,
      tripId: 2,
      userId: "user456",
      author: { name: "Priya Sharma", avatar: "PS", rating: 4.6 },
      title: "10 Days of Sun, Sand & Soul in Goa",
      destination: "Goa",
      coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop",
      publishedDate: "Jan 5, 2026",
      tripDates: "Dec 20 - Dec 30, 2025",
      duration: "10 days",
      visibility: "public",
      likes: 198,
      bookmarks: 52,
      views: 687,
      
      sections: {
        introduction: "A perfect blend of beaches, parties, and peaceful moments...",
        
        route: {
          enabled: true,
          places: ["Panjim", "Anjuna", "Vagator", "Palolem", "Agonda"],
          highlights: "Secret beaches, flea markets, sunset parties"
        },
        
        budget: {
          enabled: true,
          planned: 15000,
          actual: 14200,
          breakdown: [
            { category: "Transport", planned: 3000, actual: 2800 },
            { category: "Accommodation", planned: 5000, actual: 4500 },
            { category: "Food", planned: 4000, actual: 4000 },
            { category: "Activities", planned: 2000, actual: 2000 },
            { category: "Miscellaneous", planned: 1000, actual: 900 }
          ],
          perDay: 1420,
          perPerson: 14200
        },
        
        timeline: { enabled: false, days: [] },
        
        lessons: {
          enabled: true,
          mistakes: ["Stayed in expensive North Goa for too long"],
          tips: [
            "South Goa is way cheaper and more peaceful",
            "Rent scooters from local shops, not hotels",
            "Carry sunscreen - Goa sun is brutal"
          ],
          wouldDoDifferently: [
            "Explore more of South Goa beaches",
            "Try local Goan food instead of touristy restaurants"
          ]
        },
        
        media: {
          photos: [
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"
          ],
          videos: []
        },
        
        recommendations: {
          enabled: true,
          bestFor: ["Beach lovers", "Party enthusiasts", "Budget travelers"],
          notRecommendedFor: ["Adventure seekers"],
          bestTime: "November to February",
          fitnessLevel: "Easy"
        }
      },
      
      comments: 23,
      tags: ["Beach", "Relaxation", "Budget-Friendly", "Party"]
    }
  ];

  // Mock Communities Data
  const mockCommunities = [
    {
      id: 1,
      name: "Solo Women Travelers",
      description: "A safe space for women traveling solo to share experiences, tips, and connect with like-minded travelers",
      icon: "👩",
      type: "public", // public, request-to-join, moderated
      memberCount: 1247,
      postCount: 342,
      moderators: ["user123", "user456"],
      tags: ["safety", "women-only", "solo-travel"],
      createdDate: "Jan 2024"
    },
    {
      id: 2,
      name: "PhD & Research Travelers",
      description: "For academics combining research with travel. Share fieldwork tips, conference travel, and connect with scholars",
      icon: "🎓",
      type: "request-to-join",
      memberCount: 523,
      postCount: 178,
      moderators: ["user789"],
      tags: ["academic", "research", "conferences"],
      createdDate: "Mar 2024"
    },
    {
      id: 3,
      name: "Budget Backpackers",
      description: "Travel more, spend less. Share budget hacks, cheap accommodations, and free activities",
      icon: "🎒",
      type: "public",
      memberCount: 2891,
      postCount: 1240,
      moderators: ["user234"],
      tags: ["budget", "backpacking", "money-saving"],
      createdDate: "Dec 2023"
    },
    {
      id: 4,
      name: "Weekend Explorers",
      description: "Quick getaways for busy professionals. Perfect 2-3 day trips and weekend adventure ideas",
      icon: "⏰",
      type: "public",
      memberCount: 1678,
      postCount: 567,
      moderators: ["user567"],
      tags: ["weekend", "short-trips", "quick-getaways"],
      createdDate: "Feb 2024"
    },
    {
      id: 5,
      name: "Trekking Enthusiasts",
      description: "For serious trekkers. Share routes, gear reviews, training tips, and high-altitude experiences",
      icon: "⛰️",
      type: "moderated",
      memberCount: 3456,
      postCount: 2103,
      moderators: ["user890", "user345"],
      tags: ["trekking", "hiking", "mountains"],
      createdDate: "Nov 2023"
    }
  ];

  // Mock Badges System
  const mockBadges = [
    {
      id: 1,
      name: "First Trip Completed",
      description: "Successfully completed your first trip",
      icon: "🎉",
      category: "milestone",
      rarity: "common",
      criteria: { tripsCompleted: 1 }
    },
    {
      id: 2,
      name: "Explorer",
      description: "Completed 5 trips",
      icon: "🧭",
      category: "milestone",
      rarity: "common",
      criteria: { tripsCompleted: 5 }
    },
    {
      id: 3,
      name: "Veteran Traveler",
      description: "Completed 10 trips",
      icon: "🌍",
      category: "milestone",
      rarity: "uncommon",
      criteria: { tripsCompleted: 10 }
    },
    {
      id: 4,
      name: "Top Trek Leader",
      description: "Led 3+ successful trekking trips with 4.5+ rating",
      icon: "⛰️",
      category: "leadership",
      rarity: "rare",
      criteria: { leadershipTrips: 3, category: "trekking", minRating: 4.5 }
    },
    {
      id: 5,
      name: "Trusted Organizer",
      description: "Organized 5+ trips with 90+ trust score",
      icon: "⭐",
      category: "trust",
      rarity: "rare",
      criteria: { organizedTrips: 5, minTrustScore: 90 }
    },
    {
      id: 6,
      name: "Community Helper",
      description: "Helped 50+ community members with answers and guidance",
      icon: "🤝",
      category: "community",
      rarity: "uncommon",
      criteria: { helpfulAnswers: 50 }
    },
    {
      id: 7,
      name: "Mentor",
      description: "Official TravelBuddy Mentor - Guides new travelers",
      icon: "👨‍🏫",
      category: "mentor",
      rarity: "epic",
      criteria: { isMentor: true }
    },
    {
      id: 8,
      name: "Safety Champion",
      description: "Verified ID, email, and 95+ trust score",
      icon: "🛡️",
      category: "trust",
      rarity: "rare",
      criteria: { idVerified: true, emailVerified: true, minTrustScore: 95 }
    }
  ];

  // Initialize community data
  React.useEffect(() => {
    if (communities.length === 0) {
      setCommunities(mockCommunities);
      setBadges(mockBadges);
      
      // Auto-award First Trip badge if user completed trips
      if (joinedTrips.length > 0 && !userBadges.includes(1)) {
        setUserBadges([1]);
      }
    }
  }, [joinedTrips]);

  // Initialize trip stories with mock data
  React.useEffect(() => {
    if (tripStories.length === 0) {
      setTripStories(mockTripStories);
    }
  }, []);

  // Initialize convenience & accessibility features
  React.useEffect(() => {
    // Online/Offline detection
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => {
      setIsOnline(false);
      alert('⚠️ You are now offline. Offline trip data is still accessible.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline trip data from localStorage
    const storedOfflineData = JSON.parse(localStorage.getItem('offlineTripData') || '{}');
    setOfflineData(storedOfflineData);
    setDownloadedTrips(Object.keys(storedOfflineData).map(Number));

    // Apply dark mode on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }

    // Detect system dark mode preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  // Auto-scroll to search results when search query changes
  React.useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      // Wait for the component to render
      const timer = setTimeout(() => {
        if (searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // No need for auto-scroll to trips section since filtered results appear at top
  // Removed the auto-scroll effect for category filters

  const handleJoinTrip = (trip) => {
    // Check if trip has minimum trust score requirement
    if (trip.minTrustScore && userProfile.trustScore < trip.minTrustScore) {
      // Block join and show message
      alert(`You cannot join this group because your profile score (${userProfile.trustScore}) is below the required level (${trip.minTrustScore}).\n\nYou will be redirected to learn how to increase your profile score.`);
      
      // Redirect to profile improvement section
      setShowProfileScoreInfo(true);
      return;
    }
    
    setSelectedTrip(trip);
  };

  const confirmJoin = () => {
    if (selectedTrip && !joinedTrips.includes(selectedTrip.id)) {
      setJoinedTrips([...joinedTrips, selectedTrip.id]);
      setTripSpots(prev => ({
        ...prev,
        [selectedTrip.id]: {
          ...prev[selectedTrip.id],
          filled: prev[selectedTrip.id].filled + 1
        }
      }));
      alert(`Successfully joined ${selectedTrip.title}!`);
      setSelectedTrip(null);
    }
  };

  const sendChatMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        from: "Me",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostMemory = () => {
    if (newPostCaption.trim() || selectedFile) {
      const newMemory = {
        id: memories.length + 1,
        user: "John Doe",
        avatar: "JD",
        trip: "My Trip",
        image: selectedFile || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        caption: newPostCaption || "Check out this amazing moment!",
        likes: 0,
        comments: 0,
        time: "Just now"
      };
      setMemories([newMemory, ...memories]);
      setNewPostCaption('');
      setSelectedFile(null);
      alert('Memory posted successfully! 🎉');
    } else {
      alert('Please add a caption or select a photo/video!');
    }
  };

  const addLanguage = (lang) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
    setLanguageSearch('');
  };

  const removeLanguage = (lang) => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
  };

  const addCustomLanguage = () => {
    if (languageSearch.trim() && !selectedLanguages.includes(languageSearch.trim())) {
      setSelectedLanguages([...selectedLanguages, languageSearch.trim()]);
      setLanguageSearch('');
    }
  };

  const filteredLanguages = availableLanguages.filter(lang => 
    lang.toLowerCase().includes(languageSearch.toLowerCase()) && 
    !selectedLanguages.includes(lang)
  );

  // Trust Score Calculation Engine
  const calculateTrustScore = (user) => {
    let score = 0;
    
    // Base score: 20 points
    score += 20;
    
    // ID Verification: 25 points
    if (user.idVerified) score += 25;
    
    // Email Verification: 10 points
    if (user.emailVerified) score += 10;
    
    // University/Work Email: +5 bonus
    if (user.universityEmail) score += 5;
    
    // Trip History: up to 20 points (1 point per trip, max 20)
    score += Math.min(user.tripsCompleted || 0, 20);
    
    // Ratings: up to 15 points (based on average rating)
    if (user.rating) {
      score += (user.rating / 5) * 15;
    }
    
    // Review Count: up to 5 points
    if (user.reviewCount) {
      score += Math.min(user.reviewCount / 2, 5);
    }
    
    // Penalties for reports (subtract 10 per unresolved report)
    const userReports = reports.filter(r => r.reportedUserId === user.id && r.status !== 'resolved');
    score -= userReports.length * 10;
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  // Report User Handler
  const handleReportUser = (user) => {
    setReportedUser(user);
    setShowReportModal(true);
  };

  const submitReport = () => {
    if (!reportReason || !reportDetails.trim()) {
      alert('Please select a reason and provide details');
      return;
    }
    
    const newReport = {
      id: reports.length + 1,
      reportedUserId: reportedUser.id,
      reportedUserName: reportedUser.name,
      reportedBy: userProfile.name,
      reason: reportReason,
      details: reportDetails,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setReports([...reports, newReport]);
    alert('Report submitted successfully. Our team will review it within 24 hours.');
    setShowReportModal(false);
    setReportReason('');
    setReportDetails('');
    setReportedUser(null);
  };

  // Block User Handler
  const handleBlockUser = (userId) => {
    if (confirm('Are you sure you want to block this user? They will not be able to contact you.')) {
      setBlockedUsers([...blockedUsers, userId]);
      alert('User blocked successfully');
    }
  };

  // ID Verification Handler
  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedIdFile(file);
      // In production: Upload to secure server, send for manual review
      alert('ID uploaded successfully! Our team will verify it within 24-48 hours.');
      setTimeout(() => {
        setUserProfile({...userProfile, idVerified: true, verified: true});
        setShowVerificationModal(false);
      }, 1000);
    }
  };

  // Email Verification Handler
  const sendVerificationEmail = () => {
    // In production: Send actual email with code
    const code = Math.floor(100000 + Math.random() * 900000);
    setSentVerificationCode(true);
    alert(`Verification code sent to ${userProfile.email}: ${code} (For demo purposes)`);
  };

  const verifyEmailCode = () => {
    if (emailVerificationCode.length === 6) {
      setUserProfile({...userProfile, emailVerified: true, verified: true});
      alert('Email verified successfully!');
      setShowVerificationModal(false);
      setEmailVerificationCode('');
      setSentVerificationCode(false);
    } else {
      alert('Please enter the 6-digit code');
    }
  };

  // Emergency Contact Handlers
  const addEmergencyContact = (contact) => {
    if (emergencyContacts.length >= 2) {
      alert('Maximum 2 emergency contacts allowed');
      return;
    }
    setEmergencyContacts([...emergencyContacts, {...contact, id: Date.now()}]);
    setShowEmergencyContactForm(false);
  };

  const shareTripDetailsWithEmergency = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (emergencyContacts.length === 0) {
      alert('Please add emergency contacts first');
      return;
    }
    alert(`Trip details for "${trip.title}" shared with ${emergencyContacts.length} emergency contact(s)`);
  };

  // ============ TRIP PLANNING & LOGISTICS FUNCTIONS ============
  
  // Itinerary Functions
  const addActivity = (tripId, dayNumber, activityData) => {
    const newActivity = {
      id: Date.now(),
      ...activityData,
      createdBy: userProfile.name,
      createdAt: new Date().toISOString(),
      editHistory: []
    };
    
    setItineraries(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        days: {
          ...prev[tripId]?.days,
          [dayNumber]: [...(prev[tripId]?.days?.[dayNumber] || []), newActivity]
        }
      }
    }));
  };

  const updateActivity = (tripId, dayNumber, activityId, updates) => {
    setItineraries(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        days: {
          ...prev[tripId].days,
          [dayNumber]: prev[tripId].days[dayNumber].map(activity => 
            activity.id === activityId 
              ? {
                  ...activity,
                  ...updates,
                  editHistory: [
                    ...(activity.editHistory || []),
                    {
                      editedBy: userProfile.name,
                      editedAt: new Date().toISOString(),
                      changes: updates
                    }
                  ]
                }
              : activity
          )
        }
      }
    }));
  };

  const deleteActivity = (tripId, dayNumber, activityId) => {
    setItineraries(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        days: {
          ...prev[tripId].days,
          [dayNumber]: prev[tripId].days[dayNumber].filter(a => a.id !== activityId)
        }
      }
    }));
  };

  // Enhanced Expense Functions
  const addTripExpense = (tripId, expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      addedBy: userProfile.name,
      addedAt: new Date().toISOString()
    };
    
    setTripExpenses(prev => ({
      ...prev,
      [tripId]: [...(prev[tripId] || []), newExpense]
    }));
  };

  const calculateExpenseSplit = (tripId) => {
    const expenses = tripExpenses[tripId] || [];
    const balances = {};
    
    expenses.forEach(expense => {
      const splitAmount = expense.splitType === 'equal' 
        ? expense.amount / expense.participants.length
        : expense.customSplits || {};
      
      // Person who paid
      balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
      
      // Deduct from participants
      expense.participants.forEach(participant => {
        const share = expense.splitType === 'equal' ? splitAmount : (expense.customSplits?.[participant] || 0);
        balances[participant] = (balances[participant] || 0) - share;
      });
    });
    
    return balances;
  };

  const getSettlementSummary = (tripId) => {
    const balances = calculateExpenseSplit(tripId);
    const creditors = Object.entries(balances).filter(([_, amt]) => amt > 0).sort((a, b) => b[1] - a[1]);
    const debtors = Object.entries(balances).filter(([_, amt]) => amt < 0).sort((a, b) => a[1] - b[1]);
    const settlements = [];
    
    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
      const [creditor, credit] = creditors[i];
      const [debtor, debt] = debtors[j];
      const amount = Math.min(credit, Math.abs(debt));
      
      if (amount > 0.01) {
        settlements.push({
          from: debtor,
          to: creditor,
          amount: amount.toFixed(2)
        });
      }
      
      creditors[i][1] -= amount;
      debtors[j][1] += amount;
      
      if (creditors[i][1] < 0.01) i++;
      if (Math.abs(debtors[j][1]) < 0.01) j++;
    }
    
    return settlements;
  };

  // Packing List Functions
  const getPackingSuggestions = (tripType) => {
    const suggestions = {
      'Trekking': [
        { item: 'Hiking boots', category: 'footwear', essential: true },
        { item: 'Backpack (40-60L)', category: 'gear', essential: true },
        { item: 'Trekking poles', category: 'gear', essential: false },
        { item: 'Rain jacket', category: 'clothing', essential: true },
        { item: 'First aid kit', category: 'health', essential: true },
        { item: 'Headlamp/flashlight', category: 'gear', essential: true },
        { item: 'Water bottle', category: 'gear', essential: true },
        { item: 'Energy bars', category: 'food', essential: false },
        { item: 'Sunscreen SPF 50+', category: 'health', essential: true },
        { item: 'Map & compass', category: 'navigation', essential: true }
      ],
      'Beach': [
        { item: 'Swimsuit', category: 'clothing', essential: true },
        { item: 'Sunscreen SPF 30+', category: 'health', essential: true },
        { item: 'Beach towel', category: 'gear', essential: true },
        { item: 'Sunglasses', category: 'accessories', essential: true },
        { item: 'Flip flops', category: 'footwear', essential: true },
        { item: 'Beach bag', category: 'gear', essential: false },
        { item: 'Snorkeling gear', category: 'gear', essential: false },
        { item: 'Waterproof phone case', category: 'electronics', essential: false }
      ],
      'Snow/Winter': [
        { item: 'Thermal innerwear', category: 'clothing', essential: true },
        { item: 'Winter jacket', category: 'clothing', essential: true },
        { item: 'Gloves', category: 'clothing', essential: true },
        { item: 'Wool socks', category: 'clothing', essential: true },
        { item: 'Snow boots', category: 'footwear', essential: true },
        { item: 'Beanie/cap', category: 'clothing', essential: true },
        { item: 'Lip balm', category: 'health', essential: true },
        { item: 'Hand warmers', category: 'gear', essential: false }
      ],
      'City/Leisure': [
        { item: 'Comfortable walking shoes', category: 'footwear', essential: true },
        { item: 'Day pack', category: 'gear', essential: true },
        { item: 'Camera', category: 'electronics', essential: false },
        { item: 'Power bank', category: 'electronics', essential: true },
        { item: 'Travel adapter', category: 'electronics', essential: true },
        { item: 'Reusable water bottle', category: 'gear', essential: true }
      ]
    };
    
    return suggestions[tripType] || suggestions['City/Leisure'];
  };

  const togglePackingItem = (tripId, itemId, checked) => {
    setPackingLists(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        items: prev[tripId]?.items.map(item => 
          item.id === itemId ? { ...item, checked } : item
        )
      }
    }));
  };

  const addCustomPackingItem = (tripId, itemData) => {
    const newItem = {
      id: Date.now(),
      ...itemData,
      checked: false,
      addedBy: userProfile.name
    };
    
    setPackingLists(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        items: [...(prev[tripId]?.items || []), newItem]
      }
    }));
  };

  // Weather Functions (Mock data - in production, call weather API)
  const fetchWeatherData = (destination, dates) => {
    // Mock weather data - replace with actual API call
    const mockWeather = {
      forecast: [
        { date: '2024-01-15', temp: { min: 15, max: 25 }, condition: 'Sunny', rainProb: 10, wind: 12 },
        { date: '2024-01-16', temp: { min: 16, max: 26 }, condition: 'Partly Cloudy', rainProb: 20, wind: 15 },
        { date: '2024-01-17', temp: { min: 14, max: 22 }, condition: 'Rainy', rainProb: 80, wind: 25 },
        { date: '2024-01-18', temp: { min: 13, max: 21 }, condition: 'Cloudy', rainProb: 40, wind: 18 }
      ],
      bestSeason: 'October to March',
      seasonInfo: 'Pleasant weather with cool mornings and warm afternoons',
      alerts: []
    };
    
    // Check for weather alerts
    mockWeather.forecast.forEach(day => {
      if (day.rainProb > 70) {
        mockWeather.alerts.push({
          type: 'rain',
          severity: 'moderate',
          message: `Heavy rain expected on ${day.date}`,
          date: day.date
        });
      }
      if (day.wind > 30) {
        mockWeather.alerts.push({
          type: 'wind',
          severity: 'high',
          message: `Strong winds (${day.wind} km/h) on ${day.date}`,
          date: day.date
        });
      }
      if (day.temp.max > 38) {
        mockWeather.alerts.push({
          type: 'heat',
          severity: 'high',
          message: `Heatwave warning on ${day.date}`,
          date: day.date
        });
      }
    });
    
    return mockWeather;
  };

  // ============ COMMUNICATION & COORDINATION FUNCTIONS ============
  
  // Role Management Functions
  const getUserRole = (tripId, userId = 'current-user') => {
    return tripRoles[tripId]?.[userId] || 'member';
  };

  const assignRole = (tripId, userId, newRole) => {
    const currentUserRole = getUserRole(tripId);
    if (currentUserRole !== 'admin') {
      alert('Only admins can assign roles');
      return;
    }
    
    setTripRoles(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        [userId]: newRole
      }
    }));
    
    sendSystemMessage(tripId, `${userId} has been assigned as ${newRole}`);
  };

  // Message Functions
  const sendMessage = (tripId, content, type = 'text') => {
    const newMessage = {
      id: Date.now(),
      userId: 'current-user',
      userName: userProfile.name,
      userRole: getUserRole(tripId),
      content,
      type, // text, poll, system
      timestamp: new Date().toISOString(),
      replyTo: replyingTo,
      pinned: false
    };
    
    setTripMessages(prev => ({
      ...prev,
      [tripId]: [...(prev[tripId] || []), newMessage]
    }));
    
    setMessageInput('');
    setReplyingTo(null);
  };

  const sendSystemMessage = (tripId, content) => {
    const systemMsg = {
      id: Date.now(),
      userId: 'system',
      userName: 'System',
      userRole: 'system',
      content,
      type: 'system',
      timestamp: new Date().toISOString(),
      pinned: false
    };
    
    setTripMessages(prev => ({
      ...prev,
      [tripId]: [...(prev[tripId] || []), systemMsg]
    }));
  };

  const deleteMessage = (tripId, messageId) => {
    const userRole = getUserRole(tripId);
    if (userRole !== 'admin' && userRole !== 'co-admin') {
      alert('Only admins can delete messages');
      return;
    }
    
    setTripMessages(prev => ({
      ...prev,
      [tripId]: prev[tripId].filter(msg => msg.id !== messageId)
    }));
  };

  const pinMessage = (tripId, messageId) => {
    const userRole = getUserRole(tripId);
    if (userRole === 'member') {
      alert('Only admins and co-admins can pin messages');
      return;
    }
    
    setTripMessages(prev => ({
      ...prev,
      [tripId]: prev[tripId].map(msg => 
        msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
      )
    }));
  };

  // Language Analysis Functions
  const getTripMembers = (tripId) => {
    // Mock data - in production, fetch from backend
    return [
      { id: 'user-1', name: 'You', languages: userLanguages, role: 'admin' },
      { id: 'user-2', name: 'Sarah K.', languages: ['English', 'French'], role: 'co-admin' },
      { id: 'user-3', name: 'Raj P.', languages: ['Hindi', 'English', 'Gujarati'], role: 'member' },
      { id: 'user-4', name: 'Emma W.', languages: ['English', 'Spanish'], role: 'member' }
    ];
  };

  const analyzeLanguageOverlap = (tripId) => {
    const members = getTripMembers(tripId);
    const languageCount = {};
    
    members.forEach(member => {
      member.languages.forEach(lang => {
        languageCount[lang] = (languageCount[lang] || 0) + 1;
      });
    });
    
    const totalMembers = members.length;
    const languageStats = Object.entries(languageCount)
      .map(([lang, count]) => ({
        language: lang,
        count,
        percentage: (count / totalMembers) * 100
      }))
      .sort((a, b) => b.count - a.count);
    
    // Find common languages (spoken by >50% members)
    const commonLanguages = languageStats.filter(stat => stat.percentage >= 50);
    
    // Find universal languages (spoken by 100% members)
    const universalLanguages = languageStats.filter(stat => stat.percentage === 100);
    
    return {
      languageStats,
      commonLanguages,
      universalLanguages,
      totalMembers
    };
  };

  const getLanguageSummary = (tripId) => {
    const analysis = analyzeLanguageOverlap(tripId);
    
    if (analysis.universalLanguages.length > 0) {
      const langs = analysis.universalLanguages.map(l => l.language).join(', ');
      return `All members speak ${langs}`;
    }
    
    if (analysis.commonLanguages.length > 0) {
      const primary = analysis.commonLanguages[0];
      return `${primary.language} common to ${Math.round(primary.percentage)}% of group`;
    }
    
    return 'Multiple languages spoken';
  };

  // Poll Functions
  const createPoll = (tripId, pollData) => {
    const userRole = getUserRole(tripId);
    if (userRole === 'member') {
      alert('Only admins and co-admins can create polls');
      return;
    }
    
    const newPoll = {
      id: Date.now(),
      ...pollData,
      createdBy: userProfile.name,
      createdAt: new Date().toISOString(),
      votes: {},
      status: 'active', // active, closed
      linkedTo: null // itinerary, booking, etc.
    };
    
    setPolls(prev => ({
      ...prev,
      [tripId]: [...(prev[tripId] || []), newPoll]
    }));
    
    // Send poll as message
    sendMessage(tripId, newPoll.id, 'poll');
  };

  const votePoll = (tripId, pollId, selectedOptions) => {
    setUserVotes(prev => ({
      ...prev,
      [pollId]: {
        userId: 'current-user',
        userName: userProfile.name,
        options: selectedOptions,
        votedAt: new Date().toISOString()
      }
    }));
    
    setPolls(prev => ({
      ...prev,
      [tripId]: prev[tripId].map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            votes: {
              ...poll.votes,
              'current-user': selectedOptions
            }
          };
        }
        return poll;
      })
    }));
  };

  const closePoll = (tripId, pollId) => {
    const userRole = getUserRole(tripId);
    if (userRole === 'member') {
      alert('Only admins and co-admins can close polls');
      return;
    }
    
    setPolls(prev => ({
      ...prev,
      [tripId]: prev[tripId].map(poll => 
        poll.id === pollId ? { ...poll, status: 'closed' } : poll
      )
    }));
    
    sendSystemMessage(tripId, `Poll "${polls[tripId].find(p => p.id === pollId)?.question}" has been closed`);
  };

  const getPollResults = (pollId, tripId) => {
    const poll = polls[tripId]?.find(p => p.id === pollId);
    if (!poll) return null;
    
    const results = {};
    poll.options.forEach(option => {
      results[option] = 0;
    });
    
    Object.values(poll.votes || {}).forEach(userVote => {
      if (Array.isArray(userVote)) {
        userVote.forEach(opt => {
          results[opt] = (results[opt] || 0) + 1;
        });
      } else {
        results[userVote] = (results[userVote] || 0) + 1;
      }
    });
    
    const totalVotes = Object.keys(poll.votes || {}).length;
    const members = getTripMembers(tripId);
    
    return {
      results,
      totalVotes,
      totalMembers: members.length,
      participation: totalVotes > 0 ? (totalVotes / members.length) * 100 : 0,
      winner: Object.entries(results).sort((a, b) => b[1] - a[1])[0]
    };
  };

  const linkPollToDecision = (tripId, pollId, decisionType, decisionData) => {
    setPolls(prev => ({
      ...prev,
      [tripId]: prev[tripId].map(poll => 
        poll.id === pollId 
          ? { ...poll, linkedTo: { type: decisionType, data: decisionData } } 
          : poll
      )
    }));
    
    sendSystemMessage(tripId, `Poll result linked to ${decisionType}`);
  };

  // ============ AI SMART FEATURES FUNCTIONS ============
  
  // AI Trip Recommendation Engine
  const calculateTripRelevanceScore = (trip) => {
    let score = 0;
    let reasons = [];
    
    // Interest matching (40 points max)
    const interestOverlap = trip.activities?.filter(act => 
      userPreferences.interests.includes(act)
    ).length || 0;
    const interestScore = Math.min(40, interestOverlap * 15);
    score += interestScore;
    if (interestOverlap > 0) {
      reasons.push(`Matches ${interestOverlap} of your interests`);
    }
    
    // Budget matching (25 points max)
    const tripPrice = parseInt(trip.pricePerPerson.replace(/[^0-9]/g, ''));
    const budgetMin = userPreferences.budgetRange.min;
    const budgetMax = userPreferences.budgetRange.max;
    if (tripPrice >= budgetMin && tripPrice <= budgetMax) {
      score += 25;
      reasons.push('Within your budget range');
    } else if (tripPrice < budgetMin) {
      score += 15;
      reasons.push('Below your budget');
    } else {
      const overBudget = ((tripPrice - budgetMax) / budgetMax) * 100;
      if (overBudget < 20) {
        score += 10;
        reasons.push('Slightly above budget');
      }
    }
    
    // Trip type matching (15 points max)
    if (trip.type.toLowerCase() === userPreferences.travelStyle) {
      score += 15;
      reasons.push(`Perfect for ${userPreferences.travelStyle} lovers`);
    }
    
    // Pace matching (10 points)
    if (trip.pace?.toLowerCase() === userPreferences.pace) {
      score += 10;
      reasons.push('Matches your preferred pace');
    }
    
    // Past views bonus (5 points)
    if (viewedTrips.includes(trip.id)) {
      score += 5;
      reasons.push('You viewed this before');
    }
    
    // High ratings bonus (5 points)
    if (trip.rating >= 4.5) {
      score += 5;
      reasons.push('Highly rated trip');
    }
    
    return { score: Math.min(100, score), reasons: reasons.slice(0, 2) };
  };

  const getAiRecommendations = () => {
    const scoredTrips = trips.map(trip => ({
      ...trip,
      aiScore: calculateTripRelevanceScore(trip)
    }));
    
    // Sort by AI score and return top recommendations
    return scoredTrips
      .filter(t => t.aiScore.score >= 40) // Minimum threshold
      .sort((a, b) => b.aiScore.score - a.aiScore.score)
      .slice(0, 5);
  };

  // AI Itinerary Builder
  const generateAiItinerary = (destination, days, budget, tripType) => {
    // AI-powered itinerary generation logic
    const itineraryTemplates = {
      'trekking': {
        activities: ['Acclimatization walk', 'Trek to base camp', 'Summit push', 'Descent', 'Rest day'],
        timing: ['Morning (6-8 AM)', 'Afternoon (2-5 PM)', 'Evening (6-8 PM)'],
        travel: ['On foot', 'Local transport', 'Shared jeep']
      },
      'beach': {
        activities: ['Beach relaxation', 'Water sports', 'Sunset viewing', 'Local market', 'Island hopping'],
        timing: ['Morning (8-11 AM)', 'Afternoon (12-4 PM)', 'Evening (5-8 PM)'],
        travel: ['Walking', 'Scooter rental', 'Boat']
      },
      'city': {
        activities: ['Historical sites', 'Museums', 'Food tour', 'Shopping', 'Nightlife'],
        timing: ['Morning (9-12 PM)', 'Afternoon (1-5 PM)', 'Evening (6-10 PM)'],
        travel: ['Metro', 'Uber/Taxi', 'Walking tour']
      },
      'cultural': {
        activities: ['Temple visits', 'Local ceremonies', 'Traditional food', 'Art galleries', 'Cultural shows'],
        timing: ['Early morning (6-9 AM)', 'Late morning (10-1 PM)', 'Evening (5-8 PM)'],
        travel: ['Local bus', 'Walking', 'Rickshaw']
      },
      'snow': {
        activities: ['Skiing', 'Snowboarding', 'Snow trekking', 'Hot springs', 'Cozy cafe time'],
        timing: ['Morning (8-12 PM)', 'Afternoon (1-4 PM)', 'Evening (5-7 PM)'],
        travel: ['Cable car', 'Ski lift', 'Snow mobile']
      }
    };

    const template = itineraryTemplates[tripType.toLowerCase()] || itineraryTemplates['city'];
    const itinerary = {};

    for (let day = 1; day <= days; day++) {
      const dayActivities = [];
      const activitiesPerDay = day === 1 ? 2 : day === days ? 2 : 3; // Lighter first/last days
      
      for (let i = 0; i < activitiesPerDay; i++) {
        const activityIndex = (day - 1 + i) % template.activities.length;
        const timingIndex = i % template.timing.length;
        
        dayActivities.push({
          id: Date.now() + day * 100 + i,
          time: template.timing[timingIndex],
          title: template.activities[activityIndex],
          location: destination,
          notes: `AI-suggested activity. Budget: ₹${Math.round(budget / days / activitiesPerDay)}`,
          travel: template.travel[i % template.travel.length],
          duration: i === 1 ? '3-4 hours' : '2-3 hours',
          aiGenerated: true,
          confidence: 85 // AI confidence score
        });
      }
      
      // Add buffer/rest time
      if (day !== days) {
        dayActivities.push({
          id: Date.now() + day * 100 + 99,
          time: 'Flexible',
          title: 'Rest / Buffer time',
          location: destination,
          notes: 'Free time to relax or explore on your own',
          aiGenerated: true,
          confidence: 100
        });
      }
      
      itinerary[day] = dayActivities;
    }

    return {
      destination,
      days,
      budget,
      tripType,
      itinerary,
      totalEstimatedCost: budget,
      aiConfidence: 85,
      generatedAt: new Date().toISOString(),
      disclaimer: 'This is an AI-generated itinerary. Please review and adjust based on your preferences.'
    };
  };

  const applyAiItineraryToTrip = (tripId, aiItinerary) => {
    setItineraries(prev => ({
      ...prev,
      [tripId]: {
        days: aiItinerary.itinerary,
        source: 'ai-generated',
        confidence: aiItinerary.aiConfidence
      }
    }));
    
    alert(`AI itinerary applied! You can now edit it in the Plan Trip section.`);
  };

  // AI Compatibility Scoring
  const calculateCompatibilityScore = (userA, userB) => {
    let score = 0;
    let factors = [];
    
    // Pace compatibility (25 points)
    const paceA = (userA.pace || 'moderate').toLowerCase();
    const paceB = (userB.pace || 'moderate').toLowerCase();
    
    if (paceA === paceB) {
      score += 25;
      factors.push({ factor: 'Travel pace', match: 'Perfect match', points: 25 });
    } else {
      const paceOrder = { 'relaxed': 0, 'moderate': 1, 'fast': 2, 'challenging': 2 };
      const paceDiff = Math.abs((paceOrder[paceA] || 1) - (paceOrder[paceB] || 1));
      const paceScore = Math.max(0, 25 - (paceDiff * 10));
      score += paceScore;
      factors.push({ factor: 'Travel pace', match: paceDiff === 1 ? 'Compatible' : 'Different', points: paceScore });
    }
    
    // Budget compatibility (25 points)
    const budgetOverlap = Math.min(userA.budgetRange.max, userB.budgetRange.max) - 
                          Math.max(userA.budgetRange.min, userB.budgetRange.min);
    const avgBudgetRange = ((userA.budgetRange.max - userA.budgetRange.min) + 
                            (userB.budgetRange.max - userB.budgetRange.min)) / 2;
    const budgetScore = budgetOverlap > 0 ? Math.min(25, (budgetOverlap / avgBudgetRange) * 25) : 0;
    score += budgetScore;
    factors.push({ 
      factor: 'Budget range', 
      match: budgetScore >= 20 ? 'High overlap' : budgetScore >= 10 ? 'Some overlap' : 'Limited overlap',
      points: Math.round(budgetScore)
    });
    
    // Interest overlap (20 points)
    const commonInterests = userA.interests.filter(int => userB.interests.includes(int));
    const interestScore = Math.min(20, commonInterests.length * 5);
    score += interestScore;
    factors.push({
      factor: 'Common interests',
      match: `${commonInterests.length} shared interests`,
      points: interestScore
    });
    
    // Travel style (15 points)
    if (userA.travelStyle === userB.travelStyle) {
      score += 15;
      factors.push({ factor: 'Travel style', match: 'Same style', points: 15 });
    } else {
      score += 5;
      factors.push({ factor: 'Travel style', match: 'Different style', points: 5 });
    }
    
    // Rating & behavior (15 points)
    const avgRating = (userA.rating + userB.rating) / 2;
    const ratingScore = (avgRating / 5) * 15;
    score += ratingScore;
    factors.push({ 
      factor: 'User ratings',
      match: avgRating >= 4.5 ? 'Both highly rated' : 'Good ratings',
      points: Math.round(ratingScore)
    });
    
    return {
      score: Math.min(100, Math.round(score)),
      level: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Low',
      factors: factors.sort((a, b) => b.points - a.points).slice(0, 3),
      recommendation: score >= 70 ? 'Highly compatible travelers!' : 
                     score >= 50 ? 'Good match, worth connecting' : 
                     'Consider your differences before joining'
    };
  };

  const getCompatibilityWithTripHost = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;
    
    const hostProfile = {
      pace: (trip.pace || 'moderate').toLowerCase(),
      budgetRange: { 
        min: parseInt(trip.pricePerPerson.replace(/[^0-9]/g, '')) * 0.8,
        max: parseInt(trip.pricePerPerson.replace(/[^0-9]/g, '')) * 1.2
      },
      interests: trip.activities || [],
      travelStyle: trip.type.toLowerCase(),
      rating: trip.host.rating || 4.5
    };
    
    const currentUserProfile = {
      ...userPreferences,
      rating: userProfile.rating
    };
    
    return calculateCompatibilityScore(currentUserProfile, hostProfile);
  };

  // Cold Start Handling
  const handleColdStart = () => {
    // For new users with no data
    const popularTrips = trips
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, 5);
    
    return popularTrips.map(trip => ({
      ...trip,
      aiScore: {
        score: 70,
        reasons: ['Popular choice', 'Highly rated']
      }
    }));
  };

  // ============================================
  // EXPERIENCE SHARING & INSPIRATION FUNCTIONS
  // ============================================

  // Save/Bookmark Functions
  const toggleSaveItem = (itemType, itemId) => {
    setSavedItems(prev => {
      const currentItems = prev[itemType] || [];
      if (currentItems.includes(itemId)) {
        return {
          ...prev,
          [itemType]: currentItems.filter(id => id !== itemId)
        };
      } else {
        return {
          ...prev,
          [itemType]: [...currentItems, itemId]
        };
      }
    });
  };

  const addToFolder = (folderId, itemType, itemId) => {
    setBookmarkFolders(prev => prev.map(folder => {
      if (folder.id === folderId) {
        const newItem = { type: itemType, id: itemId, addedDate: new Date().toISOString() };
        return {
          ...folder,
          items: [...folder.items.filter(item => !(item.type === itemType && item.id === itemId)), newItem]
        };
      }
      return folder;
    }));
  };

  const createFolder = (folderName) => {
    const newFolder = {
      id: Date.now(),
      name: folderName,
      items: []
    };
    setBookmarkFolders(prev => [...prev, newFolder]);
  };

  // Cost Analytics Functions
  const calculateCostAnalytics = (story) => {
    const budget = story.sections.budget;
    if (!budget || !budget.enabled) return null;

    const variance = budget.actual - budget.planned;
    const variancePercentage = ((variance / budget.planned) * 100).toFixed(1);
    const categoryVariances = budget.breakdown.map(cat => ({
      ...cat,
      variance: cat.actual - cat.planned,
      variancePercentage: (((cat.actual - cat.planned) / cat.planned) * 100).toFixed(1)
    }));

    return {
      totalPlanned: budget.planned,
      totalActual: budget.actual,
      variance,
      variancePercentage,
      perDay: budget.perDay,
      perPerson: budget.perPerson,
      categoryVariances,
      isOverBudget: variance > 0,
      isUnderBudget: variance < 0
    };
  };

  const getDestinationAverageCost = (destination) => {
    // Aggregate anonymous data from stories
    const destinationStories = tripStories.filter(story => 
      story.destination.toLowerCase().includes(destination.toLowerCase()) &&
      story.sections.budget?.enabled
    );

    if (destinationStories.length === 0) return null;

    const totalCosts = destinationStories.reduce((sum, story) => sum + story.sections.budget.actual, 0);
    const totalDays = destinationStories.reduce((sum, story) => {
      const days = parseInt(story.duration) || 7;
      return sum + days;
    }, 0);

    return {
      averageTotal: Math.round(totalCosts / destinationStories.length),
      averagePerDay: Math.round(totalCosts / totalDays),
      sampleSize: destinationStories.length,
      range: {
        min: Math.min(...destinationStories.map(s => s.sections.budget.actual)),
        max: Math.max(...destinationStories.map(s => s.sections.budget.actual))
      }
    };
  };

  // Story Filtering & Sorting
  const getFilteredAndSortedStories = () => {
    let filtered = tripStories.filter(story => {
      if (story.visibility === 'private') return false;
      
      const matchesDestination = !storyFilters.destination || 
        story.destination.toLowerCase().includes(storyFilters.destination.toLowerCase());
      
      const matchesBudget = storyFilters.budgetRange === 'all' || (() => {
        const actual = story.sections.budget?.actual || 0;
        switch (storyFilters.budgetRange) {
          case 'budget': return actual < 20000;
          case 'mid': return actual >= 20000 && actual < 50000;
          case 'luxury': return actual >= 50000;
          default: return true;
        }
      })();

      const matchesDuration = storyFilters.duration === 'all' || (() => {
        const days = parseInt(story.duration) || 0;
        switch (storyFilters.duration) {
          case 'short': return days <= 5;
          case 'medium': return days > 5 && days <= 10;
          case 'long': return days > 10;
          default: return true;
        }
      })();

      return matchesDestination && matchesBudget && matchesDuration;
    });

    // Sort stories
    switch (storyFilters.sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      case 'popular':
        return filtered.sort((a, b) => (b.likes + b.bookmarks) - (a.likes + a.bookmarks));
      case 'budget-low':
        return filtered.sort((a, b) => (a.sections.budget?.actual || 0) - (b.sections.budget?.actual || 0));
      case 'budget-high':
        return filtered.sort((a, b) => (b.sections.budget?.actual || 0) - (a.sections.budget?.actual || 0));
      default:
        return filtered;
    }
  };

  // Before-After Comparison Functions
  const saveBeforeExpectations = (tripId, expectations) => {
    setBeforeAfterData(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        before: {
          ...expectations,
          savedDate: new Date().toISOString()
        }
      }
    }));
  };

  const saveAfterExperience = (tripId, experience) => {
    setBeforeAfterData(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        after: {
          ...experience,
          savedDate: new Date().toISOString()
        }
      }
    }));
  };

  const getComparisonData = (tripId) => {
    return beforeAfterData[tripId] || null;
  };

  // ============================================
  // SEARCH, FILTERS & DISCOVERY FUNCTIONS
  // ============================================

  // Advanced Filtering with all criteria
  const applyAdvancedFilters = (tripsList) => {
    return tripsList.filter(trip => {
      // Budget range filter
      if (advancedFilters.budgetRange.enabled) {
        const price = parseInt(trip.pricePerPerson.replace(/[^0-9]/g, ''));
        if (price < advancedFilters.budgetRange.min || price > advancedFilters.budgetRange.max) {
          return false;
        }
      }

      // Group size filter
      if (advancedFilters.groupSize.enabled) {
        const currentSize = trip.groupSize?.current || trip.spots?.filled || 0;
        const maxSize = trip.groupSize?.max || trip.spots?.total || 10;
        if (currentSize < advancedFilters.groupSize.min || maxSize > advancedFilters.groupSize.max) {
          return false;
        }
      }

      // Age range filter (privacy-friendly)
      if (advancedFilters.ageRange.enabled && trip.ageRange) {
        if (trip.ageRange.min > advancedFilters.ageRange.max || trip.ageRange.max < advancedFilters.ageRange.min) {
          return false;
        }
      }

      // Pace filter
      if (advancedFilters.pace.length > 0) {
        const tripPace = (trip.pace || 'moderate').toLowerCase();
        if (!advancedFilters.pace.includes(tripPace)) {
          return false;
        }
      }

      // Duration filter
      if (advancedFilters.duration.enabled) {
        const days = parseInt(trip.duration) || 7;
        if (days < advancedFilters.duration.min || days > advancedFilters.duration.max) {
          return false;
        }
      }

      // Trip type filter
      if (advancedFilters.tripTypes.length > 0) {
        if (!advancedFilters.tripTypes.includes(trip.type)) {
          return false;
        }
      }

      // Verification level filter
      if (advancedFilters.verificationLevel.idVerified && !trip.host?.idVerified) {
        return false;
      }
      if (advancedFilters.verificationLevel.emailVerified && !trip.host?.emailVerified) {
        return false;
      }
      if (advancedFilters.verificationLevel.highTrustScore && (trip.host?.trustScore || 0) < 80) {
        return false;
      }

      // Availability filter
      if (advancedFilters.availability !== 'all') {
        const spots = trip.spots || trip.groupSize;
        const available = (spots?.total || 10) - (spots?.filled || spots?.current || 0);
        
        if (advancedFilters.availability === 'available' && available === 0) {
          return false;
        }
        if (advancedFilters.availability === 'last-few-slots' && available > 2) {
          return false;
        }
      }

      return true;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setAdvancedFilters({
      budgetRange: { min: 0, max: 100000, enabled: false },
      groupSize: { min: 1, max: 10, enabled: false },
      ageRange: { min: 18, max: 60, enabled: false },
      pace: [],
      duration: { min: 1, max: 30, enabled: false },
      tripTypes: [],
      verificationLevel: {
        idVerified: false,
        emailVerified: false,
        highTrustScore: false
      },
      availability: 'all'
    });
    setSelectedFilters({
      tripType: 'all',
      budget: 'all',
      duration: 'all',
      activities: [],
      languages: [],
      minRating: 0
    });
    setSearchQuery('');
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (advancedFilters.budgetRange.enabled) count++;
    if (advancedFilters.groupSize.enabled) count++;
    if (advancedFilters.ageRange.enabled) count++;
    if (advancedFilters.pace.length > 0) count++;
    if (advancedFilters.duration.enabled) count++;
    if (advancedFilters.tripTypes.length > 0) count++;
    if (advancedFilters.verificationLevel.idVerified || 
        advancedFilters.verificationLevel.emailVerified || 
        advancedFilters.verificationLevel.highTrustScore) count++;
    if (advancedFilters.availability !== 'all') count++;
    if (selectedFilters.activities.length > 0) count++;
    if (selectedFilters.languages.length > 0) count++;
    if (selectedFilters.minRating > 0) count++;
    return count;
  };

  // Discovery: Get trending trips (high engagement)
  const getTrendingTrips = () => {
    return trips
      .map(trip => ({
        ...trip,
        engagementScore: (trip.rating * trip.reviewCount) + (trip.spots?.filled || 0) * 10
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 6);
  };

  // Discovery: Get recently added trips
  const getRecentTrips = () => {
    // In production, use actual creation date
    return trips.slice(0, 6);
  };

  // Discovery: Get high trust-score trips
  const getHighTrustTrips = () => {
    return trips
      .filter(trip => (trip.host?.trustScore || 0) >= 90)
      .sort((a, b) => (b.host?.trustScore || 0) - (a.host?.trustScore || 0))
      .slice(0, 6);
  };

  // Discovery: Personalized recommendations
  const getPersonalizedTrips = () => {
    // Use user interests, past searches, saved trips
    const userInterestsList = userPreferences.interests;
    const savedTripsList = savedItems.trips || [];
    
    return trips
      .map(trip => {
        let score = 0;
        
        // Match with user interests
        const matchedInterests = trip.activities?.filter(act => userInterestsList.includes(act)).length || 0;
        score += matchedInterests * 10;
        
        // Boost if similar to saved trips
        if (savedTripsList.length > 0) {
          const savedTrip = trips.find(t => savedTripsList.includes(t.id));
          if (savedTrip && savedTrip.type === trip.type) score += 20;
        }
        
        // Boost if in recently viewed
        if (recentlyViewed.includes(trip.id)) score += 5;
        
        return { ...trip, personalScore: score };
      })
      .filter(trip => trip.personalScore > 0)
      .sort((a, b) => b.personalScore - a.personalScore)
      .slice(0, 6);
  };

  // Track viewed trips
  const trackTripView = (tripId) => {
    if (!recentlyViewed.includes(tripId)) {
      setRecentlyViewed(prev => [tripId, ...prev].slice(0, 20));
    }
  };

  // Track search history
  const addToSearchHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 10));
    }
  };

  // Get trips for calendar view
  const getTripsForCalendar = (month) => {
    return trips.filter(trip => {
      // Parse trip dates (format: "Jun 10 - Jun 24, 2026")
      // This is a simplified version - production would use proper date parsing
      return true; // Show all trips for now
    });
  };

  // Map clustering (simplified - production would use proper clustering algorithm)
  const getMapClusters = (tripsList, zoom) => {
    // Group trips by approximate location
    const clusters = {};
    tripsList.forEach(trip => {
      const key = `${trip.destination.split(',')[0]}`;
      if (!clusters[key]) {
        clusters[key] = {
          location: key,
          trips: [],
          count: 0,
          priceRange: { min: Infinity, max: 0 }
        };
      }
      clusters[key].trips.push(trip);
      clusters[key].count++;
      
      const price = parseInt(trip.pricePerPerson.replace(/[^0-9]/g, ''));
      clusters[key].priceRange.min = Math.min(clusters[key].priceRange.min, price);
      clusters[key].priceRange.max = Math.max(clusters[key].priceRange.max, price);
    });
    
    return Object.values(clusters);
  };

  // ============================================
  // COMMUNITY & GROWTH FUNCTIONS
  // ============================================

  // Community Functions
  const joinCommunity = (communityId) => {
    const community = communities.find(c => c.id === communityId);
    if (!community) return;

    if (community.type === 'request-to-join') {
      alert('Membership request sent! Moderators will review your application.');
      // In production, create a pending request
    } else {
      setUserCommunities(prev => [...prev, communityId]);
      alert(`You joined ${community.name}!`);
    }
  };

  const leaveCommunity = (communityId) => {
    setUserCommunities(prev => prev.filter(id => id !== communityId));
  };

  const createCommunityPost = (communityId, postData) => {
    const newPost = {
      id: Date.now(),
      communityId,
      userId: userProfile.name,
      userAvatar: userProfile.name.split(' ').map(n => n[0]).join(''),
      content: postData.content,
      title: postData.title,
      type: postData.type || 'discussion', // discussion, trip-share, resource
      likes: 0,
      comments: [],
      createdDate: new Date().toISOString(),
      isPinned: false
    };
    
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  // Mentor Functions
  const checkMentorEligibility = () => {
    const completedTrips = joinedTrips.length;
    const trustScore = userProfile.trustScore;
    const isVerified = userProfile.idVerified && userProfile.emailVerified;
    
    return {
      eligible: completedTrips >= 5 && trustScore >= 85 && isVerified,
      criteria: {
        minTrips: { required: 5, current: completedTrips, met: completedTrips >= 5 },
        trustScore: { required: 85, current: trustScore, met: trustScore >= 85 },
        verification: { required: true, current: isVerified, met: isVerified }
      }
    };
  };

  const applyForMentor = (application) => {
    const eligibility = checkMentorEligibility();
    if (!eligibility.eligible) {
      alert('You do not meet the mentor eligibility criteria yet.');
      return;
    }

    setMentorApplications(prev => [...prev, {
      id: Date.now(),
      userId: userProfile.name,
      ...application,
      status: 'pending',
      appliedDate: new Date().toISOString()
    }]);
    
    alert('Mentor application submitted! We will review it within 3-5 business days.');
    setShowMentorApplication(false);
  };

  const becomeMentor = () => {
    setIsMentor(true);
    setUserBadges(prev => [...prev, 7]); // Award Mentor badge
  };

  // Badge Functions
  const checkBadgeEligibility = (badge) => {
    const criteria = badge.criteria;
    
    if (criteria.tripsCompleted) {
      return joinedTrips.length >= criteria.tripsCompleted;
    }
    
    if (criteria.isMentor) {
      return isMentor;
    }
    
    if (criteria.minTrustScore) {
      return userProfile.trustScore >= criteria.minTrustScore;
    }
    
    if (criteria.helpfulAnswers) {
      // In production, track actual helpful answers
      return false;
    }
    
    return false;
  };

  const awardBadge = (badgeId) => {
    if (!userBadges.includes(badgeId)) {
      setUserBadges(prev => [...prev, badgeId]);
      setShowBadgeModal(true);
      setSelectedBadge(badges.find(b => b.id === badgeId));
    }
  };

  const calculateBadgeProgress = (badge) => {
    const criteria = badge.criteria;
    
    if (criteria.tripsCompleted) {
      return {
        current: joinedTrips.length,
        required: criteria.tripsCompleted,
        percentage: Math.min(100, (joinedTrips.length / criteria.tripsCompleted) * 100)
      };
    }
    
    if (criteria.minTrustScore) {
      return {
        current: userProfile.trustScore,
        required: criteria.minTrustScore,
        percentage: Math.min(100, (userProfile.trustScore / criteria.minTrustScore) * 100)
      };
    }
    
    return { current: 0, required: 1, percentage: 0 };
  };

  // Engagement & Contribution Tracking
  const trackContribution = (type, data) => {
    // Track user contributions for leaderboard
    // Types: helpful_answer, trip_leadership, mentorship_activity, community_post
    console.log('Tracking contribution:', type, data);
  };

  const updateLeaderboard = () => {
    // In production, aggregate contribution data
    setLeaderboard({
      topContributors: [
        { name: "Rohan Kumar", avatar: "RK", contributions: 142, badge: "Community Helper" },
        { name: "Priya Sharma", avatar: "PS", contributions: 98, badge: "Helpful Guide" },
        { name: "Amit Patel", avatar: "AP", contributions: 87, badge: "Active Member" }
      ],
      risingMentors: [
        { name: "Sarah Johnson", avatar: "SJ", mentees: 12, rating: 4.9 },
        { name: "Ravi Kumar", avatar: "RK", mentees: 8, rating: 4.8 }
      ],
      communityLeaders: [
        { name: "Solo Women Travelers", members: 1247, moderator: "Jane Doe" },
        { name: "Budget Backpackers", members: 2891, moderator: "Alex Chen" }
      ]
    });
  };

  // ============================================
  // CONVENIENCE & ACCESSIBILITY FUNCTIONS
  // ============================================

  // Currency Conversion
  const currencies = {
    INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
    USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
    GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
    AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
    JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' }
  };

  const convertCurrency = (amount, fromCurrency = 'INR', toCurrency = selectedCurrency) => {
    if (!amount || amount === undefined || amount === null) return 0;
    if (fromCurrency === toCurrency) return amount;
    const amountInINR = amount / (exchangeRates[fromCurrency] || 1);
    return amountInINR * (exchangeRates[toCurrency] || 1);
  };

  const formatCurrency = (amount, currency = selectedCurrency) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return `${currencies[currency]?.symbol || '₹'}0`;
    }
    const converted = convertCurrency(amount, 'INR', currency);
    const currencyInfo = currencies[currency] || currencies.INR;
    return `${currencyInfo.symbol}${(converted || 0).toLocaleString(undefined, { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`;
  };

  const changeCurrency = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  // Offline Access Functions
  const downloadTripForOffline = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const offlineTripData = {
      id: trip.id,
      title: trip.title,
      destination: trip.destination,
      dates: trip.dates,
      price: trip.price,
      groupSize: trip.groupSize,
      currentParticipants: trip.currentParticipants,
      organizer: trip.organizer,
      description: trip.description,
      activities: trip.activities || [],
      languages: trip.languages || [],
      
      // Itinerary
      itinerary: itineraries.find(i => i.tripId === tripId) || null,
      
      // Accommodation
      accommodation: {
        name: trip.accommodation || 'TBD',
        address: trip.accommodationAddress || 'Will be shared closer to trip date',
        checkIn: trip.checkIn || 'TBD',
        checkOut: trip.checkOut || 'TBD'
      },
      
      // Meeting Point
      meetingPoint: {
        location: trip.meetingPoint || 'Will be shared 2 days before trip',
        time: trip.meetingTime || 'TBD',
        instructions: trip.meetingInstructions || 'Leader will share details via WhatsApp group'
      },
      
      // Emergency Contacts
      emergencyContacts: emergencyContacts.filter(c => c.tripId === tripId),
      
      // Group Members (basic info only)
      members: trip.participants?.map(p => ({
        name: p.name,
        phone: p.phone,
        role: p.role
      })) || [],
      
      // Downloaded metadata
      downloadedAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString()
    };

    // Store in localStorage
    const currentOfflineData = JSON.parse(localStorage.getItem('offlineTripData') || '{}');
    currentOfflineData[tripId] = offlineTripData;
    localStorage.setItem('offlineTripData', JSON.stringify(currentOfflineData));

    setDownloadedTrips(prev => [...new Set([...prev, tripId])]);
    setOfflineData(currentOfflineData);
    
    alert(`✅ Trip data downloaded for offline access!\n\nYou can now view:\n• Itinerary\n• Accommodation details\n• Meeting point\n• Emergency contacts\n\nEven without internet connection.`);
  };

  const removeOfflineTrip = (tripId) => {
    const currentOfflineData = JSON.parse(localStorage.getItem('offlineTripData') || '{}');
    delete currentOfflineData[tripId];
    localStorage.setItem('offlineTripData', JSON.stringify(currentOfflineData));
    
    setDownloadedTrips(prev => prev.filter(id => id !== tripId));
    setOfflineData(currentOfflineData);
  };

  const syncOfflineData = () => {
    if (!isOnline) {
      alert('⚠️ No internet connection. Data will sync automatically when you\'re back online.');
      return;
    }

    // Re-download all offline trips to get latest data
    downloadedTrips.forEach(tripId => {
      downloadTripForOffline(tripId);
    });

    alert('✅ Offline data synced successfully!');
  };

  // PDF Generation (Trip Kit)
  const generateTripKitPDF = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    // In production, use a library like jsPDF or html2pdf
    // For now, we'll create a downloadable HTML document
    const itinerary = itineraries.find(i => i.tripId === tripId);
    const expenses = tripExpenses.find(e => e.tripId === tripId);
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${trip.title} - Trip Kit</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; }
    .info-box { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
    .emergency { background: #fee2e2; border-left: 4px solid #dc2626; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: bold; }
    .contact-list { list-style: none; padding: 0; }
    .contact-list li { padding: 10px; margin: 5px 0; background: #f9fafb; border-radius: 5px; }
    @media print { body { max-width: 100%; } }
  </style>
</head>
<body>
  <h1>${trip.title}</h1>
  
  <div class="info-box">
    <h3>📍 Trip Overview</h3>
    <p><strong>Destination:</strong> ${trip.destination}</p>
    <p><strong>Dates:</strong> ${trip.dates}</p>
    <p><strong>Organizer:</strong> ${trip.organizer}</p>
    <p><strong>Group Size:</strong> ${trip.currentParticipants}/${trip.groupSize} people</p>
  </div>

  <div class="info-box">
    <h3>🏨 Accommodation</h3>
    <p><strong>Name:</strong> ${trip.accommodation || 'TBD'}</p>
    <p><strong>Check-in:</strong> ${trip.checkIn || 'TBD'}</p>
    <p><strong>Check-out:</strong> ${trip.checkOut || 'TBD'}</p>
  </div>

  <div class="info-box">
    <h3>📍 Meeting Point</h3>
    <p><strong>Location:</strong> ${trip.meetingPoint || 'Will be shared 2 days before'}</p>
    <p><strong>Time:</strong> ${trip.meetingTime || 'TBD'}</p>
  </div>

  ${itinerary ? `
  <h2>📅 Itinerary</h2>
  <table>
    <thead>
      <tr>
        <th>Day</th>
        <th>Activities</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      ${itinerary.days.map(day => `
        <tr>
          <td><strong>Day ${day.day}</strong><br>${day.date}</td>
          <td>${day.activities.join(', ')}</td>
          <td>${day.time || '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  <h2>👥 Group Members</h2>
  <ul class="contact-list">
    ${(trip.participants || []).map(p => `
      <li>
        <strong>${p.name}</strong> ${p.role ? `(${p.role})` : ''}<br>
        📞 ${p.phone || 'Not provided'}
      </li>
    `).join('')}
  </ul>

  <div class="info-box emergency">
    <h2>🚨 Emergency Contacts</h2>
    <ul class="contact-list">
      ${emergencyContacts
        .filter(c => c.tripId === tripId)
        .map(contact => `
          <li>
            <strong>${contact.name}</strong> - ${contact.relation}<br>
            📞 ${contact.phone}<br>
            ${contact.hospital ? `🏥 ${contact.hospital}` : ''}
          </li>
        `).join('')}
      <li>
        <strong>National Emergency:</strong> 112<br>
        <strong>Police:</strong> 100 | <strong>Ambulance:</strong> 102
      </li>
    </ul>
  </div>

  <div class="info-box" style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280;">
    <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    <p>Travel Buddy App - Safe & Connected Travel</p>
  </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.title.replace(/\s+/g, '_')}_TripKit.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('📥 Trip Kit downloaded!\n\nOpen the HTML file in any browser or print it as PDF.');
  };

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    
    // Apply dark mode class to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Low Data Mode Toggle
  const toggleLowDataMode = () => {
    const newMode = !lowDataMode;
    setLowDataMode(newMode);
    localStorage.setItem('lowDataMode', JSON.stringify(newMode));
  };

  // Enhanced filtering with activities, languages, and ratings
  const getFilteredAndSortedTrips = () => {
    let filtered = trips.filter(trip => {
      const matchesSearch = searchQuery === '' || 
                           trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedFilters.tripType === 'all' || trip.type === selectedFilters.tripType;
      const matchesBudget = selectedFilters.budget === 'all' || trip.budget === selectedFilters.budget;
      
      // Activity filter
      const matchesActivities = selectedFilters.activities.length === 0 || 
        selectedFilters.activities.some(activity => trip.activities?.includes(activity));
      
      // Language filter
      const matchesLanguages = selectedFilters.languages.length === 0 || 
        selectedFilters.languages.some(lang => trip.languages?.includes(lang));
      
      // Rating filter
      const matchesRating = trip.rating >= selectedFilters.minRating;
      
      return matchesSearch && matchesType && matchesBudget && matchesActivities && matchesLanguages && matchesRating;
    });

    // Apply advanced filters
    filtered = applyAdvancedFilters(filtered);

    // Sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.pricePerPerson.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.pricePerPerson.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.pricePerPerson.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.pricePerPerson.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'date':
      default:
        // Keep original order (by date)
        break;
    }

    return filtered;
  };

  const toggleActivity = (activity) => {
    setSelectedFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const toggleLanguageFilter = (lang) => {
    setSelectedFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      tripType: 'all',
      budget: 'all',
      duration: 'all',
      activities: [],
      languages: [],
      minRating: 0
    });
    setSortBy('date');
  };

  const ReviewsView = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trip Reviews & Experiences</h2>
        <p className="text-gray-600">Share your journey and rate trip leaders</p>
      </div>

      {/* Write Review Button (only for users who joined trips) */}
      {joinedTrips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Completed a trip?</h3>
              <p className="text-gray-600">Share your experience and rate the trip leader</p>
            </div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Write Review
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{review.tripName}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-2xl ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center mb-4 pb-4 border-b">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {review.reviewerAvatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{review.reviewer}</p>
                <p className="text-sm text-gray-500">Traveler</p>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mb-4">{review.review}</p>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Trip" className="w-32 h-24 object-cover rounded-lg" />
                ))}
              </div>
            )}

            {/* Trip Leader Info */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {review.leaderAvatar}
              </div>
              <div>
                <p className="text-sm text-gray-500">Trip Leader</p>
                <p className="font-semibold text-gray-900">{review.leader}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Reviews Message */}
      {reviews.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
          <p className="text-gray-500">Be the first to share your trip experience!</p>
        </div>
      )}
    </div>
  );

  // ============ AI SMART FEATURES COMPONENTS ============
  
  // AI Itinerary Builder Modal
  const AiItineraryBuilder = () => {
    const [buildParams, setBuildParams] = useState({
      destination: '',
      days: 5,
      budget: 30000,
      tripType: 'trekking'
    });

    const handleGenerate = () => {
      const itinerary = generateAiItinerary(
        buildParams.destination,
        buildParams.days,
        buildParams.budget,
        buildParams.tripType
      );
      setGeneratedItinerary(itinerary);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">AI Itinerary Builder</h2>
              </div>
              <button 
                onClick={() => {
                  setShowAiItineraryBuilder(false);
                  setGeneratedItinerary(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!generatedItinerary ? (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">How it works</h3>
                  </div>
                  <p className="text-sm text-purple-800">
                    Our AI analyzes thousands of successful trip itineraries to create a personalized day-by-day plan 
                    with activities, timing, and travel suggestions. You can edit everything after generation.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                  <input
                    type="text"
                    value={buildParams.destination}
                    onChange={(e) => setBuildParams({...buildParams, destination: e.target.value})}
                    placeholder="e.g., Leh Ladakh, Goa, Manali"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
                    <input
                      type="number"
                      min="2"
                      max="30"
                      value={buildParams.days}
                      onChange={(e) => setBuildParams({...buildParams, days: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget (₹)</label>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={buildParams.budget}
                      onChange={(e) => setBuildParams({...buildParams, budget: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
                  <select
                    value={buildParams.tripType}
                    onChange={(e) => setBuildParams({...buildParams, tripType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="trekking">🥾 Trekking / Adventure</option>
                    <option value="beach">🏖️ Beach / Relaxation</option>
                    <option value="city">🏙️ City / Urban Exploration</option>
                    <option value="cultural">🕌 Cultural / Heritage</option>
                    <option value="snow">⛷️ Snow / Winter Sports</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!buildParams.destination}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate AI Itinerary
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="text-green-900">
                      <strong>AI Itinerary Generated!</strong> 
                      <span className="text-sm ml-2">Confidence: {generatedItinerary.aiConfidence}%</span>
                    </p>
                  </div>
                  <p className="text-sm text-green-800 mt-2">{generatedItinerary.disclaimer}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Trip Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><strong>Destination:</strong> {generatedItinerary.destination}</div>
                    <div><strong>Duration:</strong> {generatedItinerary.days} days</div>
                    <div><strong>Budget:</strong> ₹{generatedItinerary.budget.toLocaleString()}</div>
                    <div><strong>Type:</strong> {generatedItinerary.tripType}</div>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(generatedItinerary.itinerary).map(([day, activities]) => (
                    <div key={day} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-gray-900 mb-3">Day {day}</h4>
                      <div className="space-y-3">
                        {activities.map(activity => (
                          <div key={activity.id} className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Clock className="w-4 h-4 text-purple-600" />
                                  <span className="text-sm font-medium text-purple-600">{activity.time}</span>
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                    {activity.duration}
                                  </span>
                                </div>
                                <h5 className="font-medium text-gray-900">{activity.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                  <span>🚗 {activity.travel}</span>
                                  {activity.aiGenerated && (
                                    <span className="flex items-center gap-1">
                                      <Sparkles className="w-3 h-3" />
                                      AI-suggested
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setGeneratedItinerary(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate New
                  </button>
                  <button
                    onClick={() => {
                      if (selectedTripForLogistics) {
                        applyAiItineraryToTrip(selectedTripForLogistics, generatedItinerary);
                        setShowAiItineraryBuilder(false);
                      } else {
                        alert('Please select a trip first from the Plan Trip section');
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Apply to Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Compatibility Score Display Component
  const CompatibilityScoreCard = ({ tripId }) => {
    if (!showCompatibilityScore) return null;
    
    const compatibility = getCompatibilityWithTripHost(tripId);
    if (!compatibility) return null;

    const getScoreColor = (score) => {
      if (score >= 80) return 'bg-green-500';
      if (score >= 60) return 'bg-blue-500';
      if (score >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const getScoreTextColor = (score) => {
      if (score >= 80) return 'text-green-700';
      if (score >= 60) return 'text-blue-700';
      if (score >= 40) return 'text-yellow-700';
      return 'text-red-700';
    };

    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">AI Compatibility Score</h4>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">BETA</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreTextColor(compatibility.score)}`}>
            {compatibility.score}/100
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className={`${getScoreColor(compatibility.score)} h-3 rounded-full transition-all`}
              style={{ width: `${compatibility.score}%` }}
            ></div>
          </div>
          <span className={`text-sm font-medium ${getScoreTextColor(compatibility.score)}`}>
            {compatibility.level}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-3">{compatibility.recommendation}</p>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Top Match Factors:</p>
          {compatibility.factors.map((factor, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span className="text-gray-700">
                <strong>{factor.factor}:</strong> {factor.match}
              </span>
              <span className="text-purple-600 font-medium">+{factor.points}pts</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3 italic">
          💡 This score is advisory only and doesn't affect your ability to join.
        </p>
      </div>
    );
  };

  // ============================================
  // EXPERIENCE SHARING & INSPIRATION COMPONENTS
  // ============================================

  // Story Card Component
  const StoryCard = ({ story, compact = false }) => {
    const isSaved = savedItems.stories?.includes(story.id);
    const analytics = calculateCostAnalytics(story);

    if (compact) {
      return (
        <div 
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedStory(story)}
        >
          <div className="relative h-40">
            <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover rounded-t-lg" />
            <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-xs ml-1">{story.views}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{story.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{story.destination}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{story.duration}</span>
              {analytics && (
                <span className="font-medium text-green-600">
                  ₹{analytics.perDay}/day
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-64">
          <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveItem('stories', story.id);
              }}
              className={`${isSaved ? 'bg-red-500' : 'bg-white'} p-2 rounded-full shadow hover:scale-110 transition-transform`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
          {analytics && analytics.isUnderBudget && (
            <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Under Budget ↓ {Math.abs(analytics.variancePercentage)}%
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {story.author.avatar}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{story.author.name}</div>
              <div className="text-sm text-gray-500">{story.publishedDate}</div>
            </div>
          </div>

          <h2 
            className="text-2xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-blue-600"
            onClick={() => setSelectedStory(story)}
          >
            {story.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags.map((tag, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{story.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{story.duration}</span>
            </div>
            {analytics && (
              <>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>₹{analytics.totalActual.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <TrendUp className="w-4 h-4" />
                  <span>₹{analytics.perDay}/day</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" /> {story.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> {story.comments}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="w-4 h-4" /> {story.bookmarks}
              </span>
            </div>
            <button
              onClick={() => setSelectedStory(story)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              Read More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Full Story View Component
  const StoryDetailView = () => {
    if (!selectedStory) return null;

    const analytics = calculateCostAnalytics(selectedStory);
    const story = selectedStory;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
          {/* Cover Image */}
          <div className="relative h-96">
            <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {story.author.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{story.author.name}</div>
                  <div className="text-sm text-gray-500">
                    Published on {story.publishedDate} • {story.views} views
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={() => toggleSaveItem('stories', story.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    savedItems.stories?.includes(story.id)
                      ? 'bg-red-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {savedItems.stories?.includes(story.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Introduction */}
            {story.sections.introduction && (
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {story.sections.introduction}
                </p>
              </div>
            )}

            {/* Route & Places */}
            {story.sections.route?.enabled && (
              <div className="mb-8 bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Route & Places Covered</h2>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {story.sections.route.places.map((place, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="bg-white px-4 py-2 rounded-lg font-medium text-gray-900">
                        {place}
                      </span>
                      {idx < story.sections.route.places.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-blue-600 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700">
                  <strong>Highlights:</strong> {story.sections.route.highlights}
                </p>
              </div>
            )}

            {/* Budget Breakdown */}
            {story.sections.budget?.enabled && analytics && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Cost Breakdown</h2>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Spent</div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{analytics.totalActual.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Per Day</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{analytics.perDay.toLocaleString()}
                    </div>
                  </div>
                  <div className={`${analytics.isUnderBudget ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
                    <div className="text-sm text-gray-600 mb-1">Budget Variance</div>
                    <div className={`text-2xl font-bold ${analytics.isUnderBudget ? 'text-green-600' : 'text-red-600'}`}>
                      {analytics.isUnderBudget ? '-' : '+'}{Math.abs(analytics.variancePercentage)}%
                    </div>
                  </div>
                </div>

                {/* Category-wise Breakdown */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Category-wise Spending</h3>
                  <div className="space-y-4">
                    {analytics.categoryVariances.map((cat, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{cat.category}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                              Planned: ₹{cat.planned.toLocaleString()}
                            </span>
                            <span className="font-semibold text-gray-900">
                              Actual: ₹{cat.actual.toLocaleString()}
                            </span>
                            <span className={`text-sm font-medium ${cat.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {cat.variance >= 0 ? '+' : ''}{cat.variancePercentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-400 h-3 rounded-full"
                              style={{ width: `${(cat.planned / analytics.totalPlanned) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className={`${cat.variance >= 0 ? 'bg-red-500' : 'bg-green-500'} h-3 rounded-full`}
                              style={{ width: `${(cat.actual / analytics.totalActual) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lessons Learned */}
            {story.sections.lessons?.enabled && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Lessons & Tips</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mistakes */}
                  {story.sections.lessons.mistakes?.length > 0 && (
                    <div className="bg-red-50 rounded-lg p-5">
                      <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Mistakes Made
                      </h3>
                      <ul className="space-y-2">
                        {story.sections.lessons.mistakes.map((mistake, idx) => (
                          <li key={idx} className="text-red-800 text-sm flex items-start gap-2">
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {story.sections.lessons.tips?.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-5">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Pro Tips
                      </h3>
                      <ul className="space-y-2">
                        {story.sections.lessons.tips.map((tip, idx) => (
                          <li key={idx} className="text-green-800 text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Would Do Differently */}
                  {story.sections.lessons.wouldDoDifferently?.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-5 md:col-span-2">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5" />
                        What I'd Do Differently
                      </h3>
                      <ul className="space-y-2">
                        {story.sections.lessons.wouldDoDifferently.map((item, idx) => (
                          <li key={idx} className="text-blue-800 text-sm flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {story.sections.recommendations?.enabled && (
              <div className="mb-8 bg-purple-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Best For:</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.sections.recommendations.bestFor.map((item, idx) => (
                        <span key={idx} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Not Recommended For:</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.sections.recommendations.notRecommendedFor.map((item, idx) => (
                        <span key={idx} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Best Time to Visit:</h3>
                    <p className="text-purple-800">{story.sections.recommendations.bestTime}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Fitness Level Required:</h3>
                    <p className="text-purple-800">{story.sections.recommendations.fitnessLevel}</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Plan a Similar Trip
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                <Bookmark className="w-5 h-5" />
                Save to Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cost Analytics Modal
  const CostAnalyticsModal = () => {
    if (!showCostAnalytics || !selectedTripForAnalytics) return null;

    const destinationData = getDestinationAverageCost(selectedTripForAnalytics.destination);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cost Analytics</h2>
            </div>
            <button
              onClick={() => {
                setShowCostAnalytics(false);
                setSelectedTripForAnalytics(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {destinationData && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Typical Costs for {selectedTripForAnalytics.destination}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Average Total</div>
                  <div className="text-xl font-bold text-blue-600">
                    ₹{destinationData.averageTotal.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Average Per Day</div>
                  <div className="text-xl font-bold text-green-600">
                    ₹{destinationData.averagePerDay.toLocaleString()}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Based on</div>
                  <div className="text-xl font-bold text-purple-600">
                    {destinationData.sampleSize} trips
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Cost Range:</strong> ₹{destinationData.range.min.toLocaleString()} - 
                  ₹{destinationData.range.max.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Before-After Comparison Modal
  const BeforeAfterComparisonModal = () => {
    if (!showBeforeAfterModal || !selectedTripForComparison) return null;

    const comparisonData = getComparisonData(selectedTripForComparison.id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Before vs After: Trip Expectations</h2>
            <button
              onClick={() => {
                setShowBeforeAfterModal(false);
                setSelectedTripForComparison(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Before Trip (Expectations)</h3>
              {comparisonData?.before ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Expected Budget</div>
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{comparisonData.before.budget?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expected Comfort Level</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {comparisonData.before.comfort}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expected Pace</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {comparisonData.before.pace}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No expectations recorded</p>
              )}
            </div>

            {/* After */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">After Trip (Reality)</h3>
              {comparisonData?.after ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Actual Budget</div>
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{comparisonData.after.budget?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Actual Comfort Level</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {comparisonData.after.comfort}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Actual Pace</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {comparisonData.after.pace}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Trip not completed yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // SEARCH & DISCOVERY UI COMPONENTS
  // ============================================

  // Advanced Filters Panel
  const AdvancedFiltersPanel = () => {
    
    // Auto-scroll to filters when opened
    const filtersRef = React.useRef(null);
    React.useEffect(() => {
      if (showAdvancedFilters && filtersRef.current) {
        setTimeout(() => {
          filtersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }, [showAdvancedFilters]);
    
    if (!showAdvancedFilters) return null;

    return (
      <div ref={filtersRef} className="bg-white rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-500 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Advanced Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Range */}
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={advancedFilters.budgetRange.enabled}
                onChange={(e) => setAdvancedFilters({
                  ...advancedFilters,
                  budgetRange: { ...advancedFilters.budgetRange, enabled: e.target.checked }
                })}
                className="w-4 h-4"
              />
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">Budget Range</span>
            </label>
            {advancedFilters.budgetRange.enabled && (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={advancedFilters.budgetRange.min}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    budgetRange: { ...advancedFilters.budgetRange, min: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={advancedFilters.budgetRange.max}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    budgetRange: { ...advancedFilters.budgetRange, max: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{advancedFilters.budgetRange.min.toLocaleString()}</span>
                  <span>₹{advancedFilters.budgetRange.max.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Group Size */}
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={advancedFilters.groupSize.enabled}
                onChange={(e) => setAdvancedFilters({
                  ...advancedFilters,
                  groupSize: { ...advancedFilters.groupSize, enabled: e.target.checked }
                })}
                className="w-4 h-4"
              />
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">Group Size</span>
            </label>
            {advancedFilters.groupSize.enabled && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={advancedFilters.groupSize.min}
                    onChange={(e) => setAdvancedFilters({
                      ...advancedFilters,
                      groupSize: { ...advancedFilters.groupSize, min: parseInt(e.target.value) }
                    })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                    placeholder="Min"
                  />
                  <span className="py-1">to</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={advancedFilters.groupSize.max}
                    onChange={(e) => setAdvancedFilters({
                      ...advancedFilters,
                      groupSize: { ...advancedFilters.groupSize, max: parseInt(e.target.value) }
                    })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Trip Pace */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-gray-900">Trip Pace</span>
            </div>
            <div className="space-y-2">
              {['relaxed', 'moderate', 'fast'].map(pace => (
                <label key={pace} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={advancedFilters.pace.includes(pace)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAdvancedFilters({
                          ...advancedFilters,
                          pace: [...advancedFilters.pace, pace]
                        });
                      } else {
                        setAdvancedFilters({
                          ...advancedFilters,
                          pace: advancedFilters.pace.filter(p => p !== pace)
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 capitalize">{pace}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={advancedFilters.duration.enabled}
                onChange={(e) => setAdvancedFilters({
                  ...advancedFilters,
                  duration: { ...advancedFilters.duration, enabled: e.target.checked }
                })}
                className="w-4 h-4"
              />
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-900">Duration (days)</span>
            </label>
            {advancedFilters.duration.enabled && (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={advancedFilters.duration.min}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    duration: { ...advancedFilters.duration, min: parseInt(e.target.value) }
                  })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Min"
                />
                <span className="py-1">to</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={advancedFilters.duration.max}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    duration: { ...advancedFilters.duration, max: parseInt(e.target.value) }
                  })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Max"
                />
              </div>
            )}
          </div>

          {/* Trip Types */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">Trip Type</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {['Adventure', 'Beach', 'Cultural', 'City', 'Wildlife', 'Spiritual', 'Road Trip', 'Snow'].map(type => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={advancedFilters.tripTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAdvancedFilters({
                          ...advancedFilters,
                          tripTypes: [...advancedFilters.tripTypes, type]
                        });
                      } else {
                        setAdvancedFilters({
                          ...advancedFilters,
                          tripTypes: advancedFilters.tripTypes.filter(t => t !== type)
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verification Level */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">Verification</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={advancedFilters.verificationLevel.idVerified}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    verificationLevel: {
                      ...advancedFilters.verificationLevel,
                      idVerified: e.target.checked
                    }
                  })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 text-sm">ID Verified Hosts</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={advancedFilters.verificationLevel.emailVerified}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    verificationLevel: {
                      ...advancedFilters.verificationLevel,
                      emailVerified: e.target.checked
                    }
                  })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 text-sm">Email Verified</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={advancedFilters.verificationLevel.highTrustScore}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    verificationLevel: {
                      ...advancedFilters.verificationLevel,
                      highTrustScore: e.target.checked
                    }
                  })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 text-sm">High Trust Score (≥80)</span>
              </label>
            </div>
          </div>

          {/* Availability */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-900">Availability</span>
            </div>
            <select
              value={advancedFilters.availability}
              onChange={(e) => setAdvancedFilters({
                ...advancedFilters,
                availability: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Trips</option>
              <option value="available">Available Spots</option>
              <option value="last-few-slots">Last Few Slots</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  // Map View Component (Simplified - production would use Google Maps/Mapbox)
  const MapView = ({ trips }) => {
    const clusters = getMapClusters(trips, mapZoom);

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Map Controls */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Map className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Map View</span>
            <span className="text-gray-400 text-sm">{trips.length} trips</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simplified Map Display */}
        <div className="relative h-96 bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Interactive Map View</p>
              <p className="text-gray-500 text-sm">
                Production version would integrate Google Maps/Mapbox API
              </p>
            </div>
          </div>

          {/* Trip Clusters/Pins Overlay */}
          <div className="absolute inset-0 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {clusters.map((cluster, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedMapTrip(cluster.trips[0])}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Pin className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-900">{cluster.location}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {cluster.count} trip{cluster.count > 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    ₹{cluster.priceRange.min.toLocaleString()} - ₹{cluster.priceRange.max.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Trip Preview */}
        {selectedMapTrip && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{selectedMapTrip.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedMapTrip.destination}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600 font-medium">{selectedMapTrip.pricePerPerson}</span>
                  <span className="text-gray-600">{selectedMapTrip.dates}</span>
                </div>
              </div>
              <button
                onClick={() => handleJoinTrip(selectedMapTrip)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Calendar View Component
  const CalendarView = ({ trips }) => {
    const daysInMonth = 31; // Simplified
    const calendarTrips = getTripsForCalendar(calendarMonth);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newDate = new Date(calendarMonth);
                newDate.setMonth(newDate.getMonth() - 1);
                setCalendarMonth(newDate);
              }}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setCalendarMonth(new Date())}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => {
                const newDate = new Date(calendarMonth);
                newDate.setMonth(newDate.getMonth() + 1);
                setCalendarMonth(newDate);
              }}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-600 text-sm py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dayTrips = calendarTrips.slice(0, 2); // Simplified - would filter by actual date
            const hasTrips = dayTrips.length > 0;
            
            return (
              <div
                key={day}
                className={`min-h-24 border border-gray-200 rounded p-2 ${
                  hasTrips ? 'bg-blue-50 cursor-pointer hover:bg-blue-100' : 'bg-white'
                }`}
                onClick={() => hasTrips && setSelectedDate(day)}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                {hasTrips && (
                  <div className="space-y-1">
                    {dayTrips.map((trip, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded truncate"
                      >
                        {trip.destination.split(',')[0]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Trips Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-gray-600">Fully Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">Last Few Slots</span>
          </div>
        </div>
      </div>
    );
  };

  // Discovery Section Component
  const DiscoverySection = () => {
    const getDiscoveryTrips = () => {
      switch (discoverySection) {
        case 'trending':
          return getTrendingTrips();
        case 'recent':
          return getRecentTrips();
        case 'high-rated':
          return getHighTrustTrips();
        case 'personalized':
          return getPersonalizedTrips();
        default:
          return getTrendingTrips();
      }
    };

    const discoveryTrips = getDiscoveryTrips();

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'trending', label: 'Trending', icon: Flame },
            { id: 'recent', label: 'New', icon: Sparkles },
            { id: 'high-rated', label: 'Top Rated', icon: Star },
            { id: 'personalized', label: 'For You', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setDiscoverySection(id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                discoverySection === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoveryTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {discoveryTrips.length === 0 && (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading discoveries...</p>
          </div>
        )}
      </div>
    );
  };

  // ============ GROUP CHAT COMPONENT ============
  const GroupChat = () => {
    const trip = trips.find(t => t.id === selectedTripForChat);
    if (!trip) return null;

    const members = getTripMembers(selectedTripForChat);
    const messages = tripMessages[selectedTripForChat] || [];
    const currentUserRole = getUserRole(selectedTripForChat);
    const languageAnalysis = analyzeLanguageOverlap(selectedTripForChat);
    const languageSummary = getLanguageSummary(selectedTripForChat);
    
    const [newPoll, setNewPoll] = useState({
      question: '',
      options: ['', ''],
      type: 'single', // single, multiple
      deadline: ''
    });

    const pinnedMsgs = messages.filter(msg => msg.pinned);

    const handleSendMessage = () => {
      if (messageInput.trim()) {
        sendMessage(selectedTripForChat, messageInput);
      }
    };

    const getRoleBadge = (role) => {
      const badges = {
        admin: { text: 'Admin', color: 'bg-red-500', icon: Crown },
        'co-admin': { text: 'Co-Admin', color: 'bg-orange-500', icon: UserCheck },
        member: { text: '', color: '', icon: null }
      };
      return badges[role] || badges.member;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h2 className="text-xl font-bold">{trip.title}</h2>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Users className="w-4 h-4" />
                  <span>{members.length} members</span>
                  <span>•</span>
                  <Globe className="w-4 h-4" />
                  <span>{languageSummary}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowGroupChat(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Language Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {languageAnalysis.languageStats.slice(0, 5).map(stat => (
                <span 
                  key={stat.language}
                  className="text-xs bg-white/20 px-2 py-1 rounded-full"
                >
                  {stat.language} ({Math.round(stat.percentage)}%)
                </span>
              ))}
            </div>
          </div>

          {/* Pinned Messages */}
          {pinnedMsgs.length > 0 && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-3">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <Pin className="w-4 h-4" />
                <span className="font-semibold text-sm">Pinned Messages</span>
              </div>
              {pinnedMsgs.map(msg => (
                <div key={msg.id} className="text-sm text-yellow-900 bg-yellow-100 p-2 rounded mb-1">
                  <strong>{msg.userName}:</strong> {msg.content}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-1 overflow-hidden">
            {/* Members Sidebar */}
            <div className="w-64 border-r bg-gray-50 overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Group Members</h3>
                <div className="space-y-2">
                  {members.map(member => {
                    const badge = getRoleBadge(member.role);
                    const BadgeIcon = badge.icon;
                    return (
                      <div key={member.id} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{member.name}</span>
                          {badge.text && (
                            <div className={`flex items-center gap-1 ${badge.color} text-white text-xs px-2 py-1 rounded-full`}>
                              {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                              {badge.text}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map(lang => (
                            <span key={lang} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                        {currentUserRole === 'admin' && member.id !== 'user-1' && (
                          <select
                            value={member.role}
                            onChange={(e) => assignRole(selectedTripForChat, member.id, e.target.value)}
                            className="mt-2 text-xs border rounded px-2 py-1 w-full"
                          >
                            <option value="member">Member</option>
                            <option value="co-admin">Co-Admin</option>
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map(msg => {
                    if (msg.type === 'system') {
                      return (
                        <div key={msg.id} className="text-center">
                          <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                            {msg.content}
                          </span>
                        </div>
                      );
                    }

                    if (msg.type === 'poll') {
                      const poll = polls[selectedTripForChat]?.find(p => p.id === msg.content);
                      if (!poll) return null;

                      const results = getPollResults(poll.id, selectedTripForChat);
                      const hasVoted = userVotes[poll.id];

                      return (
                        <div key={msg.id} className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-5 h-5 text-purple-600" />
                              <span className="font-semibold text-purple-900">{poll.question}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              poll.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {poll.status}
                            </span>
                          </div>

                          {poll.status === 'active' && !hasVoted ? (
                            <div className="space-y-2">
                              {poll.options.map(option => (
                                <button
                                  key={option}
                                  onClick={() => votePoll(selectedTripForChat, poll.id, poll.type === 'single' ? option : [option])}
                                  className="w-full text-left px-4 py-2 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                              <div className="text-xs text-purple-600 mt-2">
                                {poll.type === 'multiple' ? '✓ Multiple choice' : '○ Single choice'}
                                {poll.deadline && ` • Ends: ${new Date(poll.deadline).toLocaleDateString()}`}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {poll.options.map(option => {
                                const votes = results?.results[option] || 0;
                                const percentage = results?.totalVotes > 0 ? (votes / results.totalVotes) * 100 : 0;
                                const isWinner = results?.winner?.[0] === option;

                                return (
                                  <div key={option} className="bg-white p-3 rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className={`font-medium ${isWinner ? 'text-green-600' : 'text-gray-900'}`}>
                                        {isWinner && '🏆 '}{option}
                                      </span>
                                      <span className="text-sm text-gray-600">{votes} votes</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${isWinner ? 'bg-green-500' : 'bg-purple-500'}`}
                                        style={{ width: `${percentage}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                              <div className="text-xs text-gray-600 mt-2">
                                {results?.totalVotes} / {results?.totalMembers} members voted ({Math.round(results?.participation || 0)}% participation)
                              </div>
                              {currentUserRole !== 'member' && poll.status === 'active' && (
                                <button
                                  onClick={() => closePoll(selectedTripForChat, poll.id)}
                                  className="text-xs text-purple-600 hover:text-purple-700 mt-2"
                                >
                                  Close Poll
                                </button>
                              )}
                            </div>
                          )}

                          <div className="text-xs text-gray-500 mt-3">
                            Created by {poll.createdBy} • {new Date(poll.createdAt).toLocaleString()}
                          </div>
                        </div>
                      );
                    }

                    // Regular text message
                    const badge = getRoleBadge(msg.userRole);
                    const isCurrentUser = msg.userId === 'current-user';

                    return (
                      <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} p-3 rounded-lg`}>
                          {msg.replyTo && (
                            <div className="text-xs opacity-75 mb-2 p-2 bg-black/10 rounded">
                              <Reply className="w-3 h-3 inline mr-1" />
                              Replying to message
                            </div>
                          )}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{msg.userName}</span>
                            {badge.text && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${badge.color} text-white`}>
                                {badge.text}
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{msg.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                            <span>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                            {(currentUserRole === 'admin' || currentUserRole === 'co-admin') && (
                              <div className="flex gap-2">
                                <button onClick={() => pinMessage(selectedTripForChat, msg.id)} className="hover:opacity-100">
                                  <Pin className="w-3 h-3" />
                                </button>
                                {currentUserRole === 'admin' && (
                                  <button onClick={() => deleteMessage(selectedTripForChat, msg.id)} className="hover:opacity-100">
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-4 bg-gray-50">
                {replyingTo && (
                  <div className="bg-blue-50 p-2 rounded mb-2 text-sm flex justify-between items-center">
                    <span className="text-blue-600">Replying to message</span>
                    <button onClick={() => setReplyingTo(null)} className="text-blue-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex gap-2 mb-2">
                  {(currentUserRole === 'admin' || currentUserRole === 'co-admin') && (
                    <button
                      onClick={() => setShowPollForm(!showPollForm)}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center gap-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Poll
                    </button>
                  )}
                </div>

                {showPollForm && (
                  <div className="bg-purple-50 p-4 rounded-lg mb-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Create Poll</h4>
                    <input
                      type="text"
                      placeholder="Poll question"
                      value={newPoll.question}
                      onChange={(e) => setNewPoll({...newPoll, question: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                    />
                    {newPoll.options.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...newPoll.options];
                          newOpts[idx] = e.target.value;
                          setNewPoll({...newPoll, options: newOpts});
                        }}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                      />
                    ))}
                    <button
                      onClick={() => setNewPoll({...newPoll, options: [...newPoll.options, '']})}
                      className="text-sm text-purple-600 hover:text-purple-700 mb-2"
                    >
                      + Add Option
                    </button>
                    <div className="flex gap-2">
                      <select
                        value={newPoll.type}
                        onChange={(e) => setNewPoll({...newPoll, type: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                      </select>
                      <input
                        type="datetime-local"
                        value={newPoll.deadline}
                        onChange={(e) => setNewPoll({...newPoll, deadline: e.target.value})}
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          if (newPoll.question && newPoll.options.filter(o => o.trim()).length >= 2) {
                            createPoll(selectedTripForChat, {
                              ...newPoll,
                              options: newPoll.options.filter(o => o.trim())
                            });
                            setNewPoll({ question: '', options: ['', ''], type: 'single', deadline: '' });
                            setShowPollForm(false);
                          }
                        }}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                      >
                        Create Poll
                      </button>
                      <button
                        onClick={() => setShowPollForm(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ TRIP LOGISTICS COMPONENT ============
  const TripLogistics = () => {
    const trip = trips.find(t => t.id === selectedTripForLogistics);
    if (!trip) return null;

    const [selectedDay, setSelectedDay] = useState(1);
    const [newActivity, setNewActivity] = useState({ title: '', time: '', location: '', notes: '' });
    const [newExpense, setNewExpense] = useState({ 
      title: '', amount: '', currency: 'INR', category: 'food', 
      paidBy: userProfile.name, participants: [], splitType: 'equal' 
    });
    const [newPackingItem, setNewPackingItem] = useState({ item: '', category: 'personal', isShared: false });

    // Initialize packing list with suggestions if empty
    if (!packingLists[trip.id]) {
      const suggestions = getPackingSuggestions(trip.type);
      setPackingLists(prev => ({
        ...prev,
        [trip.id]: {
          items: suggestions.map((s, i) => ({ id: i + 1, ...s, checked: false, addedBy: 'System' }))
        }
      }));
    }

    // Initialize weather data
    if (!weatherData[trip.id]) {
      const weather = fetchWeatherData(trip.destination, trip.dates);
      setWeatherData(prev => ({ ...prev, [trip.id]: weather }));
    }

    const tripDuration = 5; // Calculate from trip.dates in production
    const groupMembers = ['You', 'Sarah K.', 'Raj P.', 'Emma W.']; // Get from trip members

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{trip.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 truncate">{trip.destination} • {trip.dates}</p>
              </div>
              <button 
                onClick={() => setShowLogistics(false)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sub-navigation */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
              {['itinerary', 'expenses', 'packing', 'weather'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setLogisticsTab(tab)}
                  className={`flex-shrink-0 py-2 px-3 sm:px-4 rounded-md transition-colors capitalize text-sm sm:text-base whitespace-nowrap ${
                    logisticsTab === tab 
                      ? 'bg-white text-blue-600 font-medium shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'itinerary' && <Calendar className="w-4 h-4 inline mr-1 sm:mr-2" />}
                  {tab === 'expenses' && <DollarSign className="w-4 h-4 inline mr-1 sm:mr-2" />}
                  {tab === 'packing' && <Package className="w-4 h-4 inline mr-1 sm:mr-2" />}
                  {tab === 'weather' && <Cloud className="w-4 h-4 inline mr-1 sm:mr-2" />}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            {/* ITINERARY TAB */}
            {logisticsTab === 'itinerary' && (
              <div className="space-y-6">
                {/* Day Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[...Array(tripDuration)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setSelectedDay(i + 1)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedDay === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Day {i + 1}
                    </button>
                  ))}
                </div>

                {/* Add Activity Form */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">➕ Add Activity</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Activity title"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Notes (optional)"
                      value={newActivity.notes}
                      onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (newActivity.title && newActivity.time) {
                        addActivity(trip.id, selectedDay, newActivity);
                        setNewActivity({ title: '', time: '', location: '', notes: '' });
                      }
                    }}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add to Day {selectedDay}
                  </button>
                </div>

                {/* Activities List */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Day {selectedDay} Schedule</h3>
                  {(itineraries[trip.id]?.days?.[selectedDay] || []).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No activities planned for this day</p>
                    </div>
                  ) : (
                    (itineraries[trip.id]?.days?.[selectedDay] || [])
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map(activity => (
                        <div key={activity.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-blue-600">{activity.time}</span>
                                <span className="text-gray-400">•</span>
                                <span className="font-medium text-gray-900">{activity.title}</span>
                              </div>
                              {activity.location && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                  <MapPin className="w-4 h-4" />
                                  {activity.location}
                                </div>
                              )}
                              {activity.notes && (
                                <p className="text-sm text-gray-600 mt-2">{activity.notes}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                <User className="w-3 h-3" />
                                Added by {activity.createdBy}
                                {activity.editHistory?.length > 0 && (
                                  <span className="text-orange-600">
                                    (edited {activity.editHistory.length} time{activity.editHistory.length > 1 ? 's' : ''})
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700 p-1">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteActivity(trip.id, selectedDay, activity.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* EXPENSES TAB */}
            {logisticsTab === 'expenses' && (
              <div className="space-y-6">
                {/* Add Expense Form */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">➕ Add Expense</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Expense title"
                      value={newExpense.title}
                      onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                      className="px-3 py-2 border rounded-lg w-full"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        className="px-3 py-2 border rounded-lg w-full"
                      />
                      <select
                        value={newExpense.currency}
                        onChange={(e) => setNewExpense({...newExpense, currency: e.target.value})}
                        className="px-2 sm:px-3 py-2 border rounded-lg w-full text-sm sm:text-base"
                      >
                        <option value="INR">₹ INR</option>
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                        <option value="GBP">£ GBP</option>
                      </select>
                    </div>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                      className="px-3 py-2 border rounded-lg w-full"
                    >
                      <option value="food">🍽️ Food</option>
                      <option value="travel">🚗 Travel</option>
                      <option value="stay">🏨 Stay</option>
                      <option value="activities">🎯 Activities</option>
                      <option value="other">📦 Other</option>
                    </select>
                    <select
                      value={newExpense.paidBy}
                      onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    >
                      {groupMembers.map(member => (
                        <option key={member} value={member}>{member} paid</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Split between:</label>
                    <div className="flex flex-wrap gap-2">
                      {groupMembers.map(member => (
                        <label key={member} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newExpense.participants.includes(member)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewExpense({...newExpense, participants: [...newExpense.participants, member]});
                              } else {
                                setNewExpense({...newExpense, participants: newExpense.participants.filter(p => p !== member)});
                              }
                            }}
                          />
                          <span className="text-sm">{member}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (newExpense.title && newExpense.amount && newExpense.participants.length > 0) {
                        addTripExpense(trip.id, {
                          ...newExpense,
                          amount: parseFloat(newExpense.amount)
                        });
                        setNewExpense({ 
                          title: '', amount: '', currency: 'INR', category: 'food', 
                          paidBy: userProfile.name, participants: [], splitType: 'equal' 
                        });
                      }
                    }}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add Expense
                  </button>
                </div>

                {/* Expense Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Total Spent</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{(tripExpenses[trip.id] || []).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Your Share</div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{Math.abs(calculateExpenseSplit(trip.id)[userProfile.name] || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Total Expenses</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {(tripExpenses[trip.id] || []).length}
                    </div>
                  </div>
                </div>

                {/* Expense List */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">All Expenses</h3>
                  {(tripExpenses[trip.id] || []).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <DollarSign className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No expenses added yet</p>
                    </div>
                  ) : (
                    (tripExpenses[trip.id] || []).map(expense => (
                      <div key={expense.id} className="bg-white border border-gray-200 p-3 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{expense.title}</div>
                          <div className="text-xs sm:text-sm text-gray-600 truncate">
                            {expense.paidBy} paid • Split among {expense.participants.length} • {expense.category}
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="font-bold text-gray-900 text-sm sm:text-base">{expense.currency} {expense.amount.toFixed(2)}</div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {expense.currency} {(expense.amount / expense.participants.length).toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Settlement Summary */}
                {getSettlementSummary(trip.id).length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">💰 Settlement Summary</h3>
                    <div className="space-y-2">
                      {getSettlementSummary(trip.id).map((settlement, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <span className="text-gray-700">
                            <strong>{settlement.from}</strong> pays <strong>{settlement.to}</strong>
                          </span>
                          <span className="font-bold text-green-600">₹{settlement.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PACKING TAB */}
            {logisticsTab === 'packing' && (
              <div className="space-y-6">
                {/* Add Custom Item */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">➕ Add Custom Item</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={newPackingItem.item}
                      onChange={(e) => setNewPackingItem({...newPackingItem, item: e.target.value})}
                      className="flex-1 px-3 py-2 border rounded-lg w-full"
                    />
                    <select
                      value={newPackingItem.category}
                      onChange={(e) => setNewPackingItem({...newPackingItem, category: e.target.value})}
                      className="px-3 py-2 border rounded-lg w-full sm:w-auto"
                    >
                      <option value="personal">Personal</option>
                      <option value="shared">Shared</option>
                      <option value="clothing">Clothing</option>
                      <option value="gear">Gear</option>
                      <option value="electronics">Electronics</option>
                    </select>
                    <button
                      onClick={() => {
                        if (newPackingItem.item) {
                          addCustomPackingItem(trip.id, newPackingItem);
                          setNewPackingItem({ item: '', category: 'personal', isShared: false });
                        }
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto flex-shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Packing Progress</span>
                    <span className="text-sm text-gray-600">
                      {packingLists[trip.id]?.items.filter(i => i.checked).length || 0} / {packingLists[trip.id]?.items.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ 
                        width: `${((packingLists[trip.id]?.items.filter(i => i.checked).length || 0) / (packingLists[trip.id]?.items.length || 1) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Packing List */}
                <div className="space-y-4">
                  {['essential', 'clothing', 'gear', 'electronics', 'health', 'personal'].map(category => {
                    const items = (packingLists[trip.id]?.items || []).filter(i => i.category === category);
                    if (items.length === 0) return null;
                    
                    return (
                      <div key={category} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 capitalize">{category}</h4>
                        <div className="space-y-2">
                          {items.map(item => (
                            <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={(e) => togglePackingItem(trip.id, item.id, e.target.checked)}
                                className="w-5 h-5"
                              />
                              <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                {item.item}
                                {item.essential && <span className="ml-2 text-red-500">*</span>}
                              </span>
                              {item.checked && <Check className="w-5 h-5 text-green-600" />}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WEATHER TAB */}
            {logisticsTab === 'weather' && (
              <div className="space-y-6">
                {/* Weather Alerts */}
                {weatherData[trip.id]?.alerts.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-red-900">Weather Alerts</h3>
                    </div>
                    <div className="space-y-2">
                      {weatherData[trip.id].alerts.map((alert, idx) => (
                        <div key={idx} className="text-sm text-red-800">
                          ⚠️ {alert.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Season Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">🌟 Best Season to Visit</h3>
                  <p className="text-green-800">{weatherData[trip.id]?.bestSeason}</p>
                  <p className="text-sm text-green-700 mt-1">{weatherData[trip.id]?.seasonInfo}</p>
                </div>

                {/* Forecast */}
                <div className="overflow-hidden -mx-4 sm:mx-0">
                  <h3 className="font-semibold text-gray-900 mb-4 px-4 sm:px-0">5-Day Forecast</h3>
                  <div className="flex md:grid md:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 snap-x snap-mandatory -mr-4 sm:mr-0">
                    {(weatherData[trip.id]?.forecast || []).map((day, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 p-3 sm:p-4 rounded-lg flex-shrink-0 w-[260px] sm:w-[280px] md:w-auto snap-start">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{day.date}</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-700">
                              {day.temp.min}° - {day.temp.max}°C
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {day.condition === 'Sunny' && <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />}
                            {day.condition === 'Rainy' && <CloudRain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />}
                            {day.condition === 'Cloudy' && <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />}
                            {day.condition === 'Partly Cloudy' && <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />}
                            {day.condition === 'Snowy' && <CloudSnow className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CloudRain className="w-3 h-3 sm:w-4 sm:h-4" />
                            {day.rainProb}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Wind className="w-3 h-3 sm:w-4 sm:h-4" />
                            {day.wind} km/h
                          </div>
                        </div>
                        <div className="mt-2 text-xs sm:text-sm font-medium text-gray-700">{day.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Verification Modal Component
  const VerificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Verify Your Profile</h2>
              <p className="text-sm text-gray-600">Increase your trust score and safety</p>
            </div>
            <button onClick={() => setShowVerificationModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          {verificationStep === 'choose' && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">🛡️ Why Verify?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Build trust with other travelers</li>
                  <li>✓ Increase your trust score</li>
                  <li>✓ Get priority in trip selections</li>
                  <li>✓ All data is encrypted and secure</li>
                </ul>
              </div>

              <div 
                onClick={() => setVerificationStep('id-upload')}
                className="border-2 border-gray-200 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">ID Verification</h3>
                    <p className="text-sm text-gray-600">Upload government ID (+25 points)</p>
                  </div>
                  <div className="text-2xl">{userProfile.idVerified ? '✅' : '📄'}</div>
                </div>
              </div>

              <div 
                onClick={() => setVerificationStep('email-verify')}
                className="border-2 border-gray-200 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Verification</h3>
                    <p className="text-sm text-gray-600">Verify your email (+10 points)</p>
                  </div>
                  <div className="text-2xl">{userProfile.emailVerified ? '✅' : '📧'}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Trust Score</span>
                  <span className="text-lg font-bold text-blue-600">{calculateTrustScore(userProfile)}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${calculateTrustScore(userProfile)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {verificationStep === 'id-upload' && (
            <div className="space-y-4">
              <button 
                onClick={() => setVerificationStep('choose')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back
              </button>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-yellow-900 mb-2">🔒 Your Privacy</h3>
                <p className="text-sm text-yellow-800">
                  Your ID is encrypted and only used for verification. 
                  We never share it with other users or third parties.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Government ID (Passport, Driver's License, Aadhar, etc.)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleIdUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Accepted: JPG, PNG, PDF • Max 5MB • Review time: 24-48 hours
                </p>
              </div>

              {selectedIdFile && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">✓ {selectedIdFile.name} uploaded</p>
                </div>
              )}
            </div>
          )}

          {verificationStep === 'email-verify' && (
            <div className="space-y-4">
              <button 
                onClick={() => setVerificationStep('choose')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              {!sentVerificationCode ? (
                <button
                  onClick={sendVerificationEmail}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Send Verification Code
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={emailVerificationCode}
                      onChange={(e) => setEmailVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                  <button
                    onClick={verifyEmailCode}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Verify Email
                  </button>
                  <button
                    onClick={sendVerificationEmail}
                    className="w-full text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Resend Code
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Report User Modal
  const ReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Report User</h2>
              <p className="text-sm text-gray-600">Reporting: {reportedUser?.name}</p>
            </div>
            <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select a reason</option>
                <option value="harassment">Harassment or bullying</option>
                <option value="fake">Fake profile or scam</option>
                <option value="inappropriate">Inappropriate behavior</option>
                <option value="spam">Spam or advertising</option>
                <option value="safety">Safety concerns</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Details *</label>
              <textarea
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="4"
                placeholder="Please provide specific details about the issue..."
              ></textarea>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Privacy:</strong> Your report is confidential. We'll review it within 24 hours.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Emergency Contact Form Modal
  const EmergencyContactModal = () => {
    const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', relation: '' });
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-lg w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
                <p className="text-sm text-gray-600">Add up to 2 trusted contacts</p>
              </div>
              <button onClick={() => setShowEmergencyContactForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">🔒 Your Safety Matters</h3>
              <p className="text-sm text-blue-800">
                Emergency contacts will receive your trip details automatically. 
                All information is encrypted and private.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relation *</label>
                <select
                  value={newContact.relation}
                  onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select relation</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="spouse">Spouse/Partner</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (newContact.name && newContact.phone && newContact.email && newContact.relation) {
                    addEmergencyContact(newContact);
                    setNewContact({ name: '', phone: '', email: '', relation: '' });
                  } else {
                    alert('Please fill all fields');
                  }
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Add Contact ({emergencyContacts.length}/2)
              </button>

              {emergencyContacts.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold text-gray-900">Saved Contacts:</h3>
                  {emergencyContacts.map(contact => (
                    <div key={contact.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.relation} • {contact.phone}</p>
                      </div>
                      <button
                        onClick={() => setEmergencyContacts(emergencyContacts.filter(c => c.id !== contact.id))}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExpenseTracker = ({ tripId }) => {
    const [tripExpenses, setTripExpenses] = useState([
      { id: 1, paidBy: "Rohan Kumar", amount: 5000, description: "Hotel booking", splitBetween: ["Rohan Kumar", "Arjun", "Priya"], date: "Dec 1" },
      { id: 2, paidBy: "Arjun", amount: 3000, description: "Transport", splitBetween: ["Rohan Kumar", "Arjun", "Priya"], date: "Dec 2" },
      { id: 3, paidBy: "Priya", amount: 2000, description: "Food", splitBetween: ["Rohan Kumar", "Arjun", "Priya"], date: "Dec 3" }
    ]);
    const [newExpense, setNewExpense] = useState({ paidBy: '', amount: '', description: '', date: '' });
    
    const members = ["Rohan Kumar", "Arjun", "Priya", "Vikram"];
    
    const calculateBalances = () => {
      const balances = {};
      members.forEach(member => balances[member] = 0);
      
      tripExpenses.forEach(expense => {
        const splitAmount = expense.amount / expense.splitBetween.length;
        expense.splitBetween.forEach(member => {
          balances[member] -= splitAmount;
        });
        balances[expense.paidBy] += expense.amount;
      });
      
      return balances;
    };
    
    const balances = calculateBalances();
    const totalExpense = tripExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Expense Tracker</h2>
                <p className="text-sm text-gray-600">Track and split trip expenses</p>
              </div>
              <button 
                onClick={() => setShowExpenseTracker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Expense</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalExpense.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Per Person</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(totalExpense / members.length).toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-purple-600">{tripExpenses.length}</p>
              </div>
            </div>
            
            {/* Balances */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Balance Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {members.map(member => (
                  <div key={member} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{member}</span>
                    <span className={`font-semibold ${balances[member] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {balances[member] >= 0 ? '+' : ''}₹{Math.round(balances[member])}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Positive = gets money back, Negative = owes money</p>
            </div>
            
            {/* Add Expense Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Expense</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Description"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                >
                  <option value="">Who paid?</option>
                  {members.map(member => <option key={member} value={member}>{member}</option>)}
                </select>
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                />
              </div>
              <button
                onClick={() => {
                  if (newExpense.paidBy && newExpense.amount && newExpense.description) {
                    setTripExpenses([...tripExpenses, {
                      id: tripExpenses.length + 1,
                      ...newExpense,
                      amount: parseFloat(newExpense.amount),
                      splitBetween: members
                    }]);
                    setNewExpense({ paidBy: '', amount: '', description: '', date: '' });
                  }
                }}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Expense
              </button>
            </div>
            
            {/* Expense List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">All Expenses</h3>
              <div className="space-y-2">
                {tripExpenses.map(expense => (
                  <div key={expense.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.description}</p>
                      <p className="text-xs text-gray-500">Paid by {expense.paidBy} • {expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{expense.amount}</p>
                      <p className="text-xs text-gray-500">Split {expense.splitBetween.length} ways</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MemoriesView = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trip Memories</h2>
        <p className="text-gray-600">Share your amazing travel moments with the community</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <textarea
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              placeholder="Share your trip memories... What's the most memorable moment?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            ></textarea>
            
            {/* Image Preview */}
            {selectedFile && (
              <div className="mt-3 relative">
                <img src={selectedFile} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Photo/Video</span>
                </label>
              </div>
              <button
                onClick={handlePostMemory}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Memories Feed */}
      <div className="space-y-6">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* User Info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {memory.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{memory.user}</h3>
                  <p className="text-xs text-gray-500">{memory.trip} • {memory.time}</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <img src={memory.image} alt={memory.caption} className="w-full h-96 object-cover" />

            {/* Actions */}
            <div className="p-4">
              <div className="flex items-center space-x-6 mb-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-6 h-6" />
                  <span className="font-medium">{memory.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-medium">{memory.comments}</span>
                </button>
              </div>
              <p className="text-gray-900">
                <span className="font-semibold mr-2">{memory.user}</span>
                {memory.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Messages List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedChat(msg)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedChat?.id === msg.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{msg.from}</h3>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                      {msg.unread && (
                        <span className="inline-block mt-1 w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {selectedChat.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChat.from}</h3>
                      <p className="text-xs text-green-500">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isMe
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendChatMessage}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const TripCard = ({ trip }) => {
    const spots = tripSpots[trip.id];
    
    return (
    <div className={`card-trip ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="card-trip-image relative h-48 overflow-hidden">
        {lowDataMode ? (
          <div className={`w-full h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
            <div className="text-center">
              <Image className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-2`} />
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Low Data Mode</p>
            </div>
          </div>
        ) : (
          <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
          {trip.budget}
        </div>
        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {trip.type}
        </div>
        {trip.rating && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900 flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {trip.rating} ({trip.reviewCount})
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{trip.title}</h3>
        <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{trip.destination}</span>
        </div>
        <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">{trip.dates}</span>
        </div>
        
        {/* Activities */}
        {trip.activities && trip.activities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {trip.activities.slice(0, 3).map((activity, idx) => (
                <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}>
                  {activity}
                </span>
              ))}
              {trip.activities.length > 3 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  +{trip.activities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {trip.languages && trip.languages.length > 0 && (
          <div className="mb-3 flex items-center">
            <Globe className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} />
            <div className="flex flex-wrap gap-1">
              {trip.languages.map((lang, idx) => (
                <span key={idx} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {lang}{idx < trip.languages.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center text-green-600 font-semibold mb-3">
          <span className="text-lg">{formatCurrency(trip.price, selectedCurrency)}</span>
          <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>per person</span>
          {selectedCurrency !== 'INR' && trip.price && (
            <span className={`text-xs ml-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>(₹{trip.price.toLocaleString()})</span>
          )}
        </div>
        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{trip.description}</p>
        <div className={`flex items-center justify-between pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {trip.host.avatar}
              </div>
              {trip.host.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold text-gray-900">{trip.host.name}</p>
                {trip.host.idVerified && (
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded" title="ID Verified">
                    ID✓
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{trip.host.age} years</span>
                {trip.host.rating && (
                  <span className="text-xs text-yellow-600">★ {trip.host.rating}</span>
                )}
                {trip.host.trustScore && (
                  <span className="text-xs text-blue-600 font-semibold" title="Trust Score">
                    TS: {trip.host.trustScore}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {spots.filled}/{spots.total} spots
            </p>
            {trip.minTrustScore && (
              <p className="text-xs text-gray-600 mt-1">
                <Shield className="w-3 h-3 inline mr-1" />
                Min Score: {trip.minTrustScore}
              </p>
            )}
            <div className="flex flex-col gap-2 mt-1">
              <button 
                onClick={() => handleJoinTrip(trip)}
                className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={joinedTrips.includes(trip.id) || spots.filled >= spots.total}
              >
                {joinedTrips.includes(trip.id) ? 'Joined' : spots.filled >= spots.total ? 'Full' : 'Join Trip'}
              </button>
              {joinedTrips.includes(trip.id) && (
                <>
                  <button 
                    onClick={() => {
                      setSelectedTripForLogistics(trip.id);
                      setShowLogistics(true);
                    }}
                    className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    Plan Trip
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTripForChat(trip.id);
                      setShowGroupChat(true);
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Group Chat
                  </button>
                  
                  {/* Offline & Download Actions */}
                  <div className="flex gap-1 mt-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadTripForOffline(trip.id);
                      }}
                      className={`${
                        downloadedTrips.includes(trip.id) 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1`}
                      title={downloadedTrips.includes(trip.id) ? 'Available offline' : 'Download for offline'}
                    >
                      <Download className="w-3 h-3" />
                      {downloadedTrips.includes(trip.id) ? 'Offline ✓' : 'Offline'}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        generateTripKitPDF(trip.id);
                      }}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1"
                      title="Download trip kit (PDF)"
                    >
                      <FileText className="w-3 h-3" />
                      Kit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const filteredTrips = React.useMemo(() => {
    const result = getFilteredAndSortedTrips();
    return result;
  }, [searchQuery, selectedFilters, sortBy, advancedFilters]);

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Online/Offline Status Bar */}
      {!isOnline && (
        <div className="bg-orange-600 text-white py-2 px-4 text-center text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span>You are offline • {downloadedTrips.length} trip(s) available offline</span>
          </div>
        </div>
      )}

      {/* Low Data Mode Indicator */}
      {lowDataMode && isOnline && (
        <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <Lightning className="w-4 h-4" />
            <span>Low Data Mode Active • Images and heavy content disabled</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'} shadow-md sticky top-0 z-50 backdrop-blur-lg bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className={`p-2 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'} transition-transform hover:scale-105`}>
                <Globe className={`w-6 h-6 sm:w-7 sm:h-7 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                TravelBuddy
              </h1>
            </div>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              <button 
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'explore' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab('stories')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                  activeTab === 'stories' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Stories
              </button>
              <button 
                onClick={() => setActiveTab('communities')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                  activeTab === 'communities' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                Communities
              </button>
              <button 
                onClick={() => setActiveTab('memories')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'memories' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Memories
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'reviews' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Reviews
              </button>
              <button 
                onClick={() => setActiveTab('mytrips')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'mytrips' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Trips
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'messages' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Messages
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'profile' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Profile
              </button>
            </nav>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Desktop Quick Actions - Hidden on small screens */}
              <button 
                onClick={() => setShowCurrencyModal(true)}
                className={`hidden sm:block p-2.5 rounded-xl transition-all ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-blue-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                title="Change Currency"
              >
                <Coins className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className={`hidden sm:block p-2.5 rounded-xl transition-all ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-yellow-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setShowAccessibilitySettings(true)}
                className={`hidden sm:block p-2.5 rounded-xl transition-all ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-blue-400' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                title="Accessibility Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <div className={`hidden sm:block w-px h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} mx-1`}></div>
              
              <button 
                onClick={() => setShowCreateForm(true)}
                className="hidden sm:flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl transition-all items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Create Trip</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={() => setShowProfile(true)}
                className="hidden sm:flex w-10 h-10 bg-gray-300 rounded-full items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className={`lg:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {/* Navigation Links */}
              <button 
                onClick={() => { setActiveTab('explore'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'explore' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Search className="w-5 h-5" />
                Explore
              </button>
              
              <button 
                onClick={() => { setActiveTab('stories'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'stories' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Stories
              </button>
              
              <button 
                onClick={() => { setActiveTab('communities'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'communities' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                Communities
              </button>
              
              <button 
                onClick={() => { setActiveTab('memories'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'memories' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Image className="w-5 h-5" />
                Memories
              </button>
              
              <button 
                onClick={() => { setActiveTab('reviews'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'reviews' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Star className="w-5 h-5" />
                Reviews
              </button>
              
              <button 
                onClick={() => { setActiveTab('mytrips'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'mytrips' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-5 h-5" />
                My Trips
              </button>
              
              <button 
                onClick={() => { setActiveTab('messages'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'messages' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Messages
              </button>
              
              <button 
                onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'profile' 
                    ? darkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              
              {/* Divider */}
              <div className={`h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} my-2`}></div>
              
              {/* Quick Actions */}
              <button 
                onClick={() => { setShowCreateForm(true); setShowMobileMenu(false); }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Trip
              </button>
              
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => { setShowCurrencyModal(true); setShowMobileMenu(false); }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Coins className="w-5 h-5" />
                  Currency
                </button>
                
                <button 
                  onClick={() => { toggleDarkMode(); setShowMobileMenu(false); }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {darkMode ? 'Light' : 'Dark'}
                </button>
                
                <button 
                  onClick={() => { setShowAccessibilitySettings(true); setShowMobileMenu(false); }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-blue-800'} text-white py-8 sm:py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Find Your Perfect Travel Companion</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100 px-4">Explore India with like-minded travelers. Share experiences, split costs, make memories.</p>
          
          {/* Search Bar */}
          {activeTab === 'explore' && (
            <div className="max-w-3xl mx-auto px-2 sm:px-0">
              <div className="bg-white rounded-lg shadow-lg p-2 mb-6">
                {/* Search Input Row */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center flex-1 min-w-0">
                    <Search className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => {
                        const query = e.target.value;
                        setSearchQuery(query);
                        if (query.trim()) {
                          addToSearchHistory(query);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          addToSearchHistory(searchQuery);
                          // Search happens automatically through filtering
                        }
                      }}
                      className="flex-1 px-3 py-3 text-gray-900 outline-none min-w-0"
                    />
                  </div>
                  
                  {/* Filters Button - Hidden on very small screens, shown on sm+ */}
                  <button
                    onClick={() => {
                      setShowAdvancedFilters(!showAdvancedFilters);
                    }}
                    className="hidden sm:flex bg-gray-100 text-gray-700 px-3 md:px-4 py-3 rounded-md hover:bg-gray-200 transition-colors items-center gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    <span className="hidden md:inline">Filters</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </button>
                  
                  {/* Search Button */}
                  <button 
                    onClick={() => {
                      if (searchQuery.trim()) {
                        addToSearchHistory(searchQuery);
                      }
                    }}
                    className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <Search className="w-4 h-4 sm:hidden" />
                  </button>
                </div>
                
                {/* Mobile Filters Button - Only on very small screens */}
                <button
                  onClick={() => {
                    setShowAdvancedFilters(!showAdvancedFilters);
                  }}
                  className="sm:hidden w-full mt-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
              </div>
              
              {/* View Switcher */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm sm:text-base">List</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                      viewMode === 'map'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Map</span>
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                      viewMode === 'calendar'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Calendar</span>
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  {filteredTrips.length} trips
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 px-2">
                <button
                  onClick={() => {
                    setSelectedFilters({...selectedFilters, tripType: 'all'});
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilters.tripType === 'all' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setSelectedFilters({...selectedFilters, tripType: 'Adventure'});
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilters.tripType === 'Adventure' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  🏔️ Adventure
                </button>
                <button
                  onClick={() => {
                    setSelectedFilters({...selectedFilters, tripType: 'Beach'});
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilters.tripType === 'Beach' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  🏖️ Beach
                </button>
                <button
                  onClick={() => {
                    setSelectedFilters({...selectedFilters, tripType: 'Nature'});
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilters.tripType === 'Nature' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  🌿 Nature
                </button>
                <button
                  onClick={() => {
                    setSelectedFilters({...selectedFilters, tripType: 'Cultural'});
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilters.tripType === 'Cultural' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  🕌 Cultural
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Advanced Filters Panel - Moved here to appear right after search bar */}
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 mt-4">
            <AdvancedFiltersPanel />
          </div>
        )}
        
        {/* Filtered Trips Display - Right after category buttons */}
        {activeTab === 'explore' && selectedFilters.tripType !== 'all' && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <div ref={tripsSectionRef} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedFilters.tripType} Trips
                </h2>
                <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">Showing {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''}</span>
                  <button
                    onClick={() => setSelectedFilters({...selectedFilters, tripType: 'all'})}
                    className="ml-2 hover:bg-blue-200 rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
              
              {filteredTrips.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">No {selectedFilters.tripType} trips found</p>
                  <p className="text-gray-500">Try selecting a different category</p>
                  <button
                    onClick={() => setSelectedFilters({...selectedFilters, tripType: 'all'})}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Trips
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      {activeTab === 'explore' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select 
                  value={selectedFilters.budget}
                  onChange={(e) => setSelectedFilters({...selectedFilters, budget: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Budgets</option>
                  <option value="Budget">Budget</option>
                  <option value="Mid-range">Mid-range</option>
                  <option value="Luxury">Luxury</option>
                </select>
                
                {/* Sort By */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                {/* Rating Filter */}
                <select 
                  value={selectedFilters.minRating}
                  onChange={(e) => setSelectedFilters({...selectedFilters, minRating: parseFloat(e.target.value)})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">★ 4.0+</option>
                  <option value="4.5">★ 4.5+</option>
                  <option value="4.8">★ 4.8+</option>
                </select>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  {showFilters ? 'Hide' : 'More'} Filters
                </button>
                
                {(selectedFilters.activities.length > 0 || selectedFilters.languages.length > 0 || selectedFilters.minRating > 0) && (
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <span className="text-gray-600 font-medium whitespace-nowrap">{filteredTrips.length} trips</span>
            </div>
            
            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="pt-4 border-t border-gray-200 space-y-4">
                {/* Activities Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Activities</label>
                  <div className="flex flex-wrap gap-2">
                    {availableActivities.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => toggleActivity(activity)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedFilters.activities.includes(activity)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Languages Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Languages Spoken</label>
                  <div className="flex flex-wrap gap-2">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguageFilter(lang)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedFilters.languages.includes(lang)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trip Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'explore' && (
          <>
            {/* AI Recommendations Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">AI Recommended for You</h2>
                  <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full">
                    BETA
                  </span>
                </div>
                <button
                  onClick={() => setAiPreferencesVisible(!aiPreferencesVisible)}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  Preferences
                </button>
              </div>

              {aiPreferencesVisible && (
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Your AI Preferences</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Interests:</strong> {userPreferences.interests.join(', ')}
                    </div>
                    <div>
                      <strong>Budget:</strong> ₹{userPreferences.budgetRange.min.toLocaleString()} - ₹{userPreferences.budgetRange.max.toLocaleString()}
                    </div>
                    <div>
                      <strong>Pace:</strong> {userPreferences.pace}
                    </div>
                    <div>
                      <strong>Style:</strong> {userPreferences.travelStyle}
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Preference editor coming soon!')}
                    className="mt-3 text-sm text-purple-600 hover:text-purple-700"
                  >
                    Edit Preferences →
                  </button>
                </div>
              )}

              {(() => {
                const recommendations = getAiRecommendations();
                return recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.slice(0, 3).map(trip => (
                      <div key={trip.id} className="relative">
                        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {trip.aiScore.score}% Match
                        </div>
                        <TripCard trip={trip} />
                        <div className="mt-2 bg-purple-50 p-2 rounded text-xs text-purple-800">
                          <strong>Why?</strong> {trip.aiScore.reasons.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Complete your preferences to get personalized recommendations
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* AI Itinerary Builder Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAiItineraryBuilder(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Generate AI Itinerary for Your Trip
              </button>
            </div>

            {/* Search Results Highlight - Shows when actively searching */}
            {searchQuery && (
              <div ref={searchResultsRef} id="search-results" className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Search className="w-6 h-6 text-blue-600" />
                      Search Results for "{searchQuery}"
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Found {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} matching your search
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 border border-gray-300"
                  >
                    <X className="w-4 h-4" />
                    Clear Search
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>

                {filteredTrips.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-2">No trips found for "{searchQuery}"</p>
                    <p className="text-gray-500 mb-4">Try different keywords or check the spelling</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Discovery Section - Only when NOT searching */}
            {!searchQuery && viewMode === 'list' && <DiscoverySection />}

            {/* View Mode Rendering */}
            {viewMode === 'map' && (
              <div className="mb-8">
                <MapView trips={filteredTrips} />
              </div>
            )}
            {viewMode === 'calendar' && (
              <div className="mb-8">
                <CalendarView trips={filteredTrips} />
              </div>
            )}

            {/* All Trips Section (List View) */}
            {viewMode === 'list' && (
              <div ref={tripsSectionRef}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedFilters.tripType === 'all' ? 'All Trips' : `${selectedFilters.tripType} Trips`}
                  </h2>
                  {selectedFilters.tripType !== 'all' && (
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                      <Filter className="w-4 h-4" />
                      <span className="font-medium">Showing {filteredTrips.length} {selectedFilters.tripType} trip{filteredTrips.length !== 1 ? 's' : ''}</span>
                      <button
                        onClick={() => setSelectedFilters({...selectedFilters, tripType: 'all'})}
                        className="ml-2 hover:bg-blue-200 rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
                
                {filteredTrips.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-2">No trips found</p>
                    <p className="text-gray-500">Try adjusting your filters or search query</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Stories Tab - Experience Sharing & Inspiration */}
        {activeTab === 'stories' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header with Filters */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Stories & Inspiration</h1>
                  <p className="text-gray-600">Learn from real travelers' experiences, budgets, and tips</p>
                </div>
                <button
                  onClick={() => setShowStoryEditor(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Share Your Story
                </button>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Search by destination..."
                      value={storyFilters.destination}
                      onChange={(e) => setStoryFilters({ ...storyFilters, destination: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select
                    value={storyFilters.budgetRange}
                    onChange={(e) => setStoryFilters({ ...storyFilters, budgetRange: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Budgets</option>
                    <option value="budget">Budget (&lt; ₹20k)</option>
                    <option value="mid">Mid-Range (₹20k-50k)</option>
                    <option value="luxury">Luxury (₹50k+)</option>
                  </select>
                  <select
                    value={storyFilters.duration}
                    onChange={(e) => setStoryFilters({ ...storyFilters, duration: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">Short (≤5 days)</option>
                    <option value="medium">Medium (6-10 days)</option>
                    <option value="long">Long (10+ days)</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {['recent', 'popular', 'budget-low', 'budget-high'].map(sort => (
                      <button
                        key={sort}
                        onClick={() => setStoryFilters({ ...storyFilters, sortBy: sort })}
                        className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                          storyFilters.sortBy === sort
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sort === 'recent' ? 'Recent' : sort === 'popular' ? 'Popular' : sort === 'budget-low' ? 'Budget: Low→High' : 'Budget: High→Low'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured/Top Stories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredAndSortedStories().slice(0, 2).map(story => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>

            {/* All Stories Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredAndSortedStories().slice(2).map(story => (
                  <StoryCard key={story.id} story={story} compact={true} />
                ))}
              </div>

              {getFilteredAndSortedStories().length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No stories found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'communities' && (
          <div className="max-w-7xl mx-auto">
            {/* Communities Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl mb-6">
              <h1 className="text-3xl font-bold mb-2">Travel Communities</h1>
              <p className="text-purple-100">Connect with like-minded travelers, share knowledge, and grow together</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Your Communities</p>
                    <p className="text-2xl font-bold text-blue-600">{userCommunities.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Badges Earned</p>
                    <p className="text-2xl font-bold text-yellow-600">{userBadges.length}</p>
                  </div>
                  <Medal className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Mentor Status</p>
                    <p className="text-lg font-semibold text-purple-600">{isMentor ? 'Active' : 'Not Active'}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Contributions</p>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                  <Trending className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Mentor Program CTA */}
            {!isMentor && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Medal className="w-6 h-6 text-purple-600 mr-2" />
                      <h3 className="text-xl font-bold text-gray-800">Become a Travel Mentor</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Share your experience, guide new travelers, and earn exclusive mentor benefits.
                    </p>
                    
                    {(() => {
                      const eligibility = checkMentorEligibility();
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            {eligibility.criteria.minTrips.met ? (
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={eligibility.criteria.minTrips.met ? 'text-green-700' : 'text-gray-600'}>
                              Complete 5+ trips ({eligibility.criteria.minTrips.current}/5)
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            {eligibility.criteria.trustScore.met ? (
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={eligibility.criteria.trustScore.met ? 'text-green-700' : 'text-gray-600'}>
                              Trust Score 85+ ({eligibility.criteria.trustScore.current}/85)
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            {eligibility.criteria.verification.met ? (
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={eligibility.criteria.verification.met ? 'text-green-700' : 'text-gray-600'}>
                              Complete verification (ID + Email)
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <button 
                    onClick={() => {
                      const eligibility = checkMentorEligibility();
                      if (eligibility.eligible) {
                        setShowMentorApplication(true);
                      } else {
                        alert('Please meet all criteria to apply for the mentor program.');
                      }
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}

            {/* Communities Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">All Communities</h2>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 text-sm hover:underline">Your Communities</button>
                  <span className="text-gray-400">|</span>
                  <button className="text-gray-600 text-sm hover:underline">Discover</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map(community => {
                  const isMember = userCommunities.includes(community.id);
                  
                  return (
                    <div key={community.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        {/* Community Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl mr-3">
                              {React.createElement(
                                community.icon === 'users' ? Users :
                                community.icon === 'book-open' ? BookOpen :
                                community.icon === 'map' ? Map :
                                community.icon === 'calendar' ? Calendar :
                                Mountain
                              , { className: 'w-6 h-6' })}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">{community.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {community.type === 'public' && (
                                  <span className="flex items-center text-xs text-green-600">
                                    <Unlock className="w-3 h-3 mr-1" />
                                    Public
                                  </span>
                                )}
                                {community.type === 'request-to-join' && (
                                  <span className="flex items-center text-xs text-orange-600">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Request to Join
                                  </span>
                                )}
                                {community.type === 'moderated' && (
                                  <span className="flex items-center text-xs text-blue-600">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Moderated
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{community.description}</p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {community.memberCount.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {community.postCount}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {community.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Button */}
                        {isMember ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setSelectedCommunity(community);
                                setShowCommunityModal(true);
                              }}
                              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              View Community
                            </button>
                            <button 
                              onClick={() => leaveCommunity(community.id)}
                              className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <UserMinus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => joinCommunity(community.id)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            {community.type === 'request-to-join' ? 'Request to Join' : 'Join Community'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {badges.map(badge => {
                    const earned = userBadges.includes(badge.id);
                    const progress = !earned ? calculateBadgeProgress(badge) : null;
                    
                    return (
                      <div 
                        key={badge.id} 
                        className={`p-4 rounded-lg border-2 ${
                          earned 
                            ? badge.rarity === 'epic' ? 'border-purple-500 bg-purple-50' :
                              badge.rarity === 'rare' ? 'border-orange-500 bg-orange-50' :
                              badge.rarity === 'uncommon' ? 'border-blue-500 bg-blue-50' :
                              'border-gray-300 bg-gray-50'
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        } cursor-pointer hover:shadow-md transition-all`}
                        onClick={() => {
                          setSelectedBadge(badge);
                          setShowBadgeModal(true);
                        }}
                      >
                        <div className="text-center">
                          <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                            earned 
                              ? badge.rarity === 'epic' ? 'bg-purple-600' :
                                badge.rarity === 'rare' ? 'bg-orange-600' :
                                badge.rarity === 'uncommon' ? 'bg-blue-600' :
                                'bg-gray-600'
                              : 'bg-gray-400'
                          } text-white`}>
                            <Medal className="w-8 h-8" />
                          </div>
                          <h4 className={`font-semibold text-sm mb-1 ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
                            {badge.name}
                          </h4>
                          {!earned && progress && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${progress.percentage}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {progress.current}/{progress.required}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memories' && <MemoriesView />}
        {activeTab === 'reviews' && <ReviewsView />}
        {activeTab === 'messages' && <MessagesView />}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {userProfile.idVerified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ ID Verified</span>
                      )}
                      {userProfile.emailVerified && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✓ Email</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Trust Score</div>
                  <div className="text-3xl font-bold text-blue-600">{calculateTrustScore(userProfile)}</div>
                  <div className="text-xs text-gray-500">out of 100</div>
                </div>
              </div>

              {/* Trust Score Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Trust Level</span>
                  <span className="text-sm text-gray-600">
                    {calculateTrustScore(userProfile) >= 80 ? '🌟 Excellent' :
                     calculateTrustScore(userProfile) >= 60 ? '✓ Good' :
                     calculateTrustScore(userProfile) >= 40 ? '⚠️ Fair' : '❗ Building'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${
                      calculateTrustScore(userProfile) >= 80 ? 'bg-green-600' :
                      calculateTrustScore(userProfile) >= 60 ? 'bg-blue-600' :
                      calculateTrustScore(userProfile) >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${calculateTrustScore(userProfile)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.tripsCompleted}</div>
                  <div className="text-xs text-gray-600">Trips Completed</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.rating.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">Average Rating</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userProfile.reviewCount}</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
              </div>

              {/* Verification Actions */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Security & Verification</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setVerificationStep('choose');
                      setShowVerificationModal(true);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Verify Your Profile
                    </span>
                    <span className="text-sm opacity-90">+35 points</span>
                  </button>

                  <button
                    onClick={() => setShowEmergencyContactForm(true)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Manage Emergency Contacts ({emergencyContacts.length}/2)
                  </button>
                </div>
              </div>

              {/* Emergency Contacts Display */}
              {emergencyContacts.length > 0 && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
                  <div className="space-y-3">
                    {emergencyContacts.map(contact => (
                      <div key={contact.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.relation}</p>
                          <p className="text-sm text-gray-500">{contact.phone} • {contact.email}</p>
                        </div>
                        <span className="text-green-600">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Increase Your Trust Score</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>ID Verification:</strong> Upload government ID (+25 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Email Verification:</strong> Verify your email address (+10 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Complete Trips:</strong> Each completed trip adds to your score</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Get Reviews:</strong> Positive reviews boost your rating</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Avoid Reports:</strong> Each report reduces your score by 10 points</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'mytrips' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Trips</h3>
              <p className="text-gray-500 mb-6">You have joined {joinedTrips.length} trip(s)</p>
              
              {joinedTrips.length > 0 && (
                <div className="mt-8 space-y-4">
                  {trips.filter(trip => joinedTrips.includes(trip.id)).map(trip => (
                    <div key={trip.id} className="bg-white p-6 rounded-lg shadow-md text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{trip.title}</h4>
                          <p className="text-sm text-gray-600">{trip.destination}</p>
                          <p className="text-sm text-gray-500">{trip.dates}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTripForExpenses(trip.id);
                            setShowExpenseTracker(true);
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          💰 Expenses
                        </button>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {tripSpots[trip.id].filled}/{tripSpots[trip.id].total} joined
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {trip.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expense Tracker Modal */}
      {showExpenseTracker && <ExpenseTracker tripId={selectedTripForExpenses} />}

      {/* Trip Logistics Modal */}
      {showLogistics && <TripLogistics />}

      {/* Group Chat Modal */}
      {showGroupChat && <GroupChat />}

      {/* Verification Modal */}
      {showVerificationModal && <VerificationModal />}

      {/* Report Modal */}
      {showReportModal && <ReportModal />}

      {/* Emergency Contact Modal */}
      {showEmergencyContactForm && <EmergencyContactModal />}

      {/* AI Itinerary Builder Modal */}
      {showAiItineraryBuilder && <AiItineraryBuilder />}

      {/* Experience Sharing Modals */}
      {selectedStory && <StoryDetailView />}
      {showCostAnalytics && <CostAnalyticsModal />}
      {showBeforeAfterModal && <BeforeAfterComparisonModal />}

      {/* Create Trip Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Trip</h2>
                <button 
                  onClick={() => {
                    setShowCreateForm(false);
                    setSelectedLanguages([]);
                    setShowLanguageDropdown(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form className="space-y-4" onClick={(e) => {
                if (!e.target.closest('.language-selector')) {
                  setShowLanguageDropdown(false);
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Manali Adventure Trek" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Manali, Himachal Pradesh" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Adventure</option>
                      <option>Beach</option>
                      <option>Cultural</option>
                      <option>Nature</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Budget</option>
                      <option>Mid-range</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                </div>
                
                {/* Activities Multi-Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activities (Select multiple)</label>
                  {selectedActivities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedActivities.map((activity) => (
                        <span key={activity} className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {activity}
                          <button
                            type="button"
                            onClick={() => setSelectedActivities(selectedActivities.filter(a => a !== activity))}
                            className="ml-2 text-green-600 hover:text-green-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {availableActivities.map((activity) => (
                        <label key={activity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={selectedActivities.includes(activity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedActivities([...selectedActivities, activity]);
                              } else {
                                setSelectedActivities(selectedActivities.filter(a => a !== activity));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select all activities you plan to do during the trip</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Spots</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How many travelers?" min="2" max="20" />
                </div>
                
                {/* Minimum Profile Score Requirement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Profile Score (Optional)
                    <span className="text-xs text-gray-500 ml-2">Your score: {userProfile.trustScore}</span>
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Leave empty for no requirement" 
                    min="0" 
                    max="100"
                    step="5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Set a minimum profile score required to join this trip. Only users with a profile score at or above this level can join. 
                    <button 
                      type="button"
                      onClick={() => setShowProfileScoreInfo(true)}
                      className="text-blue-600 hover:text-blue-700 ml-1"
                    >
                      Learn more about profile scores
                    </button>
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your trip plans, interests, and what you're looking for in travel companions..."></textarea>
                </div>
                
                {/* Languages Selector */}
                <div className="language-selector">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages Used on Trip</label>
                  
                  {/* Selected Languages Tags */}
                  {selectedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedLanguages.map((lang) => (
                        <span key={lang} className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {lang}
                          <button
                            type="button"
                            onClick={() => removeLanguage(lang)}
                            className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      onFocus={() => setShowLanguageDropdown(true)}
                      placeholder="Search or add languages..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* Dropdown */}
                    {showLanguageDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredLanguages.length > 0 ? (
                          filteredLanguages.map((lang) => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => {
                                addLanguage(lang);
                                setShowLanguageDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm"
                            >
                              {lang}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-sm">
                            {languageSearch ? (
                              <button
                                type="button"
                                onClick={() => {
                                  addCustomLanguage();
                                  setShowLanguageDropdown(false);
                                }}
                                className="w-full text-left text-blue-600 hover:text-blue-700"
                              >
                                + Add "{languageSearch}"
                              </button>
                            ) : (
                              'No languages found'
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select languages that will be commonly used during the trip</p>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => {
                      alert('Trip created successfully! (This is a demo)');
                      setShowCreateForm(false);
                      setSelectedLanguages([]);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Trip
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setSelectedLanguages([]);
                      setLanguageSearch('');
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Join Trip Confirmation Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join This Trip?</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{selectedTrip.title}</h4>
              <p className="text-gray-600 text-sm mb-2"><MapPin className="inline w-4 h-4 mr-1" />{selectedTrip.destination}</p>
              <p className="text-gray-600 text-sm mb-2"><Calendar className="inline w-4 h-4 mr-1" />{selectedTrip.dates}</p>
              <p className="text-green-600 font-semibold text-lg mb-2">{selectedTrip.pricePerPerson} per person</p>
              <p className="text-gray-600 text-sm mb-4">{selectedTrip.description}</p>
              
              {/* AI Compatibility Score */}
              <CompatibilityScoreCard tripId={selectedTrip.id} />
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={confirmJoin}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Confirm & Join
              </button>
              <button 
                onClick={() => setSelectedTrip(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
              <button 
                onClick={() => setShowProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                JD
              </div>
              <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
              <p className="text-gray-600">johndoe@example.com</p>
              <p className="text-gray-500 text-sm mt-2">Member since Dec 2024</p>
            </div>
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Trips Joined</span>
                <span className="font-semibold text-gray-900">{joinedTrips.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Trips Created</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Reviews</span>
                <span className="font-semibold text-gray-900">⭐ 4.8 (12)</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button 
                onClick={() => {
                  alert('Edit Profile feature coming soon!');
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => {
                  alert('Settings page coming soon!');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Settings
              </button>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to logout?')) {
                    alert('Logged out successfully!');
                    setShowProfile(false);
                  }
                }}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Application Modal */}
      {showMentorApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply to be a Mentor</h2>
                <button 
                  onClick={() => setShowMentorApplication(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to become a mentor?
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="Share your motivation and what you can offer to the community..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Solo Travel', 'Budget Planning', 'Trekking', 'Cultural Tours', 'Photography', 'Safety Tips'].map(area => (
                      <label key={area} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred mentee level
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>First-time travelers</option>
                    <option>Intermediate travelers</option>
                    <option>All levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many mentees can you support?
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>1-2 mentees</option>
                    <option>3-5 mentees</option>
                    <option>5+ mentees</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      applyForMentor({
                        motivation: 'Sample motivation',
                        expertise: ['Solo Travel', 'Budget Planning'],
                        menteeLevel: 'All levels',
                        capacity: '3-5 mentees'
                      });
                    }}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Submit Application
                  </button>
                  <button
                    onClick={() => setShowMentorApplication(false)}
                    className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {showBadgeModal && selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Badge Details</h2>
                <button 
                  onClick={() => {
                    setShowBadgeModal(false);
                    setSelectedBadge(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="text-center">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  selectedBadge.rarity === 'epic' ? 'bg-purple-600' :
                  selectedBadge.rarity === 'rare' ? 'bg-orange-600' :
                  selectedBadge.rarity === 'uncommon' ? 'bg-blue-600' :
                  'bg-gray-600'
                } text-white`}>
                  <Medal className="w-12 h-12" />
                </div>

                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                  selectedBadge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                  selectedBadge.rarity === 'rare' ? 'bg-orange-100 text-orange-800' :
                  selectedBadge.rarity === 'uncommon' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedBadge.rarity.toUpperCase()}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedBadge.name}</h3>
                <p className="text-gray-600 mb-6">{selectedBadge.description}</p>

                {userBadges.includes(selectedBadge.id) ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-center text-green-700 mb-2">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Badge Earned!</span>
                    </div>
                    <p className="text-green-600 text-sm">You unlocked this achievement</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Requirements:</h4>
                    <div className="space-y-2 text-left">
                      {Object.entries(selectedBadge.criteria).map(([key, value], idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 mr-2" />
                          <span>
                            {key === 'tripsCompleted' && `Complete ${value} trips`}
                            {key === 'minTrustScore' && `Achieve ${value}+ trust score`}
                            {key === 'minRating' && `Maintain ${value}+ rating`}
                            {key === 'helpfulAnswers' && `Provide ${value}+ helpful answers`}
                            {key === 'isMentor' && 'Become an active mentor'}
                            {key === 'verified' && value && 'Complete ID and email verification'}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {(() => {
                      const progress = calculateBadgeProgress(selectedBadge);
                      if (progress.percentage > 0) {
                        return (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-blue-600">{Math.round(progress.percentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${progress.percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Detail Modal */}
      {showCommunityModal && selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                    {React.createElement(
                      selectedCommunity.icon === 'users' ? Users :
                      selectedCommunity.icon === 'book-open' ? BookOpen :
                      selectedCommunity.icon === 'map' ? Map :
                      selectedCommunity.icon === 'calendar' ? Calendar :
                      Mountain
                    , { className: 'w-8 h-8' })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCommunity.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedCommunity.memberCount.toLocaleString()} members
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {selectedCommunity.postCount} posts
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowCommunityModal(false);
                    setSelectedCommunity(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedCommunity.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCommunity.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Create Post Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <button 
                  onClick={() => setShowCreatePostModal(true)}
                  className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create a Post</span>
                </button>
              </div>

              {/* Community Posts */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 text-lg">Recent Discussions</h3>
                
                {communityPosts.filter(p => p.communityId === selectedCommunity.id).length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No posts yet. Be the first to start a discussion!</p>
                  </div>
                ) : (
                  communityPosts
                    .filter(p => p.communityId === selectedCommunity.id)
                    .slice(0, 10)
                    .map(post => (
                      <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                              {post.userAvatar}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{post.userId}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(post.createdDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {post.isPinned && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                              Pinned
                            </span>
                          )}
                        </div>
                        
                        {post.title && (
                          <h4 className="font-bold text-gray-800 mb-2">{post.title}</h4>
                        )}
                        <p className="text-gray-600 mb-3">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </button>
                          <button className="flex items-center hover:text-blue-600">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments.length}
                          </button>
                          <button className="flex items-center hover:text-red-600">
                            <Flag className="w-4 h-4 mr-1" />
                            Report
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
                <button 
                  onClick={() => setShowCreatePostModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Give your post a title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Share your thoughts, questions, or experiences..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="discussion">Discussion</option>
                    <option value="trip-share">Trip Share</option>
                    <option value="resource">Resource</option>
                    <option value="question">Question</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      createCommunityPost(selectedCommunity.id, {
                        title: 'Sample Post',
                        content: 'This is a sample community post',
                        type: 'discussion'
                      });
                      setShowCreatePostModal(false);
                      alert('Post created successfully!');
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Post
                  </button>
                  <button
                    onClick={() => setShowCreatePostModal(false)}
                    className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Currency Selection Modal */}
      {showCurrencyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowCurrencyModal(false)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg max-w-md w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Select Currency</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    All prices will be converted to your selected currency
                  </p>
                </div>
                <button 
                  onClick={() => setShowCurrencyModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(currencies).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeCurrency(code);
                      setShowCurrencyModal(false);
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCurrency === code
                        ? darkMode 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-blue-600 bg-blue-50'
                        : darkMode
                          ? 'border-gray-700 hover:border-gray-600 bg-gray-700/30'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{info.flag}</span>
                        <div>
                          <div className="font-semibold">{code}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{info.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{info.symbol}</div>
                        {selectedCurrency === code && (
                          <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Exchange rates are updated daily. Actual prices may vary based on current rates.
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Last updated: {new Date(lastRateUpdate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Settings Modal */}
      {showAccessibilitySettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Accessibility & Convenience</h2>
                <button 
                  onClick={() => setShowAccessibilitySettings(false)}
                  className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Theme Settings */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    Display Theme
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={toggleDarkMode}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        darkMode 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Moon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold">Dark Mode</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Reduce eye strain in low light
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          darkMode 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {darkMode ? 'ON' : 'OFF'}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Data Usage Settings */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Lightning className="w-5 h-5" />
                    Data Usage
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={toggleLowDataMode}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        lowDataMode 
                          ? darkMode
                            ? 'border-blue-500 bg-blue-900/20'
                            : 'border-blue-600 bg-blue-50'
                          : darkMode
                            ? 'border-gray-700 hover:border-gray-600'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            lowDataMode 
                              ? 'bg-blue-600 text-white' 
                              : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <Lightning className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold">Low Data Mode</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Reduce data usage • Disable auto-loading images
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          lowDataMode 
                            ? 'bg-green-600 text-white' 
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {lowDataMode ? 'ON' : 'OFF'}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Offline Access */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5 text-orange-600" />}
                    Offline Access
                  </h3>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold">Connection Status</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {isOnline ? 'Connected to internet' : 'You are offline'}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isOnline 
                          ? 'bg-green-600 text-white' 
                          : 'bg-orange-600 text-white'
                      }`}>
                        {isOnline ? 'Online' : 'Offline'}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Downloaded trips</span>
                        <span className="font-bold text-blue-600">{downloadedTrips.length}</span>
                      </div>
                      {downloadedTrips.length > 0 && (
                        <button
                          onClick={() => {
                            if (isOnline) {
                              syncOfflineData();
                            } else {
                              alert('Cannot sync while offline');
                            }
                          }}
                          disabled={!isOnline}
                          className={`w-full mt-3 py-2 rounded-lg font-medium transition-colors ${
                            isOnline
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          }`}
                        >
                          <RefreshCcw className="w-4 h-4 inline mr-2" />
                          Sync Offline Data
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Currency Preference */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Currency Preference
                  </h3>
                  <button
                    onClick={() => {
                      setShowAccessibilitySettings(false);
                      setShowCurrencyModal(true);
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      darkMode 
                        ? 'border-gray-700 hover:border-gray-600 bg-gray-700/30' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currencies[selectedCurrency].flag}</span>
                        <div>
                          <div className="font-semibold">{selectedCurrency} - {currencies[selectedCurrency].name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            All prices shown in {currencies[selectedCurrency].symbol}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                {/* Info Section */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
                    <div className="text-sm">
                      <p className={`font-semibold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                        Mobile-Optimized for Travel
                      </p>
                      <p className={darkMode ? 'text-blue-200' : 'text-blue-800'}>
                        Download trip data for offline access, enable low data mode for slow connections, 
                        and switch to dark mode to save battery while traveling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Score Info Modal */}
      {showProfileScoreInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-7 h-7 text-blue-600" />
                  How to Increase Your Profile Score
                </h2>
                <button 
                  onClick={() => setShowProfileScoreInfo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Your Current Profile Score</h3>
                  <div className="text-3xl font-bold text-blue-600">{userProfile.trustScore}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${userProfile.trustScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ways to Improve Your Score:</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* ID Verification */}
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${userProfile.idVerified ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Shield className={`w-5 h-5 ${userProfile.idVerified ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">ID Verification</h4>
                          <span className="text-sm font-bold text-blue-600">+25 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Verify your identity with a government ID</p>
                        {userProfile.idVerified ? (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setShowProfileScoreInfo(false);
                              setShowVerificationModal(true);
                              setVerificationStep('id-upload');
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Verify Now →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Verification */}
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${userProfile.emailVerified ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <CheckCircle className={`w-5 h-5 ${userProfile.emailVerified ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">Email Verification</h4>
                          <span className="text-sm font-bold text-blue-600">+10 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Confirm your email address</p>
                        {userProfile.emailVerified ? (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setShowProfileScoreInfo(false);
                              setShowVerificationModal(true);
                              setVerificationStep('email-verify');
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Verify Now →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Complete Trips */}
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Map className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">Complete Trips</h4>
                          <span className="text-sm font-bold text-blue-600">+20 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Up to 20 points (1 per trip)</p>
                        <span className="text-xs text-gray-700">
                          You've completed: {userProfile.tripsCompleted || 0} trip{(userProfile.tripsCompleted || 0) !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Get Ratings */}
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">Get High Ratings</h4>
                          <span className="text-sm font-bold text-blue-600">+15 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Based on your average rating</p>
                        <span className="text-xs text-gray-700">
                          Your rating: {userProfile.rating ? `${userProfile.rating} ⭐` : 'Not rated yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tips for Building Trust</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Complete your profile with accurate information</li>
                        <li>Be responsive to messages (aim for &lt;1 hour response time)</li>
                        <li>Be a reliable travel companion - show up on time and honor commitments</li>
                        <li>Get verified with ID and email to show you're a real person</li>
                        <li>Participate actively in trips and contribute positively</li>
                        <li>Maintain good communication with trip organizers and members</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowProfileScoreInfo(false);
                      setShowVerificationModal(true);
                      setVerificationStep('choose');
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start Verification
                  </button>
                  <button
                    onClick={() => setShowProfileScoreInfo(false)}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCompanionApp;
// Also export as App for index.js compatibility
export { TravelCompanionApp as App };