# Lead Manager

A simple lead management system built with Next.js, Node.js (Express), and MongoDB.

## Features
- Add new leads via form
- List all active leads with status indicators
- Audit logging for lead creation
- Dockerized environment for easy setup

## Getting Started

### Prerequisites
- Docker and Docker Compose

### Running the Project
1. Run the infrastructure (DB & Backend) using Docker:
   ```bash
   docker-compose up
   ```
2. Start the Frontend locally:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Architecture
- **Backend**: Node.js Express with Clean Architecture (Domain, Application, Infrastructure layers).
- **Frontend**: Next.js (App Router) with TypeScript and Axios.
- **Database**: MongoDB with Mongoose.

## Audit Logs
Activities are logged in `backend/logs/audit.log` using the format:
`{username} {activity} {target}`

---
Built for the Fullstack Developer assessment.
