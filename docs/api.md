# Flask API Documentation: Todo App

## Base URL

All endpoints are prefixed with `/api`.

---

## 1. Get All Tasks

- **URL**: `/api/tasks`
- **Method**: `GET`
- **Description**: Retrieves a list of all tasks.
- **Response**:
  - **200 OK**: An array of tasks.
    ```json
    [
      {
        "id": 1,
        "title": "Buy groceries",
        "completed": false
      },
      {
        "id": 2,
        "title": "Clean the house",
        "completed": true
      }
    ]
    ```

---

## 2. Create a Task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Description**: Adds a new task.
- **Request Body**:
  - JSON object with the following field:
    ```json
    {
      "title": "New Task"
    }
    ```
- **Response**:
  - **201 Created**: The created task.
    ```json
    {
      "id": 3,
      "title": "New Task",
      "completed": false
    }
    ```

---

## 3. Update a Task

- **URL**: `/api/tasks/<task_id>`
- **Method**: `PUT`
- **Description**: Updates an existing task's details.
- **Path Parameter**:
  - `task_id` (integer): The ID of the task to update.
- **Request Body**:
  - JSON object with the fields to update (optional fields are allowed):
    ```json
    {
      "title": "Updated Task",
      "completed": true
    }
    ```
- **Response**:
  - **200 OK**: The updated task.
    ```json
    {
      "id": 3,
      "title": "Updated Task",
      "completed": true
    }
    ```
  - **404 Not Found**: Task not found.
    ```json
    {
      "error": "Task not found"
    }
    ```

---

## 4. Delete a Task

- **URL**: `/api/tasks/<task_id>`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Path Parameter**:
  - `task_id` (integer): The ID of the task to delete.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Task deleted"
    }
    ```
  - **404 Not Found**: Task not found.
    ```json
    {
      "error": "Task not found"
    }
    ```
