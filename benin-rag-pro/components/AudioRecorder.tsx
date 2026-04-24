'use client';

import {useRef, useState } from 'react';
import { Mic, Square, Play, Pause, Trash2, Loader, Send } from 'lucide-react';
import { useAudioStore } from '@lib/store';
import { apiClient } from '@lib/api';
import clsx from 'clsx';

export const AudioRecorder: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  
  const {isRecording,isPlaying,isTranscribing,audioURL,setRecording,setPlaying,setTranscribing,setAudioURL,setError,reset} = useAudioStore();

  const [recordingTime, setRecordingTime] = useState(0);
  let recordingInterval: NodeJS.Timeout;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      setRecordingTime(0);

      recordingInterval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError('Erreur lors de l\'accès au microphone');
      console.error('Microphone error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(recordingInterval);
    }
  };

  const togglePlayback = () => {
    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setPlaying(false);
      } else {
        audioElementRef.current.play();
        setPlaying(true);
      }
    }
  };

  const handleTranscribe = async () => {
    if (!audioURL) return;

    setTranscribing(true);
    try {
      const response = await fetch(audioURL);
      const blob = await response.blob();
      const file = new File([blob], 'recording.webm', { type: 'audio/webm' });

      const result = await apiClient.audioToText(file);
      console.log('Transcription result:', result);
      setError(undefined);
    } catch (err) {
      setError('Erreur lors de la transcription');
      console.error('Transcription error:', err);
    } finally {
      setTranscribing(false);
    }
  };

  const clearRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
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
      {/* Recording Controls */}
      <div className="flex gap-2 sm:gap-3 justify-center items-center flex-wrap pb-4">
        {!audioURL ? (
          <>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={clsx(
                'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 text-sm sm:text-base',
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse'
                  : 'bg-gradient-benin text-white hover:shadow-lg'
              )}
            >
              {isRecording ? (
                <>
                  <Square size={18} className="sm:size-20" />
                  <span className="hidden sm:inline">Arrêter ({formatTime(recordingTime)})</span>
                  <span className="sm:hidden">Arrêter</span>
                </>
              ) : (
                <>
                  <Mic size={18} className="sm:size-20" />
                  <span className="hidden sm:inline">Commencer l'enregistrement</span>
                  <span className="sm:hidden">Enregistrer</span>
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={togglePlayback}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-gold-500 text-white hover:bg-gold-600 transition-all flex items-center gap-2 text-sm sm:text-base flex-shrink-0"
            >
              {isPlaying ? (
                <>
                  <Pause size={18} className="sm:size-20" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play size={18} className="sm:size-20" />
                  <span className="hidden sm:inline">Écouter</span>
                </>
              )}
            </button>

            <button
              onClick={handleTranscribe}
              disabled={isTranscribing}
              className={clsx(
                'p-2 xs:p-2.5 rounded-full font-semibold transition-all flex items-center justify-center flex-shrink-0',
                isTranscribing
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-benin text-white hover:shadow-lg active:scale-95'
              )}
              title={isTranscribing ? 'Transcription...' : 'Transcrire & Envoyer'}
            >
              {isTranscribing ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>

            <button
              onClick={clearRecording}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2 flex-shrink-0"
            >
              <Trash2 size={18} className="sm:size-20" />
            </button>
          </>
        )}
      </div>

      {/* Audio Element */}
      {audioURL && (
        <audio
          ref={audioElementRef}
          src={audioURL}
          onEnded={() => setPlaying(false)}
          className="hidden"
        />
      )}
    </div>
  );
};

export default AudioRecorder;
