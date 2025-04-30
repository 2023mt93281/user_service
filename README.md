# User Service

This is a Node.js backend starter project for a User Service using:
- Express.js
- Prisma ORM (with MySQL)
- JWT Authentication
- BCrypt for password hashing
- CORS enabled

## Setup Instructions

1. **Clone or Download the project**
   ```bash
   unzip user_service.zip
   cd user_service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup your environment variables**
   Create a `.env` file in the root directory:
   ```bash
   DATABASE_URL="mysql://username:password@localhost:3306/dbname"
   JWT_SECRET="your_jwt_secret_key"
   PORT="any port of your choice eg:3000"
   ```

4. **Initialize Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /api/users/register | Register a new user |
| POST   | /api/users/login    | Login a user        |
| GET    | /api/users/:id      | Get user profile    |
| POST    | /api/address/users/:id      | Add user address    |
| PUT    | /api/address/users/:id      | Update user address    |
| GET    | /api/address/users/:id      | Get user addresses    |
| DELETE    | /api/address/users/:id      | Delete user addresses    |

---

Built with ❤️ using Node.js, Express & Prisma.