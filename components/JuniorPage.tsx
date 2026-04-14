
import React from 'react';
import Hero from './Hero';
import OutstandingResults from './OutstandingResults';
import StudentTestimonials from './StudentTestimonials';
import JuniorCourseRoadmap from './JuniorCourseRoadmap';
import HonorRoll from './HonorRoll';
import JuniorBanner from './JuniorBanner';
import JuniorParentTestimonials from './JuniorParentTestimonials';
import { NewsItem, PageType } from '../types';
import { FileCheck } from 'lucide-react';

interface JuniorPageProps {
  heroNews: NewsItem[];
  onNavigate: (page: PageType) => void;
}

const JuniorPage: React.FC<JuniorPageProps> = ({ heroNews, onNavigate }) => {
  
  const JUNIOR_QUICK_LINKS = [
    { label: '學員心得', href: '#student-testimonials' },
    { label: '家長見證', href: '#parent-testimonials' },
    { label: '課程班別', href: '#course-roadmap' },
    { label: '學員金榜', href: '#honor-roll' },
  ];

  return (
    <div>
      <Hero 
        title={
          <div className="inline-block text-left">
            <span className="block mb-2">
              學霸起點
            </span>
            <span className="text-blue-600 block">
              育豪
              <span className="relative inline-block">
                領航
                {/* 地平線 - 位置微調向上 2px */}
                <span 
                  className="absolute left-[0.7em] h-[2px] bg-blue-200/60 pointer-events-none z-10"
                  style={{ 
                    bottom: 'calc(1.22em + 2px)',
                    width: 0,
                    transform: 'translateX(-50%)',
                    animation: 'groundLineControl 15s ease-in-out infinite'
                  }}
                />
                
                {/* 袋鼠遮罩容器 - 位置微調向上 2px */}
                <div
                  className="absolute left-[0.7em] w-[3em] h-[10em] overflow-hidden pointer-events-none select-none z-20"
                  style={{ 
                    bottom: 'calc(1.22em + 2px)',
                    transform: 'translateX(-50%)' 
                  }}
                >
                  <img
                    src="https://www.dropbox.com/scl/fi/zlc0smsckrqpuyh7uktvz/_.svg?rlkey=wm32dpy2o8se8zl1gfpfza9al&raw=1"
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
        topLabel="育豪資優 國中部"
        gradeLabel="國七 ~ 國九"
        courseLabel="新生先修. 國中全科. 寒暑衝刺"
        subtitle="會考衝刺首選，精準命題，弱點擊破。陪伴青春期的孩子找到讀書的方法與目標。"
        newsItems={heroNews}
        onNavigate={onNavigate}
        showQuickLinks={true}
        quickLinks={JUNIOR_QUICK_LINKS}
        theme="blue"
        secondaryBtnLabel="學歷程度測驗"
        secondaryBtnIcon={<FileCheck size={20} />}
      />

      {/* 1. Image Carousel Banner */}
      <JuniorBanner />

      {/* 2. Teaching Results (教學成果 - 僅保留區塊, 移除快捷按鈕) */}
      <div id="outstanding-results" className="scroll-mt-32">
        <OutstandingResults theme="blue" limit={4} />
      </div>

      {/* 3. Student Testimonials (學員心得 - 版面同國小) */}
      <div id="student-testimonials" className="scroll-mt-32">
        <StudentTestimonials theme="blue" showClass={false} />
      </div>

      {/* 4. Parent Testimonials (家長見證) */}
      <div id="parent-testimonials" className="scroll-mt-32">
        <JuniorParentTestimonials theme="blue" />
      </div>

      {/* 5. Course Roadmap (課程規劃 - 版面同國小, 國中專屬內容) */}
      <div id="course-roadmap" className="scroll-mt-32">
        <JuniorCourseRoadmap />
      </div>

      {/* 6. Honor Roll (榮耀金榜 - 校排前十/會考滿分/建北錄取) */}
      <div id="honor-roll" className="scroll-mt-32">
        <HonorRoll variant="junior" theme="blue" />
      </div>

      {/* 7. CAPE Countdown Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-200 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white font-bold text-sm mb-6 backdrop-blur-md">
                  <FileCheck size={18} />
                  <span>2026 教育會考倒數</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  決戰會考，<br className="hidden md:block" />
                  前進理想第一志願
                </h2>
                <p className="text-blue-100 text-lg font-medium max-w-md mx-auto lg:mx-0">
                  每一分每一秒的努力，都是通往成功的階梯。育豪與你併肩作戰！
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: '天', value: Math.floor((new Date('2026-05-16T09:00:00').getTime() - Date.now()) / (1000 * 60 * 60 * 24)) },
                  { label: '時', value: Math.floor(((new Date('2026-05-16T09:00:00').getTime() - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) },
                  { label: '分', value: Math.floor(((new Date('2026-05-16T09:00:00').getTime() - Date.now()) % (1000 * 60 * 60)) / (1000 * 60)) },
                  { label: '秒', value: Math.floor(((new Date('2026-05-16T09:00:00').getTime() - Date.now()) % (1000 * 60)) / 1000) },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center w-28 h-32 md:w-32 md:h-40 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                    <span className="text-4xl md:text-5xl font-black text-blue-600 mb-1">
                      {Math.max(0, item.value).toString().padStart(2, '0')}
                    </span>
                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default JuniorPage;
