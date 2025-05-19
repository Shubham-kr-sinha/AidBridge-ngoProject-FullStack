# AidBridge-ngoProject-FullStack

This project is a web application that connects donors with people in need. The platform includes a **frontend** built with React.js and Tailwind CSS and a **backend** built with Node.js, Express, and Sequelize (MySQL).  

## Project Structure

```
root/
├── backend/        # Backend code
│   ├── config/     # Database configuration
│   ├── controllers/ # API controllers
│   ├── middleware/ # Middleware functions
│   ├── migrations/ # Sequelize migrations
│   ├── models/     # Sequelize models
│   ├── public/     # Public assets
│   ├── routes/     # API routes
│   ├── seeders/    # Seed data scripts
│   ├── views/      # View templates (if applicable)
│   ├── .env        # Environment variables
│   ├── server.js   # Main backend server file
│   ├── tables.txt  # Database schema notes
├── frontend/       # Frontend code
│   ├── context/    # React context files
│   ├── public/     # Public assets
│   ├── src/        # React source files
│       ├── components/ # React components
│   ├── .gitignore  # Files to be ignored by git
│   ├── package.json # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS config
└── README.md       # Project documentation
```

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**
- **MySQL** (as the backend database)

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3500
ACCESS_TOKEN_SECRET=your_secret_key
```

---

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection in `config/config.json`. The default configuration for development is:
   ```json
   {
	   "username": "root",
	   "password": "Database#1234",
	   "database": "ngo",
       "host": "127.0.0.1",
       "dialect": "mysql"
   }
   ```

4. Create the database in MySQL:
   ```MySQL
   CREATE DATABASE ngo;
   ```

5. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. (Optional) Seed the database with initial data:
   ```bash
   npx sequelize-cli db:seed:all
   ```

7. Start the backend server:
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:3500`.

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Running the Full Stack Application

1. Ensure the **backend** is running on `http://localhost:3500`.
2. Ensure the **frontend** is running on `http://localhost:3000`.
3. Access the application at `http://localhost:3000`.

---

## Scripts

### Backend Scripts

- **Start the backend**:
  ```bash
  npm start
  ```
- **Run migrations**:
  ```bash
  npx sequelize-cli db:migrate
  ```
- **Run seeders**:
  ```bash
  npx sequelize-cli db:seed:all
  ```

### Frontend Scripts

- **Start the frontend**:
  ```bash
  npm start
  ```

---

## Technologies Used

### Backend
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL

### Frontend
- React.js
- Tailwind CSS
- React Router

---
