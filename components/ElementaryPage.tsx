
import React from 'react';
import Hero from './Hero';
import OutstandingResults from './OutstandingResults';
import CourseRoadmap from './CourseRoadmap';
import HonorRoll from './HonorRoll';
import EnvironmentIntro from './EnvironmentIntro';
import ElementaryBanner from './ElementaryBanner';
import { NewsItem, PageType } from '../types';
import { MessageCircle } from 'lucide-react';

interface ElementaryPageProps {
  heroNews: NewsItem[];
  onNavigate: (page: PageType) => void;
}

const ElementaryPage: React.FC<ElementaryPageProps> = ({ heroNews, onNavigate }) => {
  
  const ELEMENTARY_QUICK_LINKS = [
    { label: '課程班別', href: '#elementary-course-roadmap' },
    { label: '學員金榜', href: '#elementary-honor-roll' },
    { label: '環境介紹', href: '#elementary-environment' },
    { label: '課程花絮', href: 'https://www.facebook.com/share/1GFkpGnU5Z/', external: true },
  ];

  return (
    <div>
      <Hero 
        title={
          <div className="inline-block text-left">
            <span className="block mb-2">
              雙語啟蒙
            </span>
            <span className="text-green-600 block">
              數理
              <span className="relative inline-block">
                奠基
                {/* 地平線 - 位置微調向上 2px */}
                <span 
                  className="absolute left-[0.7em] h-[2px] bg-green-200/60 pointer-events-none z-10"
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
                    src="https://www.dropbox.com/scl/fi/tor3pajd4rdr0n5zqj222/_.svg?rlkey=ubgcc8qnlv4j0evotgtyipezf&raw=1"
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
        topLabel="艾森樂美語 x 小育豪資優數學"
        gradeLabel="幼兒大班 ~ 小六"
        courseLabel="國英數 • 科學實驗 • 資優升學"
        subtitle="啟發學習興趣，奠定紮實基礎。我們重視品格教育與全人發展，讓孩子快樂學習，自信成長。"
        newsItems={heroNews}
        onNavigate={onNavigate}
        showQuickLinks={true}
        quickLinks={ELEMENTARY_QUICK_LINKS}
        theme="green"
        secondaryBtnLabel="即時線上詢課"
        secondaryBtnIcon={<MessageCircle size={20} />}
        secondaryBtnLink="https://lin.ee/f53mxGL"
      />

      {/* New Banner Section */}
      <ElementaryBanner />

      {/* 1. 亮眼成績 (ID: elementary-outstanding-results) */}
      <div id="elementary-outstanding-results" className="scroll-mt-32">
        <OutstandingResults theme="green" />
      </div>

      {/* 3. 課程規劃 (ID: elementary-course-roadmap) - Has internal green theme */}
      <div id="elementary-course-roadmap" className="scroll-mt-32">
        <CourseRoadmap />
      </div>

      {/* 4. 榮耀金榜 (Elementary Specific) */}
      <div id="elementary-honor-roll" className="scroll-mt-32">
        <HonorRoll variant="elementary" theme="green" />
      </div>

      {/* 5. 環境介紹 (ID: elementary-environment) */}
      <div id="elementary-environment" className="scroll-mt-32">
        <EnvironmentIntro 
          theme="green" 
          images={[
            "https://www.dropbox.com/scl/fi/07lz5m6yl5mdt50zz2px7/1_0.png?rlkey=mq5r9bx5a4mostdicxhcng9ll&raw=1",
            "https://www.dropbox.com/scl/fi/16oj5ajwit6uo3aboqwk7/4_0.png?rlkey=mgiyaqkblc293351w3uh2wmsv&raw=1",
            "https://www.dropbox.com/scl/fi/5ps1wfydvl1xj577z9q1r/2025-03-05-3_0.png?rlkey=xdmo5aalhkpl88b9210m3yc4k&raw=1",
            "https://www.dropbox.com/scl/fi/8f1zmty0h8g9cfb1fkmnw/2_0.png?rlkey=l6pl127coi2bks3v7bbiit13b&raw=1"
          ]}
        />
      </div>

    </div>
  );
};

export default ElementaryPage;
