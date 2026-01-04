# 📰 Personalized News Digest Service

A **serverless web application** that delivers **personalized news digests** to users via email based on their selected topics. The system supports **manual and automated email delivery**, secure authentication, and is fully deployed on **Vercel** using **serverless functions and cron jobs**.

---

## 📌 Project Overview

Many users struggle to keep up with news relevant to their interests. This project solves that problem by allowing users to:

* Select preferred news topics
* Receive curated news articles via email
* Control subscription preferences
* Get updates automatically or on demand

The application is designed using a **modern full-stack, serverless architecture**.

---

## ✨ Key Features

### 1️⃣ User Authentication

* User registration and login
* Password hashing using **bcrypt**
* Secure session handling with **JWT (JSON Web Tokens)**

### 2️⃣ Authenticated Dashboard

* Add or remove favorite news topics
* Enable or disable email subscription
* View user profile and subscription status
* Trigger **manual news digest emails**

### 3️⃣ News & Email Integration

* Fetches real-time news using a **News API**
* Sends personalized emails using **Brevo (Sendinblue) API**
* Two delivery modes:

  * **Manual** – User-triggered from dashboard
  * **Automatic** – Scheduled using cron jobs

### 4️⃣ Scheduled Email Delivery

* Iterates over all subscribed users
* Fetches topic-based news for each user
* Sends personalized email digests
* Schedule:

  * Development: Every **5 minutes**
  * Production: Every **12 hours**

---

## 🏗️ System Architecture

```
Frontend (React + Tailwind)
        │
        ▼
Vercel Serverless APIs (/api)
        │
        ├── Authentication (JWT)
        ├── News API Integration
        ├── Brevo Email Service
        └── Cron Job Scheduler
```

---

## 🗂️ Project Structure

```
personalized-news-digest/
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── api/                        # Vercel serverless backend
│   ├── config/
│   ├── models/
│   ├── utils/
│   ├── register.js
│   ├── login.js
│   ├── profile.js
│   ├── updateTopics.js
│   ├── sendDigest.js
│   └── cronDigest.js
│
├── vercel.json                 # Cron and routing configuration
├── package.json
├── build-and-move.js            #helper script
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Vercel Serverless Functions
* MongoDB + Mongoose
* JWT Authentication

### APIs & Services

* News API (for fetching articles)
* Brevo (Sendinblue) – Transactional Email API

### Deployment

* Vercel (Serverless hosting + Cron jobs)

---

## 🔐 Environment Variables

Configure the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
BREVO_API_KEY=your_brevo_api_key
EMAIL_FROM=verified_sender_email@domain.com
```

⚠️ `EMAIL_FROM` must be a **verified sender** in Brevo.

---

## 🚀 Deployment (Vercel)

Deployed on vercel

The frontend is served as static files and the backend runs as serverless functions under `/api`.

---

## ⏱️ Cron Job Configuration

The scheduled email delivery is configured in `vercel.json`:

```
"crons": [
  {
    "path": "/api/cronDigest",
    "schedule": "*/5 * * * *"
  }
]
```

This triggers automatic email delivery every 5 minutes during development.

---

## 📧 Email Personalization

Each email includes:

* Personalized greeting with user name
* Topic-based news articles
* Clickable article links
* Short article descriptions

---

## ✅ How to Verify Functionality

* Register and log in
* Select favorite topics
* Enable email subscription
* Trigger **manual digest** from dashboard

---

## 🧪 Future Enhancements

* Email templates with better UI
* Topic-based scheduling preferences
* Push notifications
* AI-based article summarization

---

## 👩‍💻 Author

**Chaithra P**
Full Stack Developer

---

## 📄 License

This project is developed for educational and academic purposes.
