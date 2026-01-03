# Quick Start Guide - Authentication System

## 🚀 For Developers

### Current Implementation Status

✅ **COMPLETED (Frontend MVP)**
- Email & password authentication
- User signup/login/logout
- Profile management (edit name, bio, interests, languages, budget)
- Session persistence (localStorage)
- Protected routes (create trip, join trip)
- Trust score integration
- Beautiful UI with modals and forms

⚠️ **USING DEMO SECURITY (Replace for Production)**
- Password hashing: Base64 (NOT SECURE - use bcrypt server-side)
- Session tokens: Simple base64 (NOT SECURE - use JWT with expiration)
- Storage: localStorage (REPLACE with HTTP-only cookies)

---

## 📦 Current File Structure

```
src/
├── App.js (9,832 lines)
│   ├── Authentication State (lines 5-38)
│   │   ├── isAuthenticated, currentUser
│   │   ├── showAuthModal, authMode
│   │   ├── authForm, authErrors
│   │   └── showEditProfile, showChangePassword
│   │
│   ├── Session Management (lines 1165-1475)
│   │   ├── useEffect: Load session on mount
│   │   ├── validateEmail(), validatePassword()
│   │   ├── validateSignupForm(), validateLoginForm()
│   │   ├── handleSignup(), handleLogin()
│   │   ├── handleLogout(), resetAuthForm()
│   │   ├── handleGoogleLogin() [placeholder]
│   │   └── handleUpdateProfile()
│   │
│   ├── Protected Features (lines 1467-1485)
│   │   ├── handleJoinTrip() - Auth check + trust score
│   │   └── Create Trip button - Auth check
│   │
│   └── UI Components
│       ├── Header (lines 7000-7040) - Conditional auth button
│       ├── Auth Modal (lines 9435-9650) - Login/Signup
│       ├── Edit Profile Modal (lines 9653-9800)
│       └── Profile Modal - Updated logout button
│
└── (Other files unchanged)
```

---

## 🔧 Testing the System

### 1. **Create a Test Account**

Open the deployed app: https://alok6532.github.io/travel-buddy

1. Click "Login / Sign Up" button (top right)
2. Click "Sign Up" tab
3. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
4. Click "Create Account"
5. You should see: "Account created successfully!"

### 2. **Verify Session Persistence**

1. Refresh the page (Cmd+R / Ctrl+R)
2. You should still be logged in
3. Your profile avatar (with initial "T") should be visible

### 3. **Edit Your Profile**

1. Click your profile avatar
2. Click "Edit Profile"
3. Update:
   - Bio: "I love traveling!"
   - Interests: Select "Adventure", "Beach"
   - Languages: Select "English", "Hindi"
4. Click "Save Changes"
5. Profile should update immediately

### 4. **Test Protected Features**

1. Click "Logout" in profile modal
2. Confirm logout
3. Try to "Create Trip" → Should show login prompt
4. Login again
5. Now "Create Trip" should work

### 5. **Test Trust Score Validation**

1. Create account with new email
2. Try to join "Ladakh Bike Expedition"
3. Should be blocked (requires 80 score, new users have 20)
4. "Profile Score Info" modal should appear

---

## 💾 Data Storage (localStorage)

Open browser DevTools → Application → Local Storage

You'll find 3 keys:

### 1. `travelbuddy_users` (All registered users)
```json
[
  {
    "id": "1705318200000",
    "name": "Test User",
    "email": "test@example.com",
    "passwordHash": "cGFzc3dvcmQxMjM=",
    "bio": "",
    "interests": [],
    "languages": [],
    "budgetPreference": "Mid-range",
    "profilePhoto": null,
    "verified": false,
    "idVerified": false,
    "emailVerified": false,
    "universityEmail": false,
    "tripsCompleted": 0,
    "joinDate": "Jan 2024",
    "rating": 0,
    "reviewCount": 0,
    "trustScore": 20,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 2. `travelbuddy_token` (Session token)
```
eyJ1c2VySWQiOiIxNzA1MzE4MjAwMDAwIiwidGltZXN0YW1wIjoxNzA1MzE4MjAwMDAwfQ==
```
Decode this base64 to see:
```json
{"userId":"1705318200000","timestamp":1705318200000}
```

### 3. `travelbuddy_user` (Current user)
```json
{
  "id": "1705318200000",
  "name": "Test User",
  "email": "test@example.com",
  "trustScore": 20,
  ...
}
```

---

## 🔄 Migrating to Backend

### Step 1: Set Up Backend Server

Create new directory:
```bash
mkdir travel-buddy-backend
cd travel-buddy-backend
npm init -y
npm install express mongoose bcrypt jsonwebtoken cors dotenv
```

### Step 2: Create API Server

**server.js**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://alok6532.github.io',
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/trips', require('./routes/trips'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 3: Create User Model

**models/User.js**:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  bio: String,
  interests: [String],
  languages: [String],
  budgetPreference: { type: String, default: 'Mid-range' },
  profilePhoto: String,
  verification: {
    verified: { type: Boolean, default: false },
    idVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    universityEmail: { type: Boolean, default: false }
  },
  stats: {
    trustScore: { type: Number, default: 20 },
    tripsCompleted: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
```

### Step 4: Create Auth Routes

**routes/auth.js**:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        error: 'Email already registered' 
      });
    }
    
    // Create user
    const user = new User({
      name,
      email,
      passwordHash: password, // Will be hashed by pre-save hook
      verification: { universityEmail: email.includes('.edu') }
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          trustScore: user.stats.trustScore
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'No account found with this email' 
      });
    }
    
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: { user, token, refreshToken }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

module.exports = router;
```

### Step 5: Update Frontend API Calls

**src/utils/api.js** (new file):
```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  async signup(data) {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  async login(data) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  async updateProfile(data) {
    const token = localStorage.getItem('travelbuddy_token');
    const response = await fetch(`${API_BASE}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

**Update App.js**:
```javascript
// Replace handleSignup
const handleSignup = async (e) => {
  e.preventDefault();
  
  if (!validateSignupForm()) return;
  
  try {
    const result = await api.signup({
      name: authForm.name,
      email: authForm.email,
      password: authForm.password
    });
    
    if (result.success) {
      localStorage.setItem('travelbuddy_token', result.data.token);
      localStorage.setItem('travelbuddy_user', JSON.stringify(result.data.user));
      setCurrentUser(result.data.user);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      alert('Account created successfully!');
    } else {
      setAuthErrors({ general: result.error });
    }
  } catch (error) {
    setAuthErrors({ general: 'Network error. Please try again.' });
  }
};
```

### Step 6: Environment Variables

**.env** (backend):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travelbuddy
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_REFRESH_SECRET=your_refresh_token_secret_here
NODE_ENV=development
```

**.env** (frontend):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 7: Deploy Backend

**Option 1: Heroku**
```bash
heroku create travel-buddy-api
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...
git push heroku main
```

**Option 2: Railway**
```bash
railway login
railway init
railway add
railway up
```

---

## 🧪 Testing Checklist

### Manual Testing

- [ ] Signup with valid email
- [ ] Signup with duplicate email (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Session persists after refresh
- [ ] Logout clears session
- [ ] Edit profile updates correctly
- [ ] Create trip requires login
- [ ] Join trip requires login
- [ ] Trust score blocks low-score users

### Automated Testing (Future)

Install:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Create test file **src/App.test.js**:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('shows login button when logged out', () => {
  render(<App />);
  const loginButton = screen.getByText(/Login \/ Sign Up/i);
  expect(loginButton).toBeInTheDocument();
});

test('opens auth modal on login button click', () => {
  render(<App />);
  const loginButton = screen.getByText(/Login \/ Sign Up/i);
  fireEvent.click(loginButton);
  expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
});
```

---

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Context API](https://react.dev/reference/react/useContext) (for global auth state)
- [React Router Protected Routes](https://ui.dev/react-router-protected-routes-authentication)

---

## 🆘 Troubleshooting

### Issue: "Token expired" error
**Solution**: Implement token refresh logic using refresh token

### Issue: CORS errors in production
**Solution**: Configure backend CORS to allow your frontend domain

### Issue: Session not persisting
**Solution**: Check browser localStorage is enabled

### Issue: Passwords not matching during signup
**Solution**: Check form validation logic in `validateSignupForm()`

---

## 🎯 Next Steps

1. **Immediate**:
   - Test all authentication flows
   - Gather user feedback
   - Fix any UI/UX issues

2. **Short-term** (1-2 weeks):
   - Set up backend server
   - Migrate to real database
   - Implement email verification

3. **Medium-term** (1 month):
   - Add password reset flow
   - Implement Google OAuth
   - Add profile photo upload to cloud storage

4. **Long-term**:
   - Two-factor authentication
   - Social login (Facebook, Apple)
   - Advanced security features

---

**🎉 Congratulations! Your authentication system is live at:**
## https://alok6532.github.io/travel-buddy

**Need help?** Check the full documentation in `AUTHENTICATION_SYSTEM.md`

---

*Quick Start Guide v1.0*  
*Last Updated: January 2024*
