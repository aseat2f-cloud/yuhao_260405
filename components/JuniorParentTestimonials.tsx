
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const PARENT_TESTIMONIALS = [
  { id: 1, name: '李O宣 媽媽', school: '中山國中', role: '七年級家長', content: '自從孩子進入育豪後，對學習的態度有了很大的轉變。老師們不僅專業，更有一顆懂孩子的心，讓家長非常放心。', rating: 5 },
  { id: 2, name: '黃O慈 爸爸', school: '海山國中', role: '八年級家長', content: '育豪的教學環境與師資都是板橋頂尖的。孩子在這裡不僅成績進步，也學會了如何規劃自己的讀書計畫。', rating: 5 },
  { id: 3, name: '陳O安 爸爸', school: '江翠國中', role: '九年級家長', content: '會考衝刺階段，育豪的精準命題與輔導機制幫了孩子大忙。感謝老師們的陪伴，讓孩子能順利錄取理想高中。', rating: 5 },
  { id: 4, name: '林O軒 媽媽', school: '板橋國中', role: '七年級家長', content: '很喜歡育豪的親師溝通，老師會主動回報孩子的學習狀況，讓我們能即時了解並給予孩子支持。', rating: 5 },
  { id: 5, name: '王O凱 媽媽', school: '重慶國中', role: '八年級家長', content: '孩子以前很怕數學，但在育豪老師的引導下，現在反而最喜歡數學課，這真的是我們始料未及的改變。', rating: 5 },
  { id: 6, name: '張O豪 爸爸', school: '溪崑國中', role: '九年級家長', content: '育豪不只是教書，更在教人。老師對孩子品格的重視，讓我深感把孩子交給育豪是正確的決定。', rating: 5 },
  { id: 7, name: '許O涵 媽媽', school: '光復國中', role: '七年級家長', content: '環境乾淨明亮，K書中心的氛圍非常好，孩子放學後很喜歡留在這裡複習功課，效率提高很多。', rating: 5 },
  { id: 8, name: '郭O廷 爸爸', school: '新埔國中', role: '八年級家長', content: '課程安排非常紮實，講義內容精簡扼要，讓孩子在繁重的課業中能快速掌握重點，事半功倍。', rating: 5 },
];

interface JuniorParentTestimonialsProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const JuniorParentTestimonials: React.FC<JuniorParentTestimonialsProps> = ({ theme = 'blue' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const t = theme === 'primary' ? 'primary' : theme;

  // Responsive items per page logic
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 4 : 8);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const maxIndex = Math.ceil(PARENT_TESTIMONIALS.length / itemsPerPage) - 1;
  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const visibleItems = PARENT_TESTIMONIALS.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <section id="parent-testimonials" className="py-24 bg-slate-50 text-slate-900 relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Centered */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="mb-0">
            <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>口碑推薦</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">家長五星見證</h3>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
              來自家長的真實回饋，是我們不斷前進的動力，您的放心交給育豪。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {visibleItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 h-20 line-clamp-4 italic">
                "{item.content}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className={`w-10 h-10 rounded-full bg-${t}-50 flex items-center justify-center font-bold text-${t}-600`}>
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className={`text-xs font-bold text-${t}-600 mt-0.5`}>{item.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default JuniorParentTestimonials;
