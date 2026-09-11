import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Bed, Bath, Hash, Play } from 'lucide-react';

const InmoZoneMap = React.lazy(() => import('../components/InmoZoneMap'));

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoContainerRef = React.useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = videoContainerRef.current?.closest('section');
      if (!section) return;
      setParallaxOffset(-section.getBoundingClientRect().top * 0.25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
      setFormData({ name: '', phone: '', message: '' });
      setErrors({});
    }
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section 
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dwrgm5yl/image/upload/v1789119343/portada.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
        aria-label="Fachada con piscina de la vivienda"
      >
        <img 
          src="https://res.cloudinary.com/dwrgm5yl/image/upload/v1789119343/portada.png" 
          alt="Fachada con piscina de la vivienda" 
          loading="eager" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        
        {/* Horizontal dark gradient overlay: opaque on left, transparent at ~48-50% width */}
        <div 
          className="absolute inset-0 pointer-events-none hero-horizontal-overlay" 
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.80) 22%, rgba(0, 0, 0, 0.40) 38%, rgba(0, 0, 0, 0) 48%)'
          }} 
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center pt-16 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm md:max-w-md text-left text-white flex flex-col items-start"
          >
            <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 opacity-90 font-medium whitespace-nowrap">
              URBANIZACIÓN LA ESTRELLA · PALOMARES DEL RÍO
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3 md:mb-4 font-serif tracking-tight leading-[1.15]">
              Calle Lucero del Alba
            </h1>
            <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.16em] uppercase mb-6 md:mb-8 opacity-75 font-light leading-relaxed">
              CHALET INDEPENDIENTE DE LUJO EN UNA SOLA PLANTA
            </p>
            <a 
              href="#contacto"
              className="inline-block px-[36px] py-[14px] bg-brand-navbar text-brand-cream border border-brand-accent text-xs tracking-[2px] font-medium hover:bg-brand-cream hover:text-brand-navbar transition-all duration-200 ease-out uppercase"
            >
              CONSULTAR DISPONIBILIDAD
            </a>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-horizontal-overlay {
              background: linear-gradient(to right, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.80) 60%, rgba(0, 0, 0, 0.35) 90%, rgba(0, 0, 0, 0.1) 100%) !important;
            }
          }
        `}</style>
      </section>

      {/* Content Wrapper for Scroll Over Effect */}
      <div className="relative z-10">
        {/* Stats Bar */}
        <section className="bg-brand-navbar text-brand-cream py-12 md:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center md:border-r border-brand-cream/20 last:border-0 border-opacity-50">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2">SUPERFICIE</p>
                <p className="text-lg md:text-2xl font-serif">214 M²</p>
              </div>
              <div className="text-center md:border-r border-brand-cream/20 last:border-0 border-opacity-50">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2">DORMITORIOS</p>
                <p className="text-lg md:text-2xl font-serif">5</p>
              </div>
              <div className="text-center md:border-r border-brand-cream/20 last:border-0 border-opacity-50">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2">BAÑOS</p>
                <p className="text-lg md:text-2xl font-serif">3</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2">PRECIO</p>
                <p className="text-lg md:text-2xl font-serif">375.000 €</p>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-24 bg-brand-cream text-brand-navbar relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[40%_60%] gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 leading-tight">Vivir sin límites, en una sola planta</h2>
              <div className="w-12 h-[2px] bg-brand-accent mb-12" />
              <div className="space-y-6 text-base md:text-lg leading-relaxed font-light opacity-90">
                <p>
                  Descubra el privilegio de vivir en un chalet independiente de una sola planta en la prestigiosa 
                  urbanización La Estrella, una de las zonas más demandadas y tranquilas de Palomares del Río.
                </p>
                <p>
                  Esta propiedad ha sido diseñada pensando en la comodidad absoluta: sin escaleras ni barreras 
                  arquitectónicas. Con espacios excepcionalmente amplios y luminosos, la vivienda se abre hacia 
                  un exterior privado que invita al descanso y al disfrute social.
                </p>
                <p>
                  Su piscina privada y el jardín con zona de barbacoa se convierten en el epicentro de la vida familiar, 
                  rodeados de un entorno de paz a tan solo 15 minutos del centro de Sevilla capital. Calidad, 
                  amplitud y diseño en un enclave inmejorable.
                </p>
                <div className="pt-6">
                  <a 
                    href="/galeria" 
                    className="inline-block text-[10px] tracking-[0.3em] uppercase border-b border-brand-navbar/30 pb-1 hover:border-brand-accent transition-all duration-300"
                  >
                    VER TODAS LAS FOTOS →
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative group overflow-hidden flex-shrink-0" style={{ width: '100%', height: '580px' }}>
                <img 
                  src="https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118124/79-2.jpg" 
                  alt="Patio exterior de la vivienda" 
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[24px] shadow-2xl relative z-10"
                  style={{ imageRendering: 'high-quality', objectPosition: 'center' }}
                />
                <div className="absolute bottom-5 left-5 z-20 bg-white p-5 rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-w-[220px]">
                  <p className="text-[13px] tracking-[0.12em] uppercase text-gray-400 mb-1">EXCLUSIVA</p>
                  <p className="text-base font-semibold text-brand-navbar mb-0.5">Chalet independiente</p>
                  <p className="text-sm italic text-gray-500 mb-2">Urb. La Estrella · Palomares del Río</p>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-300 line-through">385.000 €</p>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-wider">
                      ▼ 3% de bajada
                    </div>
                    <p className="text-[15px] font-medium text-brand-navbar">375.000 €</p>
                  </div>
                </div>
                <div className="absolute -inset-4 border border-brand-accent/20 rounded-[40px] -z-0 opacity-50" />
              </div>
            </div>
          </div>
        </section>


        {/* Location Section */}
        <section id="ubicacion" className="relative z-10" style={{ backgroundColor: '#2F4A3E', padding: '80px 60px' }}>
          <div className="max-w-7xl mx-auto">
            <h2 style={{
              fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F8F6F2',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}>
              A 15 minutos de Sevilla
            </h2>
            <p style={{
              color: 'rgba(248,246,242,0.55)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '2.5rem',
              fontFamily: 'Inter, sans-serif',
            }}>
              Urbanización La Estrella · Palomares del Río
            </p>
            <div className="w-12 h-[2px] bg-brand-accent mx-auto mb-12" />
            <Suspense fallback={<div className="h-[600px] bg-brand-navbar/10 animate-pulse rounded-[40px]" />}>
              <InmoZoneMap />
            </Suspense>
          </div>
          <style>{`
            @media (max-width: 768px) {
              #ubicacion { padding: 36px 16px !important; }
            }
          `}</style>
        </section>

        {/* VR Section */}
        <section 
          id="realidad-virtual" 
          className="w-full h-[700px] relative z-10 flex items-center justify-center overflow-hidden"
        >
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
              backgroundImage: "url('https://fotos15.apinmo.com/3503/28793640/53-2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/35" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-cursive italic text-white mb-10 tracking-tight leading-tight">
                  Video-tour de la casa
                </h3>
                <button 
                  onClick={() => window.open('https://my.matterport.com/show/?m=28793640', '_blank')}
                  className="flex items-center gap-4 px-10 py-5 bg-white/10 backdrop-blur-md border border-white rounded-full text-white text-xs tracking-[0.3em] font-bold hover:bg-white/20 hover:scale-105 transition-all duration-500 group uppercase"
                >
                  <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
                  REPRODUCIR VÍDEO
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-brand-cream text-brand-navbar px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="text-4xl md:text-6xl font-serif mb-4">Hablemos de su próximo hogar</h3>
              <div className="w-12 h-[2px] bg-brand-accent mb-12" />
              <div className="space-y-12">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-start">
                    <img 
                      src="https://i.ibb.co/3yvvt76w/imagen.jpg" 
                      alt="Magdalena" 
                      className="w-20 h-20 rounded-full object-cover shadow-md mb-2"
                    />
                    <p className="text-[11px] tracking-[0.2em] uppercase font-serif italic opacity-80">Magdalena</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-50">AGENCIA</p>
                    <p className="text-xl font-medium">SuHogar Sevilla / Comprarcasa Suhogar</p>
                    <p className="opacity-70 font-light">Calle Chile, 104, 41930 Bormujos, Sevilla</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-12">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-50">HORARIO</p>
                    <p className="text-sm">Lunes - Viernes</p>
                    <p className="text-sm opacity-70">09:00 - 14:00 y 16:30 - 19:30</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-50">TELÉFONO</p>
                    <p className="text-sm">653 95 82 89</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 bg-brand-navbar p-8 md:p-12 rounded-sm text-brand-cream">
              <div className="grid gap-8">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="SU NOMBRE" 
                    className="w-full bg-transparent border-b border-brand-cream focus:border-brand-cream outline-none transition-colors text-xs tracking-widest uppercase font-medium placeholder:text-brand-cream/50 py-4"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-[10px] text-red-300 mt-2 uppercase tracking-tighter">{errors.name}</p>}
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="TELÉFONO DE CONTACTO"
                    className="w-full bg-transparent border-b border-brand-cream focus:border-brand-cream outline-none transition-colors text-xs tracking-widest uppercase font-medium placeholder:text-brand-cream/50 py-4"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-[10px] text-red-300 mt-2 uppercase tracking-tighter">{errors.phone}</p>}
                </div>
                <textarea 
                  placeholder="MENSAJE (OPCIONAL)"
                  rows={4}
                  className="w-full bg-transparent border-b border-brand-cream focus:border-brand-cream outline-none transition-colors text-xs tracking-widest uppercase font-medium resize-none placeholder:text-brand-cream/50 py-4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
                  <input 
                    type="checkbox" 
                    id="privacidad" 
                    required 
                    style={{ marginTop: '3px', accentColor: '#2F4A3E', cursor: 'pointer' }}
                  />
                  <label htmlFor="privacidad" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
                    He leído y acepto la{' '}
                    <a href="/privacidad" style={{ color: 'white', textDecoration: 'underline' }}>
                      Política de Privacidad
                    </a>
                    . Comprarcasa Sevilla tratará tus datos para atender tu solicitud.
                  </label>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-cream text-brand-navbar border border-brand-accent py-[14px] px-[36px] text-xs font-medium tracking-[2px] hover:bg-brand-navbar hover:text-brand-cream transition-all duration-200 ease-out uppercase"
                >
                  ENVIAR SOLICITUD
                </button>
            </form>
          </div>
        </section>

        {/* Audiovisual Experience Section */}
        <section id="video" className="relative overflow-hidden z-10" style={{ height: '85vh' }}>
          <div ref={videoContainerRef} style={{ position:'absolute', top:'-10%', left:0, width:'100%', height:'120%', transform:`translateY(${parallaxOffset}px)`, transition:'transform 0.1s linear' }}>
            <video ref={videoRef} src="https://files.catbox.moe/s3w7ag.mp4" autoPlay loop muted playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45))', zIndex:1 }} />
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', zIndex:2, gap:'0.5rem', padding:'0 1.5rem', textAlign:'center' }}>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.75rem', letterSpacing:'0.25em', textTransform:'uppercase', fontFamily:'Inter, sans-serif', marginBottom:'0.5rem' }}>EXPERIENCIA AUDIOVISUAL</p>
            <h2 style={{ fontFamily:'"Cormorant Garamond","Playfair Display",serif', fontSize:'clamp(2.2rem,5vw,4rem)', fontWeight:300, fontStyle:'italic', color:'#ffffff', lineHeight:1.15, marginBottom:'1.5rem' }}>Un recorrido por su nuevo hogar</h2>
            <a href="https://www.youtube.com/watch?v=AsE8efX9gn8" target="_blank" rel="noopener noreferrer"
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.2)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.08)'}
              style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', padding:'0.85rem 2rem', border:'1.5px solid rgba(255,255,255,0.75)', borderRadius:'2px', background:'rgba(255,255,255,0.08)', backdropFilter:'blur(6px)', color:'#ffffff', fontSize:'0.75rem', letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', fontFamily:'Inter, sans-serif', transition:'all 0.3s ease' }}>
              <span style={{ fontSize:'1rem' }}>▶</span> VER VÍDEO COMPLETO
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
