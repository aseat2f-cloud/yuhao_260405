
import React, { useState, useEffect, useRef } from 'react';
import { Crown, Star, School, Languages, Medal, GraduationCap, Award, ThumbsUp } from 'lucide-react';

type HonorCategory = 'gifted' | 'cap' | 'top_school' | 'english' | 'perfect' | 'rank_10' | 'university_top3' | 'school_rank1';

interface HonorRollProps {
  variant?: 'default' | 'elementary' | 'junior' | 'senior';
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

// Updated collection of 35 student photos
const STUDENT_PHOTOS = [
  "https://www.dropbox.com/scl/fi/9cpqu4ezv9ifjngun8sws/studesnts-01.jpg?rlkey=gcscq0t6tgkhe45l6rvgvwot3&raw=1",
  "https://www.dropbox.com/scl/fi/9k9ghmdgm0xykbcfsofiq/studesnts-02.jpg?rlkey=jmx489or11cmz9j98hua32bfe&raw=1",
  "https://www.dropbox.com/scl/fi/l88krksy6lor0bd77zei7/studesnts-03.jpg?rlkey=oclv7og7mrc4r3nb3dhv1u5is&raw=1",
  "https://www.dropbox.com/scl/fi/ghhl0gdixlvinb1vqq0fy/studesnts-04.jpg?rlkey=zab93adkuq02thfs7yud4j8nq&raw=1",
  "https://www.dropbox.com/scl/fi/ujpl425x4dtjvakqarn6q/studesnts-05.jpg?rlkey=ynqyjrb68pqhwpdhjh4d0b7qd&raw=1",
  "https://www.dropbox.com/scl/fi/nu3ndi30xmilap65z0w57/studesnts-06.jpg?rlkey=he0sgfou114el3nqx7y5o3r7m&raw=1",
  "https://www.dropbox.com/scl/fi/in067bl9nvhxbwzf55spz/studesnts-07.jpg?rlkey=5o9cmp91m3xc7mgk2tf1j1f8i&raw=1",
  "https://www.dropbox.com/scl/fi/588i0uicwm4sumgnrdbue/studesnts-08.jpg?rlkey=qe7bmgggiga4ayt0s0h5k1ooi&raw=1",
  "https://www.dropbox.com/scl/fi/xqd221ixhq5ws1q6g71ub/studesnts-09.jpg?rlkey=9k4arcuowzobrbe1lyk7rgxl4&raw=1",
  "https://www.dropbox.com/scl/fi/zj7kbr80vwkj92pxi3dq0/studesnts-10.jpg?rlkey=yiz7byewvgeycrxur34ndzz4o&raw=1",
  "https://www.dropbox.com/scl/fi/dz318jy3zc09h621r37rb/studesnts-11.jpg?rlkey=v854djupn29y45hjjtiz34dur&raw=1",
  "https://www.dropbox.com/scl/fi/t7im27lml13hiqg4g23gy/studesnts-12.jpg?rlkey=k56uw8q2qql71z3xhsfred5an&raw=1",
  "https://www.dropbox.com/scl/fi/uk2jze704s6rzta6s9sq5/studesnts-13.jpg?rlkey=1mkqkjtpjze4t9zldnsn7a1u5&raw=1",
  "https://www.dropbox.com/scl/fi/c2zrfueffb4523d2csgys/studesnts-14.jpg?rlkey=gwpp2omc6q7pocmvak1bbouh9&raw=1",
  "https://www.dropbox.com/scl/fi/tka103yjn59h540urbkca/studesnts-15.jpg?rlkey=o6du7y9vsi5xgk8eqkxmddklk&raw=1",
  "https://www.dropbox.com/scl/fi/225mcmv4nsbg2vezegx8d/studesnts-16.jpg?rlkey=0c8z7a2fc33ylxxlxypzb0712&raw=1",
  "https://www.dropbox.com/scl/fi/1gjzwbxv1ztthn7fdjdy3/studesnts-17.jpg?rlkey=0jlo4ofaqa01rhba8csi4qus1&raw=1",
  "https://www.dropbox.com/scl/fi/hir63opijyphn8qyz2ua2/studesnts-18.jpg?rlkey=eylemjw9kz8sdnrjz2ylgqqfg&raw=1",
  "https://www.dropbox.com/scl/fi/1gtux5427moeetzfj4chf/studesnts-19.jpg?rlkey=x6regbr8ph0yfywdbcnlxm73f&raw=1",
  "https://www.dropbox.com/scl/fi/c3xbc4r77u2hqra4vr50a/studesnts-20.jpg?rlkey=jgpk1oa909vkq4ddgphfdrn4p&raw=1",
  "https://www.dropbox.com/scl/fi/otxscic9a1nmicv1papbb/studesnts-21.jpg?rlkey=gtgcj26pva3r3e99tukbkdvdx&raw=1",
  "https://www.dropbox.com/scl/fi/zrkyb5ekznl0w2r64gh7k/studesnts-22.jpg?rlkey=1k9wki8mizvv8husmikpixtbj&raw=1",
  "https://www.dropbox.com/scl/fi/amj6tv91ibftosmbyrian/studesnts-23.jpg?rlkey=9v9kips0mnjcpufd2abzzt0u7&raw=1",
  "https://www.dropbox.com/scl/fi/xeajvuoan4qgej7qwqtwu/studesnts-24.jpg?rlkey=ahcbhgi2jt1kycpoi209hok21&raw=1",
  "https://www.dropbox.com/scl/fi/yyc2d1ummmfc16zhv6lar/studesnts-25.jpg?rlkey=bbz2olvm8jcoqeoa3iyhgmrwg&raw=1",
  "https://www.dropbox.com/scl/fi/sfm9kxcv4p77sl54i1o5k/studesnts-26.jpg?rlkey=sr9s0v23gbym4i8g23lti3wvo&raw=1",
  "https://www.dropbox.com/scl/fi/xrjfszwby3opcv7djmt1u/studesnts-27.jpg?rlkey=7r8xw42m18tenikm470mqcdui&raw=1",
  "https://www.dropbox.com/scl/fi/co833q6gmuzaolcmlhp0s/studesnts-28.jpg?rlkey=xocs7u3dsp8nw1unxegz982hx&raw=1",
  "https://www.dropbox.com/scl/fi/1igov04slqqtrpislaawf/studesnts-29.jpg?rlkey=d7twe9c0ziuais7mwqoyuqhto&raw=1",
  "https://www.dropbox.com/scl/fi/avcu1pbpint8zpcxoa1hu/studesnts-30.jpg?rlkey=3klsoifpb8adepqk8gep50gzi&raw=1",
  "https://www.dropbox.com/scl/fi/tk4x37cc29fwf5vdrxxub/studesnts-31.jpg?rlkey=i6kd79prp11vkjz3z8iur1mlr&raw=1",
  "https://www.dropbox.com/scl/fi/y7wn0znnxebo4vyc49ns2/studesnts-32.jpg?rlkey=asklrol381we4bb57ev2ig71e&raw=1",
  "https://www.dropbox.com/scl/fi/f3f9e8svji0xn6gpolv1c/studesnts-33.jpg?rlkey=86txpa973eqpoopv656agykr1&raw=1",
  "https://www.dropbox.com/scl/fi/tcu1v3loub21rxsnkc1f5/studesnts-34.jpg?rlkey=ild79mfd8bk1msw0oqfyz2o52&raw=1",
  "https://www.dropbox.com/scl/fi/oazyhvkm2es3dzxavfdo4/studesnts-35.jpg?rlkey=bu0p0yklofpm1g8jb0mdjnwhf&raw=1"
];

// Helper to generate mock names with specific details
const generateNames = (count: number, category: HonorCategory) => {
  const lastNames = ['陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊', '許', '鄭'];
  const firstNames = ['O豪', 'O廷', 'O瑄', 'O宇', 'O瑋', 'O安', 'O平', 'O伶', 'O凱', 'O鈞', 'O婷', 'O文'];
  
  // School Pools
  const originElementary = ['敦化國小', '民生國小', '幸安國小', '金華國小', '仁愛國小'];
  const originJunior = ['敦化國中', '介壽國中', '仁愛國中', '中正國中', '金華國中'];
  const originSenior = ['建國中學', '北一女中', '師大附中', '中山女高', '成功高中'];

  // Target Pools
  const giftedTargets = [
    '延平中學 數理資優班', 
    '薇閣中學 數理資優班', 
    '敦化國中 數理資優班', 
    '仁愛國中 數理資優班',
    '民生國中 數理資優班'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const name = `${lastNames[i % lastNames.length]}${firstNames[i % firstNames.length]}`;
    const year = i % 3 === 0 ? '112' : '113'; // Mix of 112 and 113 years
    const photo = STUDENT_PHOTOS[i % STUDENT_PHOTOS.length]; // Cycle through the 35 photos
    
    let school = ''; // Original School
    let yearPrefix = '';
    let highlightText = '';

    if (category === 'gifted') {
      school = originElementary[i % originElementary.length];
      const target = giftedTargets[i % giftedTargets.length];
      yearPrefix = `${year}年 錄取`;
      highlightText = target;
    } else if (category === 'cap') {
      school = originJunior[i % originJunior.length];
      yearPrefix = `${year}年 會考`;
      highlightText = '5A++';
    } else if (category === 'top_school') {
      school = originJunior[i % originJunior.length];
      const target = i % 2 === 0 ? '建國中學' : '北一女中';
      yearPrefix = `${year}年 錄取`;
      highlightText = target;
    } else if (category === 'english') {
      school = i % 2 === 0 ? originElementary[i % originElementary.length] : originSenior[i % originSenior.length];
      const exams = ['GEPT 中級', 'GEPT 中高級', '多益 900分', '多益 950分'];
      yearPrefix = `${year}年 通過`;
      highlightText = exams[i % exams.length];
    } else if (category === 'perfect') {
      school = originElementary[i % originElementary.length];
      const subjects = ['數學', '英文', '國語'];
      yearPrefix = `${year}年 校內段考`;
      highlightText = `${subjects[i % subjects.length]} 100分`;
    } else if (category === 'rank_10') {
      school = originJunior[i % originJunior.length];
      yearPrefix = `${year}年 校內段考`;
      const ranks = ['第一名', '第二名', '第三名', '第四名', '第五名'];
      highlightText = `校排 ${ranks[i % ranks.length]}`;
    } else if (category === 'university_top3') {
      school = originSenior[i % originSenior.length];
      const targets = ['台灣大學', '清華大學', '交通大學', '政治大學', '陽明醫學系'];
      yearPrefix = `${year}年 錄取`;
      highlightText = targets[i % targets.length];
    } else if (category === 'school_rank1') {
      school = originSenior[i % originSenior.length];
      yearPrefix = `${year}年 校內段考`;
      highlightText = '校排 第一名';
    }

    return {
      id: `${category}-${i}`,
      name,
      school,
      yearPrefix,
      highlightText,
      photo
    };
  });
};

const DATA = {
  gifted: generateNames(100, 'gifted'),
  cap: generateNames(100, 'cap'),
  top_school: generateNames(100, 'top_school'),
  english: generateNames(100, 'english'),
  perfect: generateNames(100, 'perfect'),
  rank_10: generateNames(100, 'rank_10'),
  university_top3: generateNames(100, 'university_top3'),
  school_rank1: generateNames(100, 'school_rank1'),
};

const ELEMENTARY_IMAGE_DATA = {
  english: [
    "https://www.dropbox.com/scl/fi/cl3xljk255xq5z4l9kntm/02.jpg?rlkey=u4i7g1h49gbzwe2qq3pp7os5j&raw=1",
    "https://www.dropbox.com/scl/fi/w64n2umjnaszggn1c6nbf/250625_02_114-_-_AH_-1500x1000-1.jpg?rlkey=3ketziobfbu2wapy6a3pcfanx&raw=1"
  ],
  perfect: [
    "https://www.dropbox.com/scl/fi/02bku21xf9kcds9976086/250603_-PO-_-_AH_-A.jpg?rlkey=36lldwmj1t91wp5izhm806m96&raw=1",
    "https://www.dropbox.com/scl/fi/d2xelxpkbrwxuz24hoebu/250603_-PO-_-_AH_-A.jpg?rlkey=jzz1uyi20nztjdz2jk0tgn15t&raw=1"
  ],
  gifted: [
    "https://www.dropbox.com/scl/fi/pwq0toph6p3eprry9f5oi/02.jpg?rlkey=n6crh7q392qkb1azs30udsmzr&raw=1",
    "https://www.dropbox.com/scl/fi/twpjtes678b8cxh5etx1a/03.jpg?rlkey=5jhiid4ltkh2aci9zcvosuubl&raw=1",
    "https://www.dropbox.com/scl/fi/wri7f18zg1az948pypoul/.jpg?rlkey=tu6wfurczpesqk8apvsflgown&raw=1"
  ]
};

const HonorRoll: React.FC<HonorRollProps> = ({ variant = 'default', theme = 'primary' }) => {
  const getInitialTab = () => {
    if (variant === 'elementary') return 'english';
    if (variant === 'junior') return 'rank_10';
    if (variant === 'senior') return 'university_top3';
    return 'cap';
  };

  const [activeTab, setActiveTab] = useState<HonorCategory>(getInitialTab());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const t = theme === 'primary' ? 'primary' : theme;

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 5 : 24);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const currentData = DATA[activeTab];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const displayedItems = currentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: HonorCategory) => {
    setActiveTab(tab);
  };

  const getThemeColorClass = () => {
    if (activeTab === 'gifted') return 'emerald';
    if (activeTab === 'cap' || activeTab === 'perfect' || activeTab === 'school_rank1') return 'red';
    if (activeTab === 'english') return 'purple';
    if (activeTab === 'rank_10') return 'orange';
    return 'blue';
  };

  const activeColor = getThemeColorClass();

  const renderTabs = () => {
    if (variant === 'senior') {
      return (
         <>
          <button
            onClick={() => handleTabChange('english')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'english' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Languages size={16} /> 
            <span className="sm:hidden">英檢</span>
            <span className="hidden sm:inline">英語檢定</span>
          </button>
          <button
            onClick={() => handleTabChange('university_top3')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'university_top3' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap size={16} /> 
            <span className="sm:hidden">頂大</span>
            <span className="hidden sm:inline">前三志願</span>
          </button>
          <button
            onClick={() => handleTabChange('school_rank1')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'school_rank1' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Award size={16} /> 
            <span className="sm:hidden">榜首</span>
            <span className="hidden sm:inline">各校榜首</span>
          </button>
        </>
      );
    }

    if (variant === 'junior') {
      return (
        <>
           <button
            onClick={() => handleTabChange('rank_10')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'rank_10' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Medal size={16} /> 
            <span className="sm:hidden">校排</span>
            <span className="hidden sm:inline">校排前十</span>
          </button>
          <button
            onClick={() => handleTabChange('cap')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'cap' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Crown size={16} /> 
            <span className="sm:hidden">滿分</span>
            <span className="hidden sm:inline">會考滿分</span>
          </button>
          <button
            onClick={() => handleTabChange('top_school')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'top_school' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <School size={16} /> 
            <span className="sm:hidden">建北</span>
            <span className="hidden sm:inline">建北錄取</span>
          </button>
        </>
      );
    }

    if (variant === 'elementary') {
      return (
        <>
          <button
            onClick={() => handleTabChange('english')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'english' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Languages size={16} /> 
            <span className="sm:hidden">英檢</span>
            <span className="hidden sm:inline">英語檢定</span>
          </button>
          <button
            onClick={() => handleTabChange('perfect')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'perfect' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Crown size={16} /> 
            <span className="sm:hidden">榮譽榜</span>
            <span className="hidden sm:inline">英數榮譽榜</span>
          </button>
          <button
            onClick={() => handleTabChange('gifted')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gifted' ? 'bg-white text-emerald-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Star size={16} /> 
            <span className="sm:hidden">資優班</span>
            <span className="hidden sm:inline">資優班錄取</span>
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={() => handleTabChange('gifted')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gifted' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Star size={16} /> 
          <span className="sm:hidden">資優班</span>
          <span className="hidden sm:inline">資優班錄取</span>
        </button>
        <button
          onClick={() => handleTabChange('cap')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'cap' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Crown size={16} /> 
          <span className="sm:hidden">滿級分</span>
          <span className="hidden sm:inline">會考滿級分</span>
        </button>
        <button
          onClick={() => handleTabChange('top_school')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'top_school' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <School size={16} /> 
          <span className="sm:hidden">建北</span>
          <span className="hidden sm:inline">建北俱樂部</span>
        </button>
      </>
    );
  };

  const gridKey = `${activeTab}-${currentPage}-${isVisible ? 'show' : 'hide'}`;

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <style>{`
        @keyframes flipInY {
          0% {
            opacity: 0;
            transform: perspective(2000px) rotateY(90deg) translateY(30px);
          }
          60% {
            opacity: 0.9;
            transform: perspective(2000px) rotateY(-5deg) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: perspective(2000px) rotateY(0deg) translateY(0);
          }
        }
        
        .honor-card-enter {
          opacity: 0; 
          animation: flipInY 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>金榜題名</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">學員金榜 • 榮耀時刻</h3>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8 text-lg">
            這不僅是一份名單，更是孩子們突破自我、實現夢想的最佳見證。
          </p>

          <div className="flex flex-nowrap justify-center gap-2 bg-slate-100 p-1.5 rounded-full mx-auto max-w-full overflow-x-auto sm:overflow-visible">
            {renderTabs()}
          </div>
        </div>

        <div className={`bg-slate-50 rounded-3xl border border-slate-100 shadow-inner min-h-[500px] flex flex-col ${variant === 'elementary' ? 'p-3 sm:p-6' : 'p-6 sm:p-8'}`}>
          {variant === 'elementary' ? (
            <div key={gridKey} className="flex flex-col items-center gap-6 sm:gap-10">
              {ELEMENTARY_IMAGE_DATA[activeTab as keyof typeof ELEMENTARY_IMAGE_DATA]?.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 transform transition-all duration-700 min-h-[300px] sm:min-h-[500px] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    <img 
                      src={img} 
                      alt={`${activeTab} honor roll ${idx + 1}`} 
                      className="w-full h-auto block hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  </div>
              ))}
            </div>
          ) : (
            <>
              <div key={gridKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-auto">
                {displayedItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={isVisible ? 'honor-card-enter' : 'opacity-0'}
                    style={{ 
                      animationDelay: `${index * 60}ms`
                    }}
                  >
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300 ease-out hover:shadow-md h-full relative group">
                      {/* Avatar Section */}
                      <div className="relative shrink-0">
                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm transition-colors duration-300 ${
                            activeColor === 'emerald' ? 'border-emerald-100 group-hover:border-emerald-300' 
                            : activeColor === 'red' ? 'border-red-100 group-hover:border-red-300' 
                            : activeColor === 'purple' ? 'border-purple-100 group-hover:border-purple-300'
                            : activeColor === 'orange' ? 'border-orange-100 group-hover:border-orange-300'
                            : 'border-blue-100 group-hover:border-blue-300'
                        }`}>
                          <img 
                            src={item.photo} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                        {/* "Like" ThumbsUp Badge (Bottom Right) - Shifted slightly out with yellow background */}
                        <div className="absolute -bottom-0.5 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-white z-10">
                            <ThumbsUp size={9} className="text-white fill-white" strokeWidth={2.5} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="font-bold text-slate-900 text-base">{item.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium truncate ml-2 uppercase tracking-tight">{item.school}</div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-slate-500 font-medium mb-0.5">{item.yearPrefix}</span>
                          <span className={`text-sm font-extrabold truncate tracking-tight ${
                              activeColor === 'emerald' ? 'text-emerald-500' 
                              : activeColor === 'red' ? 'text-red-600' 
                              : activeColor === 'purple' ? 'text-purple-600'
                              : activeColor === 'orange' ? 'text-orange-600'
                              : 'text-blue-600'
                          }`}>
                            {item.highlightText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-8 pt-6 border-t border-slate-200/50">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                      currentPage === page
                        ? `bg-${t}-600 text-white shadow-md scale-110`
                        : 'bg-white text-slate-500 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HonorRoll;
