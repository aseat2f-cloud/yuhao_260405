
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: '林媽媽', role: '國小五年級家長', content: '老師非常有耐心，孩子原本很排斥數學，現在每天都主動算題目，進步真的看的見！', rating: 5 },
  { id: 2, name: '陳爸爸', role: '國中九年級家長', content: '會考衝刺班的規劃很紮實，模擬考後的分析對孩子幫助很大，最後順利考上建中。', rating: 5 },
  { id: 3, name: '張媽媽', role: '高中二年級家長', content: '這裡的物理老師解題超強，觀念講得很清楚，小孩段考成績直接從及格邊緣衝到班排第一。', rating: 5 },
  { id: 4, name: '黃爸爸', role: '國小資優班家長', content: '科學實驗課很有趣，孩子回家都會分享今天做了什麼，對培養學習興趣很有幫助。', rating: 5 },
  { id: 5, name: '李媽媽', role: '國中七年級家長', content: '小班制教學真的很棒，老師能顧到每個學生，也會定期跟家長回報狀況，很放心。', rating: 5 },
  { id: 6, name: '吳爸爸', role: '高中一年級家長', content: '英文老師的口音很標準，上課氣氛活潑，孩子英文聽說能力進步很多。', rating: 5 },
  { id: 7, name: '劉媽媽', role: '國小三年級家長', content: '安親課輔很用心，作業都會確實檢查，讓雙薪家庭的我們無後顧之憂。', rating: 5 },
  { id: 8, name: '蔡爸爸', role: '國中八年級家長', content: '理化實驗課讓孩子親手操作，不再只是死背公式，對觀念理解很有幫助。', rating: 5 },
  { id: 9, name: '楊媽媽', role: '高中三年級家長', content: '學測衝刺班的備審資料輔導很專業，讓孩子順利通過一階篩選。', rating: 5 },
  { id: 10, name: '趙爸爸', role: '國小六年級家長', content: '私中特訓班的教材編排很好，針對考題趨勢練習，讓孩子順利考上目標私中。', rating: 5 },
  { id: 11, name: '孫媽媽', role: '國中九年級家長', content: '模擬考後的落點分析很準確，讓我們在填志願時更有方向。', rating: 5 },
  { id: 12, name: '周爸爸', role: '高中二年級家長', content: 'K書中心的環境很好，讀書氛圍很棒，孩子很喜歡去那裡自習。', rating: 5 },
  { id: 13, name: '鄭媽媽', role: '國小四年級家長', content: '作文老師引導孩子觀察生活，寫出來的文章變得很生動有趣。', rating: 5 },
  { id: 14, name: '王爸爸', role: '國中八年級家長', content: '數學老師會用生活例子解說，讓孩子覺得數學其實沒那麼難。', rating: 5 },
  { id: 15, name: '許媽媽', role: '高中一年級家長', content: '高一先修班讓孩子提前適應高中課程，開學後學習比較輕鬆。', rating: 5 },
  { id: 16, name: '何爸爸', role: '國小五年級家長', content: '資優數學班的邏輯訓練對孩子思考很有幫助，不只數學變好，其他科也進步了。', rating: 5 },
];

interface ParentTestimonialsProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const ParentTestimonials: React.FC<ParentTestimonialsProps> = ({ theme = 'primary' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const t = theme === 'primary' ? 'primary' : theme;

  // Responsive items per page logic
  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 768px): 4 items
      // Desktop (>= 768px): 8 items
      setItemsPerPage(window.innerWidth < 768 ? 4 : 8);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const maxIndex = Math.ceil(TESTIMONIALS.length / itemsPerPage) - 1;

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const visibleItems = TESTIMONIALS.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <section id="testimonials" className="py-20 bg-slate-50 text-slate-900 relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated Header: Centered on all screens */}
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
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 h-20 line-clamp-4">
                "{item.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows Moved Here */}
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

export default ParentTestimonials;
