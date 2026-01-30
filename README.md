# Blog API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

**Drafty API** is a full-featured backend application for managing blog posts and comments. It provides RESTful endpoints for creating, reading, updating, and deleting posts and comments. Authentication is handled via JWT to secure private resources.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [API Endpoints](#api-endpoints)
* [Authentication](#authentication)
* [Frontends](#frontends)
* [Setup & Installation](#setup--installation)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* **CRUD operations** for posts and comments
* CRUD operation for category but implicitly when based on related post
* **User authentication** with JWT
* **Separate frontend applications** for readers and authors
* **RESTful API design** for scalability and maintainability

---

## Tech Stack

* **Backend:** Node.js, Express, Prisma, PostgreSQL
* **Authentication:** JWT
* **API:** REST

---

## API Endpoints

### Posts

* `GET /post` – Retrieve all posts
* `GET /post/:id` – Retrieve a single post by ID
* `POST /post` – Create a new post (requires authentication)
* `PUT /post/:id` – Update a post (requires authentication)
* `DELETE /post/:id` – Delete a post (requires authentication)

### Comments

* `GET /post/:id/comments` – Retrieve all comments for a post
* `POST /post/:id/comments` – Add a comment to a post (requires authentication)
* `DELETE /comment/:id` – Delete a comment (requires authentication)

### Category

* `GET /category` – Retrieve all categories
* `POST /category/:categoryId` – Get all of the specific category posts

---

## Authentication

* Users can **sign up** and **log in**
* Authenticated requests require a **JWT token** in the `Authorization` header
* Token expires after a configurable period for security

---

## Frontends

* **Reader Frontend:** [Live Preview](https://drafty-client.vercel.app/)
* **Author Frontend:** [Live Preview](https://drafty-cms.vercel.app/) 
* **Frontend (Reader):** [Source Code](https://github.com/danilocasim/drafty-client)
* **Frontend (Author):** [Source Code](https://github.com/danilocasim/drafty-cms)

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
   JWT_SECRET=your_jwt_secret
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
