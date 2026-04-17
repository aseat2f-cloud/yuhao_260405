
import React, { useState, useRef } from 'react';
import { Rocket, TrendingUp, Crown, Zap, ArrowRight, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar, Map, Target, CheckCircle2, ChevronUp, ChevronsDown, Lightbulb, Waypoints } from 'lucide-react';
import BrochureViewer from './BrochureViewer';
import Modal from './Modal';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/4x16xwu4vfqvpb66uhf9g/250325_02_114-A3-_-_02-728x1030.jpg?rlkey=903e438du7nwl2zxdvtuhkz0g&raw=1",
  "https://www.dropbox.com/scl/fi/y9rcf40o9pitgvjd7jf52/250430_114-A3-_-_B_-_-_01-729x1030.jpg?rlkey=biml4jgq8djcs680m2yqjp2u3&raw=1",
  "https://www.dropbox.com/scl/fi/3s5k7qr7ktc0rfh27v1z2/250430_114-A3-_-_B_-_-_02-729x1030.jpg?rlkey=7fzoxarncbiz63gbdttaj5iar&raw=1",
  "https://www.dropbox.com/scl/fi/30exwirm2iyfnaug61hzw/251204_-K-_02.jpg?rlkey=xlzhjv4d038j09siau6fkqpps&raw=1",
  "https://www.dropbox.com/scl/fi/e5ns81cucqjhw9v65h8jz/251204_-K-_03.jpg?rlkey=ytefc19dpfvy7vj49da6lvnhf&raw=1"
];

interface CourseClass {
  name: string;
  desc: string;
  age: string;
  time?: string;
  summerTime?: string;
  semesterTime?: string;
  objectives: string;
  target: string;
  features: string[];
  roadmap: string[];
}

interface CourseCategory {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  classes: CourseClass[];
}

const COURSE_DATA: CourseCategory[] = [
  {
    id: 'pre_g10',
    label: '升高一',
    shortLabel: '先修',
    icon: <Rocket size={20} />,
    color: 'text-green-500', 
    classes: [
      { name: '高一先修數學', desc: '銜接國高中落差，提前掌握高中邏輯', age: '升高一', time: '週一至五 09:00', objectives: '弭平國高中數學斷層，建立高中數學嚴謹邏輯。', target: '國三畢業生，目標頂尖高中的學生。', features: ['銜接教材精準切入重點', '重視定義與定理推導', '每週進度檢測', '資深名師親自授課'], roadmap: ['7月: 數與式', '8月: 多項式函數', '9月: 銜接校內進度'] },
      { name: '高一先修英文', desc: '字彙量大躍進，掌握高中五大句型', age: '升高一', time: '週一至五 09:00', objectives: '擴充字彙至 4500 單字，精熟高中核心文法架構。', target: '國三畢業生，希望提前適應高中英文難度的學生。', features: ['字根字首記憶法', '長篇閱讀技巧導讀', '基礎翻譯寫作訓練', '英聽實力養成'], roadmap: ['7月: 核心文法總整理', '8月: 閱讀技巧特訓', '9月: 銜接校內進度'] },
      { name: '高一先修國文', desc: '奠定高中素養閱讀基礎，掌握文言文精要', age: '升高一', time: '週一至五 09:00', objectives: '提升閱讀理解能力，提早適應高中素養題型。', target: '國三畢業生，希望強化國文素養的學生。', features: ['主題式閱讀訓練', '文言文基礎語法', '寫作架構初步建立', '名篇導讀與賞析'], roadmap: ['7月: 文言文基礎', '8月: 素養閱讀特訓', '9月: 銜接校內進度'] },
      { name: '高一先修物化', desc: '銜接高中自然科學難度，建立科學邏輯', age: '升高一', time: '週一至五 09:00', objectives: '預習高中物理化學核心觀念，降低學習門檻。', target: '國三畢業生，目標理工醫農科系的學生。', features: ['物理力學基礎', '化學計量與原子結構', '實驗原理深入淺出', '邏輯推理能力訓練'], roadmap: ['7月: 物理核心觀念', '8月: 化學基礎原理', '9月: 銜接校內進度'] },
    ]
  },
  {
    id: 'g10',
    label: '高一規劃',
    shortLabel: '高一',
    icon: <TrendingUp size={20} />,
    color: 'text-emerald-500', 
    classes: [
      { name: '高一數學班', desc: '校內進度同步，段考高分攻略', age: '高一上/高一下', semesterTime: '週一/四 18:30', objectives: '精通校內進度，掌握段考必考題型，建立紮實基礎。', target: '高一學生，追求校內成績優異者。', features: ['各校版本精準分流', '段考重點題型精析', '錯題追蹤與個別輔導', '考前密集衝刺演練'], roadmap: ['上學期: 多項式與指對數', '下學期: 三角比與數列級數'] },
      { name: '高一英文班', desc: '許豪英文體系，全方位實力提升', age: '高一上/高一下', semesterTime: '週二/五 18:30', objectives: '提升閱讀深度與寫作精準度，同步強化聽力與口說。', target: '高一學生，目標學測英文滿級分者。', features: ['主題式單字擴充', '新聞英語與雜誌導讀', '翻譯寫作架構建立', '全真模擬考演練'], roadmap: ['上學期: 4500單字與閱讀', '下學期: 雜誌閱讀與聽力'] },
      { name: '高一國文班', desc: '素養閱讀與寫作訓練，強化國綜實力', age: '高一上/高一下', semesterTime: '週三 18:30', objectives: '提升閱讀素養，精進寫作技巧，應對新課綱考題。', target: '高一學生，希望提升國文成績與素養者。', features: ['跨領域素養閱讀', '國寫作文分階段訓練', '古文三十篇精析', '段考重點複習'], roadmap: ['上學期: 文言文與閱讀', '下學期: 寫作與素養題'] },
      { name: '高一物化班', desc: '基礎觀念建構與實驗原理，自然科高分關鍵', age: '高一上/高一下', semesterTime: '週六 09:00', objectives: '建立物理化學紮實基礎，掌握段考必考重點。', target: '高一學生，目標自然科高分者。', features: ['物理基礎觀念釐清', '化學反應與結構精講', '實驗原理圖解分析', '段考考古題演練'], roadmap: ['上學期: 基礎物理化學', '下學期: 進階自然科學'] },
    ]
  },
  {
    id: 'g11',
    label: '高二規劃',
    shortLabel: '高二',
    icon: <Crown size={20} />,
    color: 'text-blue-500', 
    classes: [
      { name: '高二數學班', desc: '代數、幾何進階與三角函數', age: '升高二/高二上/高二下', summerTime: '週一至五 09:00', semesterTime: '週二/五 18:30', objectives: '深入探討三角函數、平面向量與空間幾何，培養空間想像力與運算能力。', target: '高二學生，數A/數B分流強化學習。', features: ['數A/數B分流專業教學', '空間幾何教具輔助理解', '難題破解思路引導', '歷屆考題趨勢分析'], roadmap: ['暑期: 三角函數先修', '上學期: 平面向量與直線圓', '下學期: 空間向量與矩陣'] },
      { name: '高二英文班', desc: '進階文法與寫作架構訓練', age: '升高二/高二上/高二下', summerTime: '週一至五 13:30', semesterTime: '週一/四 18:30', objectives: '精熟進階文法句型，提升長篇作文撰寫能力，目標學測英文滿級分。', target: '高二學生，目標學測英文 15 級分的學生。', features: ['主題式寫作模組訓練', '高級單字與片語擴充', 'CNN/BBC 新聞英語選讀', '翻譯寫作個別批改'], roadmap: ['暑期: 寫作句型特訓', '上學期: 7000單字與閱讀', '下學期: 模考實戰與寫作'] },
      { name: '高二國文班', desc: '進階古文與現代文學鑑賞，深化閱讀深度', age: '升高二/高二上/高二下', summerTime: '週三 09:00', semesterTime: '週五 18:30', objectives: '深入解析經典文學，強化長篇閱讀與寫作深度。', target: '高二學生，目標國文頂標者。', features: ['進階古文精讀', '現代文學主題分析', '國寫深度寫作指導', '學測題型提前接觸'], roadmap: ['上學期: 經典古文精析', '下學期: 現代文學與寫作'] },
      { name: '高二物化班', desc: '力學、電學與化學反應平衡，理工科必修', age: '升高二/高二上/高二下', summerTime: '週四 09:00', semesterTime: '週六 13:30', objectives: '掌握高二物理化學進階觀念，為高三複習奠基。', target: '高二自然組學生。', features: ['物理力學與電學精講', '化學平衡與酸鹼反應', '難題解析與觀念整合', '段考高分攻略'], roadmap: ['上學期: 力學與化學平衡', '下學期: 電學與有機化學'] },
    ]
  },
  {
    id: 'g12',
    label: '高三規劃',
    shortLabel: '高三',
    icon: <Zap size={20} />,
    color: 'text-purple-500', 
    classes: [
      { name: '高三數學班', desc: '學測範圍總複習與難題解析', age: '升高三/高三上/高三下', summerTime: '週一至五 09:00', semesterTime: '週六 13:30', objectives: '針對學測數學範圍進行地毯式複習，強化跨單元整合與解題速度。', target: '高三考生，目標學測數學滿級分。', features: ['學測重點觀念總整理', '混合題型與素養題攻略', '高強度模考實戰演練', '錯題分析與弱點補強'], roadmap: ['暑期: 1-2冊總複習', '開學: 3-4冊總複習', '考前: 全範圍模考衝刺'] },
      { name: '高三英文班', desc: '模擬試題演練與翻譯寫作衝刺', age: '升高三/高三上/高三下', summerTime: '週一至五 13:30', semesterTime: '週六 10:00', objectives: '透過大量模考題型演練，維持語感與解題手感，衝刺學測英文高分。', target: '高三考生，目標學測英文頂標以上。', features: ['每週一份全真模擬試題', '翻譯寫作即時批改檢討', '時事關鍵字彙補充', '閱讀測驗速讀技巧'], roadmap: ['暑期: 文法單字總複習', '開學: 歷屆試題全攻略', '考前: 寫作與翻譯衝刺'] },
      { name: '高三國文班', desc: '學測國綜與國寫全攻略，精準奪分', age: '升高三/高三上/高三下', summerTime: '週五 09:00', semesterTime: '週日 09:00', objectives: '全面複習學測國文範圍，精準掌握國寫得分關鍵。', target: '高三考生，目標國文滿級分者。', features: ['學測國綜重點整理', '國寫作文模組化訓練', '歷屆試題深度解析', '考前猜題與模考'], roadmap: ['暑期: 基礎觀念複習', '開學: 歷屆試題演練', '考前: 國寫與總複習'] },
      { name: '高三自然班', desc: '自然科學全範圍複習與模考，衝刺頂大', age: '升高三/高三上/高三下', summerTime: '週四 13:30', semesterTime: '週日 13:30', objectives: '整合高中物理化學全範圍，強化解題邏輯與速度。', target: '高三自然組考生。', features: ['自然全範圍觀念整合', '高難度題型破解技巧', '全真模擬考實戰', '考前重點精華掃描'], roadmap: ['暑期: 基礎範圍複習', '開學: 進階題型演練', '考前: 全範圍模考衝刺'] },
      { name: '高三學測複習班', desc: '全方位學測重點總整理，精準鎖定必考題型', age: '高三', semesterTime: '週六 18:30 / 週日 09:00', objectives: '在學測前進行最後一輪地毯式複習，強化解題速度與準確度。', target: '高三考生，衝刺學測高分者。', features: ['各科精華講義整理', '歷屆試題深度剖析', '考前精準猜題', '弱點單元快速補強'], roadmap: ['第一階段: 核心觀念整合', '第二階段: 歷屆試題演練', '第三階段: 考前衝刺模考'] },
    ]
  },
  {
    id: 'study_hall',
    label: 'K書班',
    shortLabel: 'K書',
    icon: <Clock size={20} />,
    color: 'text-red-500', 
    classes: [
      { name: '高二主科寒假K書營', desc: '寒假密集衝刺，強化高二核心主科，為高三複習提前暖身。', age: '高二', time: '寒假期間', objectives: '利用寒假黃金時間，針對國英數等核心科目進行深度補強。', target: '高二學生，希望利用寒假提升競爭力者。', features: ['各科重點單元複習', '專人解惑輔導', '高強度讀書氛圍', '學習進度追蹤'], roadmap: ['第一週: 核心觀念複習', '第二週: 難題解析與實作'] },
      { name: '升高三暑期K書班', desc: '暑假黃金期，展開學測第一輪複習，建立完整知識架構。', age: '升高三', time: '暑假期間', objectives: '全面複習學測範圍，建立紮實基礎，搶佔升學先機。', target: '升高三考生，目標學測頂標者。', features: ['學測範圍地毯式複習', '規律作息管理', '每日進度檢測', '專業助教現場解惑'], roadmap: ['7月: 第一、二冊複習', '8月: 第三、四冊複習'] },
      { name: '高三平日K書班', desc: '放學後的專注時光，規律作息穩定進步，遠離手機分心。', age: '高三', semesterTime: '週一至週五 18:00', objectives: '提供穩定、安靜的讀書環境，協助學生建立規律的讀書習慣。', target: '高三考生，需要專注讀書空間者。', features: ['嚴格門禁與手機管理', '安靜舒適的K書空間', '專人點名與作息督導', '各科輔導老師駐班'], roadmap: ['每日: 自主讀書與解惑', '每週: 學習進度檢核'] },
      { name: '高三元月K書營', desc: '學測前最後衝刺，全天候模擬大考作息，調整最佳戰力。', age: '高三', time: '一月學測前', objectives: '模擬學測考試作息，進行最後階段的弱點補強與心理建設。', target: '高三考生，進行最後衝刺者。', features: ['全真模擬考作息', '考前猜題與重點掃描', '心理諮詢與壓力釋放', '最後衝刺計畫訂定'], roadmap: ['考前14天: 模擬考與檢討', '考前7天: 核心重點回顧'] },
    ]
  }
];

const TIMELINE_DATA = [
  { 
    grade: '升高中', 
    subtitle: '高中先修與學習轉換期', 
    goal: '提前起跑 × 適應高中節奏', 
    courses: ['高中先修課程（國文／英文／數學／物理／化學）', '高中學習方法與時間管理指導', '暑期銜接先修班'] 
  },
  { 
    grade: '高一', 
    subtitle: '基礎扎根關鍵年', 
    goal: '觀念建立 × 穩定輸出', 
    courses: ['高一國文閱讀理解與寫作訓練', '高一英文文法 × 閱讀 × 字彙累積', '高一數學觀念建構與題型練習', '高一物理／化學基礎課程', '寒暑假基礎強化班'] 
  },
  { 
    grade: '升高二', 
    subtitle: '能力整合與銜接期', 
    goal: '補強弱點 × 銜接進階內容', 
    courses: ['高一總複習銜接課程', '高二先修課程（數學／物理／化學／英文）', '暑期實力銜接班'] 
  },
  { 
    grade: '高二', 
    subtitle: '實力拉開差距期', 
    goal: '深化理解 × 建立解題效率', 
    courses: ['高二國文素養閱讀與寫作提升', '高二英文閱讀理解 × 長文分析', '高二數學重點單元強化', '高二物理／化學進階課程', '寒暑假實力提升衝刺班'] 
  },
  { 
    grade: '升高三', 
    subtitle: '升學戰力啟動期', 
    goal: '整合重點 × 對接升學考試', 
    courses: ['高中全科重點銜接課程', '學測／分科先修課程', '暑期升學啟動班'] 
  },
  { 
    grade: '高三', 
    subtitle: '全面備考實戰期', 
    goal: '穩定表現 × 精準得分', 
    courses: ['高三國文／英文／數學總複習', '物理／化學重點題型與觀念整合', 'K書班（讀書計畫訂定＋現場輔導）', '擬真模考與考後解析'] 
  },
  { 
    grade: '考前衝刺', 
    subtitle: '關鍵分數決勝期', 
    goal: '穩定心態 × 發揮實力', 
    courses: ['考前總複習衝刺班', '高頻考點快速掃描', '擬真模考實戰演練', '考前K書與個別重點指導'] 
  },
];

const SeniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  
  // NEW STATE
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'schedule' | 'detail'>('schedule');
  const [selectedSemester, setSelectedSemester] = useState<string>('first');

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
    if (cls.age.includes('升高二') || cls.age.includes('升高三')) {
      setSelectedSemester('summer');
    } else {
      setSelectedSemester('first');
    }
  };

  const openDetail = (cls: any) => {
    setSelectedClass(cls);
    setModalMode('detail');
  };

  // Generate Mock Schedule Data
  const generateSchedule = (cls: any, semester: string = 'first') => {
    const daysMap: Record<string, string> = { '週一': 'Mon', '週二': 'Tue', '週三': 'Wed', '週四': 'Thu', '週五': 'Fri', '週六': 'Sat', '週日': 'Sun' };
    
    const timeStr = semester === 'summer' ? (cls.summerTime || cls.time || '') : (cls.semesterTime || cls.time || '');

    let primaryDay = '週六';
    for (const d of Object.keys(daysMap)) {
      if (timeStr.includes(d)) {
        primaryDay = d;
        break;
      }
    }

    let topics = [];
    let month = '07';

    if (semester === 'summer') {
      topics = [
        '暑期先修課程 (一)',
        '暑期先修課程 (二)',
        '核心觀念建立',
        '進階觀念推導',
        '暑期專題研究',
        '實驗原理探討',
        '暑期成果檢測 (一)',
        '暑期成果檢測 (二)'
      ];
      month = '07';
    } else if (semester === 'first') {
      topics = [
        '上學期進度課程 (一)',
        '上學期進度課程 (二)',
        '核心素養導讀',
        '進階觀念解析',
        '歷屆考題分析',
        '素養題型破解',
        '模擬測驗與輔導',
        '段考衝刺演練'
      ];
      month = '09';
    } else {
      topics = [
        '下學期進度預習',
        '跨單元整合應用',
        '進階解題技巧',
        '素養題型演練',
        '各校考古題精析',
        '邏輯思維訓練',
        '模擬測驗與補強',
        '學期成果總結'
      ];
      month = '02';
    }

    return Array.from({ length: 8 }).map((_, i) => ({
      date: `${month}/${String(i * 7 + 5).padStart(2, '0')}`,
      day: primaryDay,
      time: timeStr.includes(':') ? timeStr.split(' ')[1] + '-' + (parseInt(timeStr.split(' ')[1].split(':')[0]) + 3) + ':00' : '18:30-21:30',
      unit: `第 ${i+1} 單元`,
      courseName: topics[i]
    }));
  };

  const commonNotes = [
    "請準時出席，遲到超過 15 分鐘請先至櫃檯報到。",
    "請攜帶指定教材、筆記本與文具用品。",
    "課堂中請勿使用手機，並將手機轉為靜音。",
    "請假請提前 24 小時告知，以利安排補課。",
    "補習班保有課程異動之權利，如有變動將另行通知。"
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-purple-300 font-bold tracking-wide uppercase text-sm mb-3">育豪菁英</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">高中課程規劃</h3>
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
                      ? 'bg-white text-purple-600 border-white shadow-lg scale-110' 
                      : 'bg-purple-900/50 text-purple-200 border-purple-800'
                  }`}
                >
                  {subject.shortLabel}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-purple-800 rounded-xl p-2 border border-purple-700">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-purple-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100')} text-purple-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-purple-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-purple-700 transition-colors"
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
                    ? `bg-white text-purple-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800 border border-purple-800'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-purple-100 text-purple-600' : 'bg-purple-700 text-purple-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">最新消息</span>
            </button>

            <button
              onClick={handleTogglePlan}
              className={`mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-purple-800 ring-2 ring-white' 
                  : 'bg-purple-800 text-white hover:bg-purple-700 border border-purple-600'
              }`}
            >
              <Map size={20} />
              <span className="text-lg">完整規劃</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-purple-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {cls.name}
                    </h4>

                     {/* Meta Tags: Age & Time */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-purple-50 px-2.5 py-1.5 rounded-md border border-purple-100">
                         <Users size={14} className="text-purple-600" /> 
                         <span>{cls.age}</span>
                      </div>
                    </div>

                    {/* Structured Time Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock size={12} /> 上課時間
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {cls.summerTime && (
                          <div className="flex items-center justify-between bg-amber-50/50 px-3 py-2 rounded-lg border border-amber-100/50 group/time hover:bg-amber-50 transition-colors">
                            <span className="text-[10px] font-bold text-amber-600 bg-white px-1.5 py-0.5 rounded border border-amber-100">暑期</span>
                            <span className="text-xs font-bold text-slate-700">{cls.summerTime}</span>
                          </div>
                        )}
                        {(cls.semesterTime || cls.time) && (
                          <div className="flex items-center justify-between bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100/50 group/time hover:bg-blue-50 transition-colors">
                            <div className="flex gap-1.5">
                              {COURSE_DATA[activeTab].id === 'pre_g10' ? (
                                <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">暑期</span>
                              ) : COURSE_DATA[activeTab].id === 'study_hall' ? (
                                <>
                                  {cls.name.includes('寒假') && <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">寒假</span>}
                                  {cls.name.includes('暑期') && <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">暑期</span>}
                                  {cls.name.includes('平日') && (
                                    <>
                                      <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">上學期</span>
                                      <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">下學期</span>
                                    </>
                                  )}
                                  {cls.name.includes('元月') && <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">元月</span>}
                                </>
                              ) : (
                                <>
                                  <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">上學期</span>
                                  <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100">下學期</span>
                                </>
                              )}
                            </div>
                            <span className="text-xs font-bold text-slate-700">{cls.semesterTime || cls.time}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {cls.desc}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                     <button 
                       onClick={() => openSchedule(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <button 
                       onClick={() => openDetail(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-purple-200"
                     >
                        了解課程 <ArrowRight size={14} />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Action Buttons (Moved below cards) */}
             <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
               <button
                onClick={() => setIsBrochureOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-sm"
              >
                <FileText size={18} />
                <span>最新消息</span>
              </button>
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-purple-700' : 'bg-purple-700 text-white border border-purple-500'}`}
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
                 <Map className="text-purple-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-purple-800 text-center">高中完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">三年佈局，穩健迎戰學測與分科</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-purple-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-purple-100 -translate-x-1/2 rounded-full md:hidden"></div>

                {/* NEW: Start Icon - Bouncing ChevronsDown */}
                <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="bg-purple-50 p-2 rounded-full border-2 border-purple-100 animate-bounce shadow-sm">
                      <ChevronsDown size={20} className="text-purple-600" />
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
                                    <li key={c} className={`text-slate-600 font-medium hover:text-purple-600 transition-colors ${idx % 2 !== 0 ? 'mr-1' : 'ml-1'}`}>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                         </div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-purple-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-purple-800 rounded-full"></div>
                         </div>

                         {/* Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-purple-50 rounded-2xl p-6 border border-purple-100 hover:bg-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-purple-700 text-xs font-bold mb-3 border border-purple-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-purple-900 mb-1">{step.grade}</h4>
                                <p className="text-purple-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-purple-200 ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-1.5 ${idx % 2 !== 0 ? '' : 'md:flex-row-reverse'}`}>
                                            <Target size={16} />
                                            <span>學習目標</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">{step.goal}</p>
                                    </div>

                                    {/* Mobile Only: Courses Section inside card */}
                                    <div className="md:hidden pt-4 border-t border-purple-200/50 mt-2">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                                            <CheckCircle2 size={16} />
                                            <span>推薦選課方向</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {step.courses.map(c => (
                                                <li key={c} className="flex items-center gap-2 text-slate-700 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
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
                {/* 
                   Vertical Alignment: 
                   - Timeline line ends at bottom-6 (24px)
                   - Rocket is h-12 (48px). bottom-0 places its center at 24px.
                   - Thus, line ends at center of rocket.
                   - Wrapped in a div to separate positioning transform from animation transform
                */}
                <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-white border-4 border-purple-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                       <Rocket className="text-purple-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-purple-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
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
        headerClassName="bg-[#5FA8D3]"
      >
        {selectedClass && modalMode === 'schedule' && (
          <div className="space-y-6">
             {/* Info Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold text-sm">上課對象：</span>
                    <span className="text-slate-900 font-medium">{selectedClass.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold text-sm">上課時間：</span>
                    <span className="text-slate-900 font-medium">
                      {selectedSemester === 'summer' ? (selectedClass.summerTime || selectedClass.time) : (selectedClass.semesterTime || selectedClass.time)}
                    </span>
                  </div>
                </div>

                {/* Semester Toggle for Grade 10 */}
                {selectedClass.age === '高一上/高一下' && (
                  <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                      onClick={() => setSelectedSemester('first')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                        selectedSemester === 'first' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-500 hover:text-purple-600'
                      }`}
                    >
                      高一上
                    </button>
                    <button
                      onClick={() => setSelectedSemester('second')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                        selectedSemester === 'second' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-500 hover:text-purple-600'
                      }`}
                    >
                      高一下
                    </button>
                  </div>
                )}

                {/* Semester Toggle for Grade 11/12 (3 options) */}
                {(selectedClass.age.includes('升高二') || selectedClass.age.includes('升高三')) && (
                  <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                      onClick={() => setSelectedSemester('summer')}
                      className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${
                        selectedSemester === 'summer' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-500 hover:text-purple-600'
                      }`}
                    >
                      {selectedClass.age.includes('升高二') ? '升高二' : '升高三'}
                    </button>
                    <button
                      onClick={() => setSelectedSemester('first')}
                      className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${
                        selectedSemester === 'first' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-500 hover:text-purple-600'
                      }`}
                    >
                      {selectedClass.age.includes('升高二') ? '高二上' : '高三上'}
                    </button>
                    <button
                      onClick={() => setSelectedSemester('second')}
                      className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${
                        selectedSemester === 'second' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-500 hover:text-purple-600'
                      }`}
                    >
                      {selectedClass.age.includes('升高二') ? '高二下' : '高三下'}
                    </button>
                  </div>
                )}
             </div>

             {/* Schedule Table */}
             <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[600px]">
                       <thead className="bg-[#5FA8D3] text-white font-bold uppercase">
                          <tr>
                             <th className="px-4 py-3 whitespace-nowrap">日期</th>
                             <th className="px-4 py-3 whitespace-nowrap">星期</th>
                             <th className="px-4 py-3 whitespace-nowrap">時間</th>
                             <th className="px-4 py-3 whitespace-nowrap">單元名稱</th>
                             <th className="px-4 py-3 whitespace-nowrap">課程名稱</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {generateSchedule(selectedClass, selectedSemester).map((row, idx) => (
                             <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-900">{row.date}</td>
                                <td className="px-4 py-3 text-slate-500">{row.day}</td>
                                <td className="px-4 py-3 text-slate-500">{row.time}</td>
                                <td className="px-4 py-3 text-purple-600 font-bold">{row.unit}</td>
                                <td className="px-4 py-3 text-slate-700">{row.courseName}</td>
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
              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                 <p className="text-lg text-slate-700 leading-relaxed font-medium">
                   {selectedClass.desc}
                 </p>
                 <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100">
                       <Users size={18} className="text-purple-600" />
                       <span className="text-sm font-bold text-slate-700">對象：{selectedClass.target}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100">
                       <Target size={18} className="text-purple-600" />
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
                             <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                             <span className="text-slate-700">{feat}</span>
                          </li>
                       ))}
                    </ul>
                 </div>

                 {/* Roadmap */}
                 <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Waypoints className="text-purple-600" />
                       系列課程規劃
                    </h4>
                    <div className="space-y-4">
                       {selectedClass.roadmap && selectedClass.roadmap.map((step: string, i: number) => (
                          <div key={i} className="flex items-center gap-4 relative group">
                             {/* Vertical Line */}
                             {i !== selectedClass.roadmap.length - 1 && (
                                <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-slate-200"></div>
                             )}
                             
                             <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0 z-10 border-4 border-white shadow-sm">
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
                   className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
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

export default SeniorCourseRoadmap;
