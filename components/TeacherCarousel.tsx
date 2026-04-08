
import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, GraduationCap, Quote } from 'lucide-react';
import Modal from './Modal';
import { Teacher } from '../types';

const TEACHERS: Teacher[] = [
  { 
    id: 't1', 
    name: '王大明', 
    subject: '資優數學', 
    image: 'https://www.dropbox.com/scl/fi/96zs8z27j4zrpae8elnw2/01.jpg?rlkey=wdlo87phx4gfbuseqkba2jzfk&raw=1',
    intro: '獨創圖解數學法，讓孩子不再害怕應用題。',
    experience: ['國立師範大學數學系', '15年資優班教學經驗', '奧林匹亞數學金牌教練'],
    philosophy: '數學不是死背公式，而是解決問題的工具。'
  },
  { 
    id: 't2', 
    name: 'Sarah Lee', 
    subject: '兒童美語', 
    image: 'https://www.dropbox.com/scl/fi/sqft3wwu1xa1b882jczn5/02.jpg?rlkey=wlxkafq52tbn2u1wzm3zp8ikg&raw=1',
    intro: '美式自然發音教學，強調快樂學習開口說。',
    experience: ['美國 TESOL 英語教學認證', '知名雙語學校教學主任', '英文繪本閱讀推廣講師'],
    philosophy: 'Language is the key to the world. 讓孩子愛上開口說。'
  },
  { 
    id: 't3', 
    name: '陳志宏', 
    subject: '科學實驗', 
    image: 'https://www.dropbox.com/scl/fi/i6sm1c2xoq83i0onif2wz/03.jpg?rlkey=4ljdqu0cc7au6o0vt8seu6osq&raw=1',
    intro: '動手玩科學，將課本知識轉化為有趣實驗。',
    experience: ['台大物理研究所碩士', '全國科展特優指導老師', '科學遊戲專欄作家'],
    philosophy: '好奇心是科學的種子，動手做是最好的肥料。'
  },
  { 
    id: 't4', 
    name: '林雅婷', 
    subject: '國語文', 
    image: 'https://www.dropbox.com/scl/fi/gwwwh072o8d2rz29zvada/04.jpg?rlkey=7zwwi4mddafnu3rmqo4g7cjsl&raw=1',
    intro: '引導式作文教學，培養豐富的想像力與表達力。',
    experience: ['國立政治大學中文系', '聯合盃作文大賽評審', '資深閱讀寫作講師'],
    philosophy: '文字有溫度，寫作就是與自己對話的過程。'
  },
  { 
    id: 't5', 
    name: '張立群', 
    subject: '邏輯思維', 
    image: 'https://www.dropbox.com/scl/fi/qjvgoawvpfp6r8tt75ri5/05.jpg?rlkey=lpt6gmv26e7o54b7jlt46akfq&raw=1',
    intro: '透過桌遊與教具，訓練孩子邏輯推理能力。',
    experience: ['中央大學認知神經科學所', '國際門薩協會會員', '專注力訓練師'],
    philosophy: '邏輯思考是受用一生的能力，越早啟蒙越好。'
  },
  { 
    id: 't6', 
    name: '周曉芬', 
    subject: '閱讀素養', 
    image: 'https://www.dropbox.com/scl/fi/m3iap1c1qq6l777z4w4b8/10.jpg?rlkey=g17ynjoa2q5ksddo61bvvles3&raw=1',
    intro: '深耕閱讀素養教育，帶領孩子看見書本背後的世界。',
    experience: ['師大國文系博士候選人', '教育部閱讀推手獎', '國小閱讀理解教材編者'],
    philosophy: '閱讀不只是看書，而是看見更寬廣的世界。'
  },
];

const TeacherCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Adjusted to slide by 'itemsToShow' (whole page) instead of 1
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsToShow) % TEACHERS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsToShow + TEACHERS.length) % TEACHERS.length);
  };

  const getVisibleTeachers = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(TEACHERS[(currentIndex + i) % TEACHERS.length]);
    }
    return visible;
  };

  const visibleTeachers = getVisibleTeachers();

  return (
    <section id="teacher-carousel" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-green-600 font-bold tracking-wide uppercase text-sm mb-3">名師領航</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">師資陣容</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            嚴選具備專業學識與教學熱忱的師資團隊，透過豐富的經驗引導孩子愛上學習。
          </p>
        </div>

        <div className="relative px-0 md:px-12">
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-green-600 hover:scale-110 transition-all hidden md:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-green-600 hover:scale-110 transition-all hidden md:flex"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Grid/Carousel - Added animation key based on currentIndex */}
          <div 
            key={currentIndex}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {visibleTeachers.map((teacher, index) => (
              <div 
                key={`${teacher.id}-${index}`} 
                className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedTeacher(teacher)}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500 text-white shadow-sm">
                        {teacher.subject}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold">{teacher.name}</h4>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                     <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white fill-white ml-1" />
                     </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Experience */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-green-700">
                       <GraduationCap size={16} />
                       <span className="text-xs font-bold uppercase tracking-wider">專業經歷</span>
                    </div>
                    <ul className="space-y-1.5">
                      {teacher.experience?.map((exp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                           <span className="w-1 h-1 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
                           <span className="leading-relaxed">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Philosophy - REMOVED DECORATION */}
                  <div className="mt-auto pt-4">
                    <div className="relative">
                       <p className="text-xs text-slate-500 italic leading-relaxed">
                         {teacher.philosophy}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
             <button onClick={prevSlide} className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 shadow-sm">
                <ChevronLeft size={20} />
             </button>
             <button onClick={nextSlide} className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 shadow-sm">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title={`${selectedTeacher?.name} 老師 - 教學演示`}
        maxWidth="max-w-4xl"
      >
        {selectedTeacher && (
          <div className="flex flex-col gap-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center relative group shadow-2xl">
               {/* Mock Video UI */}
               <img src={selectedTeacher.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
               <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-10 group-hover:bg-green-500">
                  <Play size={32} className="text-white fill-white ml-1" />
               </div>
               <p className="absolute bottom-6 text-white/90 text-sm font-medium tracking-wide">點擊開始播放教學影片</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
               <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                     <h3 className="text-2xl font-bold text-slate-900">{selectedTeacher.name}</h3>
                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        {selectedTeacher.subject}
                     </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Quote size={18} className="text-green-500" /> 教學理念
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    "{selectedTeacher.philosophy}"
                  </p>
                  <h4 className="font-bold text-slate-800 mb-2">課程介紹</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedTeacher.intro}
                  </p>
               </div>
               
               <div className="md:col-span-1 bg-green-50 rounded-xl p-6 h-fit">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2 border-b border-green-200 pb-2">
                     <GraduationCap size={18} /> 專業經歷
                  </h4>
                  <ul className="space-y-3">
                     {selectedTeacher.experience?.map((exp, i) => (
                        <li key={i} className="text-sm text-green-900 flex items-start gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                           {exp}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default TeacherCarousel;
