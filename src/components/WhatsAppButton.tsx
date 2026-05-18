import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "34635475213";
  const message = "Hola, estoy interesado/a en la vivienda de Calle Lucero del Alba y me gustaría recibir más información.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-navbar text-brand-cream p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-brand-accent"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
