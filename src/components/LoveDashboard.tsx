
import React, { useState, useEffect } from 'react';

const LoveDashboard: React.FC = () => {
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
    <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-white/60 shadow-2xl mx-2">
      <h3 className="text-center font-romantic text-2xl md:text-4xl text-pink-600 mb-6 md:mb-8 font-bold">
        We've been in love for...
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="bg-white/80 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-inner text-center">
            <div className="text-3xl md:text-5xl font-bold text-pink-500 tabular-nums leading-tight">
              {item.value}
            </div>
            <div className="text-[9px] md:text-xs uppercase tracking-widest font-bold text-gray-400 mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 md:mt-8 text-pink-400 font-medium italic animate-pulse text-sm">
        ...and I'll love you forever.
      </p>
    </div>
  );
};

export default LoveDashboard;
