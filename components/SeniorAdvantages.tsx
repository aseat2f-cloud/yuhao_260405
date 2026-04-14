
import React from 'react';
import { Crown, X, Users, Star, MessageSquare, PenTool } from 'lucide-react';

const COMPARISON_DATA = [
  { 
    feature: '班級規模', 
    yuhao: '50-100人 (依科目屬性精準分班)', 
    large: '200人以上大班，師生互動極低',
    small: '20人以下小班，缺乏同儕競爭動力'
  },
  { 
    feature: '師資陣容', 
    yuhao: '聘請具備專業團隊的頂尖名師', 
    large: '知名名師但缺乏個別指導',
    small: '多為兼職或缺乏團隊支援的老師'
  },
  { 
    feature: '教學關注', 
    yuhao: '適性教學，深度了解並持續關注', 
    large: '統一化進度，忽略個別差異',
    small: '關注度高但教學資源與視野受限'
  },
  { 
    feature: '輔導機制', 
    yuhao: '專業輔導課業與英文寫作指導', 
    large: '僅提供解題，缺乏深度引導',
    small: '輔導人力單薄，資源較不全面'
  },
  { 
    feature: '學習歷程', 
    yuhao: '一對一諮詢，協助打造完美歷程', 
    large: '缺乏專業升學建議與數據',
    small: '經驗有限，難以提供多元建議'
  },
];

const SeniorAdvantages: React.FC = () => {
  return (
    <section id="advantages" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-purple-600 font-bold tracking-wide uppercase text-sm mb-4">Yuhao Advantages</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">最適規模、頂尖師資，成就高中升學絕對優勢</h3>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
            針對高中升學制度的深度變革，我們提供最專業、最有溫度的全方位支援。
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-200 shadow-2xl bg-white mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-6 text-slate-500 font-bold text-sm w-[15%]">比較項目</th>
                <th className="p-6 text-purple-700 font-bold text-lg w-[35%] bg-purple-50/50 border-x border-purple-100 border-t-4 border-t-purple-600 relative">
                   <div className="flex items-center gap-2">
                     育豪菁英高中部
                     <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">Best Choice</span>
                   </div>
                </th>
                <th className="p-6 text-slate-400 font-medium text-base w-[25%]">一般大班制</th>
                <th className="p-6 text-slate-400 font-medium text-base w-[25%] border-l border-slate-100">坊間小班制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="p-6 font-bold text-slate-700 text-sm">{row.feature}</td>
                  <td className="p-6 bg-purple-50/30 border-x border-purple-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold text-base">
                      <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 shadow-sm">
                         <Crown size={16} className="text-yellow-600" />
                      </div>
                      {row.yuhao}
                    </div>
                  </td>
                  <td className="p-6 text-slate-400 text-sm">
                    <div className="flex items-center gap-3">
                      <X size={18} className="text-slate-300 shrink-0" />
                      {row.large}
                    </div>
                  </td>
                  <td className="p-6 text-slate-400 text-sm border-l border-slate-100">
                    <div className="flex items-center gap-3">
                      <X size={18} className="text-slate-300 shrink-0" />
                      {row.small}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison Cards - Mobile */}
        <div className="md:hidden space-y-6 mb-16">
          {COMPARISON_DATA.map((row, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <div className="text-center mb-5">
                 <span className="inline-block px-4 py-1 bg-slate-100 rounded-full text-sm font-bold text-slate-600">
                   {row.feature}
                 </span>
              </div>
              
              <div className="space-y-4">
                 {/* Yuhao */}
                 <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-600"></div>
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                          <Crown size={14} className="text-yellow-600" />
                       </div>
                       <div>
                          <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">育豪菁英高中部</div>
                          <div className="text-slate-900 font-bold text-base leading-snug">{row.yuhao}</div>
                       </div>
                    </div>
                 </div>

                 {/* Large */}
                 <div className="px-5 py-2 border-b border-slate-50">
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-6 h-6 flex items-center justify-center shrink-0">
                          <X size={20} className="text-slate-300" />
                       </div>
                       <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">一般大班制</div>
                          <div className="text-slate-500 text-sm leading-snug">{row.large}</div>
                       </div>
                    </div>
                 </div>

                 {/* Small */}
                 <div className="px-5 py-2">
                    <div className="flex items-start gap-3">
                       <div className="mt-1 w-6 h-6 flex items-center justify-center shrink-0">
                          <X size={20} className="text-slate-300" />
                       </div>
                       <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">坊間小班制</div>
                          <div className="text-slate-500 text-sm leading-snug">{row.small}</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: '精緻班級', 
              desc: '50-100人最適規模，兼顧同儕競爭力與老師關注度。', 
              icon: <Users className="text-purple-600" /> 
            },
            { 
              title: '團隊師資', 
              desc: '非個人秀，而是結合專業團隊研發教材與解題。', 
              icon: <Star className="text-purple-600" /> 
            },
            { 
              title: '深度關注', 
              desc: '導師與老師深度了解每位學生的學習盲點與心理狀態。', 
              icon: <MessageSquare className="text-purple-600" /> 
            },
            { 
              title: '全方位輔導', 
              desc: '除了學科，更提供英文寫作與學習歷程檔案專業指導。', 
              icon: <PenTool className="text-purple-600" /> 
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeniorAdvantages;
