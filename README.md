# Developer Documentation

## Project Structure

```
auth_mern/
│
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── logs/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── utils/
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── assets/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   └── services/
    ├── package.json
    └── vite.config.js
```

---

## Backend

- **Framework:** Node.js, Express.js, MongoDB (Mongoose)
- **Entry Points:**  
  - [`backend/app.js`](backend/app.js): Express app setup, middleware, and routes  
  - [`backend/server.js`](backend/server.js): Starts the HTTP server

### Key Folders

- **config/**: Database connection ([`db.js`](backend/src/config/db.js))
- **controllers/**: Business logic for users, customers, addresses
- **middlewares/**: Auth and error handling
- **models/**: Mongoose schemas for User, Customer, Address, etc.
- **routes/**: Express routers for users, customers, addresses
- **utils/**: Helper functions (JWT, OTP, email)

### Environment

Copy `.env.example` to `.env` and fill in your secrets.

### Running the Backend

```sh
cd backend
npm install
npm run dev
```

---

## Frontend

- **Framework:** React (with Vite), Redux Toolkit, Material UI

### Key Folders

- **src/app/**: Redux store and slices
- **src/components/**: Reusable UI components
- **src/pages/**: Page-level React components (routes)
- **src/services/**: API service wrappers (axios)
- **src/hooks/**: Custom React hooks

### Running the Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## API Overview

- **User:** `/api/users`
  - Register, login, logout, password reset, get users
- **Customer:** `/api/customers`
  - CRUD operations
- **Address:** `/api/addresses`
  - CRUD operations

All protected routes require a Bearer token in the `Authorization` header.

---

## Authentication

- JWT-based authentication (access and refresh tokens)
- Passwords are hashed with bcrypt
- Password reset via OTP and email

---

## Adding Features

- Add new models in `backend/src/models/`
- Add business logic in `backend/src/controllers/`
- Register new routes in `backend/src/routes/`
- Add frontend pages in `frontend/src/pages/`
- Add API calls in `frontend/src/services/`

---

## Conventions

- Use async/await for all DB and network operations
- Use Redux Toolkit for state management in frontend
- Use Material UI for UI components

---

## Useful Scripts

- **Backend:** `npm run dev` (nodemon)
- **Frontend:** `npm run dev` (Vite)

---

## Contribution

- Fork and branch before making changes
- Write clear commit messages
- Keep code modular and DRY

---

For more details, see the code comments and each folder's README if present.