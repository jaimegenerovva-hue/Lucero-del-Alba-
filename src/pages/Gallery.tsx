import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const categoriesData = [
  {
    name: "PATIO",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-17.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-17.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-16.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-15.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-14.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-9.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-13.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-11.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-1.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-10.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-8.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-4.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-5.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118125/79-7.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118124/79-3.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118124/79-2.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118124/79-6.jpg",
    ]
  },
  {
    name: "RECIBIDOR",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-18.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-18.jpg",
    ]
  },
  {
    name: "SALÓN",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-28.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-28.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118129/79-31.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-29.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-30.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118127/79-22.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118127/79-21.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118127/79-20.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118126/79-19.jpg",
    ]
  },
  {
    name: "COCINA",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-25.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-25.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118128/79-24.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118127/79-23.jpg",
    ]
  },
  {
    name: "HABITACIONES",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118132/79-49.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118132/79-49.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118132/79-48.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118131/79-47.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118131/79-44.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118131/79-43.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118131/79-42.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118130/79-41.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118130/79-40.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118130/79-39.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118129/79-33.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118129/79-32.jpg",
    ]
  },
  {
    name: "BAÑOS",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-52.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-52.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-53.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118132/79-50.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118132/79-51.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118130/79-36.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118130/79-35.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118129/79-34.jpg",
    ]
  },
  {
    name: "PLANOS",
    cover: "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-56.jpg",
    images: [
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-56.jpg",
      "https://res.cloudinary.com/dwrgm5yl/image/upload/v1789118133/79-55.jpg",
    ]
  }
];

export default function Gallery() {
  const [currentCategory, setCurrentCategory] = useState<typeof categoriesData[0] | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = 'auto';
  };

  const nextImg = () => {
    if (selectedIdx !== null && currentCategory) {
      setSelectedIdx((selectedIdx + 1) % currentCategory.images.length);
    }
  };

  const prevImg = () => {
    if (selectedIdx !== null && currentCategory) {
      setSelectedIdx((selectedIdx - 1 + currentCategory.images.length) % currentCategory.images.length);
    }
  };

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-24 px-6 relative text-brand-navbar">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif mb-4"
          >
            Galería Exclusiva
          </motion.h1>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto mb-6" />
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase opacity-70">CADA RINCÓN CUENTA UNA HISTORIA DE CONFORT</p>
        </header>

        <AnimatePresence mode="wait">
          {!currentCategory ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {categoriesData.map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative h-[280px] rounded-[16px] overflow-hidden cursor-pointer group shadow-xl"
                  onClick={() => setCurrentCategory(cat)}
                >
                  <img 
                    src={cat.cover} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-navbar/40 transition-opacity duration-500 group-hover:bg-brand-navbar/60 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-2 tracking-widest uppercase">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-[10px] tracking-[0.3em] font-medium uppercase font-sans">
                      {cat.images.length} {cat.images.length === 1 ? 'foto' : 'fotos'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-navbar/10 pb-8">
                <button 
                  onClick={() => setCurrentCategory(null)}
                  className="flex items-center gap-3 text-brand-navbar/60 hover:text-brand-navbar transition-colors uppercase text-[10px] tracking-[0.3em] font-bold group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Volver a la galería
                </button>
                <h2 className="text-3xl font-serif italic text-brand-navbar uppercase tracking-widest">
                  {currentCategory.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative aspect-video rounded-[12px] overflow-hidden cursor-pointer group shadow-lg"
                    onClick={() => openLightbox(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${currentCategory.name} - ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-navbar/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <p className="text-brand-cream text-[10px] tracking-[0.3em] font-medium uppercase font-sans">
                        AMPLIAR
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && currentCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navbar bg-opacity-95 flex items-center justify-center p-4 md:p-12 mb-0"
          >
            <button 
              className="absolute top-8 right-8 text-brand-cream/60 hover:text-brand-cream transition-colors z-[110]"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 text-brand-cream/40 hover:text-brand-cream transition-colors z-[110]"
              onClick={prevImg}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
              <motion.img
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={currentCategory.images[selectedIdx]}
                alt={`${currentCategory.name} - ${selectedIdx + 1}`}
                className="max-h-[80vh] w-full object-contain shadow-2xl"
              />
              <p className="mt-8 text-brand-cream/50 text-[10px] tracking-[0.5em] uppercase font-medium">
                {currentCategory.name} · {selectedIdx + 1} / {currentCategory.images.length}
              </p>
            </div>

            <button 
              className="absolute right-4 md:right-12 text-brand-cream/40 hover:text-brand-cream transition-colors z-[110]"
              onClick={nextImg}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

