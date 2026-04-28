# Dockerised Full-Stack Deployment

A 3-tier web application containerised with Docker Compose with Node.js REST API,
PostgreSQL database, and Nginx reverse proxy.

## Why I Built This

I built this to understand how real applications are deployed in containerised
environments. Instead of running services directly on my machine, I wanted to
learn how Docker networks, volumes, and reverse proxies work together and the
same pattern used in production DevOps workflows.

## How It Works

```
Browser → Nginx (port 80) → Node.js API (port 3000) → PostgreSQL (port 5432)
```

Docker Compose creates a private internal network automatically. All three
containers communicate using their service names as hostnames with no manual
networking required. Only Nginx is exposed to the outside world on port 80.
Everything else is internal.

- **Nginx** : reverse proxy; routes any request starting with `/api/` to the backend
- **Node.js + Express**: REST API that handles requests and queries the database
- **PostgreSQL**: persistent storage; data survives container restarts via a named volume

## What I Learned

- How Docker Compose networks let containers talk to each other by service name
- Why `package.json` is copied before source code in the Dockerfile — Docker
  caches that layer so `npm install` only re-runs when dependencies change
- How named volumes keep database data alive across `docker compose down` and up
- How Nginx proxies requests to upstream services inside a private Docker network

## Run It Yourself

```bash
git clone https://github.com/basiratabidi/docker-fullstack.git
cd docker-fullstack
docker compose up --build
```

Then test it:

by running this: 
http://localhost/api/health 
    replies with "ok" if its working correctly

to feed data :

curl -X POST http://localhost/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name", "email": "you@email.com"}'

run on web: 
 http://localhost/api/users


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/users | Fetch all users |
| POST | /api/users | Add a new user |

## Project Structure


docker-fullstack/
├── backend/
│   ├── index.js        # Express API
│   ├── package.json    # Dependencies
│   └── Dockerfile      # Container build instructions
├── nginx/
│   └── nginx.conf      # Reverse proxy config
└── docker-compose.yml  # Wires all 3 services together


## Tech Stack

Docker · Docker Compose · Node.js · Express.js · PostgreSQL · Nginx
