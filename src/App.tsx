
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
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-pink-100 flex gap-4 md:gap-8 z-[500] items-center transition-all">
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
              className={`flex flex-col items-center gap-1 group ${activeTab === tab.id ? 'text-pink-600 scale-110' : 'text-gray-400 hover:text-pink-400'} transition-all`}
            >
              <tab.icon size={22} fill={activeTab === tab.id ? 'currentColor' : 'none'} className="group-hover:animate-bounce" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}

      <main className="container mx-auto px-4 pt-12 pb-32 max-w-4xl relative z-10">
        {!accepted ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <ValentineRequest onAccept={handleAccept} />
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {activeTab === 'home' && (
              <div className="space-y-12">
                <header className="text-center space-y-6">
                  <div className="inline-block p-6 bg-white/80 backdrop-blur-sm rounded-full shadow-inner animate-pulse">
                    <Heart className="text-pink-500 w-16 h-16 fill-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-5xl md:text-8xl font-pacifico gradient-text leading-tight">My Beautiful Girl</h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-romantic font-bold">You are the best thing that ever happened to me...</p>
                  </div>
                </header>

                <LoveDashboard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group bg-white/40 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white/60 hover:shadow-2xl hover:bg-white/60 transition-all duration-500">
                    <div className="bg-pink-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                       <MapPin className="text-pink-600" />
                    </div>
                    <h3 className="text-3xl font-romantic font-bold text-pink-600 mb-4 tracking-wide">
                      Distance Only Makes Us Stronger
                    </h3>
                    <p className="text-gray-600 leading-relaxed italic text-lg">
                      "I hate being away from you, but I love how it proves that our love is unshakeable. Every mile is a reminder of how much I can't wait to be by your side again."
                    </p>
                  </div>
                  
                  <div className="group bg-white/40 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white/60 hover:shadow-2xl hover:bg-white/60 transition-all duration-500">
                    <div className="bg-rose-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform">
                       <Sparkles className="text-rose-600" />
                    </div>
                    <h3 className="text-3xl font-romantic font-bold text-rose-600 mb-4 tracking-wide">
                      Our Future Together
                    </h3>
                    <p className="text-gray-600 leading-relaxed italic text-lg">
                      "I dream about the day we don't have to say goodbye over FaceTime anymore. You're not just my girlfriend, you're my best friend and my future. I love you endlessly."
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

      <footer className="fixed bottom-0 w-full text-center py-4 bg-transparent text-pink-300 text-[10px] tracking-widest uppercase pointer-events-none opacity-50">
        Created for the girl who has my heart • Forever & Always
      </footer>
    </div>
  );
};

export default App;
