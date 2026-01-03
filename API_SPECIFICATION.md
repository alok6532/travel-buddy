# Travel Buddy API Specification

## 📋 Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [User Profile Endpoints](#user-profile-endpoints)
3. [Trip Management Endpoints](#trip-management-endpoints)
4. [Verification Endpoints](#verification-endpoints)
5. [Error Handling](#error-handling)
6. [Security & Best Practices](#security--best-practices)

---

## 🔐 Authentication Endpoints

### 1. Sign Up
Create a new user account.

**Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "bio": "Travel enthusiast", // optional
  "interests": ["Adventure", "Beach"], // optional
  "languages": ["English", "Hindi"], // optional
  "budgetPreference": "Mid-range" // optional
}
```

**Validation Rules**:
- `name`: Required, 2-50 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters, must contain letter and number

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "user_123abc",
      "name": "John Doe",
      "email": "john@example.com",
      "trustScore": 20,
      "verified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**:
```json
// 400 Bad Request - Invalid input
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}

// 409 Conflict - Email already exists
{
  "success": false,
  "error": "Email already registered"
}
```

---

### 2. Login
Authenticate existing user.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123abc",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Travel enthusiast",
      "interests": ["Adventure", "Beach"],
      "languages": ["English", "Hindi"],
      "budgetPreference": "Mid-range",
      "profilePhoto": "https://cdn.travelbuddy.com/photos/user_123.jpg",
      "trustScore": 65,
      "verified": true,
      "stats": {
        "tripsCompleted": 5,
        "rating": 4.8,
        "reviewCount": 12
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**:
```json
// 401 Unauthorized - Invalid credentials
{
  "success": false,
  "error": "Invalid email or password"
}

// 404 Not Found - User doesn't exist
{
  "success": false,
  "error": "No account found with this email"
}
```

---

### 3. Logout
Invalidate user session.

**Endpoint**: `POST /api/auth/logout`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4. Refresh Token
Get new access token using refresh token.

**Endpoint**: `POST /api/auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 5. Google OAuth Login
Authenticate with Google account.

**Endpoint**: `POST /api/auth/google`

**Request Body**:
```json
{
  "idToken": "google_oauth_id_token"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Google authentication successful",
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "isNewUser": false
  }
}
```

---

### 6. Forgot Password
Request password reset email.

**Endpoint**: `POST /api/auth/forgot-password`

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### 7. Reset Password
Reset password using token from email.

**Endpoint**: `POST /api/auth/reset-password`

**Request Body**:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 👤 User Profile Endpoints

### 1. Get Current User Profile
Get authenticated user's full profile.

**Endpoint**: `GET /api/users/me`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "user_123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Travel enthusiast exploring the world",
    "interests": ["Adventure", "Photography", "Culture"],
    "languages": ["English", "Hindi", "Spanish"],
    "budgetPreference": "Mid-range",
    "profilePhoto": "https://cdn.travelbuddy.com/photos/user_123.jpg",
    "verification": {
      "verified": true,
      "idVerified": true,
      "emailVerified": true,
      "universityEmail": false
    },
    "stats": {
      "trustScore": 85,
      "tripsCompleted": 12,
      "rating": 4.9,
      "reviewCount": 24,
      "joinDate": "Jan 2023"
    },
    "settings": {
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "privacy": {
        "showEmail": false,
        "showProfile": true
      }
    },
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Update Profile
Update user profile information.

**Endpoint**: `PUT /api/users/me`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Request Body**:
```json
{
  "name": "John Smith",
  "bio": "Updated bio",
  "interests": ["Adventure", "Beach", "Food"],
  "languages": ["English", "French"],
  "budgetPreference": "Luxury"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

---

### 3. Upload Profile Photo
Upload or update profile photo.

**Endpoint**: `POST /api/users/me/photo`

**Headers**:
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Request Body** (FormData):
```
photo: [File object]
```

**Validation**:
- File types: jpg, jpeg, png
- Max size: 5MB
- Min dimensions: 200x200px

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Profile photo uploaded successfully",
  "data": {
    "profilePhoto": "https://cdn.travelbuddy.com/photos/user_123_v2.jpg"
  }
}
```

---

### 4. Change Password
Update user password (requires current password).

**Endpoint**: `PUT /api/users/me/password`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Request Body**:
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Error Response**:
```json
// 401 Unauthorized - Wrong current password
{
  "success": false,
  "error": "Current password is incorrect"
}
```

---

### 5. Get Public User Profile
Get public profile of any user (limited information).

**Endpoint**: `GET /api/users/:userId`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "user_123abc",
    "name": "John Doe",
    "bio": "Travel enthusiast",
    "profilePhoto": "https://cdn.travelbuddy.com/photos/user_123.jpg",
    "trustScore": 85,
    "stats": {
      "tripsCompleted": 12,
      "rating": 4.9,
      "reviewCount": 24,
      "joinDate": "Jan 2023"
    },
    "verified": true,
    "languages": ["English", "Hindi"]
  }
}
```

---

## 🗺 Trip Management Endpoints

### 1. Create Trip
Create a new trip (requires authentication).

**Endpoint**: `POST /api/trips`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Request Body**:
```json
{
  "title": "Ladakh Bike Expedition",
  "destination": "Ladakh, India",
  "dates": {
    "start": "2024-06-15",
    "end": "2024-06-25"
  },
  "budget": "₹25,000",
  "description": "Epic bike trip through Ladakh mountains",
  "category": "Adventure",
  "spots": {
    "total": 6,
    "filled": 1
  },
  "minTrustScore": 60,
  "requirements": {
    "ageMin": 18,
    "ageMax": 40,
    "experience": "Intermediate"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "Leh",
      "activities": ["Acclimatization", "Local sightseeing"]
    }
  ]
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Trip created successfully",
  "data": {
    "tripId": "trip_456xyz",
    "title": "Ladakh Bike Expedition",
    "createdBy": "user_123abc",
    "status": "open",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Join Trip
Join an existing trip (requires authentication & trust score check).

**Endpoint**: `POST /api/trips/:tripId/join`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Successfully joined the trip",
  "data": {
    "tripId": "trip_456xyz",
    "participantId": "participant_789",
    "joinedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses**:
```json
// 403 Forbidden - Trust score too low
{
  "success": false,
  "error": "Insufficient trust score",
  "details": {
    "required": 60,
    "current": 45,
    "message": "Increase your trust score to join this trip"
  }
}

// 409 Conflict - Trip full
{
  "success": false,
  "error": "Trip is full"
}

// 400 Bad Request - Already joined
{
  "success": false,
  "error": "You have already joined this trip"
}
```

---

### 3. Get Trip Details
Get detailed information about a trip.

**Endpoint**: `GET /api/trips/:tripId`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "trip_456xyz",
    "title": "Ladakh Bike Expedition",
    "destination": "Ladakh, India",
    "dates": { "start": "2024-06-15", "end": "2024-06-25" },
    "budget": "₹25,000",
    "description": "Epic bike trip through Ladakh mountains",
    "category": "Adventure",
    "spots": { "total": 6, "filled": 3 },
    "minTrustScore": 60,
    "organizer": {
      "id": "user_123abc",
      "name": "John Doe",
      "profilePhoto": "https://...",
      "trustScore": 95,
      "rating": 4.9
    },
    "participants": [
      {
        "id": "user_123abc",
        "name": "John Doe",
        "profilePhoto": "https://...",
        "trustScore": 95
      }
    ],
    "status": "open",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### 4. Search/Filter Trips
Search and filter trips.

**Endpoint**: `GET /api/trips`

**Query Parameters**:
```
?search=Ladakh
&category=Adventure
&minBudget=10000
&maxBudget=50000
&startDate=2024-06-01
&endDate=2024-12-31
&minTrustScore=50
&status=open
&page=1
&limit=20
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "trips": [ /* array of trip objects */ ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 145,
      "pages": 8
    }
  }
}
```

---

## ✅ Verification Endpoints

### 1. Send Email Verification
Send verification email to user.

**Endpoint**: `POST /api/verify/email/send`

**Headers**:
```
Authorization: Bearer jwt_token
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Verification email sent to john@example.com"
}
```

---

### 2. Verify Email
Verify email using token from email.

**Endpoint**: `POST /api/verify/email`

**Request Body**:
```json
{
  "token": "email_verification_token"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "trustScoreIncrease": 10,
    "newTrustScore": 55
  }
}
```

---

### 3. Submit ID Verification
Upload ID documents for verification.

**Endpoint**: `POST /api/verify/id`

**Headers**:
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Request Body** (FormData):
```
idType: "passport" | "driving_license" | "aadhaar"
idNumber: "ABC123456"
frontPhoto: [File]
backPhoto: [File]
selfiePhoto: [File]
```

**Success Response** (202 Accepted):
```json
{
  "success": true,
  "message": "ID verification submitted for review",
  "data": {
    "verificationId": "verify_123",
    "status": "pending",
    "estimatedReviewTime": "24-48 hours"
  }
}
```

---

## ❌ Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": { /* optional additional info */ }
}
```

### HTTP Status Codes

| Code | Description | When to Use |
|------|-------------|-------------|
| 200 | OK | Successful GET, PUT, POST |
| 201 | Created | Successful resource creation |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input/validation failed |
| 401 | Unauthorized | Invalid/missing token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Semantic errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## 🔒 Security & Best Practices

### Authentication Header
All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

### JWT Token Structure
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user_123abc",
    "email": "john@example.com",
    "iat": 1705318200,
    "exp": 1705404600
  }
}
```

### Token Expiry
- **Access Token**: 15 minutes
- **Refresh Token**: 7 days

### Rate Limiting
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705318800
```

| Endpoint | Rate Limit |
|----------|------------|
| /api/auth/login | 5 requests / 15 min |
| /api/auth/signup | 3 requests / hour |
| /api/users/* | 100 requests / 15 min |
| /api/trips/* | 100 requests / 15 min |

### CORS Configuration
```javascript
{
  origin: ['https://travelbuddy.com', 'https://www.travelbuddy.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
```

### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## 📝 Request/Response Examples

### Complete Signup Flow

**1. Sign Up**
```bash
curl -X POST https://api.travelbuddy.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass123!",
    "interests": ["Beach", "Culture"],
    "languages": ["English", "Spanish"]
  }'
```

**2. Verify Email**
```bash
curl -X POST https://api.travelbuddy.com/api/verify/email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "email_verification_token_from_email"
  }'
```

**3. Update Profile**
```bash
curl -X PUT https://api.travelbuddy.com/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Beach lover and culture enthusiast",
    "budgetPreference": "Mid-range"
  }'
```

**4. Create Trip**
```bash
curl -X POST https://api.travelbuddy.com/api/trips \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Goa Beach Retreat",
    "destination": "Goa, India",
    "dates": {"start": "2024-07-01", "end": "2024-07-07"},
    "budget": "₹15,000",
    "category": "Beach",
    "spots": {"total": 4, "filled": 1}
  }'
```

---

*API Version: 1.0.0*  
*Last Updated: January 2024*  
*Base URL: `https://api.travelbuddy.com`*
