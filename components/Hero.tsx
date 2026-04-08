
import React from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import NewsCarousel from './NewsCarousel';
import { NewsItem, PageType } from '../types';

interface QuickLink {
  label: string;
  href: string;
}

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  newsItems: NewsItem[];
  onCtaClick?: () => void;
  onNavigate?: (page: PageType) => void;
  topLabel?: string;
  gradeLabel?: string;
  courseLabel?: string;
  showQuickLinks?: boolean;
  quickLinks?: QuickLink[];
  theme?: 'primary' | 'green' | 'blue' | 'purple';
  secondaryBtnLabel?: string;
  secondaryBtnIcon?: React.ReactNode;
  secondaryBtnLink?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  newsItems, 
  onCtaClick, 
  onNavigate,
  topLabel = "在地深耕40年, 板橋最優",
  gradeLabel,
  courseLabel,
  showQuickLinks = false,
  quickLinks,
  theme = 'primary',
  secondaryBtnLabel,
  secondaryBtnIcon,
  secondaryBtnLink
}) => {
  
  // Default Home Page Links
  const DEFAULT_LINKS: QuickLink[] = [
    { label: '分齡學程', href: '#program-planning' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '家長見證', href: '#testimonials' },
    { label: '學生專區', href: '#student-zone' },
  ];

  const linksToRender = quickLinks || DEFAULT_LINKS;

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme color mapping
  const themeColorMap = {
    primary: 'primary',
    green: 'green',
    blue: 'blue',
    purple: 'purple'
  };
  const t = themeColorMap[theme] || 'primary';

  // Default secondary button config
  const secLabel = secondaryBtnLabel || "下載教材試閱";
  const secIcon = secondaryBtnIcon || <Download size={20} />;

  // Determine Title Size based on Theme (Home vs Departments)
  // Home (primary): lg:text-[70px], xl:text-[80px]
  // Departments (others): lg:text-[90px], xl:text-[95px]
  const isHome = theme === 'primary';
  const titleSizeClass = isHome 
    ? "text-[50px] md:text-[75px] lg:text-[70px] xl:text-[80px]" 
    : "text-[50px] md:text-[75px] lg:text-[90px] xl:text-[95px]";

  const handleSecondaryClick = (e: React.MouseEvent) => {
    if (!secondaryBtnLink) return;
    
    if (secondaryBtnLink.startsWith('http')) {
      // External link - don't prevent default, let it open
      return;
    }
    
    // Internal anchor
    handleScrollTo(e, secondaryBtnLink);
  };

  return (
    <section className="relative pt-[40px] pb-16 lg:pt-0 lg:pb-0 lg:h-[97vh] lg:min-h-[684px] overflow-hidden bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-auto lg:h-full">
        {/* Main Flex Container: vertically centered and stretched height */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center gap-12 lg:gap-16 h-auto lg:h-full">
          
          {/* Text Content Column */}
          <div className="flex-1 w-full flex flex-col justify-center lg:items-start items-center self-center lg:self-stretch">
            
            {/* 85% Height Wrapper for Desktop Vertical Alignment */}
            <div className="w-full h-auto lg:h-[85%] my-auto flex flex-col justify-center items-center lg:items-start lg:pl-[5%]">
              
              <div className="w-full flex flex-col items-center lg:items-start">
                {/* Top Label */}
                <div className={`inline-flex items-center gap-2 px-5 py-2 bg-${t}-50 border border-${t}-100 rounded-full ${gradeLabel ? 'mb-4' : 'mb-6'} whitespace-nowrap shadow-sm bg-white`}>
                    <MapPin className={`text-${t}-600 w-5 h-5`} />
                    <span className={`text-${t}-700 font-bold text-base tracking-wide`}>{topLabel}</span>
                </div>

                {/* Grade & Course Labels */}
                {(gradeLabel || courseLabel) && (
                  <div className="mb-10 flex flex-nowrap justify-center lg:justify-start gap-3">
                    {gradeLabel && (
                      <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-md text-base border border-slate-200 whitespace-nowrap flex-shrink-0">
                        {gradeLabel}
                      </span>
                    )}
                    {courseLabel && (
                      <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 font-bold rounded-md text-base border border-orange-100 whitespace-nowrap flex-shrink-0">
                        {courseLabel}
                      </span>
                    )}
                  </div>
                )}

                {/* Main Title - Updated Sizing */}
                <h1 className={`${titleSizeClass} font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 text-center lg:text-left whitespace-nowrap`}>
                  {title}
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-500 mb-8 w-[90%] md:w-[58%] lg:w-[85%] mx-auto lg:mx-0 leading-relaxed whitespace-pre-line font-medium text-center lg:text-left">
                  {subtitle}
                </p>

                {/* Main CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-10">
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      if (onCtaClick) onCtaClick();
                      handleScrollTo(e, '#contact');
                    }}
                    className={`w-full sm:w-auto px-8 py-4 bg-${t}-600 text-white rounded-xl font-bold shadow-md shadow-${t}-500/20 hover:bg-${t}-700 hover:shadow-lg hover:shadow-${t}-600/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    排隊預約試聽
                    <ArrowRight size={20} />
                  </a>
                  
                  {secondaryBtnLink?.startsWith('http') ? (
                    <a 
                      href={secondaryBtnLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-auto px-6 py-4 bg-white text-${t}-600 border border-${t}-600 rounded-xl font-bold shadow-sm hover:bg-${t}-50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                      {secLabel}
                      {secIcon}
                    </a>
                  ) : (
                    <button 
                      onClick={handleSecondaryClick}
                      className={`w-full sm:w-auto px-6 py-4 bg-white text-${t}-600 border border-${t}-600 rounded-xl font-bold shadow-sm hover:bg-${t}-50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                      {secLabel}
                      {secIcon}
                    </button>
                  )}
                </div>

                {/* Quick Links */}
                {showQuickLinks && (
                  <div className="hidden lg:flex justify-center w-full sm:w-auto gap-3">
                    {linksToRender.map((link, index) => (
                      <a 
                        key={index}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="group w-20 h-20 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-[15px] font-bold text-slate-900 hover:bg-yellow-300 hover:scale-110 transition-all cursor-pointer shadow-sm"
                      >
                         <span className="leading-tight text-center">
                            {link.label.substring(0, 2)}<br/>{link.label.substring(2)}
                         </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: News Carousel */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end h-auto lg:h-full">
            <NewsCarousel news={newsItems} onNavigate={onNavigate} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
