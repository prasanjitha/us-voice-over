const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface VoiceProfile {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface GeneratedAudio {
  id: number;
  audio_url: string;
  created_at: string;
}

export const api = {
  async createVoiceProfile(name: string, description: string, audioFile: File): Promise<VoiceProfile> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('audio_file', audioFile);

    const response = await fetch(`${API_BASE_URL}/api/voice-profiles`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create voice profile');
    }

    return response.json();
  },

  async getVoiceProfiles(): Promise<VoiceProfile[]> {
    const response = await fetch(`${API_BASE_URL}/api/voice-profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch voice profiles');
    }
    return response.json();
  },

  async deleteVoiceProfile(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/voice-profiles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete voice profile');
    }
  },

  async generateSpeech(
    text: string,
    voiceProfileId: number | null,
    language: string = 'en'
  ): Promise<GeneratedAudio> {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_profile_id: voiceProfileId,
        language,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate speech');
    }

    return response.json();
  },

  getAudioUrl(audioId: number): string {
    return `${API_BASE_URL}/api/audio/${audioId}`;
  },
};
