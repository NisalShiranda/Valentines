
import React, { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';

const SurpriseBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center py-10">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer transition-all duration-700 transform ${isOpen ? 'scale-110' : 'hover:scale-105'}`}
      >
        {!isOpen ? (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-pink-600 p-10 rounded-2xl shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-24 bg-pink-400 rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-24 bg-pink-400 rounded-full" />
              <Gift className="text-white w-20 h-20 animate-bounce" />
            </div>
            <p className="font-pacifico text-pink-500 animate-pulse">A special surprise for my girl...</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-4 border-pink-200 text-center max-w-md animate-pop-in">
             <div className="flex justify-center mb-4">
                <div className="flex -space-x-4">
                  <Sparkles className="w-8 h-8 text-pink-500 animate-bounce" />
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Sparkles className="w-8 h-8 text-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
             </div>
             <h3 className="text-3xl font-romantic font-bold text-pink-600 mb-4">Best Girlfriend Award!</h3>
             <div className="bg-pink-50 border-2 border-dashed border-pink-300 p-6 rounded-2xl mb-4">
                <p className="text-gray-700 font-bold text-xl uppercase tracking-widest">A Full Weekend of 'Your Favorite Things' (Dinner, Movies, & More!)</p>
                <p className="text-xs text-pink-400 mt-2">Redeemable: Anytime we're together | Value: Infinite Love</p>
             </div>
             <p className="text-gray-500 text-sm italic">"Distance is temporary, but my love for you is forever."</p>
             <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="mt-6 text-pink-400 hover:text-pink-600 text-sm font-bold underline"
             >
               Close Box
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurpriseBox;
