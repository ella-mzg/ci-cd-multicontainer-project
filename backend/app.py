from flask import Flask
from models import db
from routes import task_blueprint
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(task_blueprint)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
