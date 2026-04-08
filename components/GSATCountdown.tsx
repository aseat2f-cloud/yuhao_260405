
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const GSATCountdown: React.FC = () => {
  // Assuming next GSAT is Jan 20, 2027
  const targetDate = new Date('2027-01-20T09:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = targetDate - Date.now();
      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <section id="gsat-countdown" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-200 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white font-bold text-sm mb-6 backdrop-blur-md">
                <Calendar size={18} />
                <span>2027 學測倒數</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                決戰學測，<br className="hidden md:block" />
                成就頂尖大學夢想
              </h2>
              <p className="text-purple-100 text-lg font-medium max-w-md mx-auto lg:mx-0">
                每一分每一秒的努力，都是通往成功的階梯。育豪與你併肩作戰！
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: '天', value: days },
                { label: '時', value: hours },
                { label: '分', value: minutes },
                { label: '秒', value: seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center w-28 h-32 md:w-32 md:h-40 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl md:text-5xl font-black text-purple-600 mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSATCountdown;
