
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: '陳O安', school: '敦化國小', class: '資優數學班', content: '這裡的數學課很好玩，老師會用遊戲的方式帶我們解題，讓我發現原來數學一點都不難！' },
  { id: 2, name: '林O軒', school: '民生國小', class: '兒童美語班', content: '外師上課很有趣，會帶我們唱英文歌、看繪本，現在我不怕跟外國人講話了。' },
  { id: 3, name: '黃O慈', school: '幸安國小', class: '科學實驗班', content: '最喜歡每週的科學實驗課，可以自己動手做火山爆發，還能學到很多原理。' },
  { id: 4, name: '張O豪', school: '金華國小', class: '私中特訓班', content: '老師整理的考題很有用，讓我在考私中的時候很有信心，最後順利錄取延平。' },
  { id: 5, name: '李O宣', school: '仁愛國小', class: '資優數學班', content: '在育豪學到了很多學校沒教的解題技巧，現在學校段考我都能拿滿分。' },
  { id: 6, name: '王O凱', school: '敦化國小', class: '閱讀寫作班', content: '以前寫作文都不知道要寫什麼，老師教我用心智圖構思，現在寫作變得很輕鬆。' },
];

interface StudentTestimonialsProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const StudentTestimonials: React.FC<StudentTestimonialsProps> = ({ theme = 'green' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const t = theme === 'primary' ? 'primary' : theme;

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerPage; i++) {
      items.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]);
    }
    return items;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Centered */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="mb-0">
            <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>學員心得分享</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">快樂學習 • 自信成長</h3>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
              聽聽學長姐怎麼說，在快樂中學習，在挑戰中成長，你也可以做得到！
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getVisibleItems().map((item, idx) => (
            <div key={`${item.id}-${idx}`} className={`bg-${t}-50 rounded-2xl p-6 relative group hover:-translate-y-1 transition-transform duration-300`}>
              {/* Quote icon removed */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-${t}-600 shadow-sm`}>
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.school}</div>
                </div>
              </div>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 bg-white text-${t}-600 text-xs font-bold rounded-full shadow-sm`}>
                  {item.class}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed min-h-[80px]">
                {item.content}
              </p>
              <div className="mt-4 flex justify-end">
                 <ThumbsUp size={16} className={`text-${t}-400`} />
              </div>
            </div>
          ))}
        </div>

        {/* Arrows Moved Here */}
        <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors bg-white shadow-sm">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors bg-white shadow-sm">
              <ChevronRight size={20} className="text-slate-600" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default StudentTestimonials;
