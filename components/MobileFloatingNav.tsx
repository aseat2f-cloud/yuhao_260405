
import React from 'react';
import { PageType } from '../types';
import { MessageCircle, ArrowUp } from 'lucide-react';

interface MobileFloatingNavProps {
  currentPage: PageType;
  theme: 'primary' | 'green' | 'blue' | 'purple';
  onOpenChat: () => void;
  showScrollTop: boolean;
  onScrollTop: () => void;
}

interface QuickLink {
  label: string;
  href: string;
}

const MobileFloatingNav: React.FC<MobileFloatingNavProps> = ({ 
  currentPage, 
  theme,
  onOpenChat,
  showScrollTop,
  onScrollTop
}) => {
  // Define links based on page
  const getLinks = (): QuickLink[] => {
    switch (currentPage) {
      case 'elementary':
        return [
          { label: '教學成果', href: '#outstanding-results' },
          { label: '課程班別', href: '#course-roadmap' },
          { label: '學員金榜', href: '#honor-roll' },
          { label: '環境介紹', href: '#environment' },
        ];
      case 'junior':
        return [
          { label: '學員心得', href: '#student-testimonials' },
          { label: '家長見證', href: '#parent-testimonials' },
          { label: '課程班別', href: '#course-roadmap' },
          { label: '學員金榜', href: '#honor-roll' },
        ];
      case 'senior':
        return [
          { label: '課程班別', href: '#course-roadmap' },
          { label: '學員金榜', href: '#honor-roll' },
          { label: '環境介紹', href: '#environment' },
          { label: '育豪優勢', href: '#advantages' },
        ];
      case 'bulletin':
        // No quick links for bulletin, only action buttons on the right
        return [];
      case 'home':
      default:
        return [
          { label: '分齡學程', href: '#program-planning' },
          { label: '家長見證', href: '#testimonials' },
          { label: '學生專區', href: '#student-zone' },
        ];
    }
  };

  const links = getLinks();

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll offset calculation (100px for header)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Theme styles for Nav Buttons
  const themeStyles = {
    primary: 'text-primary-600 border-primary-100 hover:bg-primary-50',
    green: 'text-green-600 border-green-100 hover:bg-green-50',
    blue: 'text-blue-600 border-blue-100 hover:bg-blue-50',
    purple: 'text-purple-600 border-purple-100 hover:bg-purple-50',
  };

  const currentStyle = themeStyles[theme] || themeStyles.primary;

  // Chat Button Style
  const chatThemeStyles = {
    primary: 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700',
    green: 'bg-green-600 text-white border-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700',
  };
  const chatStyle = chatThemeStyles[theme] || chatThemeStyles.primary;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] pb-4 pt-3">
      <div className={`flex items-center px-1 ${currentPage === 'bulletin' ? 'justify-end pr-6 gap-3' : 'justify-center gap-2'}`}>
        {/* Nav Links - Only show if links exist */}
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => handleScrollTo(e, link.href)}
            className={`w-[54px] h-[54px] bg-white border rounded-2xl flex flex-col items-center justify-center text-center transition-transform active:scale-95 shadow-sm ${currentStyle}`}
          >
            <span className="text-[10px] font-bold leading-tight">
              {link.label.substring(0, 2)}<br/>{link.label.substring(2)}
            </span>
          </a>
        ))}

        {/* Chat Button */}
        <button
          onClick={onOpenChat}
          className={`w-[54px] h-[54px] rounded-2xl border flex flex-col items-center justify-center text-center transition-transform active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.12)] ${chatStyle}`}
        >
          <MessageCircle size={20} className="mb-0.5" />
          <span className="text-[10px] font-bold leading-none">諮詢</span>
        </button>

        {/* Scroll Top Button */}
        <button
          onClick={onScrollTop}
          className={`w-[54px] h-[54px] bg-white border border-slate-200 text-slate-500 rounded-2xl flex flex-col items-center justify-center text-center transition-all active:scale-95 shadow-sm ${
            showScrollTop ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
        >
          <ArrowUp size={20} className="mb-0.5" />
          <span className="text-[10px] font-bold leading-none">置頂</span>
        </button>
      </div>
    </div>
  );
};

export default MobileFloatingNav;
