# Lead Manager

A simple and efficient lead management system built with Next.js, Node.js (Express), and MongoDB.

## Live Demo
- **Frontend**: [https://quovoy-technical-assessment.vercel.app/](https://quovoy-technical-assessment.vercel.app/)

## Features
- **Lead Creation**: Add leads with name, email, and status.
- **Lead Listing**: Real-time view of all leads in the pipeline.
- **Audit Logging**: All activities are logged in the backend (`backend/logs/audit.log`).
- **Clean Architecture**: Backend organized into Domain, Application, and Infrastructure layers.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Axios, React-Select.
- **Backend**: Node.js, Express, TypeScript, Mongoose.
- **Database**: MongoDB Atlas.
- **Deployment**: Vercel (Frontend) & Railway (Backend).

## Getting Started Locally

### 1. Backend
1. Go to `backend` folder.
2. Create `.env` file:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   ```
3. Run `npm install` and `npm run dev`.

### 2. Frontend
1. Go to `frontend` folder.
2. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```
3. Run `npm install` and `npm run dev`.

---
Built for the Fullstack Developer assessment.
