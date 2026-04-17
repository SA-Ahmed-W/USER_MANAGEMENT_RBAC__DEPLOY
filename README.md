# Purple Merit User Management System

A production-grade full-stack User Management System built with the MERN stack for Purple Merit Technologies.

## Tech Stack

### Backend
- Node.js 22 + TypeScript
- Express.js
- MongoDB via Mongoose
- JWT with refresh token rotation
- bcryptjs (12 rounds)
- express-validator
- helmet, express-rate-limit

### Frontend
- React 18 + TypeScript
- Vite
- React Router v6
- React Context + useReducer
- TailwindCSS
- React Hook Form + Zod
- React Hot Toast

## Features

- **Authentication**: JWT-based auth with access token (in-memory) + refresh token rotation
- **Token Security**: Refresh tokens stored in MongoDB with rotation & revocation, sent via httpOnly cookies
- **Role-Based Access Control (RBAC)**: Admin, Manager, User roles
- **User Management**: Full CRUD operations with soft delete (deactivation)
- **Audit Trails**: Track createdBy/updatedBy for all changes
- **Profile Management**: Users can view and update their profiles
- **Dashboard**: Role-specific dashboard views (Admin, Manager, User)
- **Security**: Rate limiting, input validation, CORS, helmet headers
- **Responsive**: Mobile, tablet, and desktop layouts

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Environment Setup

**Server:**
```bash
cd server
cp .env.example .env
```

Update `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/usermgmt
JWT_ACCESS_SECRET=your-access-secret-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
CLIENT_ORIGIN=http://localhost:5173
```

**Client:**
```bash
cd client
cp .env.example .env
```

Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

```bash
# Server
cd server
npm install

# Client
cd client
npm install
```

### Running Locally

```bash
# Seed database (first time only)
cd server && npm run seed

# Start server
cd server && npm run dev

# Start client (new terminal)
cd client && npm run dev
```

### Seeded Credentials

| Role    | Email                     | Password   |
|---------|---------------------------|------------|
| Admin   | admin@purplemerit.com     | Admin@123  |
| Manager | manager@purplemerit.com   | Manager@123|
| User    | user1@example.com         | User@123   |

## API Endpoints

### Authentication
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | /api/auth/register | Register new user        |
| POST   | /api/auth/login  | Login (sets httpOnly cookie) |
| POST   | /api/auth/refresh | Get new access token     |
| POST   | /api/auth/logout | Logout (revokes token)   |

### Users
| Method | Endpoint         | Description                    | Access        |
|--------|------------------|--------------------------------|---------------|
| GET    | /api/users       | Get all users (paginated)      | Admin, Manager|
| POST   | /api/users       | Create new user                | Admin only    |
| GET    | /api/users/me    | Get own profile               | All roles     |
| PUT    | /api/users/me    | Update own profile            | All roles     |
| GET    | /api/users/stats | Get user statistics           | Admin         |
| GET    | /api/users/:id   | Get user by ID                | Admin, Manager|
| PUT    | /api/users/:id   | Update user                   | Admin, Manager|
| DELETE | /api/users/:id   | Deactivate user               | Admin only    |

## Architecture

```
client/                     # React frontend
├── src/
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Login, Register
│   │   ├── users/         # User CRUD
│   │   ├── profile/       # Profile management
│   │   └── dashboard/     # Role-specific dashboards
│   ├── shared/            # Reusable components, hooks, utils
│   ├── context/           # Auth context (state management)
│   └── routes/            # Route definitions
└── package.json

server/                     # Express backend
├── src/
│   ├── config/            # DB, env config
│   ├── features/          # Feature modules
│   │   ├── auth/          # Auth service, controller, routes, refresh token model
│   │   └── users/        # User model, service, controller, routes
│   └── shared/            # Middlewares, utils, types, constants
└── package.json
```

## Security Features

1. **Passwords**: bcrypt hashed (12 rounds)
2. **Access Token**: 15 minutes expiry, stored in-memory (React state)
3. **Refresh Token**: 7 days expiry, stored in MongoDB, sent via httpOnly cookie
4. **Token Rotation**: Old refresh token revoked, new one issued on each refresh
5. **Rate Limiting**: 10 requests/15 minutes on auth endpoints
6. **CORS**: Restricted to configured CLIENT_ORIGIN
7. **Helmet**: Security headers enabled
8. **Input Validation**: express-validator on all endpoints
9. **Soft Delete**: Users deactivated, not deleted

## Testing

```bash
# Server tests
cd server
npm test           # Run tests
npm run test:watch # Watch mode
npm run test:coverage # With coverage
```

## Deployment

### Build

**Server:**
```bash
cd server
npm run build
npm start
```

**Client:**
```bash
cd client
npm run build
```

### Production Environment Variables

**Server (Render):**
```
PORT=5000
NODE_ENV=production
MONGO_URI=<mongodb-connection-string>
JWT_ACCESS_SECRET=<strong-secret>
JWT_REFRESH_SECRET=<strong-secret>
CLIENT_ORIGIN=https://your-netlify-app.netlify.app
```

**Client (Netlify):**
```
VITE_API_URL=https://your-render-app.onrender.com/api
```

## License

MIT