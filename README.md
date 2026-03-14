<div align="center">

# 🩸 BloodLink

**A full-stack blood donation platform connecting donors with patients in urgent need — across all 64 districts of Bangladesh.**

**[🌐 Live Site](https://assignment-11-abusayemsifat.pages.dev) &nbsp;·&nbsp; [⚙️ Backend API](https://backend-11-cyan.vercel.app) &nbsp;·&nbsp; [💻 Frontend Repo](https://github.com/abusayemsifat/assignment-11-client)**

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)

</div>

---

## About

Every year, thousands of people in Bangladesh die because they cannot find a compatible blood donor in time. BloodLink bridges that gap — donors register their availability, and patients or their families can post urgent requests and find matching donors within minutes, filtered by blood group, district, and upazila.

---

## Features

### Public
- Browse all active blood donation requests in a responsive card grid
- View full request details — hospital, location, date, contact, and related requests
- Search and filter donors by blood group, district, and upazila with sorting
- Read articles on blood donation, health, and campaigns
- Make financial contributions via Stripe-powered secure checkout
- Submit contact messages stored directly in the database

### Donors
- Post and manage blood donation requests
- Track request status: Pending → In Progress → Done → Cancelled
- Personal dashboard with paginated request history
- Edit profile, upload avatar, and change password with Firebase re-authentication

### Admins
- Manage all users — block or unblock accounts
- Manage all blood requests — sortable table with status updates and delete
- Publish, edit, and delete blog articles
- Live analytics dashboard with Bar, Line, and Pie charts on real backend data

### Platform
- 🌙 Light and Dark mode
- 📱 Fully responsive — mobile, tablet, and desktop
- ⚡ Scroll-reveal animations and smooth route transitions
- 🔒 Firebase Authentication + JWT-protected API routes
- 🇧🇩 Covers all 8 divisions and 64 districts of Bangladesh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, DaisyUI v5 |
| Routing | React Router v7 |
| Authentication | Firebase Auth — Email/Password + Google |
| Charts | Recharts |
| Payments | Stripe Checkout |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Image Upload | ImgBB API |
| Deployment | Cloudflare Pages (frontend) · Vercel (backend) |

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
│   ├── About/               # Mission, team, milestones
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
│   ├── useAxios.js          # Public Axios instance
│   ├── useCountUp.js        # Animated number counter
│   └── useScrollReveal.js   # Scroll-triggered reveal animations
└── context/ThemeContext.jsx
```

---

## API Reference

**Base URL:** `https://backend-11-cyan.vercel.app`

Protected routes require a Firebase ID token: `Authorization: Bearer <token>`

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
| `GET` | `/contact` | 🔒 | Get all contact submissions |
| `POST` | `/create-payment-checkout` | — | Create a Stripe checkout session |
| `POST` | `/success-payment` | — | Confirm and record a completed payment |

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Donor | `donor@bloodlink.com` | `Demo@1234` |
| Admin | `admin@bloodlink.com` | `Admin@1234` |

---

<div align="center">
  Built to save lives in Bangladesh 🇧🇩
</div>