
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is clickable (button, link, input)
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Don't render on touch devices roughly check
  if (typeof navigator !== 'undefined' && typeof window !== 'undefined' && ('ontouchstart' in window)) {
      return null; 
  }

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Outer Ring / Crosshair */}
      <div 
        className={`absolute -translate-x-1/2 -translate-y-1/2 border border-[#00ff41] rounded-full transition-all duration-200 ease-out ${isHovering ? 'w-12 h-12 bg-[#00ff41]/20 border-[#ff00c1]' : 'w-8 h-8'}`}
      >
         {/* Crosshair lines */}
         {!isHovering && (
            <>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00ff41] opacity-50 transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#00ff41] opacity-50 transform -translate-x-1/2"></div>
            </>
         )}
      </div>

      {/* Center Dot */}
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff] transition-all duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`}></div>
    </div>
  );
};

export default CustomCursor;
