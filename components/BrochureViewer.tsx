
import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface BrochureViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const BrochureViewer: React.FC<BrochureViewerProps> = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setScale(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      
      {/* Controls Container - Top Right */}
      <div className="absolute top-4 right-4 flex gap-2 z-[10001]">
        <button onClick={handleZoomOut} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md">
           <ZoomOut size={24} />
        </button>
        <button onClick={handleZoomIn} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md">
           <ZoomIn size={24} />
        </button>
        <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md ml-2">
           <X size={24} />
        </button>
      </div>

      {/* Navigation - Left */}
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[10001] p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Navigation - Right */}
      <button 
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[10001] p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
      >
        <ChevronRight size={32} />
      </button>

      {/* Image Container */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden p-4" onClick={(e) => e.stopPropagation()}>
         <div 
           className="transition-transform duration-200 ease-out flex items-center justify-center"
           style={{ transform: `scale(${scale})` }}
         >
           <img 
             src={images[currentIndex]} 
             alt={`Brochure ${currentIndex + 1}`} 
             className="max-w-[95vw] max-h-[95vh] object-contain shadow-2xl"
           />
         </div>
      </div>
      
      {/* Page Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10001] bg-black/50 px-4 py-1 rounded-full text-white text-sm backdrop-blur-md">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default BrochureViewer;
