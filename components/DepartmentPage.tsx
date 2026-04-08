
import React from 'react';
import Hero from './Hero';
import TeacherGrid from './TeacherGrid';
import { NewsItem, Teacher, PageType } from '../types';
import { BookOpen, Calendar, Quote, Star } from 'lucide-react';

interface DepartmentPageProps {
  title: React.ReactNode;
  subtitle: string;
  heroNews: NewsItem[];
  intro: { title: string; desc: string }[];
  results: { score: string; label: string }[];
  teachers: Teacher[];
  scheduleImage: string;
  topLabel?: string;
  gradeLabel?: string;
  courseLabel?: string;
  onNavigate?: (page: PageType) => void;
}

const DepartmentPage: React.FC<DepartmentPageProps> = ({ 
  title, subtitle, heroNews, intro, results, teachers, scheduleImage, topLabel, gradeLabel, courseLabel, onNavigate 
}) => {
  return (
    <div>
      <Hero 
        title={title}
        subtitle={subtitle}
        newsItems={heroNews}
        topLabel={topLabel}
        gradeLabel={gradeLabel}
        courseLabel={courseLabel}
        onNavigate={onNavigate}
      />

      {/* 課程介紹 */}
      <section id="intro" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">課程特色</h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {intro.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 升學成果/榮耀成績 */}
      <section id="results" className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">榮耀榜單</h2>
            <p className="text-primary-200">我們的用心，成績會說話</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {results.map((item, idx) => (
              <div key={idx} className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-2">{item.score}</div>
                <div className="text-sm md:text-base text-primary-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 師資介紹 */}
      <section id="teachers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">王牌師資團隊</h2>
            <p className="text-slate-600">點擊照片觀看教學演示</p>
          </div>
          <TeacherGrid teachers={teachers} />
        </div>
      </section>

      {/* 班別與課表 */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                   <Calendar className="text-primary-600" />
                   班別與課表
                 </h2>
                 <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                   我們提供彈性的上課時段，無論是平日晚間或是週末衝刺班，都能找到最適合孩子的學習節奏。小班制教學，座位有限，建議提早預約劃位。
                 </p>
                 <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-slate-700">
                     <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                     正規進度班：跟隨學校進度，穩紮穩打
                   </li>
                   <li className="flex items-center gap-3 text-slate-700">
                     <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                     資優培訓班：加深加廣，挑戰極限
                   </li>
                   <li className="flex items-center gap-3 text-slate-700">
                     <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                     考前衝刺班：重點複習，精準猜題
                   </li>
                 </ul>
              </div>
              <div className="flex-1">
                <div className="bg-white p-2 rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img src={scheduleImage} alt="課表範例" className="rounded-lg w-full" />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 學生見證 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">學生與家長見證</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="bg-slate-50 p-8 rounded-2xl relative">
                 <Quote className="absolute top-6 right-6 text-slate-200" size={40} />
                 <div className="flex gap-1 text-yellow-400 mb-4">
                   {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                 </div>
                 <p className="text-slate-600 mb-6 italic">"來到育豪之後，老師很有耐心地解答我的問題，讓原本排斥數學的我，開始找到了解題的樂趣！"</p>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                     <img src={`https://picsum.photos/seed/student${i}/100`} alt="student" />
                   </div>
                   <div>
                     <div className="font-bold text-slate-900">陳同學</div>
                     <div className="text-xs text-slate-500">國中二年級 / 數學班</div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentPage;
