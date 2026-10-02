'use client';

import { useState, useEffect } from 'react';
import { api, VoiceProfile } from '@/lib/api';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    loadVoiceProfiles();
  }, []);

  const loadVoiceProfiles = async () => {
    try {
      const profiles = await api.getVoiceProfiles();
      setVoiceProfiles(profiles);
    } catch (err) {
      console.error('Failed to load voice profiles:', err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    if (text.length > 1000) {
      setError('Text cannot exceed 1000 characters');
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const result = await api.generateSpeech(text, selectedVoice, language);
      const fullAudioUrl = api.getAudioUrl(result.id);
      setAudioUrl(fullAudioUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this voice profile?')) {
      return;
    }

    try {
      await api.deleteVoiceProfile(id);
      loadVoiceProfiles();
      if (selectedVoice === id) {
        setSelectedVoice(null);
      }
    } catch (err) {
      alert('Failed to delete voice profile');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Text to Speech</h2>
      <p className="text-gray-600 mb-6">
        Generate speech from text using a cloned voice or default voice
      </p>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Voice
          </label>
          <select
            value={selectedVoice || ''}
            onChange={(e) => setSelectedVoice(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">Default Voice</option>
            {voiceProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>

        {voiceProfiles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your Voice Profiles:</h3>
            <div className="space-y-2">
              {voiceProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between bg-white p-3 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{profile.name}</p>
                    {profile.description && (
                      <p className="text-sm text-gray-500">{profile.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="ru">Russian</option>
            <option value="nl">Dutch</option>
            <option value="cs">Czech</option>
            <option value="ar">Arabic</option>
            <option value="zh-cn">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to Speak *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Enter the text you want to convert to speech..."
            rows={6}
            required
          />
          <div className="mt-1 flex justify-between text-sm">
            <span className={text.length > 500 ? 'text-orange-600' : 'text-gray-500'}>
              {text.length} / 1000 characters
              {text.length > 500 && text.length <= 1000 && (
                <span className="ml-2 text-orange-600">⚠️ Long text may take longer</span>
              )}
            </span>
            <span className="text-gray-400">
              Optimal: 200-300 chars
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {loading ? 'Generating Speech...' : 'Generate Speech'}
        </button>
      </form>

      {audioUrl && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated Audio:</h3>
          <audio controls className="w-full" src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <a
            href={audioUrl}
            download="generated_speech.wav"
            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
}
