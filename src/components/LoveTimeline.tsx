
import React from 'react';
import { Heart, Stars, MapPin, Camera, Gem, Utensils, Music, Sparkles } from 'lucide-react';

const milestones = [
  {
    date: 'Aug 26, 2022',
    title: 'The Day We Met',
    desc: 'The magical day everything changed. I never knew a single meeting could lead to this much happiness. You had me from the very start.',
    icon: Music,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    date: 'Feb 14, 2023',
    title: 'Our First Valentine',
    desc: 'The first time we celebrated our love officially. I was so nervous but so incredibly happy to be yours.',
    icon: Utensils,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    date: 'Adventure Time',
    title: 'Making Memories',
    desc: 'All those trips, dates, and late-night talks that made me fall deeper for you every single day.',
    icon: Camera,
    color: 'bg-green-100 text-green-600'
  },
  {
    date: 'Special Moment',
    title: 'Choosing Each Other',
    desc: 'Through every high and low, we chose to stick together. You are my safe place and my favorite adventure.',
    icon: Heart,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    date: 'The Future',
    title: 'Our Next Chapter',
    desc: "I can't wait for the day we finally share the same home. Our journey is just getting started, my beautiful girl.",
    icon: Sparkles,
    color: 'bg-rose-100 text-rose-600'
  }
];

const LoveTimeline: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-pacifico text-pink-600 mb-4">Our Love Story</h2>
        <p className="text-gray-500 font-medium">Every moment since 2022 is a treasure I keep in my heart.</p>
      </div>

      <div className="relative border-l-4 border-pink-100 ml-6 md:ml-12 space-y-12 pb-10">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative pl-12 group">
            <div className={`absolute -left-8 top-0 w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10 border-4 border-white`}>
              <m.icon size={20} />
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-white hover:shadow-xl transition-all duration-300">
              <span className="text-xs font-bold text-pink-400 tracking-widest uppercase">{m.date}</span>
              <h4 className="text-2xl font-romantic font-bold text-gray-800 mt-1 mb-2 tracking-wide">{m.title}</h4>
              <p className="text-gray-600 leading-relaxed italic">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveTimeline;
