
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
    
    // Boundary logic: Keep the button within the bottom 40% of the container 
    // to avoid covering the text and the "YES" button.
    const container = containerRef.current.getBoundingClientRect();
    const padding = 20;
    const buttonWidth = 120;
    const buttonHeight = 50;

    // We want to restrict X to full width, but Y to only the lower portion
    const minX = padding;
    const maxX = container.width - buttonWidth - padding;
    const minY = container.height * 0.5; // Start from middle
    const maxY = container.height - buttonHeight - padding;

    const newX = minX + Math.random() * (maxX - minX);
    const newY = minY + Math.random() * (maxY - minY);

    setNoButtonPos({ x: newX, y: newY });
    setClickCount(prev => prev + 1);
  };

  const getNoText = () => {
    const texts = [
      "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
      "Surely not?", "You're heartless!", "Wait, no!", "Hmph!",
      "I'm gonna cry...", "Pleaaaase?"
    ];
    return texts[Math.min(clickCount, texts.length - 1)];
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[90vw] sm:max-w-lg min-h-[500px] flex flex-col items-center justify-start bg-white/70 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-12 shadow-[0_30px_60px_rgba(244,114,182,0.2)] border-4 border-white transition-all duration-500 animate-in fade-in zoom-in overflow-hidden">
      
      {/* Visual Content - Scaled for Mobile */}
      <div className="text-center mt-4 mb-8 space-y-4 sm:space-y-6 w-full">
        <div className="relative inline-block group">
          {!imgError ? (
            <div className="w-32 h-32 sm:w-56 sm:h-56 mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-pink-50 transform transition-transform duration-500">
              <img 
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmc0aXdtdnczdWh2eHZ2emlzODg5NTU2N2dlamQ4MGhpMmF4ZTV2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KmxmoHUGPDjfQXqGgv/giphy.gif" 
                alt="Love"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="w-32 h-32 sm:w-56 sm:h-56 mx-auto bg-gradient-to-br from-pink-50 to-rose-50 rounded-[2rem] flex flex-col items-center justify-center border-4 border-white shadow-xl">
              <Heart className="w-16 h-16 text-pink-400 fill-pink-300 animate-bounce" />
            </div>
          )}
          <div className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg">
            <Heart size={20} className="text-pink-500 fill-pink-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-pacifico text-pink-600 drop-shadow-sm leading-tight px-2">
            Will you be my Valentine?
          </h2>
          <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Choose wisely... ❤️</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col items-center gap-4 mt-auto mb-10">
        <button
          onClick={onAccept}
          className="group relative w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:scale-105 transition-all text-xl sm:text-2xl active:scale-95 z-20 flex items-center justify-center gap-2"
        >
          YES! <Heart size={24} className="fill-white" />
        </button>
        
        <button
          style={clickCount > 0 ? {
            position: 'absolute',
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 10
          } : { position: 'relative' }}
          onMouseEnter={moveButton}
          onClick={moveButton}
          className="w-full sm:w-auto bg-gray-50 text-gray-400 font-bold py-4 px-8 rounded-2xl shadow-sm transition-all whitespace-nowrap border border-gray-100 text-sm sm:text-base"
        >
          {getNoText()}
        </button>
      </div>
      
      {clickCount > 0 && (
        <div className="absolute bottom-4 flex items-center gap-2 text-pink-400 font-bold text-[9px] uppercase tracking-tighter animate-pulse">
          <AlertCircle size={10} />
          {clickCount > 5 ? "Resistance is futile! 😘" : "Too slow! 😋"}
        </div>
      )}
    </div>
  );
};

export default ValentineRequest;
