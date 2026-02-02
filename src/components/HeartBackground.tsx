
import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; size: string; delay: string; opacity: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate 40 unique hearts
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${15 + Math.random() * 25}px`,
      delay: `${Math.random() * 20}s`,
      opacity: 0.2 + Math.random() * 0.4
    }));
    setHearts(newHearts);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Glow following mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-pink-200/10 blur-[120px] transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        }}
      />
      
      {/* Floating Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-float select-none drop-shadow-sm"
          style={{
            left: h.left,
            animationDuration: h.duration,
            fontSize: h.size,
            animationDelay: h.delay,
            opacity: h.opacity,
            color: Math.random() > 0.5 ? '#ff4d6d' : '#ff8fa3',
          }}
        >
          ❤
        </span>
      ))}

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff8fa3_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.05]" />
    </div>
  );
};

export default HeartBackground;
