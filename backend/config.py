import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

class Config:
    try:
        DATABASE_URL = os.getenv("DATABASE_URL")
    except Exception as e:
        print(f"Error loading database configuration: {e}")
        DATABASE_URL = "sqlite:///:memory:"

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
