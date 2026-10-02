'use client';

import { useState } from 'react';
import VoiceCloner from '@/components/VoiceCloner';
import TextToSpeech from '@/components/TextToSpeech';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleVoiceCreated = () => {
    // Trigger refresh of voice profiles in TextToSpeech component
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Voice Cloning & Text-to-Speech
          </h1>
          <p className="text-gray-600 text-lg">
            Create voice profiles and generate natural-sounding speech - 100% Free & Local
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Running locally with Coqui TTS</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <VoiceCloner onSuccess={handleVoiceCreated} />
          <TextToSpeech key={refreshKey} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">How to Use:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Clone a Voice:</strong> Upload an audio sample (at least 6 seconds) of the voice
              you want to clone. WAV or MP3 format recommended.
            </li>
            <li>
              <strong>Generate Speech:</strong> Select a voice profile (or use default voice), enter
              your text, choose a language, and click generate.
            </li>
            <li>
              <strong>Download:</strong> Listen to the generated audio and download it if you like it.
            </li>
          </ol>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The first generation may take longer as the model loads. Voice
              cloning works best with clear, high-quality audio samples of at least 6-10 seconds.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
