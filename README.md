# Real-Time Hackathon Team Status Notification System

A backend system that demonstrates real-time database event handling using PostgreSQL triggers, LISTEN/NOTIFY, WebSockets, and Node.js.

The project simulates a hackathon management dashboard where team information can be created, updated, or deleted through REST APIs. Whenever a change occurs in the database, all connected clients are notified instantly without relying on polling.

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Real-Time Communication
- PostgreSQL LISTEN / NOTIFY
- WebSockets (`ws` package)

### Testing
- Postman (REST APIs + WebSocket Client)

---

## Project Structure

```text
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── teamController.js
│
├── routes/
│   └── teamRoutes.js
│
├── services/
│   ├── teamService.js
│   └── postgresListener.js
│
├── websocket/
│   └── websocketServer.js
│
├── sql/
│   ├── schema.sql
│   ├── seed.sql
│   └── triggers.sql
│
└── server.js
```

---

## System Workflow

```text
REST API Request
        ↓
PostgreSQL Database
        ↓
Trigger Fires
        ↓
NOTIFY team_updates
        ↓
Node.js Listener
        ↓
WebSocket Broadcast
        ↓
Connected Clients
```

---

## Database Setup

### Create Database

```sql
CREATE DATABASE hackathon_dashboard;
```

Connect to the database and execute the SQL files in the following order:

### 1. Create Tables

```sql
schema.sql
```

### 2. Insert Sample Data

```sql
seed.sql
```

### 3. Create Trigger and Notification Function

```sql
triggers.sql
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd hackathon-dashboard
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=hackathon_dashboard
DB_USER=postgres
DB_PASSWORD=your_password
```

Start the server:

```bash
npm run dev
```

Expected output:

```text
Database Connected
PostgreSQL Listener Connected
Listening on channel: team_updates
Server running on port 3000
```

---

## REST API Endpoints

### Get All Teams

```http
GET /teams
```

### Create Team

```http
POST /teams
```

Request Body:

```json
{
  "team_name": "Byte Bandits",
  "leader_name": "Aman"
}
```

### Update Team Status

```http
PATCH /teams/:id
```

Request Body:

```json
{
  "status": "accepted"
}
```

### Delete Team

```http
DELETE /teams/:id
```

---

## Testing Real-Time Updates

### Step 1

Open a WebSocket connection in Postman:

```text
ws://localhost:3000
```

### Step 2

Keep the WebSocket connection active.

### Step 3

Send any REST API request such as:

```http
PATCH /teams/1
```

```json
{
  "status": "shortlisted"
}
```

### Step 4

Observe the WebSocket response:

```json
{
  "operation": "UPDATE",
  "id": 1,
  "team_name": "Code Crushers",
  "status": "shortlisted"
}
```

The update is received instantly without polling.

