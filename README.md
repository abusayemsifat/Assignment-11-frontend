<div align="center">

# 🩸 BloodLink

**A full-stack blood donation platform connecting donors with patients in urgent need — across all 64 districts of Bangladesh.**

[![Live](https://img.shields.io/badge/Live%20Site-Visit%20Now-C00707?style=for-the-badge&logo=cloudflare&logoColor=white)](https://assignment-11-abusayemsifat.pages.dev)
[![API](https://img.shields.io/badge/Backend%20API-Live-134E8E?style=for-the-badge&logo=vercel&logoColor=white)](https://backend-11-cyan.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

</div>

---

## About the Project

Every year, thousands of people in Bangladesh die because they cannot find a compatible blood donor in time. BloodLink is a production-ready web application that bridges that gap — donors register their availability, and patients or their families post urgent requests that can be filtered instantly by blood group, district, and upazila.

---

## Features

### Public
- Browse all active blood donation requests in a responsive card grid
- View full request details — location, hospital, date, and contact
- Search and filter donors by blood group, district, and upazila
- Sort results by name, date, or location
- Read articles on blood donation health and campaigns
- Make financial donations via Stripe-powered secure checkout
- Contact the BloodLink team through a validated form stored in the database

### Donors (Registered Users)
- Post and manage blood donation requests
- Track request status: Pending → In Progress → Done → Cancelled
- Personal dashboard with request history, pagination, and filtering
- Edit profile, upload avatar via ImgBB, and change password

### Admins
- Manage all users — view, block, or unblock accounts
- Manage all blood requests — update status, sort columns, delete entries
- Publish, edit, and delete blog articles
- Live analytics dashboard with Bar, Line, and Pie charts built on real data

### Platform
- 🌙 Light and Dark mode with persistence
- 📱 Fully responsive across mobile, tablet, and desktop
- ⚡ Route transitions and scroll-reveal animations
- 🔒 Firebase Authentication + JWT-protected API routes
- 🇧🇩 Covers all 8 divisions and 64 districts of Bangladesh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, DaisyUI v5 |
| Routing | React Router v7 |
| Authentication | Firebase Auth (Email/Password + Google) |
| Charts | Recharts |
| Payments | Stripe Checkout |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Image Upload | ImgBB API |
| Deployment | Cloudflare Pages (frontend) · Vercel (backend) |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A Firebase project with Authentication enabled
- A MongoDB Atlas cluster
- A Stripe account
- An ImgBB account

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/abusayemsifat/bloodlink-frontend.git
cd bloodlink-frontend
npm install

# Backend
git clone https://github.com/abusayemsifat/bloodlink-backend.git
cd bloodlink-backend
npm install
```

### 2. Set up environment variables

**Frontend** — create `.env.local` in the frontend root:

```env
# Get these 6 values from Firebase Console → Project Settings → Your Apps → SDK Config
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Get from https://api.imgbb.com → generate a key
VITE_IMGBB_API_KEY=your_imgbb_api_key

# Already deployed — use this value as-is
VITE_BACKEND_URL=https://backend-11-cyan.vercel.app
```

**Backend** — create `.env` in the backend root:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
FB_SERVICE_KEY=your_base64_encoded_firebase_service_account_json
STRIPE_SECRET=your_stripe_secret_key
SITE_DOMAIN=https://assignment-11-abusayemsifat.pages.dev
```

> To encode your Firebase service account: `base64 -i serviceAccountKey.json`

### 3. Run locally

```bash
# Frontend — http://localhost:5173
npm run dev

# Backend — http://localhost:3000
node index.js
```

---

## API Reference

Protected routes require a Firebase ID token in the request header:

```
Authorization: Bearer <firebase_id_token>
```

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/users` | — | Register a new user |
| `GET` | `/users` | 🔒 | Get all users |
| `GET` | `/users/role/:email` | — | Get user role and profile |
| `PATCH` | `/users/update/:email` | — | Update profile details |
| `PATCH` | `/update/user/status` | 🔒 | Block or unblock a user |
| `GET` | `/total-donors` | — | Total registered donor count |
| `GET` | `/total-requests` | — | Total blood request count |
| `POST` | `/requests` | 🔒 | Create a new blood request |
| `GET` | `/all-requests` | — | Get all blood requests |
| `GET` | `/my-request` | 🔒 | Get the authenticated user's requests |
| `GET` | `/search-requests` | — | Filter by blood group, district, upazila |
| `PATCH` | `/requests/:id/status` | 🔒 | Update a request's donation status |
| `DELETE` | `/requests/:id` | 🔒 | Delete a blood request |
| `GET` | `/blogs` | — | Get all published blog posts |
| `GET` | `/blogs/:id` | — | Get a single blog post |
| `POST` | `/blogs` | 🔒 | Create a new blog post |
| `PATCH` | `/blogs/:id` | 🔒 | Edit a blog post |
| `DELETE` | `/blogs/:id` | 🔒 | Delete a blog post |
| `POST` | `/contact` | — | Submit a contact form message |
| `GET` | `/contact` | 🔒 | Get all contact submissions (admin) |
| `POST` | `/create-payment-checkout` | — | Create a Stripe checkout session |
| `POST` | `/success-payment` | — | Confirm and record a completed payment |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/              # Sticky navbar with profile dropdown
│   ├── Footer/              # Full footer with links and social
│   ├── Hero/                # Animated hero section
│   ├── Aside/               # Dashboard sidebar
│   ├── PageLoader/          # Heartbeat loading screen
│   └── RouteTransition/     # Page transition wrapper
├── Pages/
│   ├── Home/                # Landing page — 8 sections
│   ├── About/               # Mission, team, timeline
│   ├── Contact/             # Contact form with DB storage
│   ├── Blog/                # BlogList and BlogDetail
│   ├── Donate/              # Stripe donation page
│   ├── AllRequests/         # Card grid with search, filter, sort
│   ├── RequestDetail/       # Public detail page for each request
│   ├── SearchRequest/       # Donor search with 3 filters + sort
│   └── Dashboard/
│       ├── MainDashboard/   # Charts and live stats
│       ├── AddRequest/      # Create blood request form
│       ├── MyRequest/       # Donor's request history
│       ├── ManageRequests/  # Admin — sortable requests table
│       ├── AllUsers/        # Admin — sortable users table
│       ├── DashBlog/        # Admin — blog management
│       ├── Reports/         # Admin — reports view
│       └── Profile.jsx      # Profile editor + password change
├── Provider/AuthProvider.jsx
├── Routes/
│   ├── Routes.jsx
│   └── PrivateRoute.jsx
├── hooks/
│   ├── useAxiosSecure.js    # Axios with Firebase token interceptor
│   ├── useAxiosPublic.js    # Plain Axios for public endpoints
│   ├── useCountUp.js        # Animated number counter
│   └── useScrollReveal.js   # Scroll-triggered reveal animations
└── context/ThemeContext.jsx
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Donor | `donor@bloodlink.com` | `Demo@1234` |
| Admin | `admin@bloodlink.com` | `Admin@1234` |

---

## License

MIT © 2025 BloodLink

---

<div align="center">
  Built to save lives in Bangladesh 🇧🇩
</div>