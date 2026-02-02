
import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

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
    <div ref={containerRef} className="relative w-full max-w-lg min-h-[500px] flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white/80 overflow-visible transition-all duration-500 animate-in fade-in zoom-in">
      <div className="text-center mb-12 space-y-6 w-full">
        <div className="relative inline-block">
          {!imgError ? (
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHNoZzhicnZ6Z3ZxdnZ6Z3ZxdnZ6Z3ZxdnZ6Z3ZxdnZ6Z3ZxdnZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/c76IJLufpN2G6nZ8Go/giphy.gif" 
              alt="Cute Love Animation"
              className="w-48 h-48 mx-auto rounded-3xl object-cover shadow-inner"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-48 h-48 mx-auto bg-pink-50 rounded-3xl flex items-center justify-center border-2 border-pink-100">
              <Heart className="w-24 h-24 text-pink-400 fill-pink-200 animate-pulse" />
            </div>
          )}
          <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg rotate-12">
            <Heart size={20} className="text-pink-500 fill-pink-500" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 drop-shadow-sm">
          Will you be my Valentine?
        </h2>
      </div>

      <div className="flex gap-6 items-center z-20">
        <button
          onClick={onAccept}
          className="group relative bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-full shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)] hover:scale-110 transition-all text-2xl active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            YES! <Heart size={24} className="fill-white group-hover:animate-bounce" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        
        <button
          style={{
            position: clickCount > 0 ? 'absolute' : 'relative',
            left: clickCount > 0 ? `${noButtonPos.x}px` : 'auto',
            top: clickCount > 0 ? `${noButtonPos.y}px` : 'auto',
            transition: clickCount > 0 ? 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            zIndex: 10
          }}
          onMouseEnter={moveButton}
          onClick={moveButton}
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3 px-8 rounded-full shadow-sm transition-all whitespace-nowrap border border-gray-200"
        >
          {getNoText()}
        </button>
      </div>
      
      {clickCount > 0 && (
        <p className="absolute bottom-6 text-sm text-pink-400 font-medium italic animate-pulse">
          {clickCount > 8 ? "There is no escape! ❤️" : "You can't catch me! 😋"}
        </p>
      )}
    </div>
  );
};

export default ValentineRequest;
