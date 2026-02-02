
import React, { useState, useRef, useEffect } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[200]">
      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
      />
      <button
        onClick={toggleMusic}
        className={`group relative p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center ${
          isPlaying 
            ? 'bg-pink-500 text-white scale-110' 
            : 'bg-white/80 backdrop-blur-md text-pink-500 hover:bg-pink-50'
        }`}
      >
        {isPlaying ? (
          <Volume2 size={24} className="animate-pulse" />
        ) : (
          <VolumeX size={24} />
        )}
        
        {/* Floating Note Decoration */}
        {isPlaying && (
          <div className="absolute -top-2 -left-2 animate-bounce">
            <Music size={14} className="text-pink-300" />
          </div>
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1 bg-black/70 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? 'Mute Music' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
