import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { trackMetaLead, trackMetaPageView, getStoredUTMs } from '../utils/analytics';

export default function ThankYou() {
  const location = useLocation();
  const userName = (location.state as { name?: string })?.name;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Disparar evento Lead y PageView para Meta Pixel con los UTMs guardados
    trackMetaPageView();
    trackMetaLead({
      page: '/gracias',
      source: 'web_form_success',
      ...getStoredUTMs(),
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-brand-navbar pt-28 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-brand-accent/20 p-8 sm:p-12 md:p-14 shadow-sm relative overflow-hidden"
        >
          {/* Decorative accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2F4A3E]" />

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2F4A3E]/10 text-[#2F4A3E] mb-6">
            <CheckCircle2 size={36} strokeWidth={1.75} />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#2F4A3E] font-medium mb-3">
            SOLICITUD CONFIRMADA
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navbar mb-4 tracking-tight leading-tight">
            {userName ? `¡Muchas gracias, ${userName}!` : '¡Muchas gracias por su interés!'}
          </h1>

          <div className="w-12 h-[2px] bg-brand-accent mx-auto mb-6" />

          <p className="text-sm sm:text-base text-brand-navbar/80 font-light leading-relaxed mb-6 max-w-lg mx-auto">
            Hemos recibido correctamente sus datos de contacto para <strong className="font-medium text-brand-navbar">Calle Lucero del Alba</strong> (Palomares del Río). Nuestro equipo se pondrá en contacto con usted a la mayor brevedad posible.
          </p>

          {/* Direct contact card */}
          <div className="bg-[#2F4A3E] text-[#F8F6F2] p-5 sm:p-6 mb-8 text-left rounded-sm border border-brand-accent/30">
            <p className="text-[10px] tracking-[0.25em] uppercase text-brand-cream/70 mb-2">
              ¿DESEA ATENCIÓN INMEDIATA?
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif text-lg text-white">Magdalena · SuHogar Sevilla</p>
                <p className="text-xs text-white/70 font-light">Asesora inmobiliaria asignada</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:653958289"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs tracking-wider uppercase rounded-sm border border-white/30 transition-colors"
                >
                  <Phone size={14} />
                  653 95 82 89
                </a>
                <a
                  href="https://wa.me/34653958289?text=Hola%2C%20acabo%20de%20enviar%20el%20formulario%20de%20la%20vivienda%20en%20Calle%20Lucero%20del%20Alba."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs tracking-wider uppercase font-medium rounded-sm transition-colors shadow-sm"
                >
                  <MessageSquare size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Navigation action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-navbar text-brand-cream border border-brand-accent text-xs tracking-[2px] font-medium hover:bg-brand-cream hover:text-brand-navbar transition-all duration-200 uppercase"
            >
              <ArrowLeft size={14} />
              VOLVER AL INICIO
            </Link>

            <Link
              to="/galeria"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-brand-navbar border border-brand-navbar/30 text-xs tracking-[2px] font-medium hover:border-brand-navbar transition-all duration-200 uppercase"
            >
              <ImageIcon size={14} />
              EXPLORAR GALERÍA
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
