from flask import Blueprint, request, jsonify
from models import db, Task

task_blueprint = Blueprint("tasks", __name__)

@task_blueprint.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

@task_blueprint.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{"id": t.id, "title": t.title, "completed": t.completed} for t in tasks])

@task_blueprint.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    task = Task(title=data["title"])
    db.session.add(task)
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed}), 201

@task_blueprint.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.title = data.get("title", task.title)
    task.completed = data.get("completed", task.completed)
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed})

@task_blueprint.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})