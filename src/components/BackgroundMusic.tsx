
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
          console.log("Playback blocked by browser settings. Interaction required.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[600]">
      <audio
        ref={audioRef}
        loop
        src="./audio/song.mp3"
      />
      <button
        onClick={toggleMusic}
        className={`group relative p-3 sm:p-5 rounded-full shadow-2xl transition-all duration-700 flex items-center justify-center border-2 ${
          isPlaying 
            ? 'bg-pink-500 border-white text-white scale-105 sm:scale-110 shadow-pink-200' 
            : 'bg-white/90 backdrop-blur-md border-pink-100 text-pink-500 hover:bg-pink-50'
        }`}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 size={20} className="sm:w-6 sm:h-6 animate-pulse" />
          ) : (
            <VolumeX size={20} className="sm:w-6 sm:h-6" />
          )}
          
          {isPlaying && (
            <>
              <Music size={10} className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-white animate-bounce" />
              <Heart size={8} className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 text-pink-200 fill-pink-200 animate-ping" />
            </>
          )}
        </div>
        
        {/* Only show label on larger screens to avoid mobile clutter */}
        <span className="hidden sm:block absolute right-full mr-6 px-4 py-2 bg-pink-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-lg">
          {isPlaying ? 'Mute Music' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
