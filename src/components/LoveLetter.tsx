
import React, { useState } from 'react';
import { Send, Heart, Mail, MessageCircle, PenTool, Sparkles } from 'lucide-react';

const LoveLetter: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSealed, setIsSealed] = useState(false);

  // UPDATED: Your specific contact details
  const YOUR_PHONE_NUMBER = "94711543730"; 
  const YOUR_EMAIL = "nisalshiranda001@gmail.com";

  const handleSendWhatsApp = () => {
    if (!message.trim()) return;
    const encodedMsg = encodeURIComponent(`Hi Love! I just wrote this for you on our website:\n\n"${message}"`);
    window.open(`https://wa.me/${YOUR_PHONE_NUMBER}?text=${encodedMsg}`, '_blank');
  };

  const handleSendEmail = () => {
    if (!message.trim()) return;
    const subject = encodeURIComponent("A Love Note from your Girlfriend");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-pacifico text-pink-600 mb-2">Write to Me</h2>
        <p className="text-gray-500 italic">I love hearing from you. Tell me anything...</p>
      </div>

      <div className={`relative transition-all duration-1000 transform ${isSealed ? 'rotate-y-180 scale-95 opacity-50 pointer-events-none' : ''}`}>
        {/* Stationery Paper */}
        <div className="bg-[#fffdfa] shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg p-8 md:p-12 border-t-[30px] border-pink-100 relative min-h-[400px]">
          {/* Paper Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 2.5rem', marginTop: '4rem' }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6 text-pink-300">
               <PenTool size={20} />
               <span className="font-romantic text-xl font-bold">Dearest,</span>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-transparent border-none outline-none font-romantic text-2xl md:text-3xl text-gray-700 leading-[2.5rem] resize-none min-h-[250px] placeholder:text-gray-200"
            />

            <div className="mt-8 flex justify-end">
               <div className="text-right">
                  <p className="font-pacifico text-pink-400 text-sm">With all my love,</p>
                  <p className="font-romantic font-bold text-2xl text-gray-800">Your Girlfriend</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {message.length > 5 && !isSealed && (
        <div className="flex flex-col items-center gap-6 animate-pop-in">
           <p className="text-pink-400 font-bold flex items-center gap-2">
             <Sparkles size={16} /> Ready to send it?
           </p>
           
           <div className="flex flex-wrap justify-center gap-4 w-full">
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 min-w-[200px] bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle size={24} />
                Send via WhatsApp
              </button>

              <button
                onClick={handleSendEmail}
                className="flex-1 min-w-[200px] bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
              >
                <Mail size={24} />
                Send via Email
              </button>
           </div>
           
           <button 
             onClick={() => {
                setIsSealed(true);
                setTimeout(() => setIsSealed(false), 3000);
             }}
             className="text-gray-400 text-sm underline hover:text-pink-400 transition-colors"
           >
             Seal with a digital kiss first? 💋
           </button>
        </div>
      )}

      {isSealed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
           <div className="bg-white/90 backdrop-blur-md p-12 rounded-full shadow-2xl animate-ping-once border-4 border-pink-200">
              <Heart size={100} className="text-pink-500 fill-pink-500" />
           </div>
        </div>
      )}
    </div>
  );
};

export default LoveLetter;
