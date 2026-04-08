
import React, { useState, useEffect } from 'react';

const IMAGES = [
  "https://www.dropbox.com/scl/fi/amoyte9xz4e4rr3pnzq68/02.jpg?rlkey=hjcgvy968j5yy8wiu8rpvrdlv&raw=1",
  "https://www.dropbox.com/scl/fi/0zl5dhu7uih4i9jiayybj/07.jpg?rlkey=v53kdjuwnlomtz7c81x5hxh7s&raw=1",
  "https://www.dropbox.com/scl/fi/37zzrbjivmk0k3nnuouqq/05.jpg?rlkey=h06olrjbq0gt2c47w7k2hzvfr&raw=1"
];

const ElementaryBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 2500); // Speed up slightly
    return () => clearInterval(timer);
  }, []);

  return (
    // Hidden on mobile (md:block) to match HomeBanner style as requested "版面同首頁"
    <section className="w-full bg-slate-50 hidden md:block">
      <div className="relative w-full overflow-hidden group aspect-[3/1]">
        {IMAGES.map((img, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ease-in-out absolute inset-0 w-full h-full ${
              index === currentIndex 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
          >
            {/* object-cover ensures container fills the aspect ratio */}
            <img 
              src={img} 
              alt={`Elementary Banner ${index + 1}`} 
              className="w-full h-full object-cover block" 
            />
          </div>
        ))}
        
        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm ${
                idx === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 w-2.5 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElementaryBanner;
