
import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "INITIALIZING KERNEL...",
    "LOADING MODULES: [REACT, NEXT, TAILWIND]",
    "CHECKING SECURITY PROTOCOLS...",
    "BYPASSING FIREWALL...",
    "ACCESSING MAINFRAME...",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING UI ASSETS...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for hacker feel
        return prev + Math.random() * 10; 
      });
    }, 150);

    // Log text animation
    const logInterval = setInterval(() => {
      if (currentLogIndex < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // Finish condition
    const timeout = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-[#00ff41] font-mono p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2 text-xs font-bold tracking-widest">
          <span>FOCUSSDEV BIOS v2.4</span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-900 border border-[#00ff41] p-0.5 mb-8">
          <div 
            className="h-full bg-[#00ff41] transition-all duration-100 ease-out shadow-[0_0_10px_#00ff41]"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>

        {/* Terminal Logs */}
        <div className="h-48 overflow-hidden flex flex-col justify-end space-y-1 border-l-2 border-[#00ff41] pl-4 bg-black/50">
          {logs.map((log, index) => (
            <div key={index} className="text-sm animate-fade-in">
              <span className="opacity-50 mr-2">{`>`}</span>
              <span className={index === logs.length - 1 ? "animate-pulse" : ""}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
