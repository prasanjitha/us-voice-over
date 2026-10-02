from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from TTS.api import TTS
import os
import uuid
from datetime import datetime
from database import init_db, get_db, VoiceProfile, GeneratedAudio
from pydantic import BaseModel, validator
from typing import Optional
import shutil

app = FastAPI()

# CORS middleware for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Initialize TTS model (XTTS for voice cloning)
print("Loading TTS model... This may take a few minutes on first run.")
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
print("TTS model loaded successfully!")

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("generated", exist_ok=True)

class TTSRequest(BaseModel):
    text: str
    voice_profile_id: Optional[int] = None
    language: str = "en"

    @validator('text')
    def validate_text_length(cls, v):
        if len(v.strip()) == 0:
            raise ValueError('Text cannot be empty')
        if len(v) > 1000:
            raise ValueError('Text cannot exceed 1000 characters')
        return v

@app.get("/")
async def root():
    return {"message": "Voice Cloning API", "status": "running"}

@app.post("/api/voice-profiles")
async def create_voice_profile(
    name: str = Form(...),
    description: str = Form(""),
    audio_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload a voice sample to create a voice profile"""
    try:
        # Check if profile name already exists
        existing = db.query(VoiceProfile).filter(VoiceProfile.name == name).first()
        if existing:
            raise HTTPException(status_code=400, detail="Voice profile name already exists")

        # Save uploaded file
        file_ext = os.path.splitext(audio_file.filename)[1]
        filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join("uploads", filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(audio_file.file, buffer)

        # Create database entry
        voice_profile = VoiceProfile(
            name=name,
            description=description,
            sample_path=file_path
        )
        db.add(voice_profile)
        db.commit()
        db.refresh(voice_profile)

        return {
            "id": voice_profile.id,
            "name": voice_profile.name,
            "description": voice_profile.description,
            "created_at": voice_profile.created_at
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/voice-profiles")
async def list_voice_profiles(db: Session = Depends(get_db)):
    """List all voice profiles"""
    profiles = db.query(VoiceProfile).all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "created_at": p.created_at
        }
        for p in profiles
    ]

@app.delete("/api/voice-profiles/{profile_id}")
async def delete_voice_profile(profile_id: int, db: Session = Depends(get_db)):
    """Delete a voice profile"""
    profile = db.query(VoiceProfile).filter(VoiceProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Voice profile not found")

    # Delete audio file
    if os.path.exists(profile.sample_path):
        os.remove(profile.sample_path)

    db.delete(profile)
    db.commit()
    return {"message": "Voice profile deleted successfully"}

@app.post("/api/generate")
async def generate_speech(
    request: TTSRequest,
    db: Session = Depends(get_db)
):
    """Generate speech from text using a voice profile or default voice"""
    try:
        output_filename = f"{uuid.uuid4()}.wav"
        output_path = os.path.join("generated", output_filename)

        if request.voice_profile_id:
            # Use cloned voice
            voice_profile = db.query(VoiceProfile).filter(
                VoiceProfile.id == request.voice_profile_id
            ).first()

            if not voice_profile:
                raise HTTPException(status_code=404, detail="Voice profile not found")

            # Generate with voice cloning
            tts.tts_to_file(
                text=request.text,
                speaker_wav=voice_profile.sample_path,
                language=request.language,
                file_path=output_path
            )
        else:
            # Use default voice (no cloning)
            tts.tts_to_file(
                text=request.text,
                language=request.language,
                file_path=output_path
            )

        # Save to database
        generated = GeneratedAudio(
            voice_profile_id=request.voice_profile_id,
            text=request.text,
            audio_path=output_path
        )
        db.add(generated)
        db.commit()
        db.refresh(generated)

        return {
            "id": generated.id,
            "audio_url": f"/api/audio/{generated.id}",
            "created_at": generated.created_at
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/audio/{audio_id}")
async def get_audio(audio_id: int, db: Session = Depends(get_db)):
    """Get generated audio file"""
    audio = db.query(GeneratedAudio).filter(GeneratedAudio.id == audio_id).first()
    if not audio or not os.path.exists(audio.audio_path):
        raise HTTPException(status_code=404, detail="Audio not found")

    return FileResponse(
        audio.audio_path,
        media_type="audio/wav",
        filename=f"generated_{audio_id}.wav"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
