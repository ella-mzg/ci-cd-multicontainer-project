# CI/CD Multicontainer Project

## Welcome

Welcome to the **CI/CD Multicontainer Project** documentation! This project is a simple TODO application designed to help users efficiently manage their tasks. Below, you'll find an overview of the project, its architecture, and how to set it up.

---

## Overview

This application allows users to:

- Add new tasks to their to-do list.
- Mark tasks as completed or toggle their completion status.
- Delete tasks they no longer need.

For detailed API endpoints and usage, check out the [API Documentation](api.md).

---

## Architecture

The application is built on a three-tier architecture:

1. **Frontend**: Built with Next.js to handle user interactions and display the UI.
2. **Backend**: A Flask-based REST API for business logic and database operations.
3. **Database**: PostgreSQL for storing task data.

For an in-depth explanation, visit the [Architecture](architecture.md) page.

---

## Project Guidelines

This project follows development and deployment guidelines to ensure quality and maintainability. Refer to the [Guidelines](guidelines.md) section for details.

---

## Project Report

For insights into project planning, challenges, and decisions made during development, check out the [Project Report](project-report.md).

---

## Getting Started

For detailed steps on how to set up and run the application, please refer to the README.md file in the project root directory.

### Prerequisites

- **Python** with `pip`
- **Node.js** with `npm` or `yarn`
- **PostgreSQL**

**Create a .env file in the root directory with the following variables:**

```bash
BACKEND_HOST=localhost
BACKEND_PORT=5000

FRONTEND_HOST=localhost
FRONTEND_PORT=3000

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/mydb
FRONTEND_URL=http://localhost:3000
```

### Quick Start with Docker Compose

- **Start the containers**:

```bash
docker compose up -d
```

- **Stop the Containers**:

```bash
docker compose down
```
