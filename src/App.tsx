
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
import LoveDashboard from './components/Lovedashboard.tsx';
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
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-2xl px-6 py-3 rounded-full shadow-[0_15px_40px_rgba(244,114,182,0.3)] border border-pink-100 flex gap-5 md:gap-10 z-[500] items-center transition-all animate-pop-in">
          {[
            { id: 'home', icon: Heart, label: 'Home' },
            { id: 'timeline', icon: BookHeart, label: 'Story' },
            { id: 'gallery', icon: Camera, label: 'Memories' },
            { id: 'openwhen', icon: MailOpen, label: 'Letters' },
            { id: 'notes', icon: Send, label: 'Notes' },
            { id: 'letter', icon: MailOpen, label: 'Write' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 group transition-all duration-300 ${activeTab === tab.id ? 'text-pink-600 scale-110 translate-y-[-4px]' : 'text-gray-400 hover:text-pink-400'}`}
            >
              <tab.icon size={24} fill={activeTab === tab.id ? 'currentColor' : 'none'} className="group-hover:animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-tighter hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}

      <main className="container mx-auto px-4 pt-12 pb-40 max-w-4xl relative z-10">
        {!accepted ? (
          <div className="flex flex-col items-center justify-center min-h-[85vh]">
            <ValentineRequest onAccept={handleAccept} />
          </div>
        ) : (
          <div className="space-y-16 animate-fade-in">
            {activeTab === 'home' && (
              <div className="space-y-16">
                <header className="text-center space-y-8">
                  <div className="relative inline-block p-8 bg-white/60 backdrop-blur-md rounded-full shadow-xl border border-white/80 animate-bounce-slow">
                    <Heart className="text-pink-500 w-20 h-20 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-9xl font-pacifico bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent py-2">My Angel</h1>
                    <p className="text-2xl md:text-3xl text-gray-500 font-romantic font-bold italic">Distance is just a test of how far love can travel...</p>
                  </div>
                </header>

                <LoveDashboard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group bg-white/50 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-xl border border-white/80 hover:shadow-2xl hover:bg-white/70 transition-all duration-500 transform hover:-translate-y-2">
                    <div className="bg-pink-100 w-14 h-14 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-sm">
                       <MapPin className="text-pink-600" />
                    </div>
                    <h3 className="text-4xl font-romantic font-bold text-pink-600 mb-6">Our Invisible Thread</h3>
                    <p className="text-gray-600 leading-relaxed italic text-xl">
                      "Distance means so little when someone means so much. Every night I count the stars and know you're looking at the same ones."
                    </p>
                  </div>
                  
                  <div className="group bg-white/50 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-xl border border-white/80 hover:shadow-2xl hover:bg-white/70 transition-all duration-500 transform hover:-translate-y-2">
                    <div className="bg-rose-100 w-14 h-14 rounded-3xl flex items-center justify-center mb-8 group-hover:-rotate-12 transition-transform shadow-sm">
                       <Sparkles className="text-rose-600" />
                    </div>
                    <h3 className="text-4xl font-romantic font-bold text-rose-600 mb-6">Our Forever</h3>
                    <p className="text-gray-600 leading-relaxed italic text-xl">
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

      <footer className="fixed bottom-0 w-full text-center py-4 bg-gradient-to-t from-pink-50/50 to-transparent text-pink-300 text-[10px] tracking-[0.3em] uppercase pointer-events-none opacity-60">
        Forever & Always • My Queen
      </footer>
    </div>
  );
};

export default App;
