import React, { useState, useEffect, useRef } from 'react';
import { Code, Users, ShieldCheck, Coffee } from 'lucide-react';

const stats = [
  { id: 1, label: 'PROJETOS ENTREGUES', value: 150, suffix: '+', icon: <Code /> },
  { id: 2, label: 'CLIENTES SATISFEITOS', value: 98, suffix: '%', icon: <Users /> },
  { id: 3, label: 'AMEAÇAS NEUTRALIZADAS', value: 500, suffix: '+', icon: <ShieldCheck /> },
  { id: 4, label: 'HORAS CODANDO', value: 10000, suffix: '+', icon: <Coffee /> },
];

const CyberStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 border-y border-gray-800 bg-black/80 backdrop-blur-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Counter 
              key={stat.id} 
              target={stat.value} 
              label={stat.label} 
              suffix={stat.suffix} 
              icon={stat.icon}
              start={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter: React.FC<{ target: number; label: string; suffix: string; icon: React.ReactNode; start: boolean }> = ({ target, label, suffix, icon, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [start, target]);

  return (
    <div className="flex flex-col items-center justify-center text-center group">
      <div className="mb-3 text-gray-600 group-hover:text-[#00ff41] transition-colors duration-300 transform group-hover:scale-110">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 32 })}
      </div>
      <div className="text-3xl md:text-4xl font-cyber font-bold text-white mb-1 group-hover:text-shadow-neon transition-all">
        {count}{suffix}
      </div>
      <div className="text-xs font-mono text-gray-500 tracking-widest uppercase border-t border-transparent group-hover:border-[#00ff41] pt-2 transition-all">
        {label}
      </div>
    </div>
  );
};

export default CyberStats;