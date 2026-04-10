
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
    { label: '課程班別', href: '#course-roadmap' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '學員金榜', href: '#honor-roll' },
    { label: '環境介紹', href: '#environment' },
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
        courseLabel="國.英.數.科學.資優升學"
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

      {/* 1. 亮眼成績 (ID: outstanding-results) */}
      <div id="outstanding-results" className="scroll-mt-32">
        <OutstandingResults theme="green" />
      </div>

      {/* 3. 課程規劃 (ID: course-roadmap) - Has internal green theme */}
      <div id="course-roadmap" className="scroll-mt-32">
        <CourseRoadmap />
      </div>

      {/* 4. 榮耀金榜 (Elementary Specific) */}
      <div id="honor-roll" className="scroll-mt-32">
        <HonorRoll variant="elementary" theme="green" />
      </div>

      {/* 5. 環境介紹 (ID: environment) */}
      <div id="environment" className="scroll-mt-32 pb-32">
        <EnvironmentIntro 
          theme="green" 
          images={[
            "https://www.dropbox.com/scl/fi/j45gub1h2qkkn4aj59hya/70.jpg?rlkey=54pjut604aaqnfwsile0bxvm7&raw=1",
            "https://www.dropbox.com/scl/fi/k2nq2hkjqx9hjfgxd7hhd/71.jpg?rlkey=hdwxq06xkgeise7ssvcbg4f5o&raw=1",
            "https://www.dropbox.com/scl/fi/637sfvc6sb90n1w55clp9/72.jpg?rlkey=xh8fsrjehlxuuheknauzlku62&raw=1",
            "https://www.dropbox.com/scl/fi/m105s5r7mae72g37s04t3/06.jpg?rlkey=ixphixrunndduwk248052w2f1&raw=1",
            "https://www.dropbox.com/scl/fi/cupp9e6blxrl0eucclriy/04.jpg?rlkey=q8jt2hyizn99n8ps5g1crzmzt&raw=1"
          ]}
        />
      </div>

    </div>
  );
};

export default ElementaryPage;
