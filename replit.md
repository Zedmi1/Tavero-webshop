# Tavero - Premium T-Shirt Webshop

## Overview
Tavero is a modern, fully functional e-commerce webshop for selling unisex T-shirts. Built with React and Vite, featuring a clean, minimal design with a soft blue color palette. All prices are displayed in EUR (€).

## Project Structure
```
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation with search, wishlist, cart
│   │   ├── Footer.jsx      # Site footer with links
│   │   ├── CartSlider.jsx  # Slide-out shopping cart with shipping calculation
│   │   └── ProductCard.jsx # Product display card
│   ├── pages/          # Page components
│   │   ├── Home.jsx        # Homepage with hero, featured products, and summer collection
│   │   ├── Shop.jsx        # Product listing with filters
│   │   ├── Product.jsx     # Individual product details
│   │   ├── Wishlist.jsx    # Saved items page
│   │   ├── Checkout.jsx    # Checkout with selectable shipping options
│   │   ├── OrderConfirmation.jsx
│   │   ├── Login.jsx       # User login
│   │   └── Register.jsx    # User registration
│   ├── context/        # React context providers
│   │   ├── AuthContext.jsx    # User authentication
│   │   ├── CartContext.jsx    # Shopping cart state
│   │   └── WishlistContext.jsx # Wishlist state
│   ├── data/           # Static data
│   │   └── products.js     # Product catalog (7 products)
│   ├── App.jsx         # Main app with routing and conditional announcement bar
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/
│   └── images/         # Product images and logos
└── package.json
```

## Products
Currently features 7 products (all prices in EUR):

### Featured Products (NEW)
- **White Shirt** - €22.99 (7 product images) - NEW, Featured
- **Black Shirt** - €24.99 (7 product images) - NEW, Featured
- **Gray Shirt** - €23.99 (8 product images) - NEW, Featured

### Summer Collection
- **Brown Shirt** - €36.99 (7 product images) - Summer Collection
- **Light Blue Shirt** - €37.99 (8 product images) - Summer Collection
- **Green Shirt** - €38.99 (8 product images) - Summer Collection

### Other
- **Marine Shirt** - €39.99 (7 product images)

Product images are stored in `public/images/` folder.

## Key Features
1. **Announcement Bar** - Carousel-style bar at top (home page only) showing "Free shipping on all orders over €50" with emoji
2. **User Authentication** - Login/logout with localStorage persistence
3. **Product Browsing** - Grid layout with filters (size, price, category including "New Products")
4. **Shopping Cart** - Slide-out cart with quantity controls and shipping calculation
5. **Shipping Selection** - Choose from Standard (€5.99), Express (€12.99), or International (€19.99) at checkout
6. **Wishlist** - Save favorite items, accessible via navigation bar
7. **Mock Checkout** - Complete checkout flow with shipping method selection and form validation
8. **Responsive Design** - Works on all screen sizes

## Home Page Sections
1. Hero section with logo and CTA
2. Featured Products (White, Gray, Black shirts)
3. Quality You Can Feel banner
4. Tavero's Summer Collection (Brown, Light Blue, Green shirts)

## Shipping Options (Selectable at Checkout)
- **Standard Shipping** - €5.99 (5-7 business days) - Free on orders €50+
- **Express Shipping** - €12.99 (2-3 business days)

## Footer Navigation
- **Shop**: All Products, New Products
- **Help**: FAQ, Shipping, Returns, Size Guide
- **Company**: About Us, Contact, Terms & Conditions, Privacy Policy

## Information Pages
All footer links lead to dedicated pages with useful content:
- **FAQ** - Interactive accordion with 10 common questions
- **Shipping** - Shipping options details
- **Returns** - 30-day return policy, step-by-step process
- **Size Guide** - Interactive sizing chart (inches/cm toggle)
- **About Us** - Company story, values, and promises
- **Contact** - Contact form with company info
- **Terms & Conditions** - Legal terms of use
- **Privacy Policy** - Data handling and privacy info

## Brand Identity
- **Colors**: Primary #AFC6E9 (soft blue), Secondary #2A2A2A (dark grey)
- **Font**: Inter (Google Fonts)
- **Style**: Minimal, clean, professional
- **Currency**: EUR (€)

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Vite
- CSS (no frameworks)

### Backend (server/)
- Node.js + Express
- Prisma ORM
- PostgreSQL database
- JWT authentication
- bcryptjs for password hashing

## Running Locally

### Frontend
```bash
npm install
npm run dev
```
Frontend runs on http://0.0.0.0:5000

### Backend
```bash
cd server
npm install
npx prisma migrate deploy
npm run seed
npm start
```
Backend API runs on http://0.0.0.0:3001

## Database Schema
See `DATABASE_DESIGN.md` for full schema documentation and dbdiagram.io code.

### Tables (7 total - user-focused)
- users, addresses
- shipping_methods
- orders, order_items
- payments (stores secure payment records)
- order_shipping (tracks shipping/delivery info)

Note: Product data (shirts, images, sizes) is stored in the frontend code (`src/data/products.js`), not in the database. The database focuses on user accounts and transactions.

## Render Deployment (Single Web Service)

The app is deployed as a **single web service** that serves both the API and static frontend files.

### Web Service Configuration
- **Build Command**: `npm install && npm run build && cd server && npm install && npx prisma generate`
- **Start Command**: `cd server && npm start`
- **Root Directory**: `.` (project root)

### Environment Variables (Required)
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (auto-filled when linking Render database) |
| `JWT_SECRET` | Secret key for authentication tokens |
| `NODE_ENV` | Set to `production` |
| `FRONTEND_URL` | Your Render URL (e.g., `https://tavero.onrender.com`) |
| `BREVO_API_KEY` | Brevo API key for sending emails - Get free at [brevo.com](https://brevo.com) |

### Environment Variables (Optional)
| Variable | Description | Default |
|----------|-------------|---------|
| `BREVO_SENDER_NAME` | Email sender display name | `Tavero` |
| `BREVO_SENDER_EMAIL` | Email sender address | `noreply@tavero.com` |

### Live URL
https://tavero.onrender.com
