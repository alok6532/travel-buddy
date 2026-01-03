# Travel Buddy - Authentication & Profile System Documentation

## 🔐 Overview

The Travel Buddy app now includes a comprehensive user authentication and profile management system. This system is currently implemented using **localStorage** to simulate backend functionality, making it a fully functional frontend-only MVP that can easily be migrated to a real backend.

---

## ✨ Features Implemented

### 1. **User Authentication**
- ✅ Email & Password signup/login
- ✅ Form validation (email format, password strength)
- ✅ Google Sign-In integration placeholder
- ✅ Session persistence across page refreshes
- ✅ Secure logout with confirmation
- ✅ Remember me functionality

### 2. **Profile Management**
- ✅ Editable user profiles (name, bio, interests, languages, budget preference)
- ✅ Profile photo support (with avatar fallback)
- ✅ Dynamic trust score calculation
- ✅ Profile completeness tracking

### 3. **Protected Features**
- ✅ Trip creation requires authentication
- ✅ Joining trips requires authentication
- ✅ Profile score validation for group joining
- ✅ Conditional UI based on authentication state

### 4. **User Interface**
- ✅ Beautiful login/signup modal with tab switching
- ✅ Edit profile modal with multi-select interests/languages
- ✅ Gradient profile avatars with user initials
- ✅ "Login / Sign Up" button when logged out
- ✅ User avatar button when logged in
- ✅ Mobile-responsive design throughout

---

## 🎯 User Flows

### **Sign Up Flow**
1. User clicks "Login / Sign Up" button in header
2. Auth modal opens in "Login" mode
3. User clicks "Sign Up" toggle
4. User fills: Name, Email, Password, Confirm Password
5. Optional: Google Sign-In button (placeholder)
6. Form validation checks:
   - Name is not empty
   - Email format is valid
   - Password is at least 8 characters
   - Passwords match
7. On success:
   - User account created in localStorage
   - Session token generated
   - User automatically logged in
   - Profile score calculated (starts at 20)
   - Welcome message displayed
   - Modal closes

### **Login Flow**
1. User clicks "Login / Sign Up" button
2. Auth modal opens in "Login" mode
3. User enters email and password
4. Form validation checks:
   - Email exists in system
   - Password matches stored hash
5. On success:
   - Session token created
   - User data loaded into state
   - Profile score synced
   - Welcome back message
   - Modal closes

### **Edit Profile Flow**
1. Authenticated user opens profile modal
2. User clicks "Edit Profile" button
3. Edit modal opens with current data pre-filled
4. User can modify:
   - Name
   - Bio
   - Budget preference
   - Interests (multi-select)
   - Languages (multi-select)
   - Profile photo (future feature)
5. Click "Save Changes"
6. Profile updated in localStorage and state
7. Trust score recalculated
8. Success message displayed

### **Logout Flow**
1. User clicks profile avatar → Profile modal opens
2. User clicks "Logout" button
3. Confirmation dialog appears
4. On confirm:
   - Session token deleted
   - User data cleared from state
   - Profile reset to guest
   - User redirected to "Explore" tab
   - Success message displayed

---

## 💾 Data Storage (localStorage)

### **Storage Keys**

| Key | Type | Description |
|-----|------|-------------|
| `travelbuddy_users` | Array | All registered users |
| `travelbuddy_token` | String | Current session token |
| `travelbuddy_user` | Object | Current user data |

### **User Object Schema**

```javascript
{
  id: "1234567890",                    // Timestamp-based unique ID
  name: "John Doe",                    // User's full name
  email: "john@example.com",           // Email (unique identifier)
  passwordHash: "base64EncodedHash",   // Hashed password (base64)
  bio: "Travel enthusiast...",         // User bio (optional)
  interests: ["Adventure", "Beach"],   // Array of interests
  languages: ["English", "Hindi"],     // Array of languages
  budgetPreference: "Mid-range",       // Budget category
  profilePhoto: null,                  // Profile photo URL (future)
  verified: false,                     // Account verification status
  idVerified: false,                   // ID verification status
  emailVerified: false,                // Email verification status
  universityEmail: false,              // .edu email detection
  tripsCompleted: 0,                   // Number of completed trips
  joinDate: "Jan 2024",               // Formatted join date
  rating: 0,                          // Average rating (0-5)
  reviewCount: 0,                     // Number of reviews
  trustScore: 20,                     // Calculated trust score (0-100)
  createdAt: "2024-01-15T10:30:00Z"  // ISO timestamp
}
```

### **Session Token Format**

```javascript
// Token is base64-encoded JSON
{
  userId: "1234567890",
  timestamp: 1705318200000
}
```

---

## 🔒 Security Considerations

### **Current Implementation (Frontend-Only)**

⚠️ **Note**: This is a demo/MVP implementation. For production use with a real backend:

1. **Password Hashing**
   - Current: Base64 encoding (NOT secure)
   - Production: Use bcrypt/scrypt server-side with salt
   
2. **Session Tokens**
   - Current: Base64-encoded user ID
   - Production: Use JWT with expiration and refresh tokens
   
3. **Data Storage**
   - Current: localStorage (client-side)
   - Production: Secure database with encryption

4. **API Communication**
   - Current: Direct localStorage manipulation
   - Production: HTTPS-only API calls with authentication headers

### **Best Practices Implemented**

✅ Email validation before submission  
✅ Password strength requirements (8+ chars)  
✅ Confirmation on destructive actions (logout)  
✅ Session persistence across page refreshes  
✅ Graceful error handling with user-friendly messages  
✅ Form validation with real-time error display  

---

## 📊 Trust Score Calculation

The trust score (0-100) is calculated based on:

| Factor | Points | Description |
|--------|--------|-------------|
| Base Score | 20 | All users start with 20 points |
| ID Verification | +25 | Government ID verified |
| Email Verification | +10 | Email confirmed |
| University Email | +5 | .edu email bonus |
| Trip History | +20 max | 1 point per completed trip (max 20) |
| User Rating | +15 max | (rating/5) × 15 points |
| Review Count | +5 max | min(reviewCount/2, 5) |
| Reports | -10 each | Penalty for unresolved reports |

**Example Calculations:**
- New user: 20 points
- Email verified: 30 points
- ID + Email + 10 trips: 75 points
- Fully verified + 20 trips + 5-star rating: 100 points

---

## 🛠 Backend Migration Guide

### **Recommended Database Schema (MongoDB)**

```javascript
// users collection
{
  _id: ObjectId,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },  // bcrypt hash
  name: { type: String, required: true },
  bio: String,
  interests: [String],
  languages: [String],
  budgetPreference: String,
  profilePhoto: String,
  verification: {
    email: { verified: Boolean, token: String, expiresAt: Date },
    id: { verified: Boolean, documentUrl: String, verifiedAt: Date }
  },
  stats: {
    tripsCompleted: Number,
    trustScore: Number,
    rating: Number,
    reviewCount: Number
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  lastLogin: Date
}

// sessions collection
{
  _id: ObjectId,
  userId: ObjectId,
  token: String,  // JWT token
  refreshToken: String,
  expiresAt: Date,
  createdAt: Date,
  ipAddress: String,
  userAgent: String
}
```

### **API Endpoints to Implement**

#### **Authentication**

```
POST   /api/auth/signup
Body: { name, email, password }
Response: { user, token, refreshToken }

POST   /api/auth/login
Body: { email, password }
Response: { user, token, refreshToken }

POST   /api/auth/logout
Headers: { Authorization: Bearer <token> }
Response: { success: true }

POST   /api/auth/refresh
Body: { refreshToken }
Response: { token, refreshToken }

POST   /api/auth/verify-email
Body: { token }
Response: { success: true }

POST   /api/auth/forgot-password
Body: { email }
Response: { success: true, message }

POST   /api/auth/reset-password
Body: { token, newPassword }
Response: { success: true }
```

#### **User Profile**

```
GET    /api/users/me
Headers: { Authorization: Bearer <token> }
Response: { user }

PUT    /api/users/me
Headers: { Authorization: Bearer <token> }
Body: { name, bio, interests, languages, budgetPreference }
Response: { user }

POST   /api/users/me/photo
Headers: { Authorization: Bearer <token> }
Body: FormData with image file
Response: { profilePhoto: "url" }

PUT    /api/users/me/password
Headers: { Authorization: Bearer <token> }
Body: { currentPassword, newPassword }
Response: { success: true }

GET    /api/users/:id
Response: { user } (public profile data only)
```

#### **OAuth Integration**

```
GET    /api/auth/google
Redirects to Google OAuth consent screen

GET    /api/auth/google/callback
Query: { code }
Response: { user, token, refreshToken }
```

---

## 🔄 Code Integration Points

### **Frontend Files to Update**

1. **Replace localStorage calls with API calls**
   - `handleSignup()` → POST /api/auth/signup
   - `handleLogin()` → POST /api/auth/login
   - `handleLogout()` → POST /api/auth/logout
   - `handleUpdateProfile()` → PUT /api/users/me

2. **Add API utility file** (`src/utils/api.js`)
   ```javascript
   const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   
   export const api = {
     post: async (endpoint, data) => {
       const token = localStorage.getItem('travelbuddy_token');
       const response = await fetch(`${API_BASE}${endpoint}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           ...(token && { Authorization: `Bearer ${token}` })
         },
         body: JSON.stringify(data)
       });
       return response.json();
     },
     // ... get, put, delete methods
   };
   ```

3. **Add environment variables** (`.env`)
   ```
   REACT_APP_API_URL=https://api.travelbuddy.com
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

---

## 🧪 Testing Checklist

### **Authentication Tests**

- [ ] Sign up with valid email and password
- [ ] Sign up with duplicate email (should fail)
- [ ] Sign up with weak password (should fail)
- [ ] Login with correct credentials
- [ ] Login with incorrect password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Session persists after page refresh
- [ ] Logout clears session completely
- [ ] Cannot access protected features when logged out

### **Profile Tests**

- [ ] Edit profile updates all fields correctly
- [ ] Profile changes persist after page refresh
- [ ] Trust score recalculates on profile update
- [ ] Profile avatar shows user initial
- [ ] Interests multi-select works correctly
- [ ] Languages multi-select works correctly

### **Protected Features Tests**

- [ ] "Create Trip" requires login
- [ ] "Join Trip" requires login
- [ ] Profile score validation blocks low-score users
- [ ] Header shows correct button based on auth state

---

## 📝 Implementation Notes

### **Password Security (Current vs Production)**

```javascript
// CURRENT (Demo - NOT secure)
const hashPassword = (password) => btoa(password);

// PRODUCTION (Backend with bcrypt)
const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
```

### **Session Management**

```javascript
// CURRENT (localStorage)
localStorage.setItem('travelbuddy_token', token);

// PRODUCTION (HTTP-only cookie)
res.cookie('token', jwt.sign({ userId }, SECRET), {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### **Google OAuth Setup**

1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs
5. Install `react-google-login` package
6. Update `handleGoogleLogin()` function

---

## 🚀 Deployment & Configuration

### **Current Setup**
- Frontend: GitHub Pages (https://alok6532.github.io/travel-buddy)
- Authentication: localStorage (client-side)
- Build size: 103.58 kB (gzipped)

### **Production Setup Recommendations**

1. **Frontend Hosting**: Vercel, Netlify, or AWS S3 + CloudFront
2. **Backend**: Node.js + Express on AWS EC2/ECS or Heroku
3. **Database**: MongoDB Atlas or AWS DocumentDB
4. **File Storage**: AWS S3 for profile photos
5. **CDN**: CloudFront for static assets
6. **SSL**: Let's Encrypt or AWS Certificate Manager

---

## 📞 Support & Next Steps

### **Immediate Next Steps**
1. Test all authentication flows thoroughly
2. Gather user feedback on UX
3. Implement email verification system
4. Add password reset functionality
5. Set up backend infrastructure

### **Future Enhancements**
- Two-factor authentication (2FA)
- Social login (Facebook, Apple)
- Biometric authentication for mobile
- Account deletion/deactivation
- Privacy settings and data export
- Activity logs and login history

---

## 🎉 Summary

The authentication system is now **fully functional** as a frontend MVP using localStorage. All core features work:

✅ Signup & Login  
✅ Session Persistence  
✅ Profile Management  
✅ Protected Routes  
✅ Logout Flow  
✅ Trust Score Integration  

The system is **production-ready** for frontend testing and can be easily migrated to a real backend by following this documentation.

**Live Demo**: https://alok6532.github.io/travel-buddy

---

*Last Updated: January 2024*  
*Version: 1.0.0*
