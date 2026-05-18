import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F8F6F2] text-[#2F4A3E] py-20 px-6 border-t" style={{ borderColor: 'rgba(47, 74, 62, 0.2)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
        {/* Izquierda: Logo + Descripción */}
        <div className="flex-1 max-w-sm">
          <div className="mb-8">
            <img 
              src="https://www.comprarcasa.com/assets/img/logo/logo-cc.png" 
              alt="Comprarcasa Sevilla" 
              style={{ height: '36px', width: 'auto' }} 
            />
          </div>
          <p className="text-xs leading-relaxed tracking-widest uppercase mb-8 opacity-80">
            Chalet independiente de una sola planta en Palomares del Río, Sevilla. Una oportunidad única de inversión y vida.
          </p>
          <p className="text-[10px] tracking-widest uppercase opacity-60">
            © 2026 Comprarcasa Sevilla / SuHogar Sevilla
          </p>
        </div>

        {/* Centro: Navegación */}
        <div className="flex-1 md:text-center mt-2 md:mt-0">
          <p className="text-[10px] tracking-[2px] uppercase mb-8 opacity-40">NAVEGACIÓN</p>
          <div className="flex flex-col space-y-4 md:items-center">
            <Link to="/" className="text-xs tracking-[0.2em] hover:text-brand-accent transition-all duration-200 ease-in-out uppercase">Inicio</Link>
            <Link to="/galeria" className="text-xs tracking-[0.2em] hover:text-brand-accent transition-all duration-200 ease-in-out uppercase">Galería</Link>
            <a href="/#realidad-virtual" className="text-xs tracking-[0.2em] hover:text-brand-accent transition-all duration-200 ease-in-out uppercase">VR Tour</a>
            <a href="/#contacto" className="text-xs tracking-[0.2em] hover:text-brand-accent transition-all duration-200 ease-in-out uppercase">Contacto</a>
          </div>
        </div>

        {/* Derecha: Legal */}
        <div className="flex-1 md:text-right mt-2 md:mt-0">
          <p className="text-[10px] tracking-[2px] uppercase mb-8 opacity-40">LEGAL</p>
          <div className="flex flex-col space-y-4 md:items-end">
            <span className="text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-brand-accent transition-colors duration-200">Aviso Legal</span>
            <span className="text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-brand-accent transition-colors duration-200">Privacidad</span>
            <span className="text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-brand-accent transition-colors duration-200">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
