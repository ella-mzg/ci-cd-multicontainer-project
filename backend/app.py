from flask import Flask
from flask_cors import CORS
from models import db
from routes import task_blueprint
from config import Config
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_URL", "*")}})

app.register_blueprint(task_blueprint)

if __name__ == "__main__":
    app.run(
        host=os.getenv("BACKEND_HOST", "0.0.0.0"), 
        port=int(os.getenv("BACKEND_PORT", 5000))
    )
