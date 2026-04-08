
import React from 'react';
import Hero from './Hero';
import OutstandingResults from './OutstandingResults';
import StudentTestimonials from './StudentTestimonials';
import JuniorCourseRoadmap from './JuniorCourseRoadmap';
import HonorRoll from './HonorRoll';
import ParentTestimonials from './ParentTestimonials';
import JuniorBanner from './JuniorBanner';
import { NewsItem, PageType } from '../types';
import { FileCheck } from 'lucide-react';

interface JuniorPageProps {
  heroNews: NewsItem[];
  onNavigate: (page: PageType) => void;
}

const JuniorPage: React.FC<JuniorPageProps> = ({ heroNews, onNavigate }) => {
  
  const JUNIOR_QUICK_LINKS = [
    { label: '課程班別', href: '#course-roadmap' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '學員金榜', href: '#honor-roll' },
    { label: '家長見證', href: '#testimonials' },
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

      {/* 2. Outstanding Results (亮眼成績 - 版面同首頁) */}
      <OutstandingResults theme="blue" />

      {/* 3. Student Testimonials (學員心得 - 版面同國小) */}
      <StudentTestimonials theme="blue" />

      {/* 4. Course Roadmap (課程規劃 - 版面同國小, 國中專屬內容) */}
      <JuniorCourseRoadmap />

      {/* 5. Honor Roll (榮耀金榜 - 校排前十/會考滿分/建北錄取) */}
      <div id="honor-roll">
        <HonorRoll variant="junior" theme="blue" />
      </div>

      {/* 6. Parent Testimonials (口碑推薦 - 版面同國小) */}
      <ParentTestimonials theme="blue" />

    </div>
  );
};

export default JuniorPage;
