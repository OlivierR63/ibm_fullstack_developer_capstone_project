# IBM Fullstack Developer Capstone Project

This repository contains a fullstack web application developed as part of the IBM Fullstack Developer Capstone Project. It demonstrates skills in frontend and backend development, microservices, and cloud deployment.

## Table of Contents
- [Project Description](#project-description)
- [Architecture](#architecture)
- [Main Features](#main-features)
- [Technologies Used](#technologies-used)
- [Installation and Startup](#installation-and-startup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Authors](#authors)
- [License](#license)

---

## Project Description

This application simulates a car inventory management platform with:
- A React frontend for user interaction
- A Django backend for business logic and API services
- A Flask microservice for sentiment analysis on user reviews
- A Node.js microservice for vehicle inventory management
- Docker and Kubernetes orchestration for deployment

## Architecture


graph TD
  Frontend[React Frontend]
  Backend[Django Backend]
  Sentiment[Flask Microservice (Sentiment)]
  Inventory[Node.js Microservice (Inventory)]
  DB[(Database)]
  Frontend -->|REST API| Backend
  Backend -->|REST API| Sentiment
  Backend -->|REST API| Inventory
  Inventory --> DB
  Backend --> DB

## Main Features

- Browse car inventory
- Add, edit, and delete vehicles (admin)
- Submit and display user reviews
- Automatic sentiment analysis of reviews (positive, negative, etc.)
- Modern user interface
- Containerized deployment (Docker/Kubernetes)

## Technologies Used

- **Frontend:** React, Bootstrap
- **Backend:** Django (Python)
- **Sentiment Microservice:** Flask, NLTK
- **Inventory Microservice:** Node.js
- **Database:** (specify, e.g., SQLite, PostgreSQL, etc.)
- **Deployment:** Docker, docker-compose, Kubernetes

## Installation and Startup

### Prerequisites

- Docker and docker-compose installed
- (Optional) Node.js, Python 3.9+ if running without Docker

### Quick Start with Docker Compose

```bash
cd server
docker-compose up --build
```
All services will be accessible on their respective ports (see the `docker-compose.yml` file).

### Manual Startup (Development)

#### Frontend

```bash
cd server/frontend
npm install
npm start
```

#### Django Backend

```bash
cd server
pip install -r requirements.txt
python manage.py runserver
```

#### Sentiment Microservice

```bash
cd server/djangoapp/microservices
pip install -r requirements.txt
python app.py
```

#### Inventory Microservice

```bash
cd server/carsInventory
npm install
node app.js
```

## Usage

- Access the web interface at [http://localhost:3000](http://localhost:3000)
- Browse inventory, submit reviews, and view sentiment analysis results

## Deployment

Kubernetes deployment files are provided in the `server/` directory.

## Authors

- OlivierR63

## License

See the [LICENSE](LICENSE) file for license details.
