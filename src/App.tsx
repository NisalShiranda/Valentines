
import React, { useState } from 'react';
import { Heart, Camera, Sparkles, Send, MapPin, BookHeart, MailOpen } from 'lucide-react';
import HeartBackground from './components/HeartBackground.tsx';
import ValentineRequest from './components/ValentineRequest.tsx';
import PhotoGallery from './components/PhotoGallery.tsx';
import LoveNotes from './components/LoveNotes.tsx';
import SurpriseBox from './components/SurpriseBox.tsx';
import LoveLetter from './components/LoveLetter.tsx';
import LoveTimeline from './components/LoveTimeline.tsx';
import OpenWhenEnvelopes from './components/OpenWhenEnvelopes.tsx';
import LoveDashboard from './components/LoveDashboard.tsx';
import BackgroundMusic from './components/BackgroundMusic.tsx';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'notes' | 'letter' | 'timeline' | 'openwhen'>('home');

  const handleAccept = () => {
    setAccepted(true);
  };

  return (
    <div className="min-h-screen relative text-gray-800 selection:bg-pink-200">
      <HeartBackground />
      <BackgroundMusic />
      
      {accepted && (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-2xl px-4 py-2 md:px-6 md:py-3 rounded-full shadow-[0_15px_40px_rgba(244,114,182,0.3)] border border-pink-100 flex gap-4 md:gap-10 z-[500] items-center transition-all animate-pop-in max-w-[95vw] sm:max-w-none">
          {[
            { id: 'home', icon: Heart, label: 'Home' },
            { id: 'timeline', icon: BookHeart, label: 'Story' },
            { id: 'gallery', icon: Camera, label: 'Photos' },
            { id: 'openwhen', icon: MailOpen, label: 'Letters' },
            { id: 'notes', icon: Send, label: 'Notes' },
            { id: 'letter', icon: MailOpen, label: 'Write' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 group transition-all duration-300 ${activeTab === tab.id ? 'text-pink-600 scale-110 translate-y-[-2px]' : 'text-gray-400 hover:text-pink-400'}`}
            >
              <tab.icon size={22} fill={activeTab === tab.id ? 'currentColor' : 'none'} className="group-hover:animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-tighter hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}

      <main className="container mx-auto px-4 pt-8 md:pt-12 pb-32 md:pb-40 max-w-4xl relative z-10">
        {!accepted ? (
          <div className="flex flex-col items-center justify-center min-h-[90vh]">
            <ValentineRequest onAccept={handleAccept} />
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16 animate-fade-in">
            {activeTab === 'home' && (
              <div className="space-y-12 md:space-y-16">
                <header className="text-center space-y-6 md:space-y-8">
                  <div className="relative inline-block p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-full shadow-xl border border-white/80 animate-bounce-slow">
                    <Heart className="text-pink-500 w-12 h-12 md:w-20 md:h-20 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-9xl font-pacifico bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent py-2">My Angel</h1>
                    <p className="text-xl md:text-3xl text-gray-500 font-romantic font-bold italic px-4">Distance is just a test of how far love can travel...</p>
                  </div>
                </header>

                <LoveDashboard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="group bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-white/80 hover:shadow-2xl transition-all duration-500">
                    <div className="bg-pink-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                       <MapPin className="text-pink-600" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-romantic font-bold text-pink-600 mb-4 md:mb-6">Our Invisible Thread</h3>
                    <p className="text-gray-600 leading-relaxed italic text-lg md:text-xl">
                      "Distance means so little when someone means so much. Every night I count the stars and know you're looking at the same ones."
                    </p>
                  </div>
                  
                  <div className="group bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-white/80 hover:shadow-2xl transition-all duration-500">
                    <div className="bg-rose-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                       <Sparkles className="text-rose-600" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-romantic font-bold text-rose-600 mb-4 md:mb-6">Our Forever</h3>
                    <p className="text-gray-600 leading-relaxed italic text-lg md:text-xl">
                      "I can't wait to wake up to your beautiful face every single morning. The future looks so bright because you're in it."
                    </p>
                  </div>
                </div>

                <SurpriseBox />
              </div>
            )}

            {activeTab === 'timeline' && <LoveTimeline />}
            {activeTab === 'gallery' && <PhotoGallery />}
            {activeTab === 'openwhen' && <OpenWhenEnvelopes />}
            {activeTab === 'notes' && <LoveNotes />}
            {activeTab === 'letter' && <LoveLetter />}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full text-center py-4 bg-gradient-to-t from-pink-50/50 to-transparent text-pink-300 text-[10px] tracking-[0.3em] uppercase pointer-events-none opacity-60 z-0">
        Forever & Always • My Queen
      </footer>
    </div>
  );
};

export default App;
