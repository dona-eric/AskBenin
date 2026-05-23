'use client';

import React from 'react';
import { useAudioStore } from '@lib/store';

export const AudioVisualizer: React.FC = () => {
  const { waveformData, isRecording } = useAudioStore();

  return (
    <div className="w-full h-24 sm:h-32 rounded-xl flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {isRecording || waveformData.length > 0 ? (
        <div className="flex items-center gap-1 h-full px-4">
          {(waveformData.length > 0 ? waveformData : Array.from({ length: 40 }, () => Math.random())).map((val, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-150"
              style={{
                height: `${Math.max(8, val * 80)}%`,
                background: `linear-gradient(to top, rgba(212,160,23,0.4), rgba(212,160,23,0.8))`,
                animation: isRecording ? `bounceSubtle 1.2s ease-in-out ${i * 0.05}s infinite` : 'none',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-surface-800"
              style={{ height: `${10 + Math.sin(i * 0.5) * 20}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
