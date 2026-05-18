import React, { useEffect } from 'react';

declare global {
  interface Window {
    L: any;
    izFilter: (type: string, el: HTMLElement | null) => void;
    izFocusPoi: (name: string) => void;
  }
}

export default function InmoZoneMap() {
  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const loadScript = () => {
      if (document.getElementById('leaflet-js')) {
        if (window.L) initMap();
        return;
      }

      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    };

    const pois = [{"name":"Parque de La Laguna","type":"park","lat":37.313486,"lng":-6.060633,"distance":"5 min"},{"name":"Escuela Infantil La Estrella de Mar","type":"school","lat":37.318149,"lng":-6.061115,"distance":"10 min"},{"name":"Centro de Salud Palomares del Río","type":"hospital","lat":37.318642,"lng":-6.062367,"distance":"10 min"},{"name":"CEIP La Regüela","type":"school","lat":37.318312,"lng":-6.066127,"distance":"12 min"},{"name":"Centro de Educación Infantil Súper Mini Héroes","type":"school","lat":37.319366,"lng":-6.059346,"distance":"11 min"},{"name":"Supermercados Dia","type":"supermarket","lat":37.322549,"lng":-6.066036,"distance":"15 min"},{"name":"Asador El huerto del Portugués","type":"restaurant","lat":37.321521,"lng":-6.058074,"distance":"13 min"},{"name":"Bar La Escalerita","type":"restaurant","lat":37.322449,"lng":-6.058057,"distance":"14 min"},{"name":"Parque de las Moreras","type":"park","lat":37.322214,"lng":-6.057501,"distance":"14 min"},{"name":"CEIP Ágora","type":"school","lat":37.320546,"lng":-6.074755,"distance":"14 min"},{"name":"CASH FRESH","type":"supermarket","lat":37.320836,"lng":-6.072193,"distance":"16 min"},{"name":"Restaurante Casa Pepín e Hijos","type":"restaurant","lat":37.324157,"lng":-6.060118,"distance":"16 min"}];
    const typeMap: Record<string, string> = {"school":"Educación","hospital":"Salud","supermarket":"Compras","restaurant":"Gastronomía","park":"Parques","all":"Todos"};
    const center: [number, number] = [37.31026, -6.060285];
    let map: any;
    const poiMarkers: Record<string, any> = {};

    const initMap = () => {
      const L = window.L;
      if (!L || !document.getElementById('iz-map')) return;

      // Avoid double initialization
      const container = L.DomUtil.get('iz-map');
      if (container != null) {
        (container as any)._leaflet_id = null;
      }

      map = L.map('iz-map', { scrollWheelZoom: false }).setView(center, 15);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);
      
      const mainIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      L.marker(center, { icon: mainIcon }).addTo(map).bindPopup('Propiedad').openPopup();
      
      pois.forEach(p => {
        const m = L.marker([p.lat, p.lng]).bindPopup(p.name);
        poiMarkers[p.name] = m;
      });

      window.izFilter = (type: string, el: HTMLElement | null) => {
        if (el) {
          document.querySelectorAll('.iz-tab').forEach(t => t.classList.remove('active'));
          el.classList.add('active');
        }
        
        Object.values(poiMarkers).forEach(m => map.removeLayer(m));
        const filtered = type === 'all' ? pois : pois.filter(p => p.type === type);
        filtered.forEach(p => {
          poiMarkers[p.name].addTo(map);
        });
        
        map.setView(center, 15);
        renderList(type);
      };

      window.izFocusPoi = (name: string) => {
        Object.values(poiMarkers).forEach(m => map.removeLayer(m));
        const marker = poiMarkers[name];
        if (marker) {
          marker.addTo(map);
          map.setView(marker.getLatLng(), 16);
          marker.openPopup();
        }
      };

      renderList('all');
    };

    const renderList = (type: string) => {
      const container = document.getElementById('iz-list-container');
      if (!container) return;
      container.innerHTML = '';
      const filtered = type === 'all' ? pois : pois.filter(p => p.type === type);
      filtered.forEach(p => {
        const item = document.createElement('div');
        item.className = 'iz-item';
        item.onclick = () => window.izFocusPoi(p.name);
        item.innerHTML = `
          <div class="iz-item-info">
            <span class="iz-item-name">${p.name}</span>
            <span class="iz-item-meta">${typeMap[p.type] || p.type}</span>
          </div>
          <span class="iz-distance">${p.distance || 'Cerca'}</span>
        `;
        container.appendChild(item);
      });
    };

    loadScript();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div id="inmozone-root-map" className="inmozone-wrapper bg-[#F8F6F2] text-black rounded-[40px] overflow-hidden border border-black/10 shadow-2xl w-full">
      <style>{`
        .inmozone-wrapper { font-family: 'Inter', sans-serif; }
        .iz-grid { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 0; }
        #iz-map { height: 600px; width: 100%; z-index: 1; }
        .iz-sidebar { padding: 40px; background: rgba(0,0,0,0.02); border-left: 1px solid rgba(0,0,0,0.1); display: flex; flex-direction: column; height: 600px; overflow: hidden; }
        .iz-tabs { display: flex; gap: 10px; margin-bottom: 30px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
        .iz-tabs::-webkit-scrollbar { display: none; }
        .iz-tab { padding: 10px 20px; border-radius: 100px; font-size: 10px; font-weight: 800; cursor: pointer; white-space: nowrap; border: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.05); transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0,0,0,0.6); }
        .iz-tab.active { background: #2F4A3E; color: white; border-color: #2F4A3E; box-shadow: 0 0 20px rgba(47, 74, 62, 0.3); }
        .iz-list { display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex-grow: 1; padding-right: 10px; }
        .iz-list::-webkit-scrollbar { width: 4px; }
        .iz-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .iz-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-radius: 16px; background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1); transition: all 0.3s; cursor: pointer; }
        .iz-item:hover { border-color: #2F4A3E; background: rgba(0,0,0,0.08); }
        .iz-item-info { display: flex; flex-direction: column; }
        .iz-item-name { font-weight: 700; font-size: 14px; color: black; }
        .iz-item-meta { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0,0,0,0.6); margin-top: 4px; font-weight: 800; }
        .iz-distance { font-size: 10px; font-weight: 800; color: #2F4A3E; background: rgba(47, 74, 62, 0.1); padding: 4px 12px; border-radius: 100px; text-transform: uppercase; white-space: nowrap; }
        @media (max-width: 768px) {
          .iz-grid { grid-template-columns: 1fr; }
          #iz-map { height: 260px; }
          .iz-sidebar { height: auto; min-height: 0; border-left: none; border-top: 1px solid rgba(0,0,0,0.1); padding: 20px 16px; }
          .iz-tabs { gap: 6px; margin-bottom: 16px; flex-wrap: nowrap; overflow-x: auto; }
          .iz-tab { padding: 7px 12px; font-size: 9px; flex-shrink: 0; }
          .iz-list { max-height: 280px; overflow-y: auto; }
          .iz-item { padding: 10px 12px; }
          .iz-item-name { font-size: 12px; }
          .iz-distance { font-size: 9px; padding: 3px 8px; }
        }
      `}</style>

      <div className="iz-grid">
        <div id="iz-map"></div>
        <div className="iz-sidebar">
          <div className="iz-tabs" id="iz-tabs-container">
            <div className="iz-tab active" onClick={(e) => window.izFilter('all', e.currentTarget)}>Todos</div>
            <div className="iz-tab" onClick={(e) => window.izFilter('school', e.currentTarget)}>Educación</div>
            <div className="iz-tab" onClick={(e) => window.izFilter('hospital', e.currentTarget)}>Salud</div>
            <div className="iz-tab" onClick={(e) => window.izFilter('supermarket', e.currentTarget)}>Compras</div>
            <div className="iz-tab" onClick={(e) => window.izFilter('restaurant', e.currentTarget)}>Gastronomía</div>
            <div className="iz-tab" onClick={(e) => window.izFilter('park', e.currentTarget)}>Parques</div>
          </div>
          <div className="iz-list" id="iz-list-container"></div>
        </div>
      </div>
    </div>
  );
}
