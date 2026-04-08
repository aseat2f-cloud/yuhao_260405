
import React, { useState } from 'react';
import { EventItem } from '../types';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsPageProps {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
}

const EventsPage: React.FC<EventsPageProps> = ({ upcomingEvents, pastEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel Logic (show 3 at a time)
  const itemsToShow = 3;
  const maxIndex = Math.max(0, upcomingEvents.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
       <div className="bg-white border-b border-gray-100 py-12 mb-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">活動報名</h1>
            <p className="text-slate-500">豐富的營隊、講座與競賽，等著你來挑戰</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upcoming Carousel Section */}
        <div className="mb-20">
           <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-primary-500 pl-4">近期活動</h2>
              
              {/* Controls */}
              <div className="flex gap-2">
                 <button 
                   onClick={prevSlide}
                   disabled={currentIndex === 0}
                   className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                 >
                    <ChevronLeft size={20} />
                 </button>
                 <button 
                   onClick={nextSlide}
                   disabled={currentIndex === maxIndex}
                   className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                 >
                    <ChevronRight size={20} />
                 </button>
              </div>
           </div>

           <div className="overflow-hidden">
             <div 
               className="flex gap-6 transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow + 2)}%)` }} 
               // Note: This simple calculation assumes fixed gap logic, typically requires ResizeObserver for perfection in responsive.
               // For simplicity in this demo, we'll use a responsive grid fallback on mobile.
             >
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="min-w-[300px] md:min-w-[calc(33.333%-16px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
                     <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                           熱烈報名中
                        </div>
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-primary-600 text-sm font-medium mb-2">
                           <Calendar size={16} />
                           {event.date}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                        <p className="text-slate-600 text-sm mb-6 flex-1">{event.description}</p>
                        <button className="w-full py-2.5 rounded-lg border-2 border-primary-600 text-primary-600 font-bold hover:bg-primary-600 hover:text-white transition-colors">
                           立即報名
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Past Events Grid */}
        <div>
           <h2 className="text-2xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-slate-300">精彩回顧</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.map((event) => (
                 <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow opacity-80 hover:opacity-100">
                    <div className="aspect-video bg-slate-200 grayscale hover:grayscale-0 transition-all">
                       <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                       <h3 className="font-bold text-slate-800 mb-2">{event.title}</h3>
                       <p className="text-xs text-slate-500">{event.date} | 活動已結束</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default EventsPage;
