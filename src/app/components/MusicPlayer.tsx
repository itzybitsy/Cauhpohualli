import React, { useState, useRef, useEffect } from 'react';
import { Square, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — user must interact first
        setIsPlaying(false);
      });
  }, []);

  // Sync play/pause when toggled by user
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const changeVolume = (delta: number) => {
    setVolume(prev => Math.min(1, Math.max(0, Math.round((prev + delta) * 10) / 10)));
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Volume down */}
      <Button
        onClick={() => changeVolume(-0.1)}
        disabled={volume <= 0}
        className="w-9 h-9 rounded-full bg-amber-900/80 hover:bg-amber-800 shadow-lg flex items-center justify-center text-white text-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-transform hover:scale-110"
        aria-label="Volume down"
      >
        −
      </Button>

      {/* Volume indicator */}
      <span className="text-amber-200 text-xs font-medium w-8 text-center drop-shadow">
        {Math.round(volume * 100)}%
      </span>

      {/* Volume up */}
      <Button
        onClick={() => changeVolume(0.1)}
        disabled={volume >= 1}
        className="w-9 h-9 rounded-full bg-amber-900/80 hover:bg-amber-800 shadow-lg flex items-center justify-center text-white text-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-transform hover:scale-110"
        aria-label="Volume up"
      >
        +
      </Button>

      {/* Stop */}
      <Button
        onClick={stopAudio}
        disabled={!isPlaying}
        className="w-9 h-9 rounded-full bg-amber-900/80 hover:bg-amber-800 shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-transform hover:scale-110"
        aria-label="Stop music"
      >
        <Square className="w-4 h-4 text-white fill-white" />
      </Button>

      {/* Play / pause toggle */}
      <Button
        onClick={() => setIsPlaying(prev => !prev)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <VolumeIcon className="w-6 h-6 text-white" />
      </Button>

      <audio ref={audioRef} loop preload="auto">
        <source src="/drums.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
