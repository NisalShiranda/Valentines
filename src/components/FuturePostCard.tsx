
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Plane, Map, Coffee, Home, Palmtree, Utensils, Heart } from 'lucide-react';

const FuturePostcard: React.FC = () => {
  const [setting, setSetting] = useState('');
  const [activity, setActivity] = useState('');
  const [postcard, setPostcard] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVision = async () => {
    if (!setting || !activity) return;
    setLoading(true);
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, vivid, and deeply romantic "Postcard from the Future" for my girlfriend. 
        Context: We currently live apart but dream of our life together. 
        Setting: ${setting}. 
        Activity: ${activity}. 
        Write it in the first person, as if it's a real moment happening in our future. 
        Mention how good it feels to finally be together without saying goodbye. 
        Keep it under 80 words and very heartfelt.`,
      });
      setPostcard(response.text || "Wish you were here... oh wait, you are! Finally.");
    } catch (error) {
      console.error(error);
      setPostcard("The sun is setting over our new home, and for the first time, I don't have to say goodbye. You're in the next room, and my heart is finally full. Every mile we endured was worth this single moment of peace with you.");
    } finally {
      setLoading(false);
    }
  };

  const settings = [
    { id: 'Home', icon: Home, label: 'Our Future Home' },
    { id: 'Beach', icon: Palmtree, label: 'A Tropical Escape' },
    { id: 'City', icon: Map, label: 'Paris or Tokyo' },
    { id: 'Nature', icon: Plane, label: 'Mountain Cabin' },
  ];

  const activities = [
    { id: 'Cooking', icon: Utensils, label: 'Cooking Dinner' },
    { id: 'Morning', icon: Coffee, label: 'Morning Coffee' },
    { id: 'Walking', icon: Map, label: 'Walking Hand-in-Hand' },
    { id: 'Movie', icon: Sparkles, label: 'Late Night Movie' },
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-pacifico text-pink-600 mb-2">Our Future Vision</h2>
        <p className="text-gray-500 italic">Imagine a day where we never have to say goodbye...</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border border-pink-50 space-y-8">
        <div className="space-y-4">
          <label className="text-gray-600 font-bold block ml-2">Where are we?</label>
          <div className="grid grid-cols-2 gap-3">
            {settings.map(s => (
              <button
                key={s.id}
                onClick={() => setSetting(s.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${setting === s.id ? 'bg-pink-500 border-pink-500 text-white shadow-lg' : 'bg-white border-pink-50 text-gray-500 hover:border-pink-200'}`}
              >
                <s.icon size={18} />
                <span className="font-bold text-sm">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-gray-600 font-bold block ml-2">What are we doing?</label>
          <div className="grid grid-cols-2 gap-3">
            {activities.map(a => (
              <button
                key={a.id}
                onClick={() => setActivity(a.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${activity === a.id ? 'bg-rose-500 border-rose-500 text-white shadow-lg' : 'bg-white border-rose-50 text-gray-500 hover:border-rose-200'}`}
              >
                <a.icon size={18} />
                <span className="font-bold text-sm">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateVision}
          disabled={loading || !setting || !activity}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Visualizing our future...' : 'Create Our Future Postcard'}
        </button>
      </div>

      {postcard && (
        <div className="relative group animate-pop-in">
          {/* Postcard Container */}
          <div className="bg-[#fdfbf7] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border-8 border-white rounded-lg relative overflow-hidden min-h-[350px] flex flex-col md:flex-row gap-8">
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-gray-200" />
            
            {/* Left Side: The Message */}
            <div className="flex-1 space-y-4 order-2 md:order-1">
               <p className="font-romantic text-2xl md:text-3xl text-gray-700 leading-relaxed whitespace-pre-line">
                {postcard}
               </p>
               <div className="mt-6">
                 <p className="font-pacifico text-pink-400">Can't wait for this,</p>
                 <p className="font-romantic font-bold text-2xl text-gray-800">Your Favorite Person</p>
               </div>
            </div>

            {/* Right Side: The Address/Stamp */}
            <div className="w-full md:w-48 flex flex-col items-center md:items-end gap-10 order-1 md:order-2">
               <div className="w-24 h-28 border-2 border-gray-200 rounded p-1 rotate-3 flex items-center justify-center bg-white shadow-sm">
                  <div className="w-full h-full border border-pink-100 bg-pink-50 flex flex-col items-center justify-center p-2 text-center">
                    {/* Fixed missing import for Heart */}
                    <Heart className="text-pink-400 fill-pink-400 w-8 h-8 mb-1" />
                    <span className="text-[8px] font-bold text-pink-300 uppercase">Love Forever</span>
                  </div>
               </div>
               
               <div className="w-full space-y-4">
                  <div className="h-px bg-gray-300 w-full" />
                  <div className="h-px bg-gray-300 w-full" />
                  <div className="h-px bg-gray-300 w-3/4" />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right">To: My Beautiful Soulmate</p>
               </div>
            </div>

            {/* Postmark overlay */}
            <div className="absolute top-10 right-32 opacity-10 pointer-events-none select-none">
              <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center rotate-12">
                 <span className="text-black font-bold text-xs">FUTURE BOUND • 202X</span>
              </div>
            </div>
          </div>
          
          <p className="text-center mt-6 text-pink-400 font-medium italic animate-pulse">
            Scroll up to save this vision of us ❤️
          </p>
        </div>
      )}
    </div>
  );
};

export default FuturePostcard;
