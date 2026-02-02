
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Feather, Heart } from 'lucide-react';

const PoemGenerator: React.FC = () => {
  const [mood, setMood] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePoem = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, cute, and romantic 4-line poem for my beautiful girlfriend. We are currently living in different houses but are deeply in love. The mood should be ${mood}. Mention our future adventures. Keep it sweet, modern, and heartfelt.`,
        config: {
            temperature: 0.9,
            // Adhering to SDK guidelines: avoiding maxOutputTokens without a specified thinkingBudget for Gemini 3 models.
        }
      });
      setPoem(response.text || "Though distance keeps us in different space,\nI long to see your lovely face.\nYou're the girl who owns my heart,\nMay our forever never part.");
    } catch (error) {
      console.error(error);
      setPoem("Miles apart but close in heart,\nOur love story is a work of art.\nThough the words are slow to flow,\nMy love for you continues to grow!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-pacifico text-pink-600 mb-2">Love Verse Machine</h2>
        <p className="text-gray-500 italic">Creating magical words for my favorite girl...</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border border-pink-50 max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-gray-600 font-bold ml-2">Choose the Vibe:</label>
            <div className="flex flex-wrap gap-2">
              {['Missing You', 'Feeling Lucky', 'Deeply Devoted', 'Cozily Sweet', 'Future Adventure Vibes'].map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${mood === m ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-pink-50 text-pink-400 hover:bg-pink-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generatePoem}
            disabled={loading || !mood}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Feather size={20} />}
            {loading ? 'Thinking of you...' : 'Generate Love Poem'}
          </button>

          {poem && (
            <div className="mt-6 p-6 bg-pink-50 rounded-3xl border border-pink-100 relative shadow-inner">
               <Heart className="absolute -top-3 -right-3 text-pink-400 w-8 h-8 fill-pink-200" />
               <p className="font-romantic text-2xl text-pink-700 leading-relaxed text-center whitespace-pre-line italic">
                {poem}
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoemGenerator;
