import pytest
from app import app, db

@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_health_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "healthy"}

def test_get_tasks_empty(client):
    response = client.get("/api/tasks")
    assert response.status_code == 200
    assert response.get_json() == []

def test_create_task(client):
    response = client.post("/api/tasks", json={"title": "Test Task"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["id"] is not None
    assert data["title"] == "Test Task"
    assert data["completed"] is False

def test_get_tasks(client):
    client.post("/api/tasks", json={"title": "Task 1"})
    client.post("/api/tasks", json={"title": "Task 2"})

    response = client.get("/api/tasks")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"

def test_update_task(client):
    response = client.post("/api/tasks", json={"title": "Task to Update"})
    task_id = response.get_json()["id"]

    update_response = client.put(f"/api/tasks/{task_id}", json={"completed": True})
    assert update_response.status_code == 200
    updated_task = update_response.get_json()
    assert updated_task["id"] == task_id
    assert updated_task["completed"] is True

def test_delete_task(client):
    response = client.post("/api/tasks", json={"title": "Task to Delete"})
    task_id = response.get_json()["id"]

    delete_response = client.delete(f"/api/tasks/{task_id}")
    assert delete_response.status_code == 200
    assert delete_response.get_json() == {"message": "Task deleted"}

    get_response = client.get("/api/tasks")
    assert len(get_response.get_json()) == 0
def test_update_non_existent_task(client):
    response = client.put("/api/tasks/4", json={"completed": True})
    assert response.status_code == 404
    assert response.get_json() == {"error": "Task not found"}

def test_delete_non_existent_task(client):
    response = client.delete("/api/tasks/4")
    assert response.status_code == 404
    assert response.get_json() == {"error": "Task not found"}