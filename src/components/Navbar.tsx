import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      // Ensure logo is completely hidden at top (opacity 0) and appears smoothly after 80px scroll
      setLogoOpacity(scrollY > 80 ? 1 : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', path: '/', hash: '' },
    { name: 'GALERÍA', path: '/galeria', hash: '' },
    { name: 'REALIDAD VIRTUAL', path: '/', hash: 'realidad-virtual' },
    { name: 'UBICACIÓN', path: '/', hash: 'ubicacion' },
    { name: 'CONTACTO', path: '/', hash: 'contacto' },
  ];

  const handleLinkClick = (hash: string) => {
    setIsMenuOpen(false);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled || !isHomePage 
          ? 'bg-[#2F4A3E] shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none opacity-0 transition-opacity duration-700" 
           style={{ opacity: isScrolled || !isHomePage ? 0 : 1 }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10 transition-all duration-500">
        {/* Left Side: Logo */}
        <div className="flex items-center min-w-[120px]">
          <Link 
            to="/" 
            id="logo-scroll" 
            className="transition-all duration-500 ease-in-out flex items-center"
            style={{ 
              opacity: logoOpacity, 
              visibility: logoOpacity > 0 ? 'visible' : 'hidden',
              transform: `translateY(${logoOpacity > 0 ? '0' : '10px'})`,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://www.comprarcasasevilla.com/img/header/logo.png" 
              alt="Comprarcasa" 
              className="h-7 md:h-9 w-auto object-contain block"
            />
          </Link>
        </div>

        {/* Desktop Nav: Perfectly Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 whitespace-nowrap">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path + (link.hash ? `#${link.hash}` : '')}
              className="nav-link text-xs tracking-[1px] font-medium transition-colors duration-200 hover:text-brand-accent text-brand-cream"
              onClick={() => handleLinkClick(link.hash)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Mobile menu button or spacer */}
        <div className="flex items-center justify-end min-w-[120px]">
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-brand-cream" />
            ) : (
              <Menu className="text-brand-cream" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-navbar shadow-xl py-8 flex flex-col items-center space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path + (link.hash ? `#${link.hash}` : '')}
                className="text-brand-cream text-sm tracking-[1px] font-medium hover:text-brand-accent transition-colors duration-200"
                onClick={() => handleLinkClick(link.hash)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
