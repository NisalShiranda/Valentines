
import React, { useState, useEffect } from 'react';

const LoveDashboard: React.FC = () => {
  // Updated to the exact day you first met: August 26, 2022
  const startDate = new Date('2022-08-26T00:00:00'); 
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/60 shadow-2xl">
      <h3 className="text-center font-romantic text-3xl md:text-4xl text-pink-600 mb-8 font-bold">
        How long I've been in love with you...
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="bg-white/80 p-6 rounded-3xl shadow-inner text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-pink-500 tabular-nums">
              {item.value}
            </div>
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-2">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-pink-400 font-medium italic animate-pulse">
        ...and I'll love you for billions more.
      </p>
    </div>
  );
};

export default LoveDashboard;
