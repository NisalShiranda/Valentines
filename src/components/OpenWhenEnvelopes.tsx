
import React, { useState } from 'react';
import { Mail, Heart, Laugh, Smile, Coffee, Moon, Stars } from 'lucide-react';

const letters = [
  {
    id: 1,
    title: 'When you miss me',
    icon: Moon,
    content: "Just close your eyes and know I'm thinking of you too. We might sleep in different houses, but we're dreaming of the same future. You're the last thing on my mind every night.",
    color: 'bg-blue-50 border-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: 'When you are tired',
    icon: Coffee,
    content: "I wish I was there to make you a coffee and give you a backrub. You work so hard and I'm so proud of you. Rest up, my beautiful girl. You deserve the world.",
    color: 'bg-amber-50 border-amber-100 text-amber-600'
  },
  {
    id: 3,
    title: 'When you need a laugh',
    icon: Laugh,
    content: "Remember our funniest inside jokes? Or the way I always do that one silly thing that makes you roll your eyes? I'd do anything just to see that gorgeous smile of yours right now.",
    color: 'bg-green-50 border-green-100 text-green-600'
  },
  {
    id: 4,
    title: 'When you feel stressed',
    icon: Stars,
    content: "You've got this. I believe in you more than anything. If it gets too much, just call me. I'm always your safe place, no matter where we are.",
    color: 'bg-purple-50 border-purple-100 text-purple-600'
  },
  {
    id: 5,
    title: 'When you are excited',
    icon: Smile,
    content: "I want to hear every single detail! Your happiness is my favorite thing in the world. Tell me why you're smiling so I can smile with you!",
    color: 'bg-orange-50 border-orange-100 text-orange-600'
  },
  {
    id: 6,
    title: 'When you want to feel loved',
    icon: Heart,
    content: "You are the most incredible person I've ever met. You're kind, smart, and so stunningly beautiful. Being your boyfriend is the best part of my life. I love you so much.",
    color: 'bg-rose-50 border-rose-100 text-rose-600'
  }
];

const OpenWhenEnvelopes: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof letters[0] | null>(null);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center">
        <h2 className="text-5xl font-pacifico text-pink-600 mb-4">Open When...</h2>
        <p className="text-gray-500 font-medium">Digital letters for whenever you need me most.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters.map((letter) => (
          <div 
            key={letter.id}
            onClick={() => setSelectedLetter(letter)}
            className="group cursor-pointer bg-white p-8 rounded-[2rem] shadow-md border-2 border-dashed border-pink-100 hover:border-pink-400 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center gap-4 relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl ${letter.color} group-hover:scale-110 transition-transform duration-300`}>
              <letter.icon size={32} />
            </div>
            <span className="font-romantic text-2xl font-bold text-gray-700">{letter.title}</span>
            <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-100 transition-opacity">
               <Mail size={20} className="text-pink-300" />
            </div>
          </div>
        ))}
      </div>

      {selectedLetter && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-900/20 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedLetter(null)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 relative border-8 border-pink-50 animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedLetter(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors"
            >
              <Heart size={24} fill="currentColor" />
            </button>
            
            <div className="flex flex-col items-center gap-6">
              <div className={`p-5 rounded-full ${selectedLetter.color}`}>
                <selectedLetter.icon size={48} />
              </div>
              <h3 className="text-3xl font-romantic font-bold text-pink-600">{selectedLetter.title}</h3>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
              <p className="text-xl text-gray-600 italic leading-relaxed text-center font-romantic">
                "{selectedLetter.content}"
              </p>
              <div className="mt-4 flex flex-col items-center">
                 <p className="font-pacifico text-pink-400 text-sm">Always yours,</p>
                 <p className="font-romantic font-bold text-xl text-gray-700">Your Boyfriend</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenWhenEnvelopes;
