# TODO App Architecture

## Overview

### **Components**

1. **Frontend**

   - Built with **Next.js** (React-based framework) for a responsive and interactive user interface.
   - Handles user interactions and communicates with the backend via RESTful APIs.

2. **Backend**

   - Powered by **Flask**, a lightweight and efficient Python-based API framework.
   - Manages business logic, processes requests, and interacts with the database.

3. **Database**

   - Uses **PostgreSQL** for persistent data storage.
   - Stores task-related information, including task descriptions and completion status.

4. **NGINX**
   - Serves as a reverse proxy to route incoming requests.
   - Centralizes communication and enhances the scalability of the application.

### **Diagram**

```plaintext
                +-------------------+
                |    Frontend (UI)  |
                |    Next.js        |
                +---------+---------+
                          ↕
                +-------------------+
                |   NGINX (Proxy)   |
                +---------+---------+
                          ↕
                +-------------------+
                |  Backend (API)    |
                |     Flask         |
                +---------+---------+
                          ↕
                +-------------------+
                |   Database        |
                |   PostgreSQL      |
                +-------------------+

```

## **Detailed Component Breakdown**

### 1. **Frontend**

- **Technology**: Next.js (React framework)
- **Purpose**: Provides a user-friendly interface for interacting with the application.
- **Features**:
  - Displays tasks in a list.
  - Allows users to add, delete, and toggle task completion.
- **Integration**:
  - Communicates with the backend via RESTful API endpoints, proxied through **NGINX**.

---

### 2. **Backend**

- **Technology**: Flask
- **Purpose**: Acts as the API layer, handling business logic and connecting the frontend to the database.
- **Endpoints**:
  - `GET /api/tasks`: Fetch all tasks.
  - `POST /api/tasks`: Add a new task.
  - `PUT /api/tasks/<task_id>`: Update a task (e.g., toggle completion).
  - `DELETE /api/tasks/<task_id>`: Delete a task.
- **Integration**:
  - Interfaces with PostgreSQL using **SQLAlchemy** for ORM.
  - Returns JSON responses to the frontend via **NGINX**.
  - Handles incoming API requests proxied through **NGINX**.

---

### 3. **Database**

- **Technology**: PostgreSQL
- **Purpose**: Stores persistent data for the application.
- **Schema**:
  - **Table**: `tasks`
    - `id` (integer): Primary key, unique identifier for each task.
    - `title` (string): Description of the task.
    - `completed` (boolean): Indicates whether the task is completed.

---

### 4. **NGINX**

- **Technology**: NGINX
- **Purpose**: Acts as a reverse proxy to streamline communication between the frontend and backend.
- **Responsibilities**:
  - Routes requests to the appropriate service:
    - `/`: Proxies to the **frontend**.
    - `/backend`: Proxies to the **backend** API.
  - Simplifies frontend-backend communication by centralizing routing.
  - Enhances scalability and maintainability by abstracting service URLs.

## **Communication Flow**

1. **User Interaction**  
   Users interact with the **frontend** to perform tasks such as adding, updating, or deleting tasks.

2. **NGINX Routing**

   - NGINX receives incoming requests and routes them to the appropriate service:
     - `/`: Proxies to the **frontend**.
     - `/backend`: Proxies to the **backend**.

3. **Frontend-Backend Interaction**

   - The **frontend** sends requests to the backend via NGINX.
   - The **backend** processes these requests and responds with the required data or status.

4. **Backend-Database Interaction**

   - The **backend** communicates directly with the **PostgreSQL** database to perform CRUD operations.
   - The database returns query results or status information to the backend.

5. **Response to Frontend**
   - The **backend** sends the results of database operations back to the **frontend** via NGINX.
   - The **frontend** updates the user interface based on the backend’s response.
