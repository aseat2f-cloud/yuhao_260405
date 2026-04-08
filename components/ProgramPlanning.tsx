
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, BookOpen, Search } from 'lucide-react';
import { PageType } from '../types';

interface ProgramPlanningProps {
  onNavigate: (page: PageType) => void;
}

interface CourseImage {
  url: string;
  caption: string;
}

interface CourseCategory {
  id: string;
  name: string;
  images: CourseImage[];
}

interface ProgramData {
  id: string;
  title: string;
  grade: string;
  subtitle: string;
  desc: string;
  themeColor: string;
  borderColor: string;
  sectionBg: string;
  headerLabelColor: string;
  activeTabStyle: string;
  activeButtonClass: string;
  page: PageType;
  categories: CourseCategory[];
  teacherSectionId: string;
}

const convertDropboxLink = (url: string) => url.replace('dl=0', 'raw=1');

const PROGRAMS_DATA: Record<string, ProgramData> = {
  elementary: {
    id: 'elementary',
    title: '國小部',
    grade: '幼兒大班 ~ 小六',
    subtitle: '用愛灌溉，快樂成長',
    desc: '在育豪國小部，我們最珍視的是孩子眼中那份對世界的好奇光芒。結合艾森樂美語的全美語環境與小育豪資優數學的啟發式教學，我們將抽象的知識化為有趣的遊戲與體驗。這裡不只是教室，更是孩子探索世界的遊樂場。我們承諾用耐心與愛心，保護孩子的學習熱情，陪伴他們建立自信，為未來紮下最穩固、最快樂的根基。',
    themeColor: 'text-green-700',
    borderColor: 'border-green-100',
    sectionBg: 'bg-green-600',
    headerLabelColor: 'text-green-100',
    activeTabStyle: 'bg-white text-green-700 shadow-lg',
    activeButtonClass: 'bg-green-600 text-white border-green-600 ring-2 ring-green-200',
    page: 'elementary',
    teacherSectionId: 'teacher-carousel',
    categories: [
      {
        id: 'math',
        name: '數學',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/r2nuseglslav14h71mm7c/008-705x470.jpg?rlkey=wprqc04pifmsd63wmmbm9r5xj&dl=0'), caption: '獨創圖解教學法，將抽象數學具象化，讓孩子透過操作與觀察，輕鬆理解複雜觀念，建立紮實邏輯基礎。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/7ap5ovcaltzp7naqoenyq/010-705x436.jpg?rlkey=6g1knmp2gnk9yxyljct6bbo42&dl=0'), caption: '透過教具操作與互動討論，引導孩子主動提問，培養多角度思考與邏輯推理能力，激發對數學的熱情。' }
        ]
      },
      {
        id: 'english',
        name: '美語',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/2rehhlmcdp02p6s38zj9j/006.jpg?rlkey=bnce7y3hyfoz1bf8rs3g4k74q&dl=0'), caption: '全美語沉浸式環境，專業外師引導，讓孩子在自然情境中開口說英語，建立自信表達能力與國際視野。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/4px2b55be2s0amq614egi/001.jpg?rlkey=ar6i96aujzyr2s1cnuybkpf7r&dl=0'), caption: '結合繪本閱讀與節慶活動，透過生動有趣的故事教學，讓語言學習融入生活，快樂中培養語感。' }
        ]
      },
      {
        id: 'chinese',
        name: '國語文',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/jmiw89xm3x3ssmeu5looh/013-1-705x470.jpg?rlkey=12g0x8zayag3oi5oabwtjsjyy&dl=0'), caption: '精選文學作品導讀，引導孩子深入思考與鑑賞，透過討論分享，提升閱讀素養、理解力與表達能力。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/fqw7ec8xo52m15q54ummf/011-705x470.jpg?rlkey=yixf8ceylh559b0rd1lu66wx1&dl=0'), caption: '心智圖構思與寫作技巧指導，激發想像力，引導孩子觀察生活細節，寫出有溫度、有深度的文章。' }
        ]
      },
      {
        id: 'science',
        name: '自然科學',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/604adhbbhazralczaxuai/003.jpg?rlkey=eudoz8hqg84pgbgts1ww0gdfi&dl=0'), caption: '透過趣味科學實驗與觀察活動，引導孩子探索自然奧秘，培養實事求是的科學精神與動手解決問題的能力。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/fqw7ec8xo52m15q54ummf/011-705x470.jpg?rlkey=yixf8ceylh559b0rd1lu66wx1&dl=0'), caption: '結合生活情境的主題式教學，讓孩子從日常生活中發現科學原理，激發好奇心與主動探究的熱情。' }
        ]
      },
      {
        id: 'gifted',
        name: '資優升學',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/kseqyb5rsjz98d8leqbnp/009-705x470.jpg?rlkey=a12jhis4kqn5uf5tzdu18ew84&dl=0'), caption: '針對資優鑑定與私中入學考，提供精準命題分析與解題策略，強化邏輯思維與應試技巧，自信應考。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/2rehhlmcdp02p6s38zj9j/006.jpg?rlkey=bnce7y3hyfoz1bf8rs3g4k74q&dl=0'), caption: '模擬面試與實作演練，透過高強度訓練提升抗壓性，全面提升競爭力，助孩子在升學戰場脫穎而出。' }
        ]
      },
      {
        id: 'player',
        name: '小玩家',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/7ap5ovcaltzp7naqoenyq/010-705x436.jpg?rlkey=6g1knmp2gnk9yxyljct6bbo42&dl=0'), caption: '多元主題營隊，結合科學實驗、藝術創作與體能活動，讓孩子在探索中發現興趣，激發無限潛能。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/604adhbbhazralczaxuai/003.jpg?rlkey=eudoz8hqg84pgbgts1ww0gdfi&dl=0'), caption: '寓教於樂的戶外教學與團體活動，透過實際體驗與團隊合作，培養孩子解決問題的能力與人際互動技巧。' }
        ]
      }
    ]
  },
  junior: {
    id: 'junior',
    title: '國中部',
    grade: '國七 ~ 國九',
    subtitle: '陪伴青春，穩健前行',
    desc: '青春期的孩子，需要的不再是單向的管教，而是雙向的理解與引導。育豪國中部團隊扮演著亦師亦友的角色，除了提供精準的會考命題趨勢分析與個別化學科診斷，我們更重視孩子的心理素質與學習態度。在面對升學壓力時，我們是孩子最強的後盾，陪伴他們度過迷惘，找到奮鬥的目標，將潛力轉化為實力。',
    themeColor: 'text-blue-700',
    borderColor: 'border-blue-100',
    sectionBg: 'bg-blue-600',
    headerLabelColor: 'text-blue-100',
    activeTabStyle: 'bg-white text-blue-700 shadow-lg',
    activeButtonClass: 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200',
    page: 'junior',
    teacherSectionId: 'junior-teachers',
    categories: [
      {
        id: 'math',
        name: '數學',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/xn6tfjmjfz57t1a0o97dy/2-705x529.jpg?rlkey=0qxghaoz9h96lu75498vg8ryb&dl=0'), caption: '從代數運算到幾何證明，循序漸進建立嚴謹邏輯架構，透過觀念釐清與題型演練，奠定紮實數學基礎。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/604adhbbhazralczaxuai/003.jpg?rlkey=eudoz8hqg84pgbgts1ww0gdfi&dl=0'), caption: '分組討論與上台解題，鼓勵學生清晰表達解題思路，訓練邏輯表達力，培養自信溝通與互助學習精神。' }
        ]
      },
      {
        id: 'english',
        name: '英文',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/e6pxao76lqifuwu3vk8r5/IMG_1920-705x474.jpg?rlkey=kqmzy1fqcjfstovoo4tag22ow&dl=0'), caption: '強化文法架構與閱讀測驗技巧，透過系統化教學累積單字量，提升閱讀速度與精準度，厚植應試實力。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/jmiw89xm3x3ssmeu5looh/013-1-705x470.jpg?rlkey=12g0x8zayag3oi5oabwtjsjyy&dl=0'), caption: '透過主題式教學與時事探討，提升聽力與閱讀理解能力，將英語應用於實際生活，讓語言成為升學優勢。' }
        ]
      },
      {
        id: 'chinese',
        name: '國文',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/9r90b7r8b4jtyvetn12rt/IMG_7539-705x529.jpg?rlkey=zdlzwqbvsv5mk2t79c0wc5dvt&dl=0'), caption: '精選文言文與白話文閱讀篇章，深入解析文章意涵，提升閱讀素養與批判性思考，精準掌握考點。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/kseqyb5rsjz98d8leqbnp/009-705x470.jpg?rlkey=a12jhis4kqn5uf5tzdu18ew84&dl=0'), caption: '加強寫作技巧指導，引導運用修辭與名言佳句，透過結構佈局與情感抒發，輕鬆拿下作文高分。' }
        ]
      },
      {
        id: 'science',
        name: '自然',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/d7hrj9aboqtl04nt87b7g/IMG_7486-2-705x503.jpg?rlkey=o2niogjjr4tj7yzyu06jmeqkh&dl=0'), caption: '結合生物、理化與地科，透過實驗演示輔助教學，將抽象原理具象化，加深記憶並培養科學探究精神。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/9r90b7r8b4jtyvetn12rt/IMG_7539-705x529.jpg?rlkey=zdlzwqbvsv5mk2t79c0wc5dvt&dl=0'), caption: '強調觀念理解而非死背，引導學生思考自然現象背後的原理，靈活運用知識，從容應對會考素養題。' }
        ]
      },
      {
        id: 'sprint',
        name: '寒暑衝刺',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/z30qj5je1q6gew92obd3j/020.jpg?rlkey=37gi6a9ncyfuk16xi6lhfc42j&dl=0'), caption: '利用寒暑假黃金時間，進行超前進度學習或重點複習，幫助學生調整讀書節奏，贏在起跑點。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/ztq96vz6vf6aggmu801ne/021.jpg?rlkey=9755nld1ujkgmp8sg8xkjsb0p&dl=0'), caption: '提供安靜舒適的K書環境與專人輔導機制，營造專注學習氛圍，讓學生保持最佳備考狀態。' }
        ]
      }
    ]
  },
  senior: {
    id: 'senior',
    title: '高中部',
    grade: '高一 ~ 高三',
    subtitle: '夢想推手，展翅高飛',
    desc: '高中是通往夢想大學的最後一哩路，但我們知道，這也是孩子探索未來方向的重要時刻。育豪菁英高中部提供的不僅是學測與分科測驗的精準戰略，更包含一對一的學習歷程輔導與科系探索諮詢。我們的老師願意花時間傾聽孩子的志向，協助他們發掘優勢，讓每個孩子都能自信地選擇最適合自己的未來。',
    themeColor: 'text-purple-700',
    borderColor: 'border-purple-100',
    sectionBg: 'bg-purple-600',
    headerLabelColor: 'text-purple-100',
    activeTabStyle: 'bg-white text-purple-700 shadow-lg',
    activeButtonClass: 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-200',
    page: 'senior',
    teacherSectionId: 'senior-teachers',
    categories: [
      {
        id: 'g10_pre',
        name: '升高一',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/ngastj91xhedgevtfi8tn/_-33-705x381.jpg?rlkey=6sv7heubjzfbz5p5h4uyrqbw1&dl=0'), caption: '銜接國高中課程落差，強化核心觀念，引導學生調整讀書方法，培養自主學習與探究實作能力。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/41a52kh3dmp5a7j5kol8b/_-35-705x381.jpg?rlkey=wuyxh4koljibq9d0apzi3xg9n&dl=0'), caption: '針對新課綱素養導向，透過跨科整合與實作練習，奠定紮實學科基礎，為高中三年學習做好充分準備。' }
        ]
      },
      {
        id: 'g10',
        name: '高一',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/z30qj5je1q6gew92obd3j/020.jpg?rlkey=37gi6a9ncyfuk16xi6lhfc42j&dl=0'), caption: '高一基礎扎根，同步校內進度，強化數理邏輯與語文素養，建立高中學習的穩固基石。' }
        ]
      },
      {
        id: 'g11',
        name: '高二',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/ztq96vz6vf6aggmu801ne/021.jpg?rlkey=9755nld1ujkgmp8sg8xkjsb0p&dl=0'), caption: '高二實力拉開差距，深入學科核心觀念，面對選組挑戰，提供加深加廣課程，全面提升競爭力。' }
        ]
      },
      {
        id: 'g12',
        name: '高三',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/o9k3hmtz0mr7kfalig4nn/022.jpg?rlkey=k0yw6prgpjcpechkew5tbv6py&dl=0'), caption: '高三學測與分科測驗全方位備考，精準掌握大考趨勢，透過大量模考與解題技巧訓練，直攻頂尖大學。' },
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/arxryojkkdhwn6q3wxbhk/023.jpg?rlkey=0t51d4noouc516yypd8tsgiuu&dl=0'), caption: '針對個人弱點精準補強，搭配學習歷程檔案輔導與面試演練，全力協助學生實現升學夢想。' }
        ]
      },
      {
        id: 'study_hall',
        name: 'K書班',
        images: [
          { url: convertDropboxLink('https://www.dropbox.com/scl/fi/xte7eyduljfdtssl0e10r/K.jpg?rlkey=w49ksu1egkn6b6onvj1mxvyu3&dl=0'), caption: '專業K書環境，嚴格作息管理，搭配各科老師駐班解惑，讓學生在專注氛圍中發揮最大學習效益。' }
        ]
      }
    ]
  }
};

/**
 * ProgramContent Component
 * Renders the content card for a specific program.
 * Maintains its own state for category and image selection.
 * Pre-renders ALL images to ensure instant switching.
 */
const ProgramContent: React.FC<{ 
  program: ProgramData; 
  isActive: boolean; 
}> = ({ 
  program, 
  isActive 
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Derived
  const activeCategory = program.categories[activeCategoryIndex];
  const activeImages = activeCategory.images;
  const currentImage = activeImages[activeImageIndex];
  const isElementary = program.id === 'elementary';

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveImageIndex(0);
  };

  const handleImagePrev = () => {
    setActiveImageIndex(prev => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const handleImageNext = () => {
    setActiveImageIndex(prev => (prev + 1) % activeImages.length);
  };

  const renderCategoryName = (name: string) => {
    if (name.length === 4) {
      return (
        <span className="leading-tight">
          {name.substring(0, 2)}<br />{name.substring(2)}
        </span>
      );
    }
    return <span>{name}</span>;
  };

  return (
    <div 
      className={`rounded-3xl border ${program.borderColor} bg-white shadow-2xl shadow-black/10 overflow-hidden flex flex-col lg:flex-row transition-colors duration-300`}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      {/* Left Side: Info & Categories (57% Width for 4:3 ratio) */}
      <div className="p-6 lg:p-10 lg:w-[57%] flex flex-col relative z-10 bg-white border-b lg:border-b-0 lg:border-r border-slate-100">
        
        {/* Header */}
        <div className="flex flex-row flex-wrap items-center gap-4 mb-4">
          <h4 className="text-3xl font-extrabold text-slate-900 shrink-0">{program.title}</h4>
          <span className={`px-4 py-1.5 rounded-lg text-sm font-bold shrink-0 bg-slate-100 ${program.themeColor}`}>
              {program.grade}
          </span>
        </div>

        {/* Subtitle with line ABOVE */}
        <div className={`mb-6 ${program.themeColor}`}>
           <div className="w-full h-[1px] bg-current opacity-40 mb-4"></div>
           <h5 className="text-3xl font-extrabold">
              {program.subtitle}
           </h5>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-lg leading-relaxed text-justify mb-8">
          {program.desc}
        </p>

        {/* Course Categories Grid */}
        <div className="mb-0 mt-auto">
          <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
             <div className="w-8 h-[1px] bg-slate-300"></div>
             課程規劃
             <div className="flex-1 h-[1px] bg-slate-300"></div>
          </h5>
          
          <div className="flex items-center gap-1 sm:gap-0 sm:block">
              {/* Left Arrow */}
              <button 
                  onClick={scrollLeft}
                  className="sm:hidden mr-1 p-1 text-slate-400 hover:text-slate-600 shrink-0"
                  aria-label="Scroll left"
              >
                  <ChevronLeft size={24} />
              </button>

              <div 
                  ref={scrollContainerRef}
                  className={`
                    flex-1 flex flex-nowrap overflow-x-auto scrollbar-hide py-2 
                    sm:flex-wrap sm:overflow-visible
                    gap-2 sm:gap-4
                    ${isElementary ? 'lg:gap-2' : ''} 
                  `}
              >
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {program.categories.map((cat, idx) => {
                  const isCatActive = idx === activeCategoryIndex;
                  return (
                     <button 
                      key={cat.id}
                      onClick={() => handleCategoryChange(idx)}
                      className={`
                        rounded-full flex items-center justify-center text-center font-bold transition-all duration-200 border-2 shrink-0
                        w-16 h-16 text-sm sm:w-20 sm:h-20
                        ${
                        isCatActive 
                            ? `${program.activeButtonClass} shadow-md`
                            : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-200'
                      }`}
                     >
                       {renderCategoryName(cat.name)}
                     </button>
                  )
                })}
              </div>

              {/* Right Arrow */}
              <button 
                  onClick={scrollRight}
                  className="sm:hidden ml-1 p-1 text-slate-400 hover:text-slate-600 shrink-0"
                  aria-label="Scroll right"
              >
                  <ChevronRight size={24} />
              </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image Display (43% Width for 4:3 ratio) */}
      <div className="lg:w-[43%] bg-slate-50 flex flex-col justify-start">
         <div className="w-full relative group"> 
            
            {/* RENDER ALL IMAGES (Hidden vs Block) to prevent flickering */}
            {program.categories.map((cat, catIdx) => (
                cat.images.map((img, imgIdx) => {
                    // Only show the image if both category and image index match
                    const isVisible = (catIdx === activeCategoryIndex && imgIdx === activeImageIndex);
                    return (
                        <div key={`${cat.id}-${imgIdx}`} className={isVisible ? 'block' : 'hidden'}>
                            <img 
                              src={img.url} 
                              alt={cat.name} 
                              className="w-full h-auto object-contain block"
                              loading="eager"
                            />
                        </div>
                    );
                })
            ))}
            
            {/* Category Badge - Always visible, updates text based on state */}
            <span className={`absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-bold rounded-full shadow-sm border ${program.borderColor} z-10`}>
                {activeCategory.name}
            </span>

            {/* Navigation Controls - Always visible */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <button 
                onClick={handleImagePrev}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>

              <button 
                onClick={handleImageNext}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
         </div>

         {/* Caption Wrapper */}
         <div className="p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 flex-1">
            <p className="text-slate-600 text-base font-medium leading-relaxed text-justify w-full max-w-md mx-auto">
                {currentImage.caption}
            </p>

            {/* Dots Indicator */}
            <div className="flex gap-2 mt-4">
              {activeImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIndex ? 'bg-slate-800 w-4' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const ProgramPlanning: React.FC<ProgramPlanningProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'elementary' | 'junior' | 'senior'>('elementary');

  // Preload all images to prevent flickering/delay
  useEffect(() => {
    const allImages = Object.values(PROGRAMS_DATA).flatMap(program => 
      program.categories.flatMap(category => 
        category.images.map(img => img.url)
      )
    );
    
    // Create Image objects to force browser cache
    allImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const handleNavAndScroll = (page: PageType, sectionId: string) => {
    onNavigate(page);
    let attempts = 0;
    const maxAttempts = 20; 
    
    const pollElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(pollElement, 100);
      }
    };
    setTimeout(pollElement, 50);
  };

  const currentProgram = PROGRAMS_DATA[activeTab];

  return (
    <section id="program-planning" className={`py-24 transition-colors duration-500 ${currentProgram.sectionBg} scroll-mt-24 relative overflow-hidden`}>
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`${currentProgram.headerLabelColor} font-bold tracking-wide uppercase text-sm mb-3 transition-colors duration-300`}>完整學程規劃</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white transition-colors duration-300">分齡分級 • 系統化學習</h3>
          <p className="mt-6 text-white/90 max-w-3xl mx-auto text-lg leading-relaxed transition-opacity duration-300 text-justify md:text-center">
            我們針對不同年齡層孩子的心理與學習需求，量身打造專屬的成長地圖。不僅是知識的傳授，更重視興趣啟發、習慣養成與生涯探索，讓孩子在每個階段都能自信前行。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/20 p-1.5 rounded-full inline-flex gap-2 border border-white/10 backdrop-blur-sm shadow-inner overflow-x-auto max-w-full">
            {(['elementary', 'junior', 'senior'] as const).map((key) => {
              const prog = PROGRAMS_DATA[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 sm:px-8 py-3 rounded-full text-base font-bold transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? `${prog.activeTabStyle} transform scale-100` 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {prog.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card Wrapper */}
        <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Render all 3 Program Contents, toggling display */}
          {['elementary', 'junior', 'senior'].map((key) => (
             <ProgramContent
                key={key}
                program={PROGRAMS_DATA[key]}
                isActive={activeTab === key}
             />
          ))}

          {/* Bottom Buttons - Dependent on activeTab logic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto px-4">
             <button 
              onClick={() => handleNavAndScroll(currentProgram.page, 'course-roadmap')}
              className="py-3.5 px-6 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen size={18} /> 班別列表
            </button>

            <button 
              onClick={() => handleNavAndScroll(currentProgram.page, currentProgram.teacherSectionId)}
              className="py-3.5 px-6 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Users size={18} /> 師資陣容
            </button>

            <button 
              onClick={() => onNavigate(currentProgram.page)}
              className="py-3.5 px-6 rounded-xl bg-yellow-400 text-slate-900 font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:bg-yellow-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Search size={18} /> 了解更多
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProgramPlanning;
