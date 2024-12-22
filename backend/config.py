import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    if os.path.exists('/run/secrets/postgres_password'):
        POSTGRES_PASSWORD = open('/run/secrets/postgres_password').read().strip()
        DATABASE_URL = f"postgresql+psycopg2://user:{POSTGRES_PASSWORD}@db:5432/mydb"
    else:
        DATABASE_URL = os.getenv("DATABASE_URL")

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
