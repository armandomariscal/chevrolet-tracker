# Chevrolet Tracker - Work Productivity & Audit System

## Overview
**Chevrolet Tracker** is an intelligence and data auditing layer built to centralize and visualize technical performance. It synchronizes work items from Scrum/Kanban boards (like YouTrack/Jira) to calculate productivity KPIs, throughput, and cycle times, providing an immutable record of technical evidence.

## Stack

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-5.x-000000?logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white)
![Webix UI](https://img.shields.io/badge/Webix_UI-Pure_JS-2196F3?logo=javascript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-8A2BE2)

## Key Features
- **Data Ingestion:** Secure synchronization of completed cards including IDs, summaries, and time transitions.
- **Complexity Normalization:** Categorizes tasks based on Story Points and technical metadata to weigh effort vs. impact.
- **Productivity Dashboard:** Real-time visualization of key metrics (Cycle Time, Lead Time, and Workload).
- **Audit Evidence:** Generates detailed reports linking invested time with final technical deliverables.

## System Architecture

### Backend (Node.js + Fastify + Prisma)
A high-performance API designed with structural rigor:
*   **Domain Layer:** Contains the core logic for "Medals" calculation, difficulty levels, and time validation.
*   **Integrator Layer:** Specialized module for consuming and mapping external APIs (YouTrack/Jira) to local entities.
*   **Persistence:** PostgreSQL managed via **Prisma ORM**, ensuring referential integrity and immutable activity logs.

### Frontend (Pure Webix UI)
An experimental SPA implementation using **Pure Webix** (without the Jet framework) to explore deep UI customization:
*   **Direct State Management:** Manual handling of view updates and data binding.
*   **Custom Dashboard:** Advanced aggregate views for productivity metrics and progress bars.

## Project Structure
```text
.
├── backend                 # Fastify API & Prisma Schema
│   ├── src/main.ts         # Entry point
│   ├── src/routes/         # API Endpoints (Work Items, Tags, PRs)
│   └── prisma/             # Database Models & Migrations
├── frontend                # Pure Webix UI Implementation
│   ├── app.js              # Application Logic
│   └── index.html          # UI Entry point
└── docs/                   # Technical Requirements & Notes
```

## Development
### Prerequisites

- Docker & Docker Compose
- Node.js v22+

## Setup

- Clone the repository.
- Configure your .env file based on the environment needs.
- Spin up the infrastructure:

## Bash

```bash
# Start PostgreSQL container
npm run db:up --prefix backend

# Generate Prisma Client & Run Migrations
npm run generate --prefix backend

# Start the Backend in development mode
npm run dev --prefix backend
```

***

## Technical Notes

- Decoupled Entities: The schema uses cardId (formerly youTrackId) to remain provider-agnostic, allowing future integrations with Jira or Linear.
- Performance: Data is pre-processed in the local DB to ensure instant metric visualization without hitting external API rate limits.
