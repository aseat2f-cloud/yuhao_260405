
import React, { useState } from 'react';
import { NewsItem } from '../types';
import Modal from './Modal';
import { Calendar, ChevronRight } from 'lucide-react';

interface NewsPageProps {
  news: NewsItem[];
}

const NewsPage: React.FC<NewsPageProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Split news: Top 3 highlights, rest are normal list
  const highlights = news.slice(0, 3);
  const listItems = news.slice(3);

  const handleNewsClick = (item: NewsItem) => {
    if (item.externalLink) {
      window.open(item.externalLink, '_blank');
    } else {
      setSelectedNews(item);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-gray-100 py-12 mb-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">最新消息</h1>
            <p className="text-slate-500">掌握第一手課程異動、升學情報與活動資訊</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           {highlights.map((item) => (
             <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                onClick={() => handleNewsClick(item)}
             >
                <div className="aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">HOT</span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                     {item.title}
                   </h3>
                   <p className="text-slate-600 text-sm line-clamp-3 mb-4">{item.summary}</p>
                   <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                     閱讀更多 <ChevronRight size={16} />
                   </span>
                </div>
             </div>
           ))}
        </div>

        {/* List View */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <h2 className="text-2xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-primary-500">更多消息</h2>
           <div className="space-y-8">
             {listItems.length > 0 ? listItems.map((item) => (
               <div 
                 key={item.id} 
                 className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 cursor-pointer group"
                 onClick={() => handleNewsClick(item)}
               >
                 <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{item.summary}</p>
                 </div>
               </div>
             )) : (
                <p className="text-slate-400 text-center py-8">目前沒有更多消息。</p>
             )}
           </div>
        </div>

      </div>

      {/* Modal */}
      <Modal 
        isOpen={!!selectedNews} 
        onClose={() => setSelectedNews(null)}
        title="消息詳情"
      >
        {selectedNews && (
          <div>
            {/* 圖片已移除，保持與首頁重點消息一致 */}
            <div className="text-slate-400 text-sm mb-4">{selectedNews.date}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedNews.title}</h2>
            <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line">
              {selectedNews.content}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsPage;