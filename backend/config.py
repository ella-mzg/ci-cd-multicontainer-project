import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    try:
        if os.path.exists('/run/secrets/postgres_password'):
            with open('/run/secrets/postgres_password') as f:
                POSTGRES_PASSWORD = f.read().strip()
            DATABASE_URL = f"postgresql+psycopg2://user:{POSTGRES_PASSWORD}@db:5432/mydb"
        else:
            DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///:memory:")
    except Exception as e:
        print(f"Error loading database configuration: {e}")
        DATABASE_URL = "sqlite:///:memory:"

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
