# BookHive — Boilerplate

A full‑stack starter for an online campus library system.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Helmet, CORS
- Frontend: React (Vite), React Router, Axios

## Quick Start

### 1) Clone and install
```bash
cd backend
cp .env.sample .env
npm install
cd ../frontend
npm install
```

### 2) Run MongoDB
Start a local MongoDB instance (or set `MONGO_URI` in `backend/.env`).

### 3) Seed data
```bash
# from repo root
node database/seed.js
```
Creates:
- Admin: admin@bookhive.local / password
- Student: student@bookhive.local / password
- 3 sample books

### 4) Run dev servers
```bash
# terminal A
cd backend && npm run dev
# terminal B
cd frontend && npm run dev
```
- API: http://localhost:5000
- App: http://localhost:5173

## API Overview
- `GET /api/books` (query `?q=term`)
- `GET /api/books/:id`
- `POST /api/books` (admin, JWT)
- `PUT /api/books/:id` (admin, JWT)
- `DELETE /api/books/:id` (admin, JWT)
- `POST /api/books/:id/borrow` (auth)
- `POST /api/books/:id/return` (auth)

Auth:
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me` (auth)
- `GET /api/users/:id/borrowed` (auth)

## Notes
- Vite dev server proxies `/api` to backend in dev.
- Adjust CORS `CLIENT_URL` in `.env` when deploying.
- For production, serve frontend via a static host and point it to your API.
