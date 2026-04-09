
import React, { useState, useRef } from 'react';
import { Lightbulb, Heart, Target, Trophy, GraduationCap, ShieldCheck, X, Play, Sparkles, Youtube, Crown } from 'lucide-react';
import { FeatureItem } from '../types';
import Modal from './Modal';

const FEATURES: FeatureItem[] = [
  {
    title: '育豪的初心',
    description: '40年來，我們堅持「沒有教不會的孩子，只有還沒被懂的心」。',
    icon: <Lightbulb className="w-6 h-6 text-white" />,
  },
  {
    title: '有溫度的教育',
    description: '嚴管勤教的背後，是我們對孩子無微不至的關懷與理解。',
    icon: <Heart className="w-6 h-6 text-white" />,
  },
  {
    title: '看見獨特性',
    description: '每個孩子都是獨一無二的種子，我們提供適合的土壤讓他發芽。',
    icon: <Target className="w-6 h-6 text-white" />,
  },
  {
    title: '卓越是種習慣',
    description: '成績優異只是結果，我們更重視培養孩子面對挑戰的勇氣。',
    icon: <Trophy className="w-6 h-6 text-white" />,
  },
  {
    title: '亦師亦友',
    description: '老師不只是知識的傳遞者，更是孩子迷惘時的引路人。',
    icon: <GraduationCap className="w-6 h-6 text-white" />,
  },
  {
    title: '家長的夥伴',
    description: '與您站在同一陣線，共同分擔教養的焦慮，分享成長的喜悅。',
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  }
];

const COMPARISON_DATA = [
  { feature: '對待孩子', yuhao: '深度了解個性，差異化引導', others: '統一標準，忽略個別差異' },
  { feature: '班級氛圍', yuhao: '溫暖互助，良性競爭', others: '冷漠疏離，僅在意排名' },
  { feature: '教學模式', yuhao: '啟發思考，讓孩子聽得懂', others: '填鴨灌輸，死記硬背' },
  { feature: '輔導機制', yuhao: '導師貼身陪伴，解惑也談心', others: '僅提供解答，缺乏關懷' },
  { feature: '親師溝通', yuhao: '主動回報，共同解決問題', others: '僅通知成績與繳費' },
];

const SUCCESS_VIDEOS = [
  { 
    id: 'v1', 
    title: '【榜首專訪】從抗拒數學到會考滿分的心路歷程', 
    person: '建中 ‧ 陳O豪',
    image: 'https://www.dropbox.com/scl/fi/zw32ughf91fbojjl5segu/pic-11.jpg?rlkey=fd5nq5iehkuq95iq1huksfrjq&raw=1' 
  },
  { 
    id: 'v2', 
    title: '【家長見證】為什麼我把兩個孩子都交給育豪？', 
    person: '家長 ‧ 林媽媽',
    image: 'https://www.dropbox.com/scl/fi/nbwfsiv3oczx8pqve2tim/pic-9.jpg?rlkey=q2lss7ajn2wz8s77kw0fu8zzl&raw=1' 
  },
  { 
    id: 'v3', 
    title: '【名師開講】新課綱素養題型破解祕笈', 
    person: '理化 ‧ 張志豪老師',
    image: 'https://www.dropbox.com/scl/fi/x2mrb6ru43qlah0ip71zw/06.jpg?rlkey=vkym78rlkkzlk6soazcxi6inm&raw=1' 
  },
  { 
    id: 'v4', 
    title: '【學員分享】在快樂中學習，找到自信的自己', 
    person: '北一女 ‧ 黃O慈',
    image: 'https://www.dropbox.com/scl/fi/01n0d94pei1taghllxih6/pic-8.jpg?rlkey=0tqlkcxlw2yqr46elr2aidif5&raw=1' 
  },
];

const Features: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof SUCCESS_VIDEOS[0] | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleExpand = () => {
    if (isExpanded) {
      // Closing
      setIsExpanded(false);
      
      // Use a more robust scroll back to the top of the section
      // We use a small delay to allow the state change to trigger re-render
      setTimeout(() => {
        const section = document.getElementById('features');
        if (section) {
          const headerOffset = 100;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 10);
    } else {
      // Opening
      setIsExpanded(true);
      
      // Use scrollIntoView with a delay to allow content to render
      setTimeout(() => {
        if (expandedRef.current) {
          const headerOffset = 120;
          const elementPosition = expandedRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor - Subtler */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 font-bold tracking-wide uppercase text-sm mb-6">關於育豪</h2>
          <div className="mb-8">
            <h3 className="inline-block text-3xl md:text-4xl font-extrabold text-primary-600 border border-primary-600 bg-white px-8 py-4 rounded-full">
              對孩子的愛與堅持
            </h3>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
            我們相信，教育的本質是「陪伴」與「喚醒」。在育豪，孩子學到的不只是知識，更是對自己的信心。
          </p>
        </div>

        {/* 6 Pillars Cards - Narrowed Width and Centered */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{feature.title}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center">
          <div className="relative inline-flex group">
            <button
              ref={buttonRef}
              onClick={toggleExpand}
              className={`relative px-12 py-5 rounded-full font-bold text-xl transition-all duration-500 flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 active:scale-95 ${
                isExpanded 
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                  : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300 animate-subtle-glow'
              }`}
            >
            {!isExpanded && (
              <>
                {/* Shimmer Effect (Hover Only) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                
                {/* Subtle Glow Pulse */}
                <div className="absolute inset-0 rounded-full bg-yellow-300/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </>
            )}

            <span className="relative z-10">
              {isExpanded ? '收起詳細介紹' : '我們哪裡不一樣'}
            </span>
          </button>
        </div>
      </div>

        {/* Expandable Section */}
        {isExpanded && (
          <div ref={expandedRef} className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Changed background to white with a soft border instead of gray block */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-16 border border-slate-200 shadow-xl relative overflow-hidden">
              
              {/* Part 1: Features Deep Dive - Cleaner Design & Reduced Sizes (~95%) */}
              <div className="text-center mb-16">
                <span className="text-slate-900 font-bold tracking-wider uppercase text-xs mb-2 block">Our Core Values</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary-600 mb-3">超越補習，更是教育</h3>
                <p className="text-slate-500 max-w-2xl mx-auto">除了成績，我們更在乎孩子的學習態度與未來競爭力</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
                {[
                  { title: '量身訂製', desc: '不走大鍋炒路線，針對每個孩子的程度與特質，規劃專屬學習路徑。', icon: <Target className="w-[30px] h-[30px] text-primary-600" /> },
                  { title: '科技輔助', desc: '引進最新 AI 學習診斷系統，精準抓出學習盲點，讓努力更有效率。', icon: <Sparkles className="w-[30px] h-[30px] text-primary-600" /> },
                  { title: '品格優先', desc: '成績是一時的，品格是一輩子的。我們堅持教書更要育人。', icon: <Heart className="w-[30px] h-[30px] text-primary-600" /> },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-6 md:p-8 rounded-2xl border border-slate-100 text-center hover:border-primary-200 transition-colors group">
                    <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Part 2: Comparison Table - Desktop (Table) & Mobile (Cards) */}
              <div className="mb-20">
                {/* Desktop View */}
                <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-5 md:p-6 text-slate-500 font-bold text-sm w-1/3">比較項目</th>
                        {/* Highlighted Header */}
                        <th className="p-5 md:p-6 text-primary-700 font-bold text-lg w-1/3 bg-white border-x border-primary-100 border-t-4 border-t-primary-500 relative">
                           <div className="flex items-center gap-2">
                             育豪資優
                             <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold">Recommended</span>
                           </div>
                        </th>
                        <th className="p-5 md:p-6 text-slate-400 font-medium text-base w-1/3">一般補習班</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-base">
                      {COMPARISON_DATA.map((row, idx) => (
                        <tr key={idx} className="group">
                          <td className="p-5 md:p-6 font-bold text-slate-700 group-hover:bg-slate-50 transition-colors">{row.feature}</td>
                          {/* Highlighted Column */}
                          <td className="p-5 md:p-6 bg-white border-x border-primary-100 group-hover:shadow-inner transition-shadow">
                            <div className="flex items-center gap-3 text-slate-800 font-bold">
                              {/* Victory Icon: Crown (皇冠) instead of Trophy */}
                              <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                 <Crown size={16} className="text-yellow-600" strokeWidth={2} />
                              </div>
                              {row.yuhao}
                            </div>
                          </td>
                          <td className="p-5 md:p-6 text-slate-400 group-hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <X size={18} className="text-slate-300 shrink-0" />
                              {row.others}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View - Card-based Comparison */}
                <div className="md:hidden space-y-4">
                  {COMPARISON_DATA.map((row, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-sm">
                      <div className="text-center mb-4">
                         <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 shadow-sm">
                           {row.feature}
                         </span>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                         {/* Yuhao */}
                         <div className="bg-white p-4 rounded-xl border border-primary-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                            <div className="flex items-start gap-3">
                               {/* Victory Icon: Crown (皇冠) instead of Trophy */}
                               <div className="mt-0.5 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                  <Crown size={14} className="text-yellow-600" strokeWidth={2} />
                               </div>
                               <div>
                                  <div className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-0.5">育豪資優</div>
                                  <div className="text-slate-800 font-bold text-sm leading-snug">{row.yuhao}</div>
                               </div>
                            </div>
                         </div>

                         {/* Others */}
                         <div className="px-4 py-2">
                            <div className="flex items-start gap-3">
                               <div className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0">
                                  <X size={16} className="text-slate-300" />
                               </div>
                               <div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">一般補習班</div>
                                  <div className="text-slate-500 text-sm leading-snug">{row.others}</div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 3: Video Gallery - 4 Columns, Square, Centered Title with Lines & Subtitle */}
              <div className="mb-12">
                <div className="text-center mb-10">
                  <span className="text-slate-900 font-bold tracking-wider uppercase text-xs mb-2 block">SUCCESS STORIES</span>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-px bg-slate-400 w-12 md:w-24"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-600">成功案例與訪談</h3>
                    <div className="h-px bg-slate-400 w-12 md:w-24"></div>
                  </div>
                  <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                    聽聽學長姐與家長的真實心聲，見證改變的起點
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SUCCESS_VIDEOS.map((video) => (
                    <div 
                      key={video.id} 
                      className="group cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      {/* Square Aspect Ratio */}
                      <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100 mb-4 bg-slate-100">
                        <img 
                          src={video.image} 
                          alt={video.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 transition-all duration-300">
                            <Play size={20} className="text-primary-600 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <h5 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1 leading-snug">{video.title}</h5>
                      <p className="text-xs font-bold text-primary-500">{video.person}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Collapse Button */}
              <div className="flex justify-center pt-8 border-t border-slate-100">
                <button
                  onClick={toggleExpand}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-medium px-6 py-3 rounded-full hover:bg-slate-50 transition-all"
                >
                  收起內容
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
        maxWidth="max-w-4xl"
      >
        {selectedVideo && (
          <div className="flex flex-col gap-4">
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-2xl flex items-center justify-center">
              {/* Simulated Video Player */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.dropbox.com/scl/fi/zw32ughf91fbojjl5segu/pic-11.jpg?rlkey=fd5nq5iehkuq95iq1huksfrjq&raw=1')] bg-cover bg-center blur-sm"></div>
              <div className="z-10 text-center">
                <Youtube size={64} className="text-red-600 mx-auto mb-4 animate-pulse" />
                <p className="text-white font-bold text-lg">影片載入中...</p>
                <p className="text-white/60 text-sm">(此為模擬播放器)</p>
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedVideo.title}</h3>
              <p className="text-primary-600 font-medium">{selectedVideo.person}</p>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                在這段影片中，我們將深入了解{selectedVideo.person}在育豪的學習點滴，以及他們如何克服困難，最終達成目標的感人故事。
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Features;
