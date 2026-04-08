
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { NewsItem, PageType } from '../types';
import Modal from './Modal';

interface NewsCarouselProps {
  news: NewsItem[];
  onNavigate?: (page: PageType) => void;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ news, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // For the main carousel
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(null); // For the modal navigation

  // Auto-play for the main carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isModalOpen) { // Pause auto-play when modal is open
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length, isModalOpen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleReadMore = () => {
    // FORCE OPEN MODAL for detail view regardless of externalLink
    setSelectedNewsIndex(currentIndex);
    setIsModalOpen(true);
  };

  // Modal Navigation Handlers
  const handleModalNext = () => {
    if (selectedNewsIndex !== null) {
      setSelectedNewsIndex((prev) => (prev! + 1) % news.length);
    }
  };

  const handleModalPrev = () => {
    if (selectedNewsIndex !== null) {
      setSelectedNewsIndex((prev) => (prev! - 1 + news.length) % news.length);
    }
  };

  const handleViewAllNews = () => {
    setIsModalOpen(false);
    if (onNavigate) {
      onNavigate('bulletin');
    }
  };

  const currentItem = news[currentIndex];
  const modalItem = selectedNewsIndex !== null ? news[selectedNewsIndex] : null;

  return (
    <>
      {/* Main Carousel Card - Increased max-width to 950px (110%) */}
      <div className="relative w-full max-w-[950px] mx-auto lg:ml-auto lg:mr-0 rounded-3xl overflow-hidden shadow-lg bg-white group">
        
        {/* Main Image */}
        <div className="aspect-[4/5] relative overflow-hidden bg-white">
          <img 
            src={currentItem.image} 
            alt={currentItem.title} 
            className="w-full h-auto absolute top-0 left-0 transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Controls - Bottom Right */}
          <div className="absolute bottom-6 right-6 z-20">
             <button
               onClick={handleReadMore}
               className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
             >
               了解更多 <ArrowRight size={14} />
             </button>
          </div>

          {/* Nav Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button onClick={prevSlide} className="p-2 bg-black/20 text-white rounded-full pointer-events-auto hover:bg-black/40 backdrop-blur-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="p-2 bg-black/20 text-white rounded-full pointer-events-auto hover:bg-black/40 backdrop-blur-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Details */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-[min(960px,112vh)]"
        hideHeader={true}
      >
        {modalItem && (
          // Layout updated to match BulletinPage:
          // Mobile: Stacked
          // Desktop: Side-by-side, aspect ratio 1.6
          <div 
            key={modalItem.id}
            className="flex flex-col md:flex-row w-full bg-white md:aspect-[1.6/1] overflow-hidden"
          >
            
            {/* Left Image - 50% width - Updated for "Never Crop" requirement */}
            <div className="w-full md:w-1/2 relative shrink-0 bg-white flex items-center justify-center h-[50vh] md:h-auto">
               <img 
                 src={modalItem.image} 
                 alt={modalItem.title} 
                 className="w-full h-full object-contain"
               />
            </div>
            
            {/* Right Content - 50% width */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-10 relative overflow-hidden h-fit md:h-auto bg-white">
              {/* Header Info */}
              <div className="shrink-0 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-bold rounded-full">重點消息</span>
                  <span className="text-slate-400 text-sm">{modalItem.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {modalItem.title}
                </h2>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line pb-4">
                  {modalItem.content}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="shrink-0 pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                 <div className="flex gap-2">
                   <button 
                     onClick={handleModalPrev}
                     className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                     aria-label="Previous"
                   >
                     <ChevronLeft size={20} />
                   </button>
                   <button 
                     onClick={handleModalNext}
                     className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                     aria-label="Next"
                   >
                     <ChevronRight size={20} />
                   </button>
                 </div>

                 <button 
                   onClick={handleViewAllNews}
                   className="text-primary-600 font-bold hover:text-primary-700 transition-colors flex items-center gap-1"
                 >
                   查看更多快訊 <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewsCarousel;
