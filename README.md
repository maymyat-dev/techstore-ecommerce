# 📱 TechStore – Premium iDevice E-commerce

**TechStore** is a high-performance, full-stack e-commerce platform specializing in premium iDevice products.  
It is built with a strong focus on **security**, **smooth UI/UX**, and **data-driven administration**.

🌐 **Live Demo:** https://techstore.maymyatmon.com/

---

## 🚀 Key Features

### 👤 Customer Experience

#### 🔐 Advanced Authentication
- OAuth authentication (Google)
- Traditional Email / Password login
- Secure **Forgot Password** recovery
- **Two-Factor Authentication (2FA)** toggle

#### 🛍️ Smart Shopping
- Optimized browsing with **pagination on the home page**
- Detailed product pages with technical specifications
- Persistent shopping cart using **Zustand + Local Storage**

#### 💳 Checkout Flow
- Login-required guard:
- Unauthenticated users are prompted with a **“Login Required”** message before checkout
- Secure payment processing via **Stripe**
- Order success & confirmation pages
- User order summary and history

---

### 🛠️ Admin Management

#### 📊 Centralized Dashboard
- Real-time overview of business performance

#### 📦 Inventory Control
- Full CRUD functionality (Add / Update / Delete products)

#### 📑 Order Oversight
- Master order table
- **Detail dialog modal** for granular order inspection

#### 📈 Analytics & Support
- Sales analytics and total revenue tracking
- Admin-side chat interface for customer interaction

---

## 🧰 Tech Stack

| Layer | Technology |
|------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS, shadcn/ui |
| State Management | Zustand |
| Payments | Stripe API |
| Authentication | NextAuth.js (OAuth & Credentials) |
| Deployment | Vercel |
| Domain | Custom Domain |

---

## 📂 Architecture & Design

The project follows a **modular architecture** to keep business logic cleanly separated from UI components:

- **Components**  
  Reusable UI components built with shadcn/ui
- **Hooks**  
  Custom hooks for cart logic and authentication state
- **Lib**  
  Centralized configuration for Stripe, authentication, and database clients

This structure improves scalability, maintainability, and developer experience.

---

## 📅 Roadmap

- [ ] Out-of-stock management (automatic UI updates when inventory reaches zero)
- [ ] AI Chatbot for 24/7 customer assistance
- [ ] Advanced admin settings for site-wide configuration

---

## 💻 Getting Started

### Environment Setup & Install
```bash
git clone https://github.com/your-username/techstore.git
cd techstore
npm install
DATABASE_URL=postgresql://user:password@host:5432/dbname
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
RESEND_API_KEY=your_resend_api_key
UPLOADTHING_TOKEN=your_uploadthing_token
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
npm run dev
