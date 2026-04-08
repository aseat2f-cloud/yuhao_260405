
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, Star, GraduationCap, TrendingUp, Award, BookCheck, ThumbsUp, Shield } from 'lucide-react';

const JUNIOR_STATS = [
  { icon: <Trophy />, value: '1,250+', label: '錄取第一志願', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: <Star />, value: '380+', label: '5A++ 滿級分', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: <GraduationCap />, value: '100%', label: '公立高中錄取率', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: <Users />, value: '40,000+', label: '累計輔導人次', color: 'text-primary-600', bg: 'bg-primary-50' },
  { icon: <TrendingUp />, value: '98%', label: '成績進步率', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: <Award />, value: 'No.1', label: '奧林匹亞金牌', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: <BookCheck />, value: '250+', label: '醫科牙醫錄取', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: <ThumbsUp />, value: '4.9', label: '家長滿意度', color: 'text-orange-600', bg: 'bg-orange-50' },
];

const ELEMENTARY_STATS = [
  { icon: <Trophy />, value: '95%', label: '通過劍橋英檢', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: <Shield />, value: '90%+', label: 'KET/PET通過', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: <GraduationCap />, value: '90%+', label: '公立資優錄取率', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: <Star />, value: '90%+', label: '私立名校錄取率', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: <TrendingUp />, value: '98%', label: '成績進步率', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: <ThumbsUp />, value: '4.9', label: '家長滿意度', color: 'text-orange-600', bg: 'bg-orange-50' },
];

const SENIOR_STATS = [
  { icon: <Trophy />, value: '95%', label: '國立大學錄取率', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: <GraduationCap />, value: '45%', label: '台清交成政錄取', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: <BookCheck />, value: '120+', label: '醫學系錄取人次', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: <Star />, value: '92%', label: '頂標/前標達成率', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: <TrendingUp />, value: '98%', label: '成績進步率', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: <ThumbsUp />, value: '4.9', label: '家長滿意度', color: 'text-orange-600', bg: 'bg-orange-50' },
];

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        } else {
          setHasStarted(false); // Reset animation when out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    // Parse inside effect to ensure stability and avoid dependency loops
    const match = value.match(/^(\D*)(\d[\d,.]*)(\D*)$/);
    if (!match) {
        setDisplayValue(value);
        return;
    }

    const [, prefix, numStr, suffix] = match;
    const isFloat = numStr.includes('.');
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimalPlaces = isFloat ? (numStr.split('.')[1] || []).length : 0;
    
    // Animation Configuration
    let start = 0;
    let end = target;
    
    // Adaptive Duration (Accelerated by additional 30%)
    let mainDuration = 1200; // Base duration (was 1700)
    if (target <= 1000) mainDuration = 1500; // (was 2100)
    if (target <= 100) mainDuration = 1750; // (was 2500)

    // Special logic for Rankings (e.g., No.1): Count down from 99
    if (prefix.includes('No.')) {
      start = 99;
      end = target;
      mainDuration = 1500; // (was 2100)
    }

    // Step Logic: Calculate value before the last digit flips
    // e.g. 1250 -> pause at 1249
    // e.g. 4.9 -> pause at 4.8
    const step = Math.pow(10, -decimalPlaces);
    const direction = end > start ? 1 : -1;
    const range = Math.abs(end - start);
    
    // If range is large enough, set intermediate target to (End - 1 step)
    const offset = range > step ? step : 0;
    const intermediate = end - (direction * offset);

    // Timeline Settings
    // Updated: Faster pause and final step (~30% faster)
    const pauseDuration = 40; // (was 60)
    const finalStepDuration = 70; // (was 100)

    let startTime: number | null = null;
    let animationFrameId: number;

    const update = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      let current;

      if (elapsed < mainDuration) {
        // Phase 1: Animate to Intermediate
        const progress = elapsed / mainDuration;
        // Ease Out Expo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current = start + (intermediate - start) * ease;
      } else if (elapsed < mainDuration + pauseDuration) {
        // Phase 2: Pause (Hold Intermediate)
        current = intermediate;
      } else if (elapsed < mainDuration + pauseDuration + finalStepDuration) {
        // Phase 3: Animate Intermediate -> End
        const finalProgress = (elapsed - mainDuration - pauseDuration) / finalStepDuration;
        // Simple Ease Out for short duration
        const ease = 1 - (1 - finalProgress) * (1 - finalProgress);
        current = intermediate + (end - intermediate) * ease;
      } else {
        // Phase 4: Finished
        current = end;
      }

      let formattedNum = current.toFixed(decimalPlaces);
      
      // Add commas if needed
      if (numStr.includes(',') || (end >= 1000 && !prefix.includes('No.'))) {
        const parts = formattedNum.split('.');
        parts[0] = parseInt(parts[0]).toLocaleString('en-US');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (elapsed < mainDuration + pauseDuration + finalStepDuration) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        // Ensure final value is exact string passed in prop (to handle any formatting quirks)
        setDisplayValue(value);
        setIsPopping(true); // Trigger pop effect
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, value]);

  // Reset popping state after animation
  useEffect(() => {
    if (isPopping) {
        const timer = setTimeout(() => {
            setIsPopping(false);
        }, 300); // Matches transition duration
        return () => clearTimeout(timer);
    }
  }, [isPopping]);

  // Determine initial state for render
  const match = value.match(/^(\D*)(\d[\d,.]*)(\D*)$/);
  
  if (!match) {
    return <span ref={elementRef} className="tabular-nums inline-block">{value}</span>;
  }

  const [, prefix, numStr, suffix] = match;
  
  // Calculate initial state based on type
  let startVal = 0;
  if (prefix.includes('No.')) {
    startVal = 99;
  }

  const isFloat = numStr.includes('.');
  const decimalPlaces = isFloat ? (numStr.split('.')[1] || []).length : 0;
  const initialNumStr = startVal.toFixed(decimalPlaces);
  const initialState = `${prefix}${initialNumStr}${suffix}`;

  return (
    <span 
        ref={elementRef} 
        className={`tabular-nums inline-block transition-transform duration-300 ease-out ${isPopping ? 'scale-125' : 'scale-100'}`}
    >
      {hasStarted && displayValue ? displayValue : initialState}
    </span>
  );
};

interface OutstandingResultsProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const OutstandingResults: React.FC<OutstandingResultsProps> = ({ theme = 'primary' }) => {
  const t = theme === 'primary' ? 'primary' : theme;
  const [replayCounts, setReplayCounts] = useState<Record<number, number>>({});

  const statsToRender = theme === 'green' ? ELEMENTARY_STATS : 
                        theme === 'blue' ? JUNIOR_STATS :
                        theme === 'purple' ? SENIOR_STATS : JUNIOR_STATS;

  const handleReplay = (index: number) => {
    setReplayCounts(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  };
  
  return (
    <section id="outstanding-results" className="py-24 bg-slate-50 relative overflow-hidden scroll-mt-24">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-[600px] h-[600px] bg-${t}-100/50 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2`}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>亮眼成績 • 實力見證</h2>
          
          {/* Changed style to match "家長五星見證" */}
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            不是奇蹟，只是傳統
          </h3>

          {/* Reduced text length by removing "每一年" */}
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            在育豪，優秀是一種習慣。榜單的刷新，不單是運氣，更是師生共同堅持的成果。
          </p>
        </div>

        <div className={`grid gap-4 md:gap-8 ${statsToRender.length === 6 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {statsToRender.map((stat, index) => (
            <div 
              key={index} 
              onClick={() => handleReplay(index)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 cursor-pointer active:scale-95 active:bg-slate-50"
              title="點擊重新播放動畫"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(stat.icon as React.ReactElement, { size: 24, className: "w-6 h-6 md:w-7 md:h-7" })}
              </div>
              <div className={`text-3xl md:text-4xl lg:text-4xl font-extrabold mb-2 ${stat.color} tracking-tight`}>
                <AnimatedCounter key={replayCounts[index] || 0} value={stat.value} />
              </div>
              <div className="text-slate-500 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutstandingResults;
