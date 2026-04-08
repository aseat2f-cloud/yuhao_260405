
import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, GraduationCap, Quote } from 'lucide-react';
import Modal from './Modal';
import { Teacher } from '../types';

const TEACHERS: Teacher[] = [
  { 
    id: 'st1', 
    name: '林雅婷', 
    subject: '高中國文', 
    image: 'https://www.dropbox.com/scl/fi/gwwwh072o8d2rz29zvada/04.jpg?rlkey=7zwwi4mddafnu3rmqo4g7cjsl&raw=1',
    intro: '引導學生深入解析古文內涵，提升閱讀素養與寫作能力。',
    experience: ['台大中文博士', '學測/分科測驗 解題名師', '高中國文教科書編撰委員'],
    philosophy: '融會古今，以文學涵養生命，以邏輯駕馭文字。'
  },
  { 
    id: 'st2', 
    name: '周曉芬', 
    subject: '高中英文', 
    image: 'https://www.dropbox.com/scl/fi/m3iap1c1qq6l777z4w4b8/10.jpg?rlkey=g17ynjoa2q5ksddo61bvvles3&raw=1',
    intro: '針對學測題型分析，強化翻譯與作文技巧。',
    experience: ['師大英語研究所', '15年高中英文教學經驗', '英檢高級 / 多益滿分'],
    philosophy: '英文不只是考科，更是通往世界的橋樑。'
  },
  { 
    id: 'st3', 
    name: '張立群', 
    subject: '高中數學', 
    image: 'https://www.dropbox.com/scl/fi/qjvgoawvpfp6r8tt75ri5/05.jpg?rlkey=lpt6gmv26e7o54b7jlt46akfq&raw=1',
    intro: '著重觀念推導與邏輯訓練，破解學測素養難題。',
    experience: ['交大應用數學碩士', '數學奧林匹亞培訓教練', '頂尖大學微積分先修講師'],
    philosophy: '用最簡單的邏輯，破解最複雜的難題。'
  },
  { 
    id: 'st4', 
    name: '陳志宏', 
    subject: '高中物理', 
    image: 'https://www.dropbox.com/scl/fi/i6sm1c2xoq83i0onif2wz/03.jpg?rlkey=4ljdqu0cc7au6o0vt8seu6osq&raw=1',
    intro: '獨創物理思考架構，讓繁雜的公式變得簡單易懂。',
    experience: ['清大物理系博士', '補教界物理首席名師', '半導體工程師轉任'],
    philosophy: '物理即生活，萬物皆有理。看懂了，就再也不難。'
  },
  { 
    id: 'st5', 
    name: '林建宏', 
    subject: '高中化學', 
    image: 'https://www.dropbox.com/scl/fi/iokwux51hep57q6o394kv/07.jpg?rlkey=osq6tbiljlnao9hs5i2rrbl16&raw=1',
    intro: '實驗與理論並重，深入淺出解析化學反應機制。',
    experience: ['台大化學所', '清華盃化學競賽指導', '化學參考書暢銷作者'],
    philosophy: '化學是變化的科學，掌握原理便能預測結果。'
  },
  { 
    id: 'st6', 
    name: '王美玲', 
    subject: '高中社會', 
    image: 'https://www.dropbox.com/scl/fi/0oxtvb7oxnkulwvvhng31/08.jpg?rlkey=st2bs56n1x1b5vd55mmye9cw6&raw=1',
    intro: '整合歷史、地理、公民觀念，培養跨科整合能力。',
    experience: ['政大社會科學院', '學測社會科滿級分推手', '跨領域統整教學專家'],
    philosophy: '鑑古知今，立足台灣，放眼國際。'
  },
  { 
    id: 'st7', 
    name: '王大明', 
    subject: '數理資優', 
    image: 'https://www.dropbox.com/scl/fi/96zs8z27j4zrpae8elnw2/01.jpg?rlkey=wdlo87phx4gfbuseqkba2jzfk&raw=1',
    intro: '針對資優班與科學班入學考試，提供專業培訓。',
    experience: ['師大數學系', '數理資優教育專長', '科學班入學考培訓權威'],
    philosophy: '挑戰極限，突破自我，成就資優。'
  },
  { 
    id: 'st8', 
    name: '黃怡君', 
    subject: '學習歷程', 
    image: 'https://www.dropbox.com/scl/fi/36tmdx7i0tdw2bz0gbpb0/09.jpg?rlkey=wtlq7ijcs0mskfad06dqrnhmr&raw=1',
    intro: '一對一指導學習歷程檔案製作，挖掘學生個人亮點。',
    experience: ['台大教育學程', '大學申請入學輔導專家', '升學輔導中心主任'],
    philosophy: '每個人都是獨一無二的，讓我幫你看見自己的光芒。'
  },
];

const SeniorTeacherCarousel: React.FC = () => {
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
    <section id="senior-teachers" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-600 font-bold tracking-wide uppercase text-sm mb-3">名師領航</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">師資陣容</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            學測與分科測驗的致勝關鍵，在於觀念的深度與解題的速度。最強高中師資，助你一臂之力。
          </p>
        </div>

        <div className="relative px-0 md:px-12">
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-purple-600 hover:scale-110 transition-all hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-purple-600 hover:scale-110 transition-all hidden md:flex"
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
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-500 text-white shadow-sm">
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
                    <div className="flex items-center gap-2 mb-2 text-purple-700">
                       <GraduationCap size={16} />
                       <span className="text-xs font-bold uppercase tracking-wider">專業經歷</span>
                    </div>
                    <ul className="space-y-1.5">
                      {teacher.experience?.map((exp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                           <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
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
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-10 group-hover:bg-purple-500">
                 <Play size={32} className="text-white fill-white ml-1" />
              </div>
              <p className="absolute bottom-6 text-white/90 text-sm font-medium tracking-wide">點擊開始播放教學影片</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
              <div className="md:col-span-2">
                 <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{selectedTeacher.name}</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                       {selectedTeacher.subject}
                    </span>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                   <Quote size={18} className="text-purple-500" /> 教學理念
                 </h4>
                 <p className="text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                   "{selectedTeacher.philosophy}"
                 </p>
                 <h4 className="font-bold text-slate-800 mb-2">課程介紹</h4>
                 <p className="text-slate-600 leading-relaxed">
                   {selectedTeacher.intro}
                 </p>
              </div>
              
              <div className="md:col-span-1 bg-purple-50 rounded-xl p-6 h-fit">
                 <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2 border-b border-purple-200 pb-2">
                    <GraduationCap size={18} /> 專業經歷
                 </h4>
                 <ul className="space-y-3">
                    {selectedTeacher.experience?.map((exp, i) => (
                       <li key={i} className="text-sm text-purple-900 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
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

export default SeniorTeacherCarousel;
