
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface EnvironmentIntroProps {
  images?: string[];
  theme?: 'purple' | 'green' | 'blue';
  title?: string;
  subtitle?: string;
}

const DEFAULT_IMAGES = [
  "https://www.dropbox.com/scl/fi/cxg1fa5tl8c1d671pi4tm/DSC_2478-705x467-1.jpg?rlkey=tk6lwi12a4h1ah74awa01r3ct&raw=1",
  "https://www.dropbox.com/scl/fi/6v7y9fwhhf211njpnjy0l/DSC_2483-467x705-1.jpg?rlkey=eneuc7s0b8qedgagxvggwqaqg&raw=1",
  "https://www.dropbox.com/scl/fi/oov5c5y8usv6i1d8o1lqc/DSC_2522-705x467-1.jpg?rlkey=bamoh6ffikqvxmzigzi7baspt&raw=1",
  "https://www.dropbox.com/scl/fi/qze2txoi8yvu76g07ip69/DSC_2527-467x705-1.jpg?rlkey=yvgpx90vse9rcu1fo96e8ejco&raw=1",
  "https://www.dropbox.com/scl/fi/3ppvoy8ku1y14raywhfw3/DSC_2553-705x467-1.jpg?rlkey=rs0qy2u4rn9kbz3qz9g1tknrb&raw=1",
  "https://www.dropbox.com/scl/fi/gjet7968wbtafz6bfhfkx/DSC_2564-705x467-1.jpg?rlkey=fieo0pnnbrik19njbzmo8z9sh&raw=1",
  "https://www.dropbox.com/scl/fi/dkasxbd6c824ukskwq8mn/DSC_2581-705x467-1.jpg?rlkey=c296nlhpdpbvx900kdqdf15if&raw=1",
  "https://www.dropbox.com/scl/fi/y3vy83bw24j9ysyt4o0s5/DSC_2587-705x467-1.jpg?rlkey=yvyf5vaihs75t75kxuhxa5yzq&raw=1",
  "https://www.dropbox.com/scl/fi/n2j88v5k7hn7shmm19pkz/DSC_2594-467x705-1.jpg?rlkey=d3mf48ykww4yymao31miyemaz&raw=1",
  "https://www.dropbox.com/scl/fi/gulfuhch376jb05eb4clg/DSC_2600-467x705-1.jpg?rlkey=vle7pxr8c49dzrn1ro6cuns1a&raw=1"
];

const EnvironmentIntro: React.FC<EnvironmentIntroProps> = ({ 
  images = DEFAULT_IMAGES, 
  theme = 'purple',
  title = "環境介紹",
  subtitle = "舒適、明亮、專業的教學空間，讓孩子在最優質的環境中專注學習，發揮最大潛能。"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const themeColors = {
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      indicator: 'bg-purple-600',
      ring: 'border-purple-300/50',
      hover: 'hover:text-purple-600'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      indicator: 'bg-green-600',
      ring: 'border-green-300/50',
      hover: 'hover:text-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      indicator: 'bg-blue-600',
      ring: 'border-blue-300/50',
      hover: 'hover:text-blue-600'
    }
  };

  const activeTheme = themeColors[theme];

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, images.length]);

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length;
      visible.push({
        src: images[index],
        originalIndex: index
      });
    }
    return visible;
  };

  return (
    <section id="environment" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${activeTheme.bg} rounded-full ${activeTheme.text} font-bold mb-4 border ${activeTheme.border} shadow-sm`}>
            <Camera size={18} />
            <span>五星級學習環境</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{title}</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center gap-6 md:gap-12">
            {getVisibleImages().map((item, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  if (idx === 0) prevSlide();
                  if (idx === 2) nextSlide();
                }}
                className={`relative group transition-all duration-700 ease-in-out transform cursor-pointer ${
                  idx === 1 ? 'scale-110 z-10' : 'scale-90 opacity-60'
                }`}
              >
                <div className={`w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-white shadow-2xl shadow-slate-200 ${idx === 1 ? 'border-[6.76px]' : 'border-4'}`}>
                  <img 
                    src={item.src} 
                    alt={`環境照片 ${item.originalIndex + 1}`} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative Ring */}
                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${activeTheme.ring} animate-spin-slow pointer-events-none ${idx === 1 ? 'block' : 'hidden'}`} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 transition-all z-20`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 transition-all z-20`}
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-16">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? `w-8 ${activeTheme.indicator}` : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 48s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EnvironmentIntro;
