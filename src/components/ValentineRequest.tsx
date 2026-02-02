
import React, { useState, useRef } from 'react';
import { Heart, AlertCircle } from 'lucide-react';

interface ValentineRequestProps {
  onAccept: () => void;
}

const ValentineRequest: React.FC<ValentineRequestProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 120;
    const maxY = container.height - 60;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPos({ x: newX, y: newY });
    setClickCount(prev => prev + 1);
  };

  const getNoText = () => {
    const texts = [
      "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
      "Surely not?", "You're heartless!", "Give it a thought!", "Wait, no!", "Hmph!",
      "I'm gonna cry...", "Pleaaaase?"
    ];
    return texts[Math.min(clickCount, texts.length - 1)];
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm md:max-w-lg min-h-[450px] flex flex-col items-center justify-center bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(244,114,182,0.2)] border-4 border-white overflow-visible transition-all duration-500 animate-in fade-in zoom-in">
      <div className="text-center mb-10 space-y-6 w-full">
        <div className="relative inline-block group">
          {!imgError ? (
            <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-pink-50 transform group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmc0aXdtdnczdWh2eHZ2emlzODg5NTU2N2dlamQ4MGhpMmF4ZTV2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KmxmoHUGPDjfQXqGgv/giphy.gif"
                alt="Cute Love Animation"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="w-40 h-40 md:w-56 md:h-56 mx-auto bg-gradient-to-br from-pink-50 to-rose-50 rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-white shadow-xl">
              <Heart className="w-20 h-20 text-pink-400 fill-pink-300 animate-bounce" />
              <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mt-2">Love You!</span>
            </div>
          )}
          
          <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-xl rotate-12 animate-pulse">
            <Heart size={24} className="text-pink-500 fill-pink-500" />
          </div>
        </div>
        
        <div className="space-y-2 px-2">
          <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 drop-shadow-sm leading-tight">
            Will you be my Valentine?
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide">Choose with your heart...</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center z-20 w-full justify-center">
        <button
          onClick={onAccept}
          className="group relative w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:scale-110 transition-all text-2xl active:scale-95 overflow-hidden flex items-center justify-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            YES! <Heart size={24} className="fill-white group-hover:animate-bounce" />
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        
        <button
          style={{
            position: clickCount > 0 ? 'absolute' : 'relative',
            left: clickCount > 0 ? `${noButtonPos.x}px` : 'auto',
            top: clickCount > 0 ? `${noButtonPos.y}px` : 'auto',
            transition: clickCount > 0 ? 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            zIndex: 10
          }}
          onMouseEnter={moveButton}
          onClick={moveButton}
          className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-4 px-8 rounded-2xl shadow-sm transition-all whitespace-nowrap border border-gray-100 hover:text-pink-400"
        >
          {getNoText()}
        </button>
      </div>
      
      {clickCount > 0 && (
        <div className="absolute bottom-6 flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-widest animate-pulse">
          <AlertCircle size={14} />
          {clickCount > 8 ? "Resistance is futile! ❤️" : "Catch me if you can! 😋"}
        </div>
      )}
    </div>
  );
};

export default ValentineRequest;
