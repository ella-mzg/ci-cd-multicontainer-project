# CI-CD Multicontainer Project

## Project Description

This is a simple TODO app that allows users to manage their tasks. Users can:

- Add new tasks to their to-do list.
- Mark tasks as completed or toggle their completion status.
- Delete tasks they no longer need.

## Architecture Overview

The app follows a three-tier architecture, consisting of a **frontend**, **backend**, and **database**.

### Components

---

1. **Frontend**

   - Built with **Next.js**, a React-based framework for building user interfaces.
   - Handles user interactions and communicates with the backend via RESTful APIs.
   - Provides features such as task creation, deletion, and toggling completion.

2. **Backend**

   - Developed using **Flask**, a lightweight Python framework.
   - Serves as the API layer, managing business logic and database interactions.
   - Exposes RESTful endpoints for CRUD operations:
     - `GET /api/tasks`: Retrieve all tasks.
     - `POST /api/tasks`: Create a new task.
     - `PUT /api/tasks/<task_id>`: Update a task (e.g., toggle completion).
     - `DELETE /api/tasks/<task_id>`: Delete a task.

3. **Database**
   - Uses **PostgreSQL** for persistent data storage.
   - Stores task information, including:
     - `id` (integer): Unique identifier.
     - `title` (string): Description of the task.
     - `completed` (boolean): Task status.

### Communication Flow

---

1. **User Interaction**:

   - Users interact with the frontend to perform actions like adding or toggling tasks.

2. **API Requests**:

   - The frontend sends HTTP requests to the backend Flask API.

3. **Database Operations**:

   - The backend performs CRUD operations on the PostgreSQL database.

4. **Response**:
   - The backend returns JSON responses, which the frontend uses to update the user interface.

### Why This Stack?

---

This stack was chosen for its efficiency, reliability, and compatibility with my skill set. Additionally, the project provided an opportunity to combine technologies I’m familiar with (Python, Next.js, and PostgreSQL) while tackling new challenges, such as CI/CD pipelines and SAST integration.

## Running the Application

### Prerequisites

---

- **Python** with `pip`
- **Node.js** with `npm` or `yarn`
- **PostgreSQL**

Note: The application has been tested with Node.js v20.10, Python v3.12, and PostgreSQL v16.1. Any recent version should work.

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

### With Docker Compose

- **Start the containers**:

```bash
docker compose up -d
```

- **Stop the Containers**:

```bash
docker compose down
```

- **Rebuild Services (if needed)**:

```bash
docker compose up --build -d
```

### Manually

---

#### Database Setup

---

**1. Create and seed the database**

- **Using psql**:

  ```bash
  psql -U <user> -d <db_name> -f database/init.sql
  ```

- **Using pgAdmin or other tools**:

  Create the database through the GUI and paste the contents of init.sql.

#### Backend Setup

---

**1. Navigate to the Backend Directory**

```bash
cd backend
```

**2. Create a virtual environment**

```bash
  python -m venv venv
```

**3. Activate it**

- **On Windows**:

  ```bash
  .\venv\Scripts\Activate.ps1 # For PowerShell
  .\venv\Scripts\activate # For cmd
  ```

- **On Linux or MacOS**:

  ```bash
  source venv/bin/activate
  ```

**4. Install the dependencies**

```bash
pip install -r requirements.txt
```

**5. Start the Backend**

```bash
python app.py
```

#### Frontend Setup

---

**1. Open another terminal and navigate to the frontend directory**

```bash
cd frontend
```

**2. Install Dependencies**

```bash
npm i # Or yarn
```

**3. Start the Frontend**

```bash
npm run dev # Or yarn dev
```

### Access the Application

---

Open your browser and visit http://localhost:3000 (or the URL you set in your environment variables).

## Team Roles and Contributions

1. **Ella**

   - **Role**: Development, CI/CD, Documentation, Project Management.
   - **Contributions**:
     - Managed the project's issue board.
     - Designed, developed, and dockerized the app.
     - Set up the project’s architecture and CI/CD pipeline.
     - Authored the project documentation.
