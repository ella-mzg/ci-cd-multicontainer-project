# CI-CD Multicontainer Project

## Hosted Documentation

The complete project documentation is hosted on GitLab Pages. You can access it here:

[CI/CD Multicontainer Project Documentation](https://ella.mzg.gitlab.io/ci-cd-multicontainer-project)

## Project Description

This is a simple TODO app that allows users to manage their tasks. Users can:

- Add new tasks to their to-do list.
- Mark tasks as completed or toggle their completion status.
- Delete tasks they no longer need.

## Architecture Overview

The app follows a three-tier architecture, consisting of a **frontend**, **backend**, and **database** with NGINX as a reverse proxy to streamline communication between components.

### Components

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

4. **Reverse Proxy**

   - NGINX Acts as a single entry point for the application when running with Docker Compose.
   - Simplifies frontend-backend communication by avoiding hardcoded URLs.
   - Routes incoming requests to the appropriate service:
     - `/`: Proxies requests to the frontend.
     - `/backend`: Proxies API requests to the backend.

### **Communication Flow**

1. **User Interaction**  
   Users interact with the **frontend** to add, update, or delete tasks.

2. **API Requests**  
   The **frontend** sends requests to the **backend** Flask API via NGINX.

3. **Database Operations**  
   The **backend** interacts with the **PostgreSQL** database to handle CRUD operations.

4. **Response Handling**  
   The **backend** sends responses back to the **frontend**, which updates the user interface accordingly.

### Why This Stack?

This stack was chosen for its efficiency, reliability, and compatibility with my skill set. Additionally, the project provided an opportunity to combine technologies I’m familiar with (Python, Next.js, and PostgreSQL) while tackling new challenges, such as CI/CD pipelines and SAST integration.

## Running the Application

### Prerequisites

- **Python** with `pip`
- **Node.js** with `npm` or `yarn`
- **PostgreSQL**

Note: The application has been tested with Node.js v20.10, Python v3.12, and PostgreSQL v16.1. Any recent version should work.

### With Docker Compose

- **Start the containers**:

```bash
docker-compose up -d
```

- **Stop the Containers**:

```bash
docker-compose down
```

- **Rebuild Services (if needed)**:

```bash
docker-compose up --build -d
```

- **Access the Application**

Open your browser and visit `http://localhost/` (or `http://<PUBLIC_VM_IP>/` if deployed on a VM).

You can watch a [demonstration of successful deployment to the VM](https://supdevinci-my.sharepoint.com/:v:/g/personal/ella_mzoughi_supdevinci-edu_fr/EelizM3czSJLuXAwZTmE44kBCw-dgaXm3iI9Yh2hxQ0pNw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=Ptc0RJ) in this video.

### Manually

#### Database Setup

**1. Create and seed the database**

- **Using psql**:

  ```bash
  psql -U <user> -d <db_name> -f database/init.sql
  ```

- **Using pgAdmin or other tools**:

  Create the database through the GUI and paste the contents of init.sql in your query tool to initialize it.

#### Variables Setup

**Create a .env file in the project root directory with the following values:**

```bash
# Database connection string (do not use if running tests, deployed app, or Docker Compose):
DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/mydb

# Override the backend port (default is 5000):
BACKEND_PORT=5001

# Frontend will run on 3000 by default, but Next.js dynamically chooses another port if unavailable.
```

#### Backend Setup

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

#### Access the Application

Once both the backend and frontend are running, open your browser and visit `http://localhost:3000/` (or the port dynamically chosen by Next.js).

---

## Team Roles and Contributions

1. **Ella**

   - **Role**: Development, CI/CD, Documentation, Project Management.
   - **Contributions**:
     - Managed the project's issue board.
     - Designed, developed, and dockerized the app.
     - Set up the project’s architecture and CI/CD pipeline.
     - Authored the project documentation.
