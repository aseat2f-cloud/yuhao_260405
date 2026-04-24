
import React, { useState, useRef } from 'react';
import { Rocket, ArrowRight, FlaskConical, ChevronLeft, ChevronRight, Users, Calendar, Map, Target, CheckCircle2, ChevronUp, ChevronsDown, Lightbulb, Waypoints } from 'lucide-react';
import BrochureViewer from './BrochureViewer';
import Modal from './Modal';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/5bo3d78bk5ygpww4xx7oo/251202_-_-DM_AH_01.jpg?rlkey=n6914auenialxg11u9tlv4dv1&raw=1",
  "https://www.dropbox.com/scl/fi/18rfzi9vqv67a0j5rufhd/251202_-_-DM_AH_02.jpg?rlkey=j35bxn0slkh7ubwtp56bp7un3&raw=1"
];

const COURSE_DATA = [
  {
    id: 'transition',
    label: '銜接課程',
    shortLabel: '銜接',
    description: '國小升國中是學習生涯的重要轉折點。我們的銜接課程專為小六畢業生設計，涵蓋國、英、數、自四大核心科目，幫助學生提前適應國中的學習強度與節奏，建立正確的讀書方法，贏在起跑點。',
    icon: <Rocket size={20} />,
    color: 'text-red-400', 
    classes: [
      { name: '暑期數學銜接班', desc: '掌握國中代數基礎，建立負數與方程式觀念，順利銜接國小數學落差。', subject: '數學' },
      { name: '暑期英文先修班', desc: '系統化複習基礎文法，擴充國中必備單字量，強化聽力與閱讀基礎。', subject: '英文' },
      { name: '國一國文素養班', desc: '培養國中程度的閱讀理解能力，掌握基礎寫作技巧與國學常識。', subject: '國文' },
      { name: '自然科學啟蒙班', desc: '引發對生物與理化的興趣，透過生動教學將抽象科學原理具象化。', subject: '自然' },
    ]
  },
  {
    id: 'g7',
    label: '國七階段',
    shortLabel: '國七',
    description: '國七是打穩學科根基的關鍵年。我們強調觀念的透徹理解而非死背，透過系統化的教學與嚴謹的練習，幫助學生在國中第一年就建立強大的競爭力，穩定校內排名。',
    icon: <Target size={20} />,
    color: 'text-blue-500', 
    classes: [
      { name: '國七數學進度班', desc: '深入解析代數、幾何基礎，培養嚴謹的邏輯推演與解題習慣。', subject: '數學' },
      { name: '國七英文實力班', desc: '紮實文法架構建立，系統化擴充單字量，提升聽說讀寫全方位能力。', subject: '英文' },
      { name: '國七國文精進班', desc: '精選古文與現代文學導讀，強化閱讀素養與作文模組化訓練。', subject: '國文' },
      { name: '國七生物專題班', desc: '圖解生物構造與功能，強化圖表分析能力，輕鬆應對素養題型。', subject: '自然' },
    ]
  },
  {
    id: 'g8',
    label: '國八階段',
    shortLabel: '國八',
    description: '國八課程難度大幅提升，是實力拉開差距的時期。我們針對理化、幾何等難點單元進行深度剖析，並強化跨領域整合能力，確保學生在繁重的課業中依然能游刃有餘。',
    icon: <FlaskConical size={20} />,
    color: 'text-orange-400', 
    classes: [
      { name: '國八數學幾何班', desc: '精熟幾何證明技巧與乘法公式，挑戰進階素養題型，提升邏輯深度。', subject: '數學' },
      { name: '國八英文進階班', desc: '掌握長篇閱讀與克漏字解析技巧，強化複雜句型分析與時事英語。', subject: '英文' },
      { name: '國八理化觀念班', desc: '理化觀念重於死背，透過實驗演示將抽象原理具象化，破解計算難題。', subject: '自然' },
      { name: '國八國文深究班', desc: '克服文言文閱讀障礙，精熟修辭應用，提升寫作深度與文學底蘊。', subject: '國文' },
    ]
  },
  {
    id: 'g9',
    label: '國九階段',
    shortLabel: '國九',
    description: '國九進入會考衝刺期。我們提供全科總複習與高強度模考演練，透過主題式統整與歷屆試題剖析，幫助學生精準掌握命題趨勢，目標會考 A++，前進第一志願。',
    icon: <CheckCircle2 size={20} />,
    color: 'text-purple-500', 
    classes: [
      { name: '國九數學衝刺班', desc: '統整三年觀念，大量模考演練與錯題訂正，精準掌握會考關鍵題型。', subject: '數學' },
      { name: '國九英文滿分班', desc: '全面攻略會考聽力與閱讀，素養題型專題講座，衝刺英文精熟等級。', subject: '英文' },
      { name: '國九自然總複習', desc: '力學、電學與地科重點圖表整理，強化跨科整合與圖表判讀能力。', subject: '自然' },
      { name: '國九國文作文班', desc: '形音義成語總複習，長文速讀技巧傳授，作文目標六級分密集特訓。', subject: '國文' },
    ]
  }
];

const TIMELINE_DATA = [
  { 
    grade: '小六升國七', 
    subtitle: '國中銜接啟動期', 
    goal: '提前適應 × 降低轉換焦慮', 
    courses: ['國中銜接課程（國文／英文／數學／自然）', '國中學習方法與時間管理指導', '暑期銜接先修班'] 
  },
  { 
    grade: '國中七年級', 
    subtitle: '打穩基礎關鍵年', 
    goal: '建立學科根基 × 穩定學習節奏', 
    courses: ['國七國文系統閱讀與寫作', '國七英文文法 × 閱讀 × 單字養成', '國七數學觀念理解與題型練習', '國七自然（生物／理化入門）', '寒暑假基礎強化班'] 
  },
  { 
    grade: '升國中八年級', 
    subtitle: '能力銜接強化期', 
    goal: '補弱扶強 × 銜接進階內容', 
    courses: ['國七總複習銜接課程', '國八先修課程（數學／英文／自然）', '暑期衝刺強化班'] 
  },
  { 
    grade: '國中八年級', 
    subtitle: '實力拉開差距期', 
    goal: '深化理解 × 提升解題能力', 
    courses: ['國八國文閱讀理解與寫作深化', '國八英文文法整合 × 閱讀理解', '國八數學重點單元強化', '國八自然（理化、生物）系統訓練', '寒暑假實力提升班'] 
  },
  { 
    grade: '升國中九年級', 
    subtitle: '會考準備啟動期', 
    goal: '重點整合 × 提前布局會考', 
    courses: ['國中全科重點銜接課程', '國九先修課程（國／英／數／自然）', '暑期會考基礎啟動班'] 
  },
  { 
    grade: '國中九年級', 
    subtitle: '會考衝刺關鍵期', 
    goal: '穩定輸出 × 精準得分', 
    courses: ['國九全科會考複習班', '模擬考解析與學習追蹤', '會考衝刺班／寒假總複習班'] 
  },
  { 
    grade: '升高中', 
    subtitle: '銜接新階段，提前準備', 
    goal: '平穩過渡 × 預備高中課程', 
    courses: ['高中先修銜接課程（數學／英文／自然）', '高中學習方法與課程規劃指導'] 
  },
];

const JuniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  
  // NEW STATE
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'schedule' | 'detail'>('schedule');

  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  const handleTogglePlan = () => {
    if (!isPlanOpen) {
      // Opening
      setIsPlanOpen(true);
      setTimeout(() => {
        if (timelineRef.current) {
          const y = timelineRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Closing
      handleCollapse();
    }
  };

  const handleCollapse = () => {
    // Scroll back to top of section first
    if (sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Delay closing to allow scroll to complete visibly
    setTimeout(() => {
      setIsPlanOpen(false);
    }, 500);
  };

  const openSchedule = (cls: any) => {
    setSelectedClass(cls);
    setModalMode('schedule');
  };

  const commonNotes = [
    "請準時出席，遲到超過 15 分鐘請先至櫃檯報到。",
    "請攜帶指定教材、筆記本與文具用品。",
    "課堂中請勿使用手機，並將手機轉為靜音。",
    "請假請提前 24 小時告知，以利安排補課。",
    "補習班保有課程異動之權利，如有變動將另行通知。"
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-blue-200 font-bold tracking-wide uppercase text-sm mb-3">育豪資優</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">國中課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          
          {/* Mobile Navigation (Buttons & Arrows) */}
          <div className="md:hidden flex flex-col gap-4">
            {/* Category Buttons Row */}
            <div className="flex justify-center gap-3 py-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {COURSE_DATA.map((subject, index) => (
                <button
                  key={subject.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all text-xs font-bold border-2 ${
                    activeTab === index 
                      ? 'bg-white text-blue-600 border-white shadow-lg scale-110' 
                      : 'bg-blue-700/50 text-blue-200 border-blue-500/30'
                  }`}
                >
                  {subject.shortLabel}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-blue-700/50 rounded-xl p-2 backdrop-blur-sm border border-blue-500/30">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100').replace('400', '100')} text-blue-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-blue-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Sidebar Tabs */}
          <div className="hidden md:flex md:w-1/4 flex-col gap-2">
            {COURSE_DATA.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-3 lg:px-6 lg:py-4 rounded-xl transition-all whitespace-nowrap text-left ${
                  activeTab === index 
                    ? `bg-white text-blue-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-blue-700/50 text-blue-100 hover:bg-blue-700 border border-blue-500/30'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-blue-100 text-blue-600' : 'bg-blue-800 text-blue-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={handleTogglePlan}
              className={`mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-blue-800 ring-2 ring-white' 
                  : 'bg-blue-800 text-white hover:bg-blue-700 border border-blue-600'
              }`}
            >
              <Map size={20} />
              <span className="text-lg">完整規劃</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-blue-50 leading-relaxed md:leading-loose text-base md:text-lg font-medium text-justify">
                  {COURSE_DATA[activeTab].description}
               </p>
            </div>

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-blue-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cls.name}
                      </h4>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-100">
                        {cls.subject}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {cls.desc}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                     <button 
                       onClick={() => openSchedule(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <a 
                       href="https://line.me/R/ti/p/@yuhaoschool"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-200"
                     >
                        了解課程 <ArrowRight size={14} />
                     </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Action Buttons (Moved below cards) */}
             <div className="flex justify-center mt-6 md:hidden">
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-blue-700' : 'bg-blue-700 text-white border border-blue-500'}`}
              >
                <Map size={18} />
                <span>完整規劃</span>
              </button>
             </div>

          </div>
        </div>

        {/* Full Plan Timeline Section (Vertical Centered) */}
        {isPlanOpen && (
          <div ref={timelineRef} className="mt-16 py-12 px-4 md:px-12 bg-white rounded-3xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex flex-col items-center justify-center gap-2 mb-16 md:mb-20">
               <div className="flex items-center gap-3">
                 <Map className="text-blue-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 text-center">國中完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">三年扎根，穩健迎戰升學關鍵</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-blue-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-blue-100 -translate-x-1/2 rounded-full md:hidden"></div>

                {/* NEW: Start Icon - Bouncing ChevronsDown */}
                <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="bg-blue-50 p-2 rounded-full border-2 border-blue-100 animate-bounce shadow-sm">
                      <ChevronsDown size={20} className="text-blue-600" />
                   </div>
                </div>
                
                <div className="space-y-8 md:space-y-16 mb-8"> 
                   {TIMELINE_DATA.map((step, idx) => (
                      <div key={idx} className={`flex flex-col md:flex-row items-center md:justify-between relative ${idx % 2 !== 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                         
                         {/* Side Content: Recommended Course Direction (Desktop Only) */}
                         <div className={`hidden md:flex w-5/12 flex-col justify-center ${idx % 2 !== 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                            <div className={`flex items-center gap-2 text-amber-500 font-bold mb-2 ${idx % 2 !== 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                               <span className="font-bold text-lg">推薦選課方向</span>
                               <CheckCircle2 size={20} />
                            </div>
                            <ul className="space-y-2">
                                {step.courses.map(c => (
                                    <li key={c} className={`text-slate-600 font-medium hover:text-blue-600 transition-colors ${idx % 2 !== 0 ? 'mr-1' : 'ml-1'}`}>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                         </div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-blue-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                         </div>

                         {/* Main Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-blue-50 rounded-2xl p-6 border border-blue-100 hover:bg-blue-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-blue-700 text-xs font-bold mb-3 border border-blue-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">{step.grade}</h4>
                                <p className="text-blue-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-blue-200 ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-1.5 ${idx % 2 !== 0 ? '' : 'md:flex-row-reverse'}`}>
                                            <Target size={16} />
                                            <span>學習目標</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">{step.goal}</p>
                                    </div>

                                    {/* Mobile Only: Courses Section inside card */}
                                    <div className="md:hidden pt-4 border-t border-blue-200/50 mt-2">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                                            <CheckCircle2 size={16} />
                                            <span>推薦選課方向</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {step.courses.map(c => (
                                                <li key={c} className="flex items-center gap-2 text-slate-700 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Bouncing Rocket Icon - Absolute position at bottom-0 */}
                <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Rocket className="text-blue-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
                >
                  <ChevronUp size={16} />
                  收起時間軸
                </button>
             </div>
          </div>
        )}
      </div>
      
      <BrochureViewer 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
        images={BROCHURE_IMAGES} 
      />

      {/* Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass ? (modalMode === 'schedule' ? `${selectedClass.name} - 課程表` : `${selectedClass.name} - 課程介紹`) : ''}
        maxWidth="max-w-4xl"
        headerClassName="bg-[#1D4ED8]"
      >
        {selectedClass && modalMode === 'schedule' && (
          <div className="space-y-6">
             {/* Weekly Schedule Table */}
             <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center min-w-[700px]">
                       <thead className="bg-[#1D4ED8] text-white font-bold">
                          <tr>
                             <th className="px-4 py-4 border-r border-blue-600/30">時段</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週一</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週二</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週三</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週四</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週五</th>
                             <th className="px-4 py-4 border-r border-blue-600/30">週六</th>
                             <th className="px-4 py-4">週日</th>
                          </tr>
                       </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {[
                            { period: '早', time: '09:00 - 12:00', schedule: ['', '', '', '', '', '數學', '自習'] },
                            { period: '午', time: '13:30 - 16:30', schedule: ['', '', '', '', '', '英文', '輔導'] },
                            { period: '晚', time: '18:30 - 21:30', schedule: ['國文', '數學', '理化', '英文', '數學', '自習', '輔導'] },
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-6 bg-slate-50 border-r border-slate-200">
                                <div className="font-bold text-blue-700 text-lg mb-1">{row.period}</div>
                                <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{row.time}</div>
                              </td>
                              {row.schedule.map((cell, cIdx) => {
                                const isTargetSubject = cell === selectedClass.subject || (selectedClass.subject === '自然' && (cell === '理化' || cell === '生物'));
                                const shouldShow = isTargetSubject;
                                return (
                                  <td key={cIdx} className={`px-2 py-4 border-r border-slate-100 last:border-r-0 ${cell && shouldShow ? 'bg-blue-50/50' : ''}`}>
                                    {cell && shouldShow && (
                                      <div className="flex flex-col items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <span className="font-bold text-blue-700">
                                          {cell}
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
             </div>

             {/* Notes */}
             <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                   課程注意事項
                </h4>
                <ul className="space-y-2 bg-yellow-50 p-5 rounded-xl text-slate-700 text-sm border border-yellow-100">
                   {commonNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                         <span className="text-yellow-500 font-bold">•</span>
                         {note}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        )}

        {selectedClass && modalMode === 'detail' && (
           <div className="space-y-8 p-2">
              {/* Header / Summary */}
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                 <p className="text-lg text-slate-700 leading-relaxed font-medium">
                   {selectedClass.desc}
                 </p>
                 <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100">
                       <Users size={18} className="text-blue-600" />
                       <span className="text-sm font-bold text-slate-700">對象：{selectedClass.target}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100">
                       <Target size={18} className="text-blue-600" />
                       <span className="text-sm font-bold text-slate-700">目標：{selectedClass.objectives}</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Features */}
                 <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Lightbulb className="text-yellow-500" />
                       課程特色
                    </h4>
                    <ul className="space-y-3">
                       {selectedClass.features && selectedClass.features.map((feat: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                             <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                             <span className="text-slate-700">{feat}</span>
                          </li>
                       ))}
                    </ul>
                 </div>

                 {/* Roadmap */}
                 <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Waypoints className="text-blue-600" />
                       系列課程規劃
                    </h4>
                    <div className="space-y-4">
                       {selectedClass.roadmap && selectedClass.roadmap.map((step: string, i: number) => (
                          <div key={i} className="flex items-center gap-4 relative group">
                             {/* Vertical Line */}
                             {i !== selectedClass.roadmap.length - 1 && (
                                <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-slate-200"></div>
                             )}
                             
                             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0 z-10 border-4 border-white shadow-sm">
                                {i + 1}
                             </div>
                             <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-slate-700 font-medium">
                                {step}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              {/* Call to Action */}
              <div className="pt-8 border-t border-slate-100 text-center">
                 <a 
                   href="#contact" 
                   onClick={() => setSelectedClass(null)}
                   className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                 >
                    立即預約試聽 <ArrowRight size={20} />
                 </a>
                 <p className="mt-3 text-sm text-slate-400">名額有限，建議提早預約保留席位</p>
              </div>
           </div>
        )}
      </Modal>
    </section>
  );
};

export default JuniorCourseRoadmap;
