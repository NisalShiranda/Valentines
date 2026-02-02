
import React, { useState } from 'react';
import { Heart, Stars, Cloud, Sparkles } from 'lucide-react';

const LoveNotes: React.FC = () => {
  const reasons = [
    "The way your eyes light up when you're happy.",
    "Your kindness to everyone you meet.",
    "How you support my dreams, no matter how big they are.",
    "The way you handle the distance with so much strength.",
    "Your beautiful laugh that makes my whole day better.",
    "The way you say my name when you're happy to see me.",
    "How you're my best friend and my soulmate all in one.",
    "The way you make every place feel like home when you're there.",
    "Your incredible intelligence and the way you think.",
    "Simply because you are uniquely, perfectly YOU."
  ];

  const [currentReason, setCurrentReason] = useState(reasons[0]);

  const generateNewReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentReason(reasons[randomIndex]);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-pacifico text-pink-600 mb-2">Notes to My Girl</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-sm p-10 rounded-[3rem] shadow-xl border border-pink-100 text-center space-y-6 relative overflow-hidden">
        <Sparkles className="absolute -top-4 -left-4 text-pink-100 w-24 h-24 rotate-12" />
        <Heart className="absolute -bottom-4 -right-4 text-pink-100 w-24 h-24 fill-pink-50 -rotate-12" />
        
        <h3 className="text-2xl font-romantic font-bold text-gray-700">Why I'm so lucky to have you:</h3>
        
        <div className="min-h-[120px] flex items-center justify-center">
          <p className="text-3xl font-romantic text-pink-600 animate-pulse-slow px-4">
            "{currentReason}"
          </p>
        </div>

        <button
          onClick={generateNewReason}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
        >
          <Stars size={18} /> Another Reason?
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-yellow-50 p-6 rounded-3xl shadow rotate-1 hover:rotate-0 transition-transform">
          <p className="font-romantic text-2xl text-yellow-800 mb-2">Our Next Adventure:</p>
          <p className="text-yellow-700 italic">"I don't care where we go, as long as I'm going there with you by my side."</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-3xl shadow -rotate-1 hover:rotate-0 transition-transform">
          <p className="font-romantic text-2xl text-blue-800 mb-2">My Promise to You:</p>
          <p className="text-blue-700 italic">"I promise to always be your biggest fan, your safe place, and the one who loves you most."</p>
        </div>
      </div>
    </div>
  );
};

export default LoveNotes;
