# Kebab DPI

A scalable microservices prototype for Ingenious Hackathon 7.0, providing a unified gateway for Healthcare, Agriculture, and Smart City services.

## Core Features
- **Unified Interface**: Single portal for disparate domain services.
- **Microservices Architecture**: Independent services for Registry, Healthcare, Agriculture, and City management.
- **Centralized Gateway**: Request proxying and data aggregation.
- **Service Registry**: Dynamic discovery with heartbeat monitoring.
- **Resilience**: Redis-backed high-performance lookups.

## Tech Stack
- **Frontend**: Next.js 14 (React, Tailwind CSS, Recharts)
- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **DevOps**: Docker, Docker Compose, PNPM Workspaces

## Local Development

### Prerequisites
- Node.js (v18+)
- PNPM (`npm install -g pnpm`)
- Docker Desktop

### Setup Instructions
1. **Clone and Install**:
   ```bash
   git clone <repo-url>
   cd au-ingenius-2026
   pnpm install
   ```
2. **Infrastructure**: Start PostgreSQL and Redis via `docker-compose up -d`.
3. **Database Initialization**:
   ```bash
   pnpm --filter @service/registry exec prisma migrate dev --name init
   ```
4. **Run Application**: Execute `pnpm dev` to start all services.

### Access Points
- **Frontend/Gateway**: [http://localhost:3000](http://localhost:3000)
- **Note**: If port 3000 is occupied, Next.js will increment the port (e.g., 3001).

## Configuration
Create `services/registry/.env` with the following:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/registry?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=supersecretkey
```

## System Details
- **Authentication**: JWT-based. Register via `/api/auth/register`.
- **Mock Data**: Pre-seeded for Healthcare (Appointments), Agriculture (Schemes/Prices), and City (Complaints).
- **Error Handling**: 
  - `503 Service Unavailable`: Upstream microservice down.
  - `404 Not Found`: Invalid route or service.
  - `Gateway Timeout`: Upstream service latency.
- **Security**: Prototype uses a demonstration `JWT_SECRET`. Rotate for production use.
