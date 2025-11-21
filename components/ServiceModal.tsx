import React, { useEffect } from 'react';
import { X, Cpu, CheckCircle, Terminal } from 'lucide-react';
import { ServiceItem } from '../types';
import { motion } from 'framer-motion';

interface ServiceModalProps {
  service: ServiceItem;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isInvestigation = service.id === 'investigation';
  const accentColor = isInvestigation ? '#ff00c1' : '#00ff41';
  const borderColor = isInvestigation ? 'border-[#ff00c1]' : 'border-[#00ff41]';
  const textColor = isInvestigation ? 'text-[#ff00c1]' : 'text-[#00ff41]';
  const bgColor = isInvestigation ? 'bg-[#ff00c1]/10' : 'bg-[#00ff41]/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/80">
      {/* Overlay click to close */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0" 
        onClick={onClose}
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-2xl bg-black/95 border-2 ${borderColor} shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-4 border-b ${borderColor} ${bgColor}`}>
          <div className="flex items-center gap-2">
            <Terminal className={textColor} size={20} />
            <h3 className={`font-cyber font-bold text-lg tracking-wider text-white`}>
              MÓDULO: <span className={textColor}>{service.title.toUpperCase()}</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className={`${textColor} hover:text-white transition-colors`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
          
          {/* Details Text */}
          <div className="mb-8">
            <h4 className={`font-mono text-xs ${textColor} mb-2 tracking-[0.2em]`}>// DESCRIÇÃO_DO_SISTEMA</h4>
            <p className="text-gray-300 font-mono leading-relaxed text-sm md:text-base">
              {service.details}
            </p>
          </div>

          {/* Two Column Layout for Features and Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Features */}
            <div>
              <h4 className={`font-mono text-xs ${textColor} mb-4 tracking-[0.2em]`}>// FUNCIONALIDADES</h4>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 font-mono text-sm group">
                    <CheckCircle size={16} className={`${textColor} mt-0.5 flex-shrink-0`} />
                    <span className="group-hover:text-white transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className={`font-mono text-xs ${textColor} mb-4 tracking-[0.2em]`}>// TECH_STACK</h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className={`px-3 py-1 border ${borderColor} ${textColor} text-xs font-mono font-bold uppercase hover:bg-white hover:text-black transition-all cursor-default`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Decorative element */}
              <div className={`mt-6 p-3 border border-dashed border-gray-800 rounded bg-black/50`}>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={14} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-mono">SYSTEM_DIAGNOSTIC</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${isInvestigation ? 'bg-[#ff00c1]' : 'bg-[#00ff41]'} w-[85%] animate-pulse`}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
                  <span>LOAD: 85%</span>
                  <span>TEMP: 42°C</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-900 flex justify-between items-center bg-black">
          <span className="text-[10px] text-gray-600 font-mono">ID: {service.id.toUpperCase()}_V2.0</span>
          <button 
            onClick={onClose}
            className={`text-xs font-mono underline ${textColor} hover:text-white`}
          >
            [ FECHAR MÓDULO ]
          </button>
        </div>
        
        {/* Scan line effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-scan-fast pointer-events-none opacity-10"></div>
      </motion.div>
    </div>
  );
};

export default ServiceModal;