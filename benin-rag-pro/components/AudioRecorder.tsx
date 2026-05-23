'use client';

import { useRef, useState } from 'react';
import { Mic, Square, Play, Pause, Trash2, Loader, Send } from 'lucide-react';
import { useAudioStore } from '@lib/store';
import { apiClient } from '@lib/api';
import clsx from 'clsx';

export const AudioRecorder: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { isRecording, isPlaying, isTranscribing, audioURL, setRecording, setPlaying, setTranscribing, setAudioURL, setError, reset } = useAudioStore();
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });

      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      setRecordingTime(0);
      intervalRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } catch {
      setError("Erreur lors de l'accès au microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioElementRef.current) return;
    if (isPlaying) {
      audioElementRef.current.pause();
      setPlaying(false);
    } else {
      audioElementRef.current.play();
      setPlaying(true);
    }
  };

  const handleTranscribe = async () => {
    if (!audioURL) return;
    setTranscribing(true);
    try {
      const response = await fetch(audioURL);
      const blob = await response.blob();
      const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
      await apiClient.audioToText(file);
      setError(undefined);
    } catch {
      setError('Erreur lors de la transcription');
    } finally {
      setTranscribing(false);
    }
  };

  const clearRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    reset();
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-3 justify-center items-center flex-wrap">
        {!audioURL ? (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={clsx(
              'px-5 sm:px-6 py-3 rounded-full font-semibold flex items-center gap-2.5 transition-all duration-300 text-sm',
              isRecording
                ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 animate-pulse-slow'
                : 'btn-green !rounded-full'
            )}
          >
            {isRecording ? (
              <>
                <Square size={16} />
                <span>Arrêter ({formatTime(recordingTime)})</span>
              </>
            ) : (
              <>
                <Mic size={16} />
                <span className="hidden sm:inline">Commencer l'enregistrement</span>
                <span className="sm:hidden">Enregistrer</span>
              </>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={togglePlayback}
              className="px-4 py-3 rounded-full font-semibold flex items-center gap-2 text-sm btn-primary !rounded-full"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Écouter'}</span>
            </button>

            <button
              onClick={handleTranscribe}
              disabled={isTranscribing}
              className={clsx(
                'p-3 rounded-full font-semibold transition-all flex items-center justify-center',
                isTranscribing
                  ? 'bg-surface-700 text-surface-500 cursor-not-allowed'
                  : 'btn-green !rounded-full !p-3'
              )}
              title={isTranscribing ? 'Transcription...' : 'Transcrire & Envoyer'}
            >
              {isTranscribing ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            </button>

            <button
              onClick={clearRecording}
              className="p-3 rounded-full bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 border border-accent-500/20 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>

      {audioURL && (
        <audio ref={audioElementRef} src={audioURL} onEnded={() => setPlaying(false)} className="hidden" />
      )}
    </div>
  );
};

export default AudioRecorder;
