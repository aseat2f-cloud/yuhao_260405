
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import Modal from './Modal';
import { ChevronRight, ChevronLeft, ArrowRight, UserPlus, ChevronsDown } from 'lucide-react';

interface BulletinPageProps {
  news: NewsItem[];
}

type TabType = 'highlight' | 'normal' | 'events';

// Images for the Bulletin Hero Carousel
const BULLETIN_HERO_IMAGES = [
  "https://www.dropbox.com/scl/fi/idbwmahwcblurah3z9c9n/114-9-_AH_1500x1000.jpg?rlkey=g3b2wrudre0ffhsti5fs33s78&raw=1",
  "https://www.dropbox.com/scl/fi/w8adr9m5cxddrgei37k2q/114-A-_AH_1500x1000-2-scaled.jpg?rlkey=tz7k4ufkmetk7j5v6rb3xt547&raw=1",
  "https://www.dropbox.com/scl/fi/1nh0cuyvk7eh32cuavpx6/114-_-20-_AH_1500x1000.jpg?rlkey=ja1ikfqooahw59qqnil0kvmud&raw=1",
  "https://www.dropbox.com/scl/fi/lx0gvrzzpnb570zt8bjh8/114-A-51-_AH_1500x1000.jpg?rlkey=fk0iza6iyziohtk34uyrmudv2&raw=1",
  "https://www.dropbox.com/scl/fi/1w426bq5zel5yg57ztbd2/114-PO-_AH_1500x1000-1.jpg?rlkey=mc1qu7vw1na8jbvzat3yf8db4&raw=1",
  "https://www.dropbox.com/scl/fi/oqtef7gpbiy47kjfmecc5/A-51-_1500x1000-1.png?rlkey=nbut08gbs6g0wlbtnksxd8nyf&raw=1",
  "https://www.dropbox.com/scl/fi/up7iiwtg8twubiibq99hp/_.png?rlkey=m02gt5ky0n5cu5scmvfy7s235&raw=1"
];

const BulletinPage: React.FC<BulletinPageProps> = ({ news }) => {
  const [activeTab, setActiveTab] = useState<TabType>('highlight');
  
  // Hero Carousel State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-play for Hero Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % BULLETIN_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    const contentElement = document.getElementById('bulletin-tabs');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter news based on tab
  const getFilteredNews = () => {
    switch (activeTab) {
      case 'highlight':
        return news.filter(n => n.category === 'highlight');
      case 'normal':
        return news.filter(n => n.category === 'normal');
      case 'events':
        return news.filter(n => n.category === 'event'); // Treat events as news items with 'event' category
      default:
        return [];
    }
  };

  const currentNewsList = getFilteredNews();

  // News Modal State
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNewsId(item.id);
  };

  const closeNewsModal = () => {
    setSelectedNewsId(null);
  };

  // Find currently selected news item and its index for navigation
  const selectedNewsItem = currentNewsList.find(n => n.id === selectedNewsId);
  const selectedNewsIndex = selectedNewsItem ? currentNewsList.indexOf(selectedNewsItem) : -1;

  const handleModalNext = () => {
    if (selectedNewsIndex !== -1) {
      const nextIndex = (selectedNewsIndex + 1) % currentNewsList.length;
      setSelectedNewsId(currentNewsList[nextIndex].id);
    }
  };

  const handleModalPrev = () => {
    if (selectedNewsIndex !== -1) {
      const prevIndex = (selectedNewsIndex - 1 + currentNewsList.length) % currentNewsList.length;
      setSelectedNewsId(currentNewsList[prevIndex].id);
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'highlight') return '榮耀成績';
    if (cat === 'event') return '活動資訊';
    return '消息快訊';
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Carousel Section - Desktop Only */}
      {/* Strict 3:2 Aspect Ratio - Full Width - Allowed to exceed viewport */}
      <div className="hidden md:block relative w-full aspect-[3/2] bg-white group overflow-hidden">
         {/* Images */}
         {BULLETIN_HERO_IMAGES.map((img, index) => (
           <div 
             key={index}
             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full ${
               index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
             }`}
           >
             <img src={img} alt={`Bulletin Slide ${index + 1}`} className="w-full h-full object-cover" />
           </div>
         ))}

         {/* Scroll Hint Icon */}
         <div 
            className="absolute top-[calc(100vh-10rem)] left-1/2 transform -translate-x-1/2 z-20 text-white cursor-pointer hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 duration-300" 
            onClick={scrollToContent}
            title="往下滑動"
         >
            <div className="flex flex-col items-center animate-bounce shadow-sm drop-shadow-md">
               <ChevronsDown size={48} strokeWidth={2.5} />
            </div>
         </div>
      </div>

      {/* Navigation Dots - Placed BELOW the Hero section */}
      <div className="hidden md:flex justify-center py-6 bg-slate-50">
        <div className="flex gap-3">
          {BULLETIN_HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-slate-300 ${
                index === currentHeroIndex 
                  ? 'bg-primary-600 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div id="bulletin-tabs" className="scroll-mt-24 pt-4 md:pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center border-b border-gray-200">
           <button
             onClick={() => setActiveTab('highlight')}
             className={`px-6 md:px-10 py-4 text-lg font-bold transition-all relative ${
                activeTab === 'highlight' 
                  ? 'text-primary-600' 
                  : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             榮耀成績
             {activeTab === 'highlight' && (
               <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
             )}
           </button>
           <button
             onClick={() => setActiveTab('events')}
             className={`px-6 md:px-10 py-4 text-lg font-bold transition-all relative ${
                activeTab === 'events' 
                  ? 'text-primary-600' 
                  : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             活動資訊
             {activeTab === 'events' && (
               <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
             )}
           </button>
           <button
             onClick={() => setActiveTab('normal')}
             className={`px-6 md:px-10 py-4 text-lg font-bold transition-all relative ${
                activeTab === 'normal' 
                  ? 'text-primary-600' 
                  : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             更多消息
             {activeTab === 'normal' && (
               <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
             )}
           </button>
        </div>
      </div>

      {/* Content Area (Unified Grid for all tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNewsList.map((item) => (
                <div 
                  key={item.id} 
                  className="relative w-full aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-white group flex items-center justify-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Button Bottom Right */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <button 
                        onClick={() => handleNewsClick(item)}
                        className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
                    >
                        了解更多 <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {currentNewsList.length === 0 && (
              <div className="text-center py-20 text-slate-400 text-lg">
                  目前暫無相關消息。
              </div>
          )}
        </div>
      </div>

      {/* News Detail Modal */}
      <Modal 
        isOpen={!!selectedNewsItem} 
        onClose={closeNewsModal}
        maxWidth="max-w-[min(960px,112vh)]"
        hideHeader={true}
      >
        {selectedNewsItem && (
          <div 
            key={selectedNewsItem.id}
            className="flex flex-col md:flex-row w-full bg-white md:aspect-[1.6/1] overflow-hidden"
          >
            
            {/* Left Image - 50% width - Updated for "Never Crop" requirement */}
            <div className="w-full md:w-1/2 relative shrink-0 bg-white flex items-center justify-center h-[50vh] md:h-auto">
               <img 
                 src={selectedNewsItem.image} 
                 alt={selectedNewsItem.title} 
                 className="w-full h-full object-contain"
               />
            </div>
            
            {/* Right Content - 50% width */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-10 relative overflow-hidden h-fit md:h-auto bg-white">
              {/* Header Info */}
              <div className="shrink-0 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                    selectedNewsItem.category === 'event' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'bg-primary-50 text-primary-600'
                  }`}>
                    {getCategoryLabel(selectedNewsItem.category)}
                  </span>
                  <span className="text-slate-400 text-sm">{selectedNewsItem.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {selectedNewsItem.title}
                </h2>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line pb-4">
                  {selectedNewsItem.content}
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

                 {/* Apply Button only for Events */}
                 {selectedNewsItem.category === 'event' && (
                    <a
                      href="#contact"
                      onClick={closeNewsModal}
                      className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-full shadow-lg hover:bg-primary-700 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <UserPlus size={18} />
                      立即報名
                    </a>
                 )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BulletinPage;
