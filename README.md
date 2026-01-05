# 📰 Personalized News Digest Service

A **serverless web application** that delivers **personalized news digests** to users via email based on their selected topics. This project demonstrates a full-stack implementation of secure authentication, external API integration, and automated scheduling on **Vercel**.

---

## 📌 Project Overview

Many users find it difficult to curate news relevant to their specific interests. This application provides a central dashboard where users can:

* **Customize Topics:** Follow specific interest areas (e.g., Technology, Health, Sports).
* **Automated Delivery:** Receive curated headlines directly in their inbox.
* **On-Demand Updates:** Trigger a "Send Now" digest manually from the dashboard.

---

## ✨ Key Features

* **User Authentication:** Secure registration and login using **JWT** and **bcrypt** password hashing.
* **Real-time News:** Integration with **News API** to fetch the latest headlines for user-selected topics.
* **Reliable Email Service:** Powered by **Nodemailer** using a secure SMTP relay (Gmail App Passwords).
* **Serverless Cron Jobs:** Automated 12-hour delivery cycles managed via `vercel.json` configurations.

---

## 🏗️ System Architecture

```text
Frontend (React + Tailwind)
        │
        ▼
Vercel Serverless APIs (/api)
        │
        ├── Auth Service (JWT + MongoDB)
        ├── News Fetcher (News API)
        ├── Mail Dispatcher (Nodemailer SMTP)
        └── Cron Scheduler (Vercel Crons)

```

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Axios
* **Backend:** Node.js, Vercel Serverless Functions
* **Database:** MongoDB + Mongoose
* **Email:** Nodemailer (SMTP)
* **API:** News API

---

## 🔐 Environment Variables

To run this project, you will need to add the following variables to your Vercel environment:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEWS_API_KEY=your_news_api_key
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_digit_google_app_password

```

> **Note:** For Gmail, you must use an **App Password**. Regular passwords will be blocked by Google's security.

---

## ⏱️ Cron Job Configuration

Automated digests are handled by Vercel’s native cron service.

* **Path:** `/api/cronDigest`
* **Schedule:** `0 9 * * *` (Every 9 AM UTC)

---

## 🚀 Deployment

This project is optimized for **Vercel**.

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Configure the **Environment Variables** in the Vercel dashboard.
4. The backend API routes under `/api` will be automatically recognized as Serverless Functions.

---

## 👩‍💻 Author

**Chaithra P** Full Stack Developer

---



