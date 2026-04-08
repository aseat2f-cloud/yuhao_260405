
import React from 'react';
import { Phone, Facebook, Instagram, MessageCircle, Utensils, Video, Download } from 'lucide-react';

interface LocationInfo {
  name: string;
  license?: string;
  address: string;
  phone: string;
}

interface BranchGroup {
  title: string;
  locations: LocationInfo[];
}

const BRANCHES: BranchGroup[] = [
  {
    title: '國小部',
    locations: [
      {
        name: '艾森樂美語學院文理短期補習班',
        license: '社補教社字第110007號',
        address: '新北市板橋區漢生東路315、317號1、2樓',
        phone: '2954 9998',
      },
      {
        name: '私立馬克堡美語學院文理短期補習班',
        license: '社補教社字第114034號',
        address: '新北市板橋區海山路25號2樓',
        phone: '2954 9991',
      }
    ]
  },
  {
    title: '國中部',
    locations: [
      {
        name: '育豪文理語文短期補習班',
        license: '社補教社字第85054號',
        address: '新北市板橋區中山路一段206巷68號',
        phone: '2954 3063',
      },
      {
        name: '育豪資優文理語文短期補習',
        license: '社補教社字第98200號',
        address: '新北市板橋區中山路一段293-1號3樓',
        phone: '7730 6683',
      }
    ]
  },
  {
    title: '高中部',
    locations: [
      {
        name: '育豪菁英文理語文短期補習班',
        license: '社補教社字第103095號',
        address: '新北市板橋區中山路一段293-2號4樓',
        phone: '7733 7890',
      }
    ]
  }
];

const STUDENT_LINKS = [
  { label: '便當訂購系統', icon: <Utensils size={18} />, href: '#' },
  { label: '線上補課平台', icon: <Video size={18} />, href: '#' },
  { label: '課程資源下載', icon: <Download size={18} />, href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-32 lg:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Loop through branch groups */}
          {BRANCHES.map((group, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                 <div className={`h-6 w-1 rounded-full ${index === 0 ? 'bg-teal-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                 <h4 className="text-white font-bold text-lg tracking-wide">{group.title}</h4>
              </div>
              
              <div className="flex flex-col gap-8">
                {group.locations.map((loc, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <h5 className="text-white font-medium text-base leading-tight">{loc.name}</h5>
                    {loc.license && (
                      <p className="text-xs text-slate-500">{loc.license}</p>
                    )}
                    
                    <ul className="space-y-2 text-slate-400 mt-1">
                      {/* Address without icon to save space */}
                      <li className="text-sm leading-relaxed">
                        {loc.address}
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Phone className="shrink-0 text-slate-500" size={16} />
                        <span>{loc.phone}</span>
                      </li>
                    </ul>
                  </div>
                ))}

                {/* Social Buttons - Show for ALL groups */}
                <div className="flex items-center gap-3 mt-auto">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#06C755] hover:text-white transition-all">
                    <MessageCircle size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#fd5949] hover:to-[#d6249f] hover:text-white transition-all">
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Student Zone */}
          <div id="student-zone" className="flex flex-col scroll-mt-24">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                <h4 className="text-white font-bold text-lg tracking-wide">學生專區</h4>
            </div>
            
            <div className="flex flex-col gap-4">
              {STUDENT_LINKS.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-600">
                僅限內部學員登入使用
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2 text-slate-300">
             <img 
               src="https://www.dropbox.com/scl/fi/p2thqha8yykytoaatoadv/LOGO.png?rlkey=mf4il9por0gmnxfrvrfg9n54q&raw=1" 
               alt="育豪資優" 
               className="h-8 w-auto object-contain brightness-0 invert opacity-80"
             />
          </div>
          <p>&copy; {new Date().getFullYear()} Yuhao Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
