
import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUp, Loader2, HelpCircle, MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ContactForm from './components/ContactForm';
import HomeBanner from './components/HomeBanner';
import LineConsultationModal from './components/LineConsultationModal';
import ProgramPlanning from './components/ProgramPlanning';
import OutstandingResults from './components/OutstandingResults';
import HonorRoll from './components/HonorRoll';
import ParentTestimonials from './components/ParentTestimonials';
import MobileFloatingNav from './components/MobileFloatingNav';
import { PageType, NewsItem } from './types';

// Lazy load heavy page components
const ElementaryPage = lazy(() => import('./components/ElementaryPage'));
const JuniorPage = lazy(() => import('./components/JuniorPage'));
const SeniorPage = lazy(() => import('./components/SeniorPage'));
const BulletinPage = lazy(() => import('./components/BulletinPage'));

// --- MOCK DATA HELPERS ---

const raw = (url: string) => url.replace('dl=0', 'raw=1');

// 榮耀成績 (Honors) - highlight
const BULLETIN_HONORS_IMAGES = [
  "https://www.dropbox.com/scl/fi/kje8gvmr642sfejxslovh/pic-1.jpg?rlkey=3wt3kclyge1fmjy5bt2lggat2&dl=0",
  "https://www.dropbox.com/scl/fi/mau4zf24fpof2q48kilcf/pic-2.jpg?rlkey=75tycw8sxbaql9uhti1e2kpnd&dl=0",
  "https://www.dropbox.com/scl/fi/mc139monzq1ngj8rj5kwi/pic-3.jpg?rlkey=yhyklzgzo1gdsi4os955daquv&dl=0",
  "https://www.dropbox.com/scl/fi/phtn7hq6cxd7x92e0mh5q/pic-12.jpg?rlkey=yi3ty0hwmbb6ysnu8uo362ww2&dl=0",
  "https://www.dropbox.com/scl/fi/nip7i3xceui1mndxsfri6/pic-5.jpg?rlkey=e57w7gbfqfguxilrw0t3k3tc7&dl=0",
  "https://www.dropbox.com/scl/fi/zw32ughf91fbojjl5segu/pic-11.jpg?rlkey=fd5nq5iehkuq95iq1huksfrjq&dl=0",
  "https://www.dropbox.com/scl/fi/nbwfsiv3oczx8pqve2tim/pic-9.jpg?rlkey=q2lss7ajn2wz8s77kw0fu8zzl&dl=0",
  "https://www.dropbox.com/scl/fi/ufoxfgm6xe38y84zhfqt2/pic-14.jpg?rlkey=dmiyhj1bacmttqfiocp395qam&dl=0",
  "https://www.dropbox.com/scl/fi/5q1mv00gh1bbh4bafwnjq/pic-15.jpg?rlkey=i18oonvk881urja14d9nd18w9&dl=0"
].map(raw);

// 活動資訊 (Events) - event
const BULLETIN_EVENTS_IMAGES = [
  "https://www.dropbox.com/scl/fi/wsncc82t5ftwxunrct10z/_-PO.jpg?rlkey=k2ah8u4xfxnyh86pxsfh28kfj&dl=0",
  "https://www.dropbox.com/scl/fi/0a95j5wkwbsihp75zl3t1/_-_01.jpg?rlkey=dbijit3l3rbuh52ygxcghro4w&dl=0",
  "https://www.dropbox.com/scl/fi/iru67bwdzuqs789iwezjs/_-PO-2.jpg?rlkey=eop6b2tug45p6kh9qcs9ckcxj&dl=0",
  "https://www.dropbox.com/scl/fi/66jsydgxwxs59agw2uwv5/pic-21.jpg?rlkey=zalfs9l4rwsdq1m02uimebrt5&dl=0",
  "https://www.dropbox.com/scl/fi/bbzjuqls82ti9apn70ejm/pic-22.jpg?rlkey=wh08bk7s53oq85f0z0diupwfg&dl=0",
  "https://www.dropbox.com/scl/fi/gcnvcfz85ursljtartje4/pic-6.jpg?rlkey=fwleioau7oexj3gfjas7p6rx5&dl=0",
  "https://www.dropbox.com/scl/fi/qkrpxzx5lbu1ep6vtshwv/pic-10.jpg?rlkey=3wwxzcbmc2pobzsppo9lzxana&dl=0",
  "https://www.dropbox.com/scl/fi/7xpir6068ax2ciby0hyy3/pic-7.jpg?rlkey=qusvdgacxmjsc36ufmdov230p&dl=0",
  "https://www.dropbox.com/scl/fi/6f64noimi8ssut55ldoxp/1.png?rlkey=g9q1n8v901jazo6brpsnbmxz6&dl=0"
].map(raw);

// 更多消息 (News) - normal
const BULLETIN_NORMAL_IMAGES = [
  "https://www.dropbox.com/scl/fi/zf1dccc6y6k4ebdmpwc59/pic-4.jpg?rlkey=rgqsyiwuwoxz0lu2lk3mtdfpp&dl=0",
  "https://www.dropbox.com/scl/fi/azaky2ebmuypp1phmrb74/pic-17.jpg?rlkey=l4nio8m2se2oygtfmgmwewtea&dl=0",
  "https://www.dropbox.com/scl/fi/yacybf07znbif857xk29o/pic-16.jpg?rlkey=su4eyhtgdtm5vfa94wm01ioda&dl=0",
  "https://www.dropbox.com/scl/fi/2gyl620emdw7ihecwgz6n/pic-13.jpg?rlkey=oabpnaej0x9rbxypc5ui4dmm1&dl=0",
  "https://www.dropbox.com/scl/fi/01n0d94pei1taghllxih6/pic-8.jpg?rlkey=0tqlkcxlw2yqr46elr2aidif5&dl=0",
  "https://www.dropbox.com/scl/fi/p95ekvg6xcvk4ao48ul52/pic-18.jpg?rlkey=hnyzw6tki59326n3i8ytevcdr&dl=0",
  "https://www.dropbox.com/scl/fi/37ni6uiuda2e5hztudoox/pic-20.jpg?rlkey=ij206dn25tx2texel3aa1v4cr&dl=0",
  "https://www.dropbox.com/scl/fi/tmeihc1i24pd596i672ot/pic-19.jpg?rlkey=1sm9qd7srr5lg3tlfzows5pqj&dl=0"
].map(raw);

const generateNewsItems = (images: string[], category: 'highlight' | 'event' | 'normal', prefix: string): NewsItem[] => {
  const titles = {
    highlight: [
      '賀！本校學員會考成績創高峰',
      '狂賀！學測滿級分勇奪頂尖大學',
      '捷報！全國奧林匹亞競賽獲金牌',
      '卓越表現：校內段考滿分榜單',
      '金榜題名：錄取建北第一志願',
      '實力見證：數理資優班錄取突破',
      '英語實力：英檢通過人數新高',
      '光榮時刻：頒獎典禮盛況',
      '學習楷模：優秀學員心得分享'
    ],
    event: [
      '【活動預告】暑期全美語夏令營',
      '【講座通知】新課綱升學策略分享',
      '【競賽報名】小育豪盃數學挑戰賽',
      '【親師座談】攜手陪伴孩子成長',
      '【特別企劃】小小科學家實驗營',
      '【課程說明】國中銜接先修班開課',
      '【快閃活動】預約試聽贈好禮',
      '【節慶活動】萬聖節美語嘉年華',
      '【成果發表】艾森樂年度成果展'
    ],
    normal: [
      '育豪資優：深耕板橋40年的堅持',
      '教學特色：小班制精緻化引導',
      '環境介紹：五星級K書中心導覽',
      '名師專欄：如何建立好的讀書習慣',
      '品牌故事：有溫度的教育陪伴',
      '最新公告：春節期間課程異動',
      '防疫資訊：校區環境定時消毒',
      '常見QA：給家長的入學小撇步'
    ]
  };

  return images.map((img, index) => ({
    id: `${prefix}-${index}`,
    title: titles[category][index % titles[category].length],
    summary: `掌握育豪第一手消息，了解更多關於${titles[category][index % titles[category].length]}的詳情。`,
    content: `【育豪快訊】\n\n${titles[category][index % titles[category].length]}\n\n我們始終秉持「沒有教不會的孩子，只有還沒被懂的心」的教育初衷。感謝家長對育豪的支持與信任，我們將持續優化教學環境與師資，為您的孩子打造最適合的學習路徑。\n\n欲了解更多細節，歡迎點擊下方「立即報名」或親洽櫃檯諮詢。`,
    image: img,
    date: '2025-05-20',
    category: category,
    externalLink: 'https://www.instagram.com/yuhao.school/'
  }));
};

const NEWS_HONORS = generateNewsItems(BULLETIN_HONORS_IMAGES, 'highlight', 'honor');
const NEWS_EVENTS = generateNewsItems(BULLETIN_EVENTS_IMAGES, 'event', 'event');
const NEWS_NORMAL = generateNewsItems(BULLETIN_NORMAL_IMAGES, 'normal', 'normal');

const ALL_NEWS: NewsItem[] = [...NEWS_HONORS, ...NEWS_EVENTS, ...NEWS_NORMAL];

// --- APP COMPONENT ---

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLineConsultation = () => {
    setIsLineModalOpen(true);
  };

  const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">載入中...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        {currentPage === 'elementary' && (
          <ElementaryPage 
            heroNews={NEWS_HONORS.slice(0, 3)}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'junior' && (
          <JuniorPage 
            heroNews={NEWS_HONORS.slice(3, 6)}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'senior' && (
          <SeniorPage 
            heroNews={NEWS_HONORS.slice(6, 9)}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'bulletin' && (
          <BulletinPage 
            news={ALL_NEWS} 
          />
        )}
        {currentPage === 'home' && (
          <>
            <Hero 
              title={
                <div className="inline-block text-left">
                  <span className="block mb-2">
                    懂孩子的
                    <span className="relative inline-block">心</span>
                  </span>
                  <span className="text-primary-600 block">
                    才能帶他們
                    <span className="relative inline-block">
                      飛
                      <span 
                        className="absolute left-[0.7em] h-[2px] bg-primary-200/60 pointer-events-none z-10"
                        style={{ 
                          bottom: 'calc(1.22em + 2px)',
                          width: 0,
                          transform: 'translateX(-50%)',
                          animation: 'groundLineControl 15s ease-in-out infinite'
                        }}
                      />
                      <div
                        className="absolute left-[0.7em] w-[3em] h-[10em] overflow-hidden pointer-events-none select-none z-20"
                        style={{ 
                          bottom: 'calc(1.22em + 2px)',
                          transform: 'translateX(-50%)' 
                        }}
                      >
                        <img
                          src="https://www.dropbox.com/scl/fi/28ybkxy6k4fwv3esmn2lw/.svg?rlkey=ttwp7q5t9rtwn2oe3gujgr14w&raw=1"
                          alt="kangaroo"
                          className="absolute bottom-0 left-1/2 w-[1.25em] h-[1.25em]"
                          style={{ 
                            opacity: 0,
                            transform: 'translateX(-50%) translateY(100%)',
                            animation: 'kangarooHorizonAction 15s ease-in-out infinite'
                          }}
                        />
                      </div>
                    </span>
                  </span>
                </div>
              } 
              subtitle="因為理解，所以包容；因為專業，所以卓越。我們不只是補習班，更是孩子成長路上最堅強的後盾。"
              newsItems={NEWS_HONORS.slice(0, 3)}
              onNavigate={setCurrentPage}
              showQuickLinks={true}
              gradeLabel="讀好書 • 交好友"
              courseLabel="品德優先 • 成績第一"
              secondaryBtnLabel="為什麼選育豪"
              secondaryBtnIcon={<HelpCircle size={20} />}
              secondaryBtnLink="#features"
            />
            <HomeBanner />
            <Features />
            <ProgramPlanning onNavigate={setCurrentPage} />
            <OutstandingResults />
            <HonorRoll />
            <ParentTestimonials />
          </>
        )}
      </Suspense>
    );
  };

  const getPageTheme = (): 'primary' | 'green' | 'blue' | 'purple' => {
    switch (currentPage) {
      case 'elementary': return 'green';
      case 'junior': return 'blue';
      case 'senior': return 'purple';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <style>{`
        @keyframes groundLineControl {
          0%, 9.9% { width: 0; opacity: 0; }
          10% { width: 0; opacity: 1; }
          12%, 82% { width: 1.32em; opacity: 1; }
          83%, 100% { width: 0; opacity: 0; }
        }
        @keyframes kangarooHorizonAction {
          0%, 10% { transform: translateX(-50%) translateY(100%) scaleX(1) rotate(0deg); opacity: 0; }
          10.1% { opacity: 1; }
          12% { transform: translateX(-50%) translateY(45%) rotate(-5deg); } 
          15% { transform: translateX(-50%) translateY(65%) rotate(5deg); }
          18% { transform: translateX(-50%) translateY(35%) rotate(-3deg); } 
          21% { transform: translateX(-50%) translateY(55%) rotate(0deg); }
          24% { transform: translateX(-50%) translateY(-35%) scaleY(1.05) rotate(10deg); } 
          26% { transform: translateX(-50%) translateY(0) scaleY(1) rotate(0deg); }
          30% { transform: translate(calc(-50% - 0.15em), -22%) rotate(-12deg); } 
          33% { transform: translate(-50%, 0) rotate(0deg); }
          36% { transform: translate(calc(-50% + 0.15em), -22%) rotate(12deg); } 
          39% { transform: translate(-50%, 0) rotate(0deg); }
          42% { transform: translate(calc(-50% - 0.12em), -20%) rotate(-10deg); } 
          45% { transform: translate(-50%, 0) rotate(0deg); }
          48% { transform: translate(calc(-50% + 0.12em), -20%) rotate(10deg); } 
          51% { transform: translate(-50%, 0) rotate(0deg); }
          54% { transform: translate(-50%, -25%) rotate(0deg) scaleY(1.05); } 
          57% { transform: translate(-50%, 0) rotate(0deg) scaleY(1); }
          60% { transform: translate(-50%, -15%) rotate(-5deg); } 
          63% { transform: translate(-50%, 0) rotate(0deg); }
          65.5% { transform: translateX(-50%) translateY(-15%) scaleY(1.08); } 
          67% { transform: translateX(-50%) translateY(0) scaleY(1); }
          68% { transform: translateX(-50%) translateY(0) scaleX(1); }
          71% { transform: translateX(-50%) translateY(-3%) scaleX(-1); } 
          75% { transform: translateX(-50%) translateY(0) scaleX(1); }
          76% { transform: translateX(-50%) translateY(-10%) rotate(0deg) scaleY(1.05); opacity: 1; }
          82% { transform: translateX(-50%) translateY(100%) scale(0.65) rotate(-5deg); opacity: 1; }
          83.1%, 100% { transform: translateX(-50%) translateY(100%); opacity: 0; }
        }
      `}</style>
      
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onOpenChat={() => setIsLineModalOpen(true)}
      />
      
      <main>
        {renderContent()}
        <ContactForm theme={getPageTheme()} />
      </main>

      <Footer />
      <ChatBot isOpen={isChatOpen} onToggle={setIsChatOpen} />
      <LineConsultationModal isOpen={isLineModalOpen} onClose={() => setIsLineModalOpen(false)} />
      
      {/* Desktop Floating LINE Button */}
      <button
        onClick={openLineConsultation}
        className={`hidden lg:flex fixed bottom-6 right-6 z-[45] p-4 rounded-full bg-[#06C755] text-white shadow-lg hover:bg-[#05b34c] hover:scale-110 transition-all duration-300 group ${isLineModalOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="LINE 諮詢"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-sm font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          線上諮詢
        </span>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
          1
        </span>
      </button>
      
      <MobileFloatingNav 
        currentPage={currentPage} 
        theme={getPageTheme()} 
        onOpenChat={openLineConsultation}
        showScrollTop={showScrollTop}
        onScrollTop={scrollToTop}
      />

      <button
        onClick={scrollToTop}
        className={`hidden lg:flex fixed bottom-24 right-6 z-30 p-3 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-600 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;
