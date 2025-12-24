# 📱 TechStore – Premium iDevice E-commerce

**TechStore** is a high-performance, full-stack e-commerce platform specializing in premium iDevice products.  
It is built with a strong focus on **security**, **smooth UI/UX**, and **data-driven administration**.

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

#### 🔒 Security & Personalization
- Profile Settings: Update user display names and account preferences.
- Two-Factor Authentication (2FA): Enhanced security layer to protect against unauthorized access.

---

### 🛠️ Admin Management

#### 📊 Advanced Analytics
- Business Insights: Real-time visualization of sales data and store performance.


#### 📦 Comprehensive Product Management
- The system supports a complex catalog with high flexibility:
- Product Creation: * Add Variants (size, colors, images, tags).
- Assign specific Colors to products.
- Multi-Image upload support for each product.
- Tagging System for improved categorization and searchability.

#### Smart Inventory Table:

- Search & Filter: Find products instantly by name.
- Column Management: Customizable table views to focus on the data that matters.
- Full CRUD: Seamlessly Edit or Delete products and their associated variants/images.

#### 📑 Order & Customer Handling
- Order Overview: A complete list of all customer transactions and their current status.
- Order Details Dialog: Click any order to open a detailed modal containing:

### Customer contact and shipping information.

- Itemized list of purchased products.
- Payment and fulfillment status updates.

#### 🔒 Security & Personalization
- Profile Settings: Update admin display names and account preferences.
- Two-Factor Authentication (2FA): Enhanced security layer to protect against unauthorized access.

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

## 🧠 Architecture & Design

The project follows a modular and scalable architecture:

**App Router**
-Handles routing, layouts, and server components

**Server Layer**
-Encapsulates business logic and secure operations

**Lib Layer**
-Centralized utilities (Stripe, pricing, formatting, base URL)

**Store Layer**
-Client-side state management with persistence

This separation improves maintainability, testability, and long-term scalability.

---

## 📅 Roadmap

- [ ] Out-of-stock management (automatic UI updates when inventory reaches zero)
- [ ] AI Chatbot for 24/7 customer assistance
- [ ] Advanced admin settings for site-wide configuration

---

## 💻 Getting Started
git clone [https://maymyat-dev/techstore-ecommerce](https://github.com/maymyat-dev/homenest-ecommerce-frontend)
- cd techstore
- npm install
- npm run dev

---

📧 Email Service Note

Email features such as Forgot Password and 2FA verification use the Resend API.

⚠️ Due to Resend Free Tier limitations, emails can currently only be sent to the verified email address.
To enable email delivery for all users, domain verification is required in the Resend dashboard.

---

### 🔐 Environment Variables
```bash
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


