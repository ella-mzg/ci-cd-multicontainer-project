# TODO App Architecture

## Overview

### Components

1. **Frontend**: Built with **Next.js** (React-based framework) for a responsive user interface.
2. **Backend**: Powered by **Flask** for a lightweight and efficient API.
3. **Database**: Uses **PostgreSQL** for persistent data storage.

---

## Architecture Diagram

```plaintext
                +-------------------+
                |    Frontend (UI)  |
                |    Next.js        |
                +---------+---------+
                          |
                          v
                +-------------------+
                |  Backend (API)    |
                |     Flask         |
                +---------+---------+
                          |
                          v
                +-------------------+
                |   Database        |
                |   PostgreSQL      |
                +-------------------+
```

---

## Detailed Component Breakdown

### 1. **Frontend**

- **Technology**: Next.js (React framework)
- **Purpose**: Provides a user-friendly interface for interacting with the application.
- **Features**:
  - Displays tasks in a list.
  - Allows users to add, delete, and toggle task completion.
- **Integration**:
  - Communicates with the backend via RESTful API endpoints.

### 2. **Backend**

- **Technology**: Flask
- **Purpose**: Acts as the API layer, handling business logic and connecting the frontend to the database.
- **Endpoints**:
  - `GET /api/tasks`: Fetch all tasks.
  - `POST /api/tasks`: Add a new task.
  - `PUT /api/tasks/<task_id>`: Update a task (e.g., toggle completion).
  - `DELETE /api/tasks/<task_id>`: Delete a task.
  - `GET /api/health`: Health check endpoint.
- **Integration**:
  - Interfaces with PostgreSQL using **SQLAlchemy** for ORM.
  - Returns JSON responses for frontend consumption.

### 3. **Database**

- **Technology**: PostgreSQL
- **Purpose**: Stores persistent data for the application.
- **Schema**:
  - **Table**: `tasks`
    - `id` (integer): Primary key, unique identifier for each task.
    - `title` (string): Description of the task.
    - `completed` (boolean): Indicates whether the task is completed.

---

## Communication Flow

1. **User Interaction**:
   - A user interacts with the frontend to perform actions like adding or toggling tasks.
2. **API Requests**:
   - The frontend sends HTTP requests to the backend Flask API.
3. **Database Operations**:
   - The backend performs CRUD operations on the PostgreSQL database.
4. **Response**:
   - The backend sends the result of the operation back to the frontend, which updates the UI.
