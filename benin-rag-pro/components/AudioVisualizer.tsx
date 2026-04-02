'use client';

import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '@lib/store';

export const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { waveformData } = useAudioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw waveform
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / waveformData.length;

    ctx.fillStyle = '#5c4e84';
    waveformData.forEach((value, i) => {
      const barHeight = (value / 255) * height;
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    });

    // Add gradient glow
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(92, 78, 132, 0.1)');
    gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(92, 78, 132, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [waveformData]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={120}
      className="w-full h-auto rounded-lg border-2 border-benin-200 bg-gradient-to-b from-benin-50 to-white shadow-lg"
    />
  );
};

export default AudioVisualizer;
