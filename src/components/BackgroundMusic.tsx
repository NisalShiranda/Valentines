
import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Heart } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log("Playback blocked by browser settings. Click to enable.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[600]">
      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
      />
      <button
        onClick={toggleMusic}
        className={`group relative p-5 rounded-full shadow-2xl transition-all duration-700 flex items-center justify-center border-2 ${
          isPlaying 
            ? 'bg-pink-500 border-white text-white scale-110 shadow-pink-200' 
            : 'bg-white/90 backdrop-blur-md border-pink-100 text-pink-500 hover:bg-pink-50'
        }`}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 size={24} className="animate-pulse" />
          ) : (
            <VolumeX size={24} />
          )}
          
          {isPlaying && (
            <>
              <Music size={12} className="absolute -top-3 -right-3 text-white animate-bounce" />
              <Heart size={10} className="absolute -bottom-3 -left-3 text-pink-200 fill-pink-200 animate-ping" />
            </>
          )}
        </div>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-6 px-4 py-2 bg-pink-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-lg">
          {isPlaying ? 'Mute Heartbeats' : 'Play Romantic Music'}
        </span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
