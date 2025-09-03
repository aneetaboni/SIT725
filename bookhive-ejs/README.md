# BookHive — Node.js + EJS Boilerplate

Server-rendered BookHive using Express + EJS + MongoDB with sessions.

## Stack
- Express 4, EJS templates
- MongoDB (Mongoose 8)
- Sessions: express-session + connect-mongo
- Auth: email/password (bcrypt), role-based (student/admin)
- CRUD (admin): books
- Borrow/return with due dates

## Quick Start
```bash
cd bookhive-ejs
cp .env.sample .env   # (Windows cmd: copy .env.sample .env)
# set MONGO_URI and SESSION_SECRET in .env

npm install
npm run seed
npm run dev
# http://localhost:5000
```

## Routes
- GET `/` home
- GET `/search` list/search books (`?q=`)
- POST `/books/:id/borrow` (auth)
- POST `/books/:id/return` (auth)
- GET `/profile` (auth)
- Auth: GET `/login`, POST `/login`, GET `/register`, POST `/register`, POST `/logout`
- Admin (role=admin): `/admin/books`, `/admin/books/new`, edit, delete
