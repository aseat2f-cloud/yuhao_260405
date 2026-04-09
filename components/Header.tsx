
import React, { useState } from 'react';
import { Menu, X, ChevronDown, MessageCircle, Zap } from 'lucide-react';
import { NavItem, PageType } from '../types';

const NAV_ITEMS: NavItem[] = [
  { 
    label: '國小築基', 
    page: 'elementary',
    dropdown: [
      { label: '課程班別', id: 'course-roadmap' },
      { label: '教學成果', id: 'outstanding-results' },
      { label: '學員金榜', id: 'honor-roll' },
      { label: '環境介紹', id: 'environment' },
    ]
  },
  { 
    label: '國中突破', 
    page: 'junior',
    dropdown: [
      { label: '課程班別', id: 'course-roadmap' },
      { label: '教學成果', id: 'outstanding-results' },
      { label: '學員金榜', id: 'honor-roll' },
      { label: '學員心得', id: 'student-testimonials' },
    ]
  },
  { 
    label: '高中登峰', 
    page: 'senior',
    dropdown: [
      { label: '課程班別', id: 'course-roadmap' },
      { label: '學員金榜', id: 'honor-roll' },
      { label: '環境介紹', id: 'environment' },
    ]
  },
  { label: '育豪快訊', page: 'bulletin' },
];

interface HeaderProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
  onOpenChat?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onOpenChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prepare Mobile Nav Items (Bulletin First)
  const mobileNavItems = [
    NAV_ITEMS.find(item => item.page === 'bulletin')!,
    ...NAV_ITEMS.filter(item => item.page !== 'bulletin')
  ];

  const handleNavClick = (page: PageType, sectionId?: string) => {
    const isPageChange = currentPage !== page;
    onNavigate(page);
    setIsMenuOpen(false);
    
    if (sectionId) {
      // If changing pages, reset scroll to top instantly first to avoid "jumping" from previous page position
      if (isPageChange) {
        window.scrollTo(0, 0);
      }

      // If changing pages, wait longer for the new page to mount and layout to stabilize.
      // 800ms allows for initial render and some image loading.
      const startDelay = isPageChange ? 800 : 0;
      
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max polling

      const pollElement = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80; // Adjusted for sticky header height
          let lastTargetTop = -1;
          let scrollStartTime = Date.now();
          const duration = 2000; // Follow the target for 2 seconds to fight layout shifts
          
          const followTarget = () => {
            const rect = element.getBoundingClientRect();
            const currentTargetTop = rect.top + window.pageYOffset - headerOffset;
            
            // If the target position has shifted significantly, or it's the first run
            if (Math.abs(currentTargetTop - lastTargetTop) > 1) {
              window.scrollTo({
                top: currentTargetTop,
                behavior: 'smooth'
              });
              lastTargetTop = currentTargetTop;
            }
            
            if (Date.now() - scrollStartTime < duration) {
              requestAnimationFrame(followTarget);
            }
          };
          
          followTarget();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(pollElement, 100);
        }
      };

      if (startDelay === 0) {
        pollElement();
      } else {
        setTimeout(pollElement, startDelay);
      }
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const scrollToContact = () => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (currentPage !== 'home') {
      onNavigate('home');
      // Delay to allow page transition
      setTimeout(scrollToContact, 500);
    } else {
      scrollToContact();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img 
              src="https://www.dropbox.com/scl/fi/rumhay1jnqh6ihrq47ciq/LOGO-31.png?rlkey=ahgteqcxvjvzqhunuy96zndu8&raw=1" 
              alt="育豪資優" 
              className="h-9 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              // Special styling for Bulletin (育豪快訊)
              if (item.page === 'bulletin') {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.page)}
                    className={`ml-2 px-5 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 bg-yellow-400 text-slate-900 shadow-sm hover:bg-yellow-300 ${
                        currentPage === 'bulletin' 
                        ? 'ring-2 ring-yellow-500 ring-offset-2' 
                        : ''
                    }`}
                  >
                    <Zap size={16} className="fill-slate-900" />
                    {item.label}
                  </button>
                );
              }

              // Standard Nav Items
              return (
                <div 
                  key={item.label} 
                  className="relative group px-1"
                >
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 ${
                      currentPage === item.page 
                        ? 'text-primary-700 bg-primary-50' 
                        : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={14} className="mt-0.5 opacity-60" />}
                  </button>
                  
                  {/* Dropdown */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(item.page, subItem.id);
                          }}
                          className="block w-full text-left px-5 py-3 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-700 border-b border-gray-50 last:border-0 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 h-8">
              <button
                onClick={onOpenChat}
                className="px-5 py-2 text-sm text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-2 border border-transparent hover:border-primary-100"
              >
                <MessageCircle size={18} />
                線上諮詢
              </button>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="px-6 py-2 text-sm bg-primary-600 text-white font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:bg-primary-700 hover:shadow-primary-600/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                預約試聽
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top h-screen overflow-y-auto ${
          isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'
        }`}
      >
        <div className="flex flex-col p-4 gap-2 pb-24">
          {mobileNavItems.map((item) => (
            <div key={item.label}>
              <button
                className={`w-full text-left text-lg font-bold py-3 border-b border-gray-50 flex justify-between items-center ${
                    currentPage === item.page ? 'text-primary-600' : 'text-slate-800'
                } ${item.page === 'bulletin' ? 'bg-yellow-400 px-4 rounded-lg text-slate-900 border-none' : ''}`}
                onClick={() => handleNavClick(item.page)}
              >
                <span className="flex items-center gap-2">
                   {item.page === 'bulletin' && <Zap size={18} fill="currentColor" />}
                   {item.label}
                </span>
              </button>
              {item.dropdown && (
                 <div className="pl-4 flex flex-col mt-1 mb-2 border-l-2 border-slate-100 ml-2">
                    {item.dropdown.map(subItem => (
                         <button
                            key={subItem.id}
                            onClick={() => handleNavClick(item.page, subItem.id)}
                            className="text-left py-2.5 px-3 text-slate-500 text-base rounded-md hover:bg-slate-50 hover:text-primary-600"
                         >
                            {subItem.label}
                         </button>
                    ))}
                 </div>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3">
             <button
               onClick={() => {
                 onOpenChat?.();
                 setIsMenuOpen(false);
               }}
               className="w-full text-center py-3 bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
             >
               <MessageCircle size={18} />
               線上諮詢
             </button>
             <a
               href="#contact"
               className="w-full text-center py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 active:scale-95 transition-all"
               onClick={handleContactClick}
             >
               預約試聽
             </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
