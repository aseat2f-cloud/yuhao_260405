
import React, { useState, useEffect } from 'react';

const IMAGES = [
  "https://www.dropbox.com/scl/fi/vlilnzvcx44i536sy0937/banner.jpg?rlkey=inn7ykkmzgl4yzcbpr7jp5jls&raw=1",
  "https://www.dropbox.com/scl/fi/71wimn7nglqc0agy4ypxb/.jpg?rlkey=gfha2onez9fq3ykr0112dtnu6&raw=1",
  "https://www.dropbox.com/scl/fi/8xnz5fa73z8w7c79eps32/.jpg?rlkey=stumkhko86ty8h7pipkf5irvn&raw=1",
  "https://www.dropbox.com/scl/fi/crge1dclby8w9s992362u/2025-12-06-234522.jpg?rlkey=17ycbx0hdas26wbaimpcrg7gc&raw=1",
  "https://www.dropbox.com/scl/fi/o7nn6lbgzvet8w6ma6tg8/.jpg?rlkey=kkqkk7o7i1mve2wtjxz4tippr&raw=1",
  "https://www.dropbox.com/scl/fi/rxcyjtrcd6wjh3c8thecr/22-1229-05.jpg?rlkey=ewdee5xuddyfvgvu2pwmnfnzl&raw=1"
];

const HomeBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 2500); // Speed up slightly (3000 -> 2500)
    return () => clearInterval(timer);
  }, []);

  return (
    // hidden md:block -> Hides on mobile
    <section className="w-full bg-slate-50 hidden md:block">
      <div className="relative w-full overflow-hidden group">
        {IMAGES.map((img, index) => (
          <div
            key={index}
            // Logic: The active image is 'relative' to dictate container height naturally.
            // Inactive images are 'absolute' to overlap without taking space.
            className={`transition-opacity duration-1000 ease-in-out w-full ${
              index === currentIndex 
                ? 'relative opacity-100 z-10' 
                : 'absolute top-0 left-0 opacity-0 z-0'
            }`}
          >
            {/* w-full h-auto -> Ensures full width and natural height (no crop) */}
            <img 
              src={img} 
              alt={`Banner ${index + 1}`} 
              className="w-full h-auto block" 
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

export default HomeBanner;
