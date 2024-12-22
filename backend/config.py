import os

POSTGRES_PASSWORD = open('/run/secrets/postgres_password').read().strip()
DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql+psycopg://user:{POSTGRES_PASSWORD}@db:5432/mydb")

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
