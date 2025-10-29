# Paix Marketplace

A modern multi-role e‑commerce platform with a modular architecture:

- User storefront for browsing products, managing cart, and checkout
- Supplier dashboard to view orders and manage products
- Admin dashboard for users/products moderation
- Bank service integration for account verification and transaction flows


## Architecture

Monorepo with one backend (Express + MongoDB) and four Vite + React frontends:

```
.
├─ Backend/                 # Express server, MongoDB models, REST APIs, PDF invoices
│  ├─ index.js              # App entry, middleware, route mounting, static PDFs
│  ├─ models/model.js       # Mongoose models: User, Bank, Product, Cart, Transaction, SupplierProduct
│  ├─ routes/
│  │  ├─ auth.js            # Register/Login, user addresses
│  │  ├─ product.js         # Product CRUD (add, list, get), add-to-cart
│  │  ├─ cart.js            # Cart CRUD, checkout, PDF invoice generation, transfers
│  │  ├─ bank.js            # Bank add, secret/account verify, link user bank
│  │  └─ profile.js         # Supplier and user order views, supplier payout verification
│  └─ pdfs/                 # Generated invoice PDFs served at /pdfs
│
├─ Frontend/
│  ├─ User/                 # Customer storefront (React + Tailwind + DaisyUI)
│  ├─ Supplier/             # Supplier dashboard (React)
│  ├─ Admin/                # Admin dashboard (React)
│  └─ Bank/                 # Bank portal (React)
│
├─ package.json             # Shared dependencies (axios, express, mongoose, etc.)
└─ README.md
```


## Features

- Authentication: Register and login with hashed passwords and JWT
- Product catalog: List products, view a product, add to cart
- Cart: View, remove, and checkout grouped by supplier
- Payments: Bank account verification by secret key + account number
- Settlement: Funds moved from customer to admin, then to supplier upon verification
- Invoices: Per-supplier checkout invoices generated as PDFs and served via HTTP
- Address book: Add and fetch user addresses


## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB), JWT, bcrypt, html-pdf
- Frontend: React 18, Vite, React Router, Tailwind CSS, DaisyUI, Axios/Fetch


## Backend

### Requirements

- Node.js 18+
- MongoDB URI

Create `Backend/.env` with:

```
URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

### Install and run

```
cd Backend
npm install
npm run start
```

The server listens on port 8000 and serves invoice PDFs at `/pdfs`.

### Models

- `User`: name, email, password, user_type ['buyer','supplier','bank','admin'], account_number, address[], isAdd
- `Bank`: name, account_number, secret_key, amount
- `Product`: name, description, supplier_id, supplier_name, price, originalPrice, image
- `Cart`: user_id, product_id, product_name, supplier_id, price, quantity
- `Transaction`: sender_account_number, receiver_account_number, product_credit, shipping_credit, total_credit, products_list[], address
- `SupplierProduct`: supplier_id, user_id, tran_url, product_list[], product_credit, isVerified

### API Overview (selected)

- Auth
  - POST `/auth/register` — create user
  - POST `/auth/login` — JWT login, returns user object and token
  - POST `/auth/:userId/address` — add address
  - GET `/auth/:userId/addresses` — list addresses

- Product
  - POST `/product/add` — add product
  - GET `/product` — list products
  - GET `/product/:id` — get product by id
  - POST `/product/addToCart` — add product to cart

- Cart
  - GET `/cart/user/:userId` — list user cart items
  - DELETE `/cart/:cartId` — remove one cart item
  - POST `/cart/checkout` — process grouped supplier transactions, generate PDFs, clear cart

- Bank
  - POST `/bank/add` — add bank account
  - GET `/bank/secret/:key/:accountNumber` — verify secret/account match
  - POST `/bank/addDetails/:userId` — link verified bank to user

- Profile (supplier/user orders and payouts)
  - GET `/profile/supplier/:supplierId` — supplier order groups (with invoice URLs)
  - GET `/profile/user/:userId` — user order groups
  - PUT `/profile/verify/:supplierProductId` — mark supplier product verified, transfer funds to supplier

Notes:
- Admin account number is fixed to `1234567892` for settlement flows in code.
- Shipping fee default used in checkout: `50` per supplier group.


## Frontends

Each frontend is an isolated Vite app. Install and run individually.

### User (storefront)

```
cd Frontend/User
npm install
npm run dev
```

Key flows:
- Product list pulls from `GET http://localhost:8000/product`
- Product details route: `/product/:productId`
- Cart list from `GET /cart/user/:userId`, removal via `DELETE /cart/:cartId`
- Checkout opens a secret-key modal; verifies via `GET /bank/secret/:key/:accountNo` before placing order
- Registration posts to `/auth/register`, login posts to `/auth/login`

Environment assumptions stored in `localStorage` on login:
- `userId`, `isAdd` and optionally `accountNo` for checkout verification

### Supplier

```
cd Frontend/Supplier
npm install
npm run dev
```

Key flows:
- On first login when `isAdd` is false, prompts bank linking dialog
- Loads supplier orders via `GET /profile/supplier/:userId`
- Displays per-product items from grouped supplier products with `tran_url` to invoices

### Admin

```
cd Frontend/Admin
npm install
npm run dev
```

### Bank

```
cd Frontend/Bank
npm install
npm run dev
```

## Development Notes

- PDF invoices are generated during checkout and saved to `Backend/pdfs/<transactionId>.pdf`, served at `http://localhost:8000/pdfs/<transactionId>.pdf`.
- Update the hardcoded admin account number in routes if you change your bank seed data.
- Set `URI` in `Backend/.env` before starting the server.
- JWT secret is currently hardcoded in `auth.js` — replace `your_secret_key` with a secure secret via env var for production.


## Scripts Quick Reference

- Backend: `cd Backend && npm run start`
- User: `cd Frontend/User && npm run dev`
- Supplier: `cd Frontend/Supplier && npm run dev`
- Admin: `cd Frontend/Admin && npm run dev`
- Bank: `cd Frontend/Bank && npm run dev`


## License

Proprietary. All rights reserved.
