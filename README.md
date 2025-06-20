# Sleek AUS - Job Board Frontend

## Overview
This is the frontend for the Sleek AUS Job Board, built with React and Material UI. It connects to a RESTful backend and supports authentication, role-based dashboards (admin, employer, student), job management, and more.

## Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **Backend API running** (You must start the backend server before running the frontend!)

> **IMPORTANT:**
> Make sure the backend is running and accessible (default: `http://localhost:3000`) before starting the frontend. The frontend expects the backend API to be available for authentication and data fetching.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/sleek-aus-front.git
   cd sleek-aus-front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and adjust if needed.
   - By default, the API URL is set to `http://localhost:3000/api`.

4. **Start the frontend:**
   ```bash
   npm start
   # or
   yarn start
   ```
   The app will be available at [http://localhost:3001](http://localhost:3001) (or another port if 3001 is busy).

## Features
- JWT authentication (login/register)
- Role-based dashboards: Admin, Employer, Student
- Job CRUD (create, edit, delete, view)
- Company and user profile management
- Apply to jobs, view applicants
- Responsive UI with Material UI

## Development
- Code style: ESLint + Prettier
- Main source: `src/`
- Mock and real API support (see code for details)

## Troubleshooting
- **401 Unauthorized?** Make sure the backend is running and accessible.
- **CORS issues?** Check backend CORS configuration.
- **.env not loaded?** Restart the dev server after editing `.env`.

## License
MIT
