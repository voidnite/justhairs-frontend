# JustHairs — Premium Wig E-Commerce Store

Full-stack e-commerce application with real Paystack payment integration.

**Stack:** React + Vite · Node.js + Express · MongoDB · Paystack API  
**Deploy:** Vercel (frontend) · Render (backend)

---

## Project Structure

```
JustHairs/
├── frontend/          React + Vite app
│   ├── src/
│   │   ├── components/   Navbar, Hero, Collections, ProductCard, Cart, Footer…
│   │   ├── pages/        Home, Shop, ProductDetail, Checkout, OrderConfirmation
│   │   ├── context/      CartContext (localStorage-backed)
│   │   └── utils/        api.js (axios), format.js, products.js (seed data)
│   └── vercel.json
│
└── backend/           Express API
    ├── controllers/   productController, orderController, paymentController
    ├── models/        Product.js, Order.js (Mongoose)
    ├── routes/        products, orders, payments
    ├── config/        db.js, seed.js
    └── render.yaml
```

---

## Quick Start

### 1. Clone & install

```bash
git clone <your-repo>
cd JustHairs
npm run install:all   # installs both frontend & backend deps
```

### 2. Configure environment variables

**Backend** — copy and fill in:
```bash
cp backend/.env.example backend/.env
```

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/justhairs
PAYSTACK_SECRET_KEY=sk_test_xxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxx
FRONTEND_URL=http://localhost:5173
```

**Frontend** — copy and fill in:
```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Run development servers

Open two terminals:

```bash
# Terminal 1 — backend
npm run backend

# Terminal 2 — frontend
npm run frontend
```

Frontend: http://localhost:5173  
Backend:  http://localhost:5000/api/health

---

## Customer Flow

```
Homepage → Product → Select Variant → Add to Cart
  → Cart Drawer → Checkout Form → Paystack Payment Page
  → Paystack redirects to /order-confirmation?reference=xxx
  → Backend verifies transaction & marks order as paid
  → Customer sees Order Confirmed
```

---

## 📸 Adding Your Photos & Videos

Every image/video slot is marked in the code. Search for `📸` or `🎥`.

### Homepage sections that need media:

| Section | File | What to add |
|---|---|---|
| Hero background | `src/components/Hero/Hero.jsx` | Uncomment `<source src="/videos/hero.mp4">` |
| Hero poster | `src/components/Hero/Hero.jsx` | Add `poster="/images/hero-poster.jpg"` |
| Collections grid | `src/utils/products.js` | Fill `coverImage` for each collection |
| Best Sellers | `src/utils/products.js` | Fill `images[]` for each product |
| Wig Spotlight | `src/components/Spotlight/Spotlight.jsx` | Uncomment `<source src="/videos/spotlight.mp4">` |
| Textures panel | `src/utils/products.js` | Fill `coverImage` for each texture |
| Reviews gallery | `src/utils/products.js` | Fill `image` for each review |

### For each product add:

```js
images: [
  'https://your-cdn.com/product-front.jpg',   // 📸 front view
  'https://your-cdn.com/product-side.jpg',    // 📸 side
  'https://your-cdn.com/product-back.jpg',    // 📸 back
  'https://your-cdn.com/product-lace.jpg',    // 📸 lace close-up
  'https://your-cdn.com/product-texture.jpg', // 📸 texture
],
video: 'https://your-cdn.com/product-video.mp4', // 🎥 10–20 sec
```

**Recommended image dimensions:**
- Product photos: 800×1000px (portrait 4:5)
- Collection covers: 800×900px
- Hero: 1920×1080px video, 1920×1080px poster JPG
- Review/customer photos: 600×600px square

---

## Paystack Setup

1. Sign up at https://dashboard.paystack.com
2. Go to Settings → API Keys & Webhooks
3. Copy your **Test** secret key (`sk_test_...`) and public key (`pk_test_...`)
4. Put them in `backend/.env`
5. When ready to go live, switch to **Live** keys

Paystack will redirect back to `FRONTEND_URL/order-confirmation?reference=xxx` after payment.  
The frontend calls `GET /api/payments/verify/:reference` which verifies with Paystack and updates the order.

---

## Deploy

### Frontend → Vercel

```bash
cd frontend
npm run build
# Push to GitHub, then connect repo to Vercel
# Set VITE_API_URL=https://your-backend.onrender.com/api in Vercel env vars
```

### Backend → Render

1. Push backend folder to GitHub
2. Create a new Web Service on Render, point to the `backend/` folder
3. Set all env vars from `backend/.env.example` in Render dashboard
4. Build command: `npm install` | Start command: `node server.js`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (filter, sort, search, paginate) |
| GET | `/api/products/:id` | Single product by ID |
| GET | `/api/products/slug/:slug` | Single product by slug |
| POST | `/api/orders` | Create order (returns order with `_id`) |
| GET | `/api/orders/:id` | Get order by ID |
| POST | `/api/payments/initialize` | Init Paystack transaction → returns `authorization_url` |
| GET | `/api/payments/verify/:ref` | Verify Paystack payment → updates order status |
