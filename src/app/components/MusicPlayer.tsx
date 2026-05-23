import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Audio playback failed:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleMusic}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </Button>
      
      {/* Audio element - replace the src with actual pre-Hispanic music URL */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* 
          To use this music player:
          1. Find authentic pre-Hispanic music (such as recordings of traditional instruments
             like the teponaztli drum, huehuetl, flutes, or conch shells)
          2. Upload the audio file to your project or use a public URL
          3. Add the source below, for example:
          <source src="/path/to/your/prehispanic-music.mp3" type="audio/mpeg" />
          
          Example with a public URL:
          <source src="https://example.com/aztec-music.mp3" type="audio/mpeg" />
        */}
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      
      {!isPlaying && (
        <div className="absolute bottom-full mb-2 right-0 bg-amber-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Traditional Music
        </div>
      )}
    </div>
  );
}
