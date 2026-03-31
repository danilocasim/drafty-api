# Blog API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

**Drafty API** is a full-featured backend application for managing blog posts and comments. It provides RESTful endpoints for creating, reading, updating, and deleting posts and comments. Authentication is handled via JWT to secure private resources.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Frontends](#frontends)
- [Setup & Installation](#setup--installation)
- [Deploy on VPS (Docker + Nginx)](#deploy-on-vps-docker--nginx)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **CRUD operations** for posts and comments
- CRUD operation for category but implicitly when based on related post
- **User authentication** with JWT
- **Separate frontend applications** for readers and authors
- **RESTful API design** for scalability and maintainability

---

## Tech Stack

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Authentication:** JWT
- **API:** REST

---

## API Endpoints

### Posts

- `GET /post` – Retrieve all posts
- `GET /post/:id` – Retrieve a single post by ID
- `POST /post` – Create a new post (requires authentication)
- `PUT /post/:id` – Update a post (requires authentication)
- `DELETE /post/:id` – Delete a post (requires authentication)

### Comments

- `GET /post/:id/comments` – Retrieve all comments for a post
- `POST /post/:id/comments` – Add a comment to a post (requires authentication)
- `DELETE /comment/:id` – Delete a comment (requires authentication)

### Category

- `GET /category` – Retrieve all categories
- `POST /category/:categoryId` – Get all of the specific category posts

---

## Authentication

- Users can **sign up** and **log in**
- Authenticated requests require a **JWT token** in the `Authorization` header
- Token expires after a configurable period for security

---

## Frontends

- **Reader Frontend:** [Live Preview](https://drafty-client.vercel.app/)
- **Author Frontend:** [Live Preview](https://drafty-cms.vercel.app/)
- **Frontend (Reader):** [Source Code](https://github.com/danilocasim/drafty-client)
- **Frontend (Author):** [Source Code](https://github.com/danilocasim/drafty-cms)

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:danilocasim/drafty-api.git
   cd drafty-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)

   ```env
   DATABASE_URL=your_postgres_database_url
   PRODUCTION_DATABASE_URL=your_postgres_database_url
   SECRET_KEY=your_jwt_secret
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**

   ```bash
   npm run dev
   ```

---

## Deploy on VPS (Docker + Nginx)

This repository now includes ready-to-use VPS deployment files:

- `Dockerfile`
- `docker-compose.yml`
- `.env.production.example`
- `deploy/nginx/drafty-api.conf`

### 1) Prepare the VPS (Ubuntu)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
sudo usermod -aG docker $USER
```

Log out and back in so Docker group permissions apply.

### 2) Pull code and set production env

```bash
git clone git@github.com:danilocasim/drafty-api.git
cd drafty-api
cp .env.production.example .env.production
```

Edit `.env.production` with real values:

- `SECRET_KEY` (or `JWT_ACCESS_SECRET` as fallback)
- `PRODUCTION_DATABASE_URL` (or `DATABASE_URL`)
- `CORS_ORIGIN` (your frontend origin)
- `PORT` is forced to `8000` by `docker-compose.yml`

### 3) Start the API container

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f api
```

The API health check is available at `http://127.0.0.1:8000/healthz` on the VPS.

### 4) Configure Nginx reverse proxy

Copy the sample config and replace `api.example.com` with your real domain.

```bash
sudo cp deploy/nginx/drafty-api.conf /etc/nginx/sites-available/drafty-api
sudo ln -s /etc/nginx/sites-available/drafty-api /etc/nginx/sites-enabled/drafty-api
sudo nginx -t
sudo systemctl reload nginx
```

### 5) Enable HTTPS

```bash
sudo certbot --nginx -d api.example.com
```

### 6) Run production migrations

```bash
docker compose exec api npx prisma migrate deploy
```

### 7) Point DNS from Render to VPS

Set your domain/subdomain A record to your VPS IP. Keep Render running briefly as rollback safety.

### 8) Railway env mapping

If you are migrating from Railway, this app accepts your current names with these rules:

- `JWT_ACCESS_SECRET` works as fallback for `SECRET_KEY`
- `PRODUCTION_DATABASE_URL` is preferred in production, but `DATABASE_URL` also works
- `BCRYPT_SALT_ROUNDS` is used for password hashing
- `CORS_ORIGIN` is used by Express CORS middleware

Example production env:

```env
NODE_ENV=production
PORT=5000

PRODUCTION_DATABASE_URL=postgresql://neondb_owner:password@host/neondb?sslmode=require&channel_binding=require
DATABASE_URL=postgresql://neondb_owner:password@host/neondb?sslmode=require&channel_binding=require

SECRET_KEY=replace-with-32-char-secret
JWT_ACCESS_SECRET=optional-fallback-secret
JWT_ACCESS_EXPIRES_IN=15m

BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=https://dojocountdown.vercel.app
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

### 9) Frontend endpoint changes

Only change the API base URL in frontend apps. Keep route paths the same.

- Old base URL: `https://your-render-or-railway-url`
- New base URL: `https://api.yourdomain.com`

Examples:

- `POST https://api.yourdomain.com/blog/v1/login`
- `POST https://api.yourdomain.com/blog/v1/signup`
- `GET https://api.yourdomain.com/blog/v1/auth`
- `GET https://api.yourdomain.com/blog/v1/post`
- `POST https://api.yourdomain.com/blog/v1/post`
- `GET https://api.yourdomain.com/blog/v1/category`

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes and commit (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a pull request

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
