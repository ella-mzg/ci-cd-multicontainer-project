import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from models import db
from routes import task_blueprint
from config import Config

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_URL")}})

app.register_blueprint(task_blueprint)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("SERVICE_PORT")))
