
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Optimization: Preload only the NEXT image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentIndex, images]);

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
    <section className="py-24 bg-slate-50 overflow-hidden w-full">
      <div className="w-full px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
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

        <div className="relative h-[260px] sm:h-[380px] md:h-[520px] flex items-center justify-center w-full overflow-visible">
          <div className="relative w-full h-full flex items-center justify-center">
            {getVisibleIndices().map((imgIndex, displayIdx) => {
              const isCenter = displayIdx === 1;
              const isLeft = displayIdx === 0;
              const isRight = displayIdx === 2;
              
              const xOffset = isCenter ? '0' : isLeft ? (isMobile ? '-48vw' : '-350px') : (isMobile ? '48vw' : '350px');

              return (
                <motion.div
                  key={imgIndex}
                  initial={false}
                  animate={{ 
                    x: xOffset,
                    opacity: isCenter ? 1 : 0.4, 
                    scale: isCenter ? 1 : 0.6,
                    zIndex: isCenter ? 20 : 10
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                  className="absolute cursor-pointer shrink-0"
                >
                  <div className={`
                    relative overflow-hidden rounded-full border-white shadow-2xl bg-slate-200
                    w-[60vw] h-[60vw] md:w-[500px] md:h-[500px]
                    ${isCenter ? 'border-4 md:border-8' : 'border-2'}
                  `}>
                    <img 
                      src={images[imgIndex]} 
                      alt={`環境照片 ${imgIndex + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading={isCenter ? "eager" : "lazy"}
                    />
                  </div>
                  
                  {isCenter && (
                    <motion.div 
                      layoutId="active-ring"
                      className={`absolute -inset-[3px] md:-inset-[6px] rounded-full border-[2px] md:border-[4px] border-dashed ${activeTheme.ring} animate-spin-slow pointer-events-none`}
                      style={{ animationDuration: '30s' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
            <button 
              onClick={prevSlide}
              className={`w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 active:scale-95 transition-all pointer-events-auto z-30`}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className={`w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-400 ${activeTheme.hover} hover:scale-110 active:scale-95 transition-all pointer-events-auto z-30`}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-2 pb-2">
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

