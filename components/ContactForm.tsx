
import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const GRADES = [
  '國小一年級', '國小二年級', '國小三年級', '國小四年級', '國小五年級', '國小六年級',
  '國中七年級', '國中八年級', '國中九年級',
  '高中一年級', '高中二年級', '高中三年級'
];

const ANIMATION_IMAGES = [
  "https://www.dropbox.com/scl/fi/7aw47z09uku0ol2ydxnh5/Y.svg?rlkey=2d52kglqn8nkfqs704zy3fq13&raw=1",
  "https://www.dropbox.com/scl/fi/70pcndj17wbgoujjbphzb/U.svg?rlkey=0wph677wnabdjoz0yd0cp92wm&raw=1",
  "https://www.dropbox.com/scl/fi/boiljwzvsues3ai6svtxv/H.svg?rlkey=geeqhyox3itg72o6hy9yjw496&raw=1",
  "https://www.dropbox.com/scl/fi/l0deq9hx3vji5fu6hsqi5/A.svg?rlkey=8cmggn02klwe07ujo0cgqd97i&raw=1",
  "https://www.dropbox.com/scl/fi/koia886j728lniy2ybcre/O.svg?rlkey=w27c9rjvgh08dathnw042aa1f&raw=1"
];

interface ContactFormProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const ContactForm: React.FC<ContactFormProps> = ({ theme = 'primary' }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
  };

  const t = theme === 'primary' ? 'primary' : theme;

  // Dynamic Content based on Theme
  const getContent = () => {
    switch (theme) {
      case 'green': // Elementary
        return {
          title: <>讓我們成為<br className="md:hidden" />孩子最強的後盾</>,
          subtitle: "給我們一個機會，深度了解您的孩子。現在預約，即可獲得「兒童學習特質評量」與專業諮詢。"
        };
      case 'blue': // Junior
        return {
          title: <>青春期的迷惘<br className="md:hidden" />我們陪孩子一起走過</>,
          subtitle: "面對升學壓力，孩子需要的是懂他的夥伴。立即預約「學科弱點診斷」，為孩子找到自信。"
        };
      case 'purple': // Senior
        return {
          title: <>夢想的路上<br className="md:hidden" />我們是最專業的導航員</>,
          subtitle: "探索未來不孤單。預約「學習歷程健檢」與升學諮詢，讓我們一起規劃最適合孩子的未來。"
        };
      default: // Primary / Home
        return {
          title: <>懂孩子的心<br className="md:hidden" />才能帶領他們飛得更高</>,
          subtitle: "教育不只是教書，更是教人。預約免費試聽與診斷，體驗育豪「有溫度」的專業教學。"
        };
    }
  };

  const { title, subtitle } = getContent();

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-2xl p-12 text-center border border-green-100 shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">預約申請已送出！</h3>
            <p className="text-slate-600 mb-8">
              感謝您的信任，我們的課程顧問將於 24 小時內與您聯繫，傾聽您的需求並安排體驗。
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="px-6 py-2.5 bg-white text-green-700 font-semibold rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
            >
              填寫下一筆
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    // Increased bottom padding to accommodate the animation without overlap
    <section id="contact" className={`pt-24 pb-64 bg-${t}-600 relative overflow-hidden transition-colors duration-500`}>
      <style>{`
        @keyframes complexRun {
          0% {
            left: 100%;
            transform: translateX(0) rotate(0deg);
          }
          /* RUN IN: Roll to ~Center Right */
          30% {
            left: 100%;
            transform: translateX(-40vw) rotate(-720deg); /* 2 turns */
          }
          
          /* BOUNCE: Jump twice */
          32% {
            left: 100%;
            transform: translateX(-42vw) translateY(-60px) rotate(-720deg);
          }
          34% {
            left: 100%;
            transform: translateX(-44vw) translateY(0) rotate(-720deg);
          }
          36% {
            left: 100%;
            transform: translateX(-46vw) translateY(-30px) rotate(-720deg);
          }
          38% {
            left: 100%;
            transform: translateX(-48vw) translateY(0) rotate(-720deg);
          }

          /* WIGGLE: Stop X movement, shake rotation */
          39% {
            left: 100%;
            transform: translateX(-48vw) rotate(-740deg);
          }
          41% {
            left: 100%;
            transform: translateX(-48vw) rotate(-700deg);
          }
          43% {
            left: 100%;
            transform: translateX(-48vw) rotate(-730deg);
          }
          45% {
            left: 100%;
            transform: translateX(-48vw) rotate(-710deg);
          }
          47% {
             left: 100%;
             transform: translateX(-48vw) rotate(-720deg); /* Back to upright */
          }

          /* RUN OUT: Roll off screen */
          100% {
            left: 100%;
            transform: translateX(-150vw) rotate(-1440deg);
          }
        }
        
        .yuhao-anim-item {
          position: absolute;
          bottom: 0; /* Align all to bottom */
          width: 50px;
          height: 50px;
          animation: complexRun 15s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 opacity-10 pattern-dots"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
             {title}
           </h2>
           <p className={`text-${t}-100 text-lg max-w-2xl mx-auto`}>
             {subtitle}
           </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side */}
          <div className={`bg-${t}-50 p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden`}>
            <div className="relative z-10">
              <h3 className={`text-2xl font-bold text-${t}-900 mb-4`}>預約體驗與諮詢</h3>
              <p className={`text-${t}-700 mb-8 leading-relaxed`}>
                填寫下方表單，讓我們有機會認識您的孩子，為他安排最適合的學習規劃。
              </p>
              
              <div className="space-y-6">
                {[
                  { id: 1, title: '填寫表單', desc: '簡單留下聯絡資訊' },
                  { id: 2, title: '專人聯繫', desc: '顧問致電了解孩子狀況' },
                  { id: 3, title: '適性安排', desc: '安排參訪、檢測或試聽' }
                ].map(step => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg bg-${t}-200 flex items-center justify-center shrink-0 text-${t}-800 shadow-sm`}>
                      <span className="font-bold text-sm">{step.id}</span>
                    </div>
                    <div>
                      <h4 className={`font-bold text-${t}-900 mb-0.5`}>{step.title}</h4>
                      <p className={`text-xs text-${t}-600`}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decor */}
            <div className={`absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 bg-${t}-200/50 rounded-full blur-3xl`}></div>
            <div className={`absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 bg-${t}-300/30 rounded-full blur-3xl`}></div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="parentName" className="text-sm font-semibold text-slate-700">家長姓名 <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-${t}-500 focus:ring-2 focus:ring-${t}-200 transition-all outline-none bg-slate-50/50 focus:bg-white`}
                    placeholder="請輸入家長姓名"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="studentName" className="text-sm font-semibold text-slate-700">學生姓名</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-${t}-500 focus:ring-2 focus:ring-${t}-200 transition-all outline-none bg-slate-50/50 focus:bg-white`}
                    placeholder="請輸入學生姓名"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">聯絡電話 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-${t}-500 focus:ring-2 focus:ring-${t}-200 transition-all outline-none bg-slate-50/50 focus:bg-white`}
                  placeholder="0912-345-678"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-semibold text-slate-700">就讀年級 <span className="text-red-500">*</span></label>
                <select
                  required
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-${t}-500 focus:ring-2 focus:ring-${t}-200 transition-all outline-none bg-slate-50/50 focus:bg-white appearance-none cursor-pointer`}
                >
                  <option value="" disabled>請選擇年級</option>
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">孩子的狀況或需求</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-${t}-500 focus:ring-2 focus:ring-${t}-200 transition-all outline-none bg-slate-50/50 focus:bg-white resize-none`}
                  placeholder="例如：孩子對數學較沒自信、希望加強英文口說、需要升學建議..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-3.5 px-6 bg-${t}-600 text-white font-bold rounded-xl shadow-lg shadow-${t}-500/30 hover:bg-${t}-700 hover:shadow-${t}-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    資料處理中...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    送出預約申請
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Animation Layer at the Bottom - Flush with footer */}
      {/* Increased height to h-40 to prevent bounce clipping */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden pointer-events-none z-0">
        {ANIMATION_IMAGES.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt="animation char"
            className="yuhao-anim-item"
            style={{ 
              animationDelay: `${index * 2}s`, // Stagger delay
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ContactForm;
