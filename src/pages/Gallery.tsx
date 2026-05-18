import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const categoriesData = [
  {
    name: "EXTERIOR",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-1.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-1.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-2s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-3s.jpg",
    ]
  },
  {
    name: "PATIO",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-4s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-4s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-5s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-6s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-7s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-8s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-9s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-10s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-11s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-12s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-13s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-14s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-15s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-16s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-29s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-30s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-31s.jpg",
    ]
  },
  {
    name: "RECIBIDOR",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-17s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-17s.jpg",
    ]
  },
  {
    name: "SALÓN",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-18s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-18s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-19s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-20s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-21s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-22s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-23s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-33s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-34s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-35s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-36s.jpg",
    ]
  },
  {
    name: "COCINA",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-24s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-24s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-25s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-26s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-27s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-28s.jpg",
    ]
  },
  {
    name: "HABITACIONES",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-37s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-37s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-38s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-44s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-45s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-46s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-47s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-48s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-49s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-52s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-53s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-54s.jpg",
    ]
  },
  {
    name: "BAÑOS",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-39s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-39s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-40s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-41s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-55s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-56s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-57s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-58s.jpg",
    ]
  },
  {
    name: "PLANOS",
    cover: "https://fotos15.apinmo.com/3503/28793640/53-59s.jpg",
    images: [
      "https://fotos15.apinmo.com/3503/28793640/53-59s.jpg",
      "https://fotos15.apinmo.com/3503/28793640/53-60s.jpg",
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
                      {cat.images.length} fotos
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

