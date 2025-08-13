
# BookHive (MVC) — SIT725 Task 5.2C

An MVC refactor scaffold for the **Online Library System** described in 3.3P (BookHive).  
Stack: **Node.js + Express + EJS + Mongoose**.

## Getting Started

```bash
npm install
cp .env.sample .env
# edit .env with your MongoDB URI
npm run dev
```

App runs at http://localhost:3000

## MVC Structure

- **models/**: Data schemas and business rules (e.g., `book.js`)
- **views/**: EJS templates (`index.ejs`, `books/*.ejs`, partials and layout)
- **controllers/**: Request handlers (`bookController.js`)
- **routes/**: Route definitions (`index.js`, `books.js`)
- **config/**: DB connection and config (`db.js`)
- **public/**: Static assets

## Features Implemented
- List, search, add, edit, delete books
- Basic layout and error page
- Clean separation of concerns

## Screenshots to Capture (for submission)
1. Home page (`/`)
2. Books list (`/books`) before/after adding an item
3. Add Book form (`/books/new`)
4. Edit Book form
5. Terminal showing server start + MongoDB connection

Save them in `public/img/` and embed them in your PDF.

## Submission Checklist (per 5.2C)
- [ ] Repo created and code pushed
- [ ] MVC structure in place
- [ ] Screenshots exported to PDF
- [ ] Repo link included in PDF
- [ ] `.env` excluded from version control

## GitHub Quick Start

```bash
git init
git add .
git commit -m "SIT725 5.2C: MVC scaffold for BookHive"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## License
MIT
