import React, { useState, useEffect } from 'react';
import { Code, Paintbrush, Search, Smartphone, Shield, ChevronDown, Mail, Phone, Cpu, Menu, X, ArrowUp, Cloud } from 'lucide-react';
import MatrixBackground from './components/MatrixBackground';
import Terminal from './components/Terminal';
import ServiceModal from './components/ServiceModal';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CyberStats from './components/CyberStats';
import { SERVICES } from './constants';
import { ServiceItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  // Navigation States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const whatsappNumber = "5533984123591";
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

  // Scroll listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppRedirect = (msg?: string) => {
    const text = msg ? `?text=${encodeURIComponent(msg)}` : '';
    window.open(`${whatsappBaseUrl}${text}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*NOVO CONTATO VIA SITE*%0A%0ANome: ${formName}%0AEmail: ${formEmail}%0AMensagem: ${formMessage}`;
    window.open(`${whatsappBaseUrl}?text=${message}`, '_blank');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code className="w-8 h-8 md:w-12 md:h-12" />;
      case 'paint': return <Paintbrush className="w-8 h-8 md:w-12 md:h-12" />;
      case 'search': return <Search className="w-8 h-8 md:w-12 md:h-12" />;
      case 'smartphone': return <Smartphone className="w-8 h-8 md:w-12 md:h-12" />;
      case 'shield': return <Shield className="w-8 h-8 md:w-12 md:h-12" />;
      case 'cloud': return <Cloud className="w-8 h-8 md:w-12 md:h-12" />;
      default: return <Code className="w-8 h-8 md:w-12 md:h-12" />;
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Render Preloader initially
  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative text-gray-200 selection:bg-[#00ff41] selection:text-black overflow-x-hidden">
      <CustomCursor />
      <MatrixBackground />
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-md border-b border-[#00ff41]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-2 group cursor-pointer"
              onClick={scrollToTop}
            >
              <div className="w-8 h-8 bg-[#00ff41] flex items-center justify-center rounded-sm group-hover:bg-[#ff00c1] transition-colors duration-300">
                <span className="text-black font-bold text-xl font-cyber">F</span>
              </div>
              <span className="font-cyber font-bold text-xl tracking-wider group-hover:text-shadow-neon transition-all">
                FOCUSS<span className="text-[#00ff41] group-hover:text-[#ff00c1]">DEV</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 font-mono text-sm">
                <a href="#home" onClick={scrollToTop} className="hover:text-[#00ff41] transition-colors duration-300">/HOME</a>
                <a href="#services" className="hover:text-[#00ff41] transition-colors duration-300">/SERVIÇOS</a>
                <a href="#investigation" className="hover:text-[#ff00c1] transition-colors duration-300">/INVESTIGAÇÃO</a>
                <button 
                  onClick={() => handleWhatsAppRedirect("Olá, gostaria de iniciar um contato.")}
                  className="px-4 py-1 border border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all duration-300"
                >
                  INICIAR_CONTATO
                </button>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#00ff41] hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 border-b border-[#00ff41] p-4 backdrop-blur-xl shadow-[0_10px_20px_rgba(0,255,65,0.1)] animate-slide-down">
            <div className="flex flex-col space-y-4 font-mono text-sm">
              <a href="#home" onClick={() => { scrollToTop(); closeMenu(); }} className="block px-3 py-2 hover:bg-[#00ff41]/10 hover:text-[#00ff41] rounded transition-colors">/HOME</a>
              <a href="#services" onClick={closeMenu} className="block px-3 py-2 hover:bg-[#00ff41]/10 hover:text-[#00ff41] rounded transition-colors">/SERVIÇOS</a>
              <a href="#investigation" onClick={closeMenu} className="block px-3 py-2 hover:bg-[#ff00c1]/10 hover:text-[#ff00c1] rounded transition-colors">/INVESTIGAÇÃO</a>
              <button 
                onClick={() => { handleWhatsAppRedirect("Olá, via menu mobile."); closeMenu(); }}
                className="w-full text-left px-3 py-3 border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black font-bold transition-all"
              >
                INICIAR_CONTATO
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <Hero />

      {/* Cyber Stats Section */}
      <CyberStats />

      {/* Services Grid */}
      <section id="services" className="relative py-24 z-10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-4">
              <span className="text-[#00ff41]">{`<`}</span> SERVIÇOS <span className="text-[#00ff41]">{`/>`}</span>
            </h2>
            <div className="h-1 w-24 bg-[#00ff41] mx-auto shadow-[0_0_10px_#00ff41]"></div>
            <p className="mt-4 text-gray-500 font-mono text-xs md:text-sm">Clique nos cartões para expandir os dados.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                variants={itemVariants}
                className="group relative bg-[#0a0a0a] border border-gray-800 p-8 hover:border-[#00ff41] transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                onClick={() => setSelectedService(service)}
              >
                {/* Scanning line effect */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-[#00ff41] shadow-[0_0_15px_#00ff41] transition-transform duration-1000 transform ${activeService === service.id ? 'translate-y-[400px]' : '-translate-y-2'}`}></div>
                
                <div className="mb-6 text-[#00ff41] group-hover:text-white transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                
                <h3 className="text-xl font-bold font-cyber mb-4 group-hover:text-[#00ff41] transition-colors">{service.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-gray-800 pl-4 group-hover:border-[#00ff41] transition-colors">
                  {service.description}
                </p>
                
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-700 font-mono group-hover:text-[#00ff41] transition-colors">
                  [ + DETALHES ]
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] text-gray-700 font-mono">ID: {service.id.toUpperCase()}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investigation Section (Special Highlight) */}
      <motion.section 
        id="investigation" 
        className="relative py-24 z-10 border-y border-[#ff00c1]/30 bg-[#050005]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Grid for this section */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,193,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,193,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 mb-4 border border-[#ff00c1] text-[#ff00c1] font-mono text-xs tracking-widest bg-[#ff00c1]/10">
                FOCO: GOLPES & FRAUDES
              </div>
              <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6 text-white">
                INVESTIGAÇÃO <span className="text-[#ff00c1] glitch-effect" data-text="DIGITAL">DIGITAL</span>
              </h2>
              <p className="text-gray-300 font-mono mb-6 text-lg">
                Especialistas em encontrar pessoas e rastrear golpistas virtuais. Se você foi vítima de fraude online, nossa inteligência utiliza ferramentas OSINT para identificar os autores e recuperar informações.
              </p>
              <ul className="space-y-4 font-mono text-sm text-gray-400 mb-8">
                <li className="flex items-center gap-3">
                  <Search className="text-[#ff00c1]" size={16} />
                  <span>Localização de Pessoas Desaparecidas ou Golpistas</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="text-[#ff00c1]" size={16} />
                  <span>Investigação de Estelionato Digital</span>
                </li>
                <li className="flex items-center gap-3">
                  <Cpu className="text-[#ff00c1]" size={16} />
                  <span>Dossiês Completos para Processos Judiciais</span>
                </li>
              </ul>
              <button 
                onClick={() => handleWhatsAppRedirect("Preciso de ajuda com uma investigação digital/golpe.")}
                className="px-8 py-3 bg-[#ff00c1] text-black font-bold font-mono hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,0,193,0.4)]"
              >
                FALAR NO WHATSAPP
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 bg-black/50 border border-[#ff00c1] p-6 rounded backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,193,0.2)]">
                 <div className="flex justify-between items-center mb-4 border-b border-[#ff00c1]/30 pb-2">
                   <span className="text-[#ff00c1] font-mono text-xs">SCAM_TRACKER.EXE</span>
                   <div className="flex gap-1">
                     <div className="w-2 h-2 rounded-full bg-[#ff00c1]"></div>
                     <div className="w-2 h-2 rounded-full bg-[#ff00c1]/50"></div>
                     <div className="w-2 h-2 rounded-full bg-[#ff00c1]/30"></div>
                   </div>
                 </div>
                 <div className="space-y-2 font-mono text-xs text-[#ff00c1]/80">
                   <p>{`> Initializing Trace...`}</p>
                   <p>{`> Identifying fake profiles... [DONE]`}</p>
                   <p>{`> Cross-referencing IP logs...`}</p>
                   <p className="text-white">{`> MATCH FOUND: Suspect identified.`}</p>
                   <p>{`> Compiling evidence report...`}</p>
                   <div className="mt-4 h-32 bg-[#ff00c1]/5 border border-[#ff00c1]/20 p-2 overflow-hidden relative">
                     {/* Fake data scrolling */}
                     <div className="absolute animate-scroll-up">
                        {Array.from({length: 20}).map((_, i) => (
                          <div key={i} className="flex justify-between opacity-60">
                            <span>ID_{Math.floor(Math.random()*99999)}</span>
                            <span>{Math.random() > 0.5 ? 'DETECTED' : 'TRACING...'}</span>
                          </div>
                        ))}
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Decorative elements behind */}
               <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#ff00c1] opacity-50"></div>
               <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#ff00c1] opacity-50"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer / Contact */}
      <footer id="contact" className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-gray-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <span className="text-black bg-[#00ff41] w-6 h-6 flex items-center justify-center font-bold font-cyber text-sm">F</span>
                 <span className="font-cyber font-bold text-lg text-white">FOCUSSDEV</span>
              </div>
              <p className="text-gray-500 font-mono text-sm mb-4">
                Desenvolvimento Web e Investigação Digital especializada em fraudes e golpes.
              </p>
              <div className="space-y-2 font-mono text-sm text-gray-400">
                <div className="flex items-center gap-2 group">
                  <Mail size={14} className="text-[#00ff41] group-hover:text-[#ff00c1] transition-colors" />
                  <a href="mailto:devcriador1@gmail.com" className="hover:text-white transition-colors">devcriador1@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 group">
                  <Phone size={14} className="text-[#00ff41] group-hover:text-[#ff00c1] transition-colors" />
                  <a href={whatsappBaseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer" title="WhatsApp">(33) 98412-3591</a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-cyber font-bold mb-6">LINKS RÁPIDOS</h3>
              <ul className="space-y-2 text-sm font-mono text-gray-500">
                <li><a href="#home" onClick={scrollToTop} className="hover:text-[#00ff41] transition-colors cursor-pointer">{`> Home`}</a></li>
                <li><a href="#services" className="hover:text-[#00ff41] transition-colors cursor-pointer">{`> Serviços`}</a></li>
                <li><a href="#investigation" className="hover:text-[#00ff41] transition-colors cursor-pointer">{`> Investigação`}</a></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-cyber font-bold mb-6">TRANSMITIR MENSAGEM (WHATSAPP)</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="CODENAME (NOME)" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-gray-900 border border-gray-800 p-3 text-white font-mono text-sm focus:border-[#00ff41] focus:outline-none transition-colors" 
                  />
                  <input 
                    type="email" 
                    placeholder="EMAIL" 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="bg-gray-900 border border-gray-800 p-3 text-white font-mono text-sm focus:border-[#00ff41] focus:outline-none transition-colors" 
                  />
                </div>
                <textarea 
                  rows={3} 
                  placeholder="DADOS DA MISSÃO... (RELATE SEU CASO)" 
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 p-3 text-white font-mono text-sm focus:border-[#00ff41] focus:outline-none transition-colors"
                ></textarea>
                <button 
                  type="button" 
                  onClick={handleFormSubmit}
                  className="w-full bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] py-3 font-bold font-mono tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300"
                >
                  ENVIAR VIA WHATSAPP
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-600">
            <p>&copy; 2024 FOCUSSDEV SYSTEMS. TODOS OS DIREITOS RESERVADOS.</p>
            <p>SYSTEM STATUS: <span className="text-[#00ff41]">ONLINE</span></p>
          </div>
        </div>
      </footer>
      
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

      <Terminal />

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 bg-black/80 border border-[#ff00c1] text-[#ff00c1] p-3 rounded shadow-[0_0_15px_rgba(255,0,193,0.3)] hover:bg-[#ff00c1] hover:text-black transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;