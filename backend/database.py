from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

DATABASE_URL = "sqlite:///./voiceover.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class VoiceProfile(Base):
    __tablename__ = "voice_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text, nullable=True)
    sample_path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class GeneratedAudio(Base):
    __tablename__ = "generated_audio"

    id = Column(Integer, primary_key=True, index=True)
    voice_profile_id = Column(Integer, nullable=True)
    text = Column(Text)
    audio_path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
