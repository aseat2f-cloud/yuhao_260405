
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion } from 'motion/react';

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    return [prev, currentIndex, next];
  };

  return (
    <section className="py-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 ${activeTheme.bg} rounded-full ${activeTheme.text} font-bold mb-2 border ${activeTheme.border} shadow-sm text-sm`}
          >
            <Camera size={16} />
            <span>五星級學習環境</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-medium"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative h-[220px] sm:h-[320px] md:h-[420px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-12 w-full">
            {getVisibleIndices().map((imgIndex, displayIdx) => {
              const isCenter = displayIdx === 1;
              return (
                <motion.div
                  key={imgIndex}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.8, 
                    scale: isCenter ? 1.4 : 0.75,
                    zIndex: isCenter ? 20 : 10
                  }}
                  transition={{
                    layout: { duration: 0.35, ease: "easeOut" },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.35 }
                  }}
                  onClick={() => {
                    if (displayIdx === 0) prevSlide();
                    if (displayIdx === 2) nextSlide();
                  }}
                  className={`relative cursor-pointer`}
                >
                  <div className={`
                    relative overflow-hidden rounded-full border-white shadow-2xl bg-slate-200
                    w-20 h-20 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64
                    ${isCenter ? 'border-2 md:border-[3px]' : 'border-2'}
                  `}>
                    <img 
                      src={images[imgIndex]} 
                      alt={`環境照片 ${imgIndex + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  </div>
                  
                  {isCenter && (
                    <motion.div 
                      layoutId="active-ring"
                      className={`absolute -inset-0.5 md:-inset-1 rounded-full border-2 border-dashed ${activeTheme.ring} animate-spin-slow pointer-events-none`}
                      style={{ animationDuration: '30s' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className={`absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 active:scale-95 transition-all z-30`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className={`absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 active:scale-95 transition-all z-30`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === idx ? `w-8 ${activeTheme.indicator}` : 'w-2 bg-slate-300 hover:bg-slate-400'
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
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EnvironmentIntro;

