# 🔐 VaultPass

A simple and secure **MERN Authentication System** with modern practices.

---

## 🚀 Features

* ✅ Email OTP Verification
* ✅ JWT Authentication (Access + Refresh Token)
* ✅ Protected Routes
* ✅ Forgot & Reset Password
* ✅ Secure Cookie-based Auth

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), Axios
**Backend:** Node.js, Express.js, MongoDB
**Auth & Security:** JWT, bcrypt, cookies
**Other:** Nodemailer, dotenv

---

## 📁 Structure

```id="a1s2d3"
backend/
frontend/
```

---

## ⚙️ Environment Variables

```id="env123"
PORT=5001
MONGO_URI=your_mongo_uri

JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL=your_email
EMAIL_PASS=your_app_password

CLIENT_URL=http://localhost:5173
```

---

## 🚀 Run Locally

```id="run1"
# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

---

## 🌍 API Routes

* POST `/api/auth/register`
* POST `/api/auth/verify-otp`
* POST `/api/auth/login`
* POST `/api/auth/logout`
* GET `/api/auth/me`
* POST `/api/auth/forgot-password`
* POST `/api/auth/reset-password/:token`
* POST `/api/auth/refresh-token`

---

## 🔁 Flow

```id="flow1"
Register → OTP → Verify → Login
        ↓
Access Token → Expire → Refresh Token
```

---

## 🎯 Goal

Focused on learning **real-world authentication logic and security**, not UI.

---

⭐ If you understand this project, you're ready for real backend work.

