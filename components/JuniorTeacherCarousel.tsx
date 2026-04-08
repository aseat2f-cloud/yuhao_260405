
import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, GraduationCap, Quote } from 'lucide-react';
import Modal from './Modal';
import { Teacher } from '../types';

const TEACHERS: Teacher[] = [
  { 
    id: 'jt1', 
    name: '張志豪', 
    subject: '國中理化', 
    image: 'https://www.dropbox.com/scl/fi/x2mrb6ru43qlah0ip71zw/06.jpg?rlkey=vkym78rlkkzlk6soazcxi6inm&raw=1',
    intro: '獨創圖解物理法，解題速度提升 200%。',
    experience: ['台大物理系學士', '知名補教連鎖理化首席', '20年理化教學經驗'],
    philosophy: '理化不該是公式的堆砌，而是對自然現象的深刻理解。'
  },
  { 
    id: 'jt2', 
    name: '陳雅雯', 
    subject: '國中英文', 
    image: 'https://www.dropbox.com/scl/fi/qjvgoawvpfp6r8tt75ri5/05.jpg?rlkey=lpt6gmv26e7o54b7jlt46akfq&raw=1',
    intro: '重視文法架構與閱讀理解，輕鬆破解會考題型。',
    experience: ['政大英語教學碩士', 'GEPT 中高級口試滿分', '會考英文A++特訓名師'],
    philosophy: '用邏輯學文法，用情境背單字，讓英文成為你的優勢。'
  },
  { 
    id: 'jt3', 
    name: '林建宏', 
    subject: '國中數學', 
    image: 'https://www.dropbox.com/scl/fi/iokwux51hep57q6o394kv/07.jpg?rlkey=osq6tbiljlnao9hs5i2rrbl16&raw=1',
    intro: '強調邏輯推演，將抽象概念具象化，讓學生不再害怕數學。',
    experience: ['清華大學數學系', '特殊優良教師獎得主', 'JHMC 數學競賽指導教練'],
    philosophy: '只要跟對老師，數學絕對能成為你最有成就感的科目。'
  },
  { 
    id: 'jt4', 
    name: '王美玲', 
    subject: '國中國文', 
    image: 'https://www.dropbox.com/scl/fi/0oxtvb7oxnkulwvvhng31/08.jpg?rlkey=st2bs56n1x1b5vd55mmye9cw6&raw=1',
    intro: '深厚的文學底蘊，引導學生寫出有溫度的作文。',
    experience: ['師大國文研究所', '會考作文六級分推手', '深耕閱讀素養教學'],
    philosophy: '在文字中找到共鳴，在文學中涵養品格。'
  },
  { 
    id: 'jt5', 
    name: '李俊傑', 
    subject: '生物地科', 
    image: 'https://www.dropbox.com/scl/fi/96zs8z27j4zrpae8elnw2/01.jpg?rlkey=wdlo87phx4gfbuseqkba2jzfk&raw=1',
    intro: '結合時事與自然現象，讓生物地科變得生動有趣。',
    experience: ['中興大學生命科學系', '野外生態觀察家', '自然科圖解筆記達人'],
    philosophy: '走出課本，看見大自然的奧妙與規律。'
  },
  { 
    id: 'jt6', 
    name: '黃怡君', 
    subject: '公民歷史', 
    image: 'https://www.dropbox.com/scl/fi/36tmdx7i0tdw2bz0gbpb0/09.jpg?rlkey=wtlq7ijcs0mskfad06dqrnhmr&raw=1',
    intro: '用故事串聯歷史脈絡，用生活實例解析公民議題。',
    experience: ['台大歷史系', '跨領域社會科整合專家', '素養題型命題研究員'],
    philosophy: '歷史是時間的長河，我們都是其中的擺渡人。'
  },
  { 
    id: 'jt7', 
    name: '劉德華', 
    subject: '會考衝刺', 
    image: 'https://www.dropbox.com/scl/fi/sqft3wwu1xa1b882jczn5/02.jpg?rlkey=wlxkafq52tbn2u1wzm3zp8ikg&raw=1',
    intro: '精準掌握會考命題趨勢，帶領學生衝刺 A++。',
    experience: ['補教界資深名師', '歷屆會考解題分析師', '千人講座特聘講師'],
    philosophy: '沒有奇蹟，只有累積。最後一哩路，我陪你走完。'
  },
];

const JuniorTeacherCarousel: React.FC = () => {
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
    <section id="junior-teachers" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">名師領航</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">師資陣容</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
             國中是學習的分水嶺，我們用最專業的師資，為孩子搭建通往第一志願的橋樑。
          </p>
        </div>

        <div className="relative px-0 md:px-12">
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-blue-600 hover:scale-110 transition-all hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-slate-600 hover:text-blue-600 hover:scale-110 transition-all hidden md:flex"
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
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500 text-white shadow-sm">
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
                    <div className="flex items-center gap-2 mb-2 text-blue-700">
                       <GraduationCap size={16} />
                       <span className="text-xs font-bold uppercase tracking-wider">專業經歷</span>
                    </div>
                    <ul className="space-y-1.5">
                      {teacher.experience?.map((exp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                           <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
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
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-10 group-hover:bg-blue-500">
                 <Play size={32} className="text-white fill-white ml-1" />
              </div>
              <p className="absolute bottom-6 text-white/90 text-sm font-medium tracking-wide">點擊開始播放教學影片</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
              <div className="md:col-span-2">
                 <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{selectedTeacher.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                       {selectedTeacher.subject}
                    </span>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                   <Quote size={18} className="text-blue-500" /> 教學理念
                 </h4>
                 <p className="text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                   "{selectedTeacher.philosophy}"
                 </p>
                 <h4 className="font-bold text-slate-800 mb-2">課程介紹</h4>
                 <p className="text-slate-600 leading-relaxed">
                   {selectedTeacher.intro}
                 </p>
              </div>
              
              <div className="md:col-span-1 bg-blue-50 rounded-xl p-6 h-fit">
                 <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2 border-b border-blue-200 pb-2">
                    <GraduationCap size={18} /> 專業經歷
                 </h4>
                 <ul className="space-y-3">
                    {selectedTeacher.experience?.map((exp, i) => (
                       <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
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

export default JuniorTeacherCarousel;
