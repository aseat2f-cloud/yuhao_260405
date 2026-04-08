
import React, { useState, useEffect } from 'react';

const IMAGES = [
  "https://www.dropbox.com/scl/fi/hhmo2yvtjb5k0datmk87z/08.jpg?rlkey=n3uwi2erfyov3584tku3aa9rt&raw=1",
  "https://www.dropbox.com/scl/fi/avorrwyansfc0cx8z4if4/03.jpg?rlkey=y9zfv96ulbyg2zf6vcff57esw&raw=1",
  "https://www.dropbox.com/scl/fi/m105s5r7mae72g37s04t3/06.jpg?rlkey=ixphixrunndduwk248052w2f1&raw=1"
];

const JuniorBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 2500); // Speed up slightly
    return () => clearInterval(timer);
  }, []);

  return (
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
            <img 
              src={img} 
              alt={`Junior Banner ${index + 1}`} 
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

export default JuniorBanner;
