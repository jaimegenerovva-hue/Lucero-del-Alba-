/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ThankYou from './pages/ThankYou';
import { captureAndStoreUTMs, initMetaPixel, trackMetaPageView } from './utils/analytics';

function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    // Captura parámetros UTM (utm_source, utm_campaign, etc.) y los guarda en sessionStorage
    captureAndStoreUTMs();
    // Inicializa el Píxel de Meta si hay ID configurado
    initMetaPixel();
    // Registra la vista de página si el Píxel está activo
    trackMetaPageView();
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      <AnalyticsListener />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/gracias" element={<ThankYou />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

