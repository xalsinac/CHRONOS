
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { interventions } from './data';
import { Intervention } from './types';

// Componente para manejar eventos del mapa y centrado
const MapController: React.FC<{ 
  selectedIntervention: Intervention | null;
  setZoom: (z: number) => void;
}> = ({ selectedIntervention, setZoom }) => {
  const map = useMap();
  
  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);

  useEffect(() => {
    if (selectedIntervention) {
      map.flyTo(selectedIntervention.coordinates, 6, { duration: 1.5 });
    }
  }, [selectedIntervention, map]);

  return null;
};

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(2.5);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    interventions.forEach(i => i.years.forEach(y => years.add(y)));
    return Array.from(years).sort((a, b) => a - b);
  }, []);

  const filteredInterventions = useMemo(() => {
    if (selectedYear === null) return interventions;
    return interventions.filter(i => i.years.includes(selectedYear));
  }, [selectedYear]);

  // Contadores: Suma cada año/evento individualmente
  const stats = useMemo(() => {
    let ops = 0;
    let coups = 0;
    filteredInterventions.forEach(i => {
      const weight = selectedYear ? 1 : i.years.length;
      if (i.type === 'operation') ops += weight;
      else if (i.type === 'coup') coups += weight;
    });
    return { ops, coups };
  }, [filteredInterventions, selectedYear]);

  const getRadius = (intervention: Intervention) => {
    const base = selectedYear ? 12 : 9;
    const countBonus = selectedYear ? 0 : Math.min(intervention.years.length * 1.2, 10);
    return Math.max(7, (base + countBonus) * (currentZoom / 3.5));
  };

  const handleYearChange = (index: number) => {
    setSelectedYear(availableYears[index]);
    setSelectedIntervention(null);
  };

  const handleShowAll = () => {
    setSelectedYear(null);
    setSelectedIntervention(null);
  };

  const handleMarkerClick = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setIsSidebarOpen(true);
  };

  // Icono para el número sobre el punto
  const createCountIcon = (count: number) => {
    return L.divIcon({
      html: `<div class="marker-count-badge">${count}</div>`,
      className: 'custom-div-icon',
      iconSize: [0, 0],
      iconAnchor: [0, 18]
    });
  };

  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row bg-slate-950 overflow-hidden font-sans">
      
      {/* Header y Contadores (Optimizado para movil) */}
      <header className="absolute top-0 left-0 right-0 z-[1000] p-3 md:p-5 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pointer-events-auto">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase italic select-none">
              <span className="text-white">CHRON</span><span className="text-red-600">OS</span>
            </h1>
            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1 drop-shadow-lg">
              Conflictos creados por <span className="text-red-500">EEUU</span>
            </p>
          </div>
          
          <div className="flex gap-2 md:gap-4 mt-1">
            <div className="flex flex-col items-center bg-slate-900/80 border-l-2 md:border-l-4 border-red-600 px-3 py-1 md:px-5 md:py-2 rounded-r-xl backdrop-blur-md shadow-xl">
              <span className="text-[8px] md:text-[10px] font-black text-red-500 uppercase">Ataques</span>
              <span className="text-lg md:text-3xl font-black text-white tabular-nums">{stats.ops}</span>
            </div>
            <div className="flex flex-col items-center bg-slate-900/80 border-l-2 md:border-l-4 border-amber-500 px-3 py-1 md:px-5 md:py-2 rounded-r-xl backdrop-blur-md shadow-xl">
              <span className="text-[8px] md:text-[10px] font-black text-amber-500 uppercase">Golpes</span>
              <span className="text-lg md:text-3xl font-black text-white tabular-nums">{stats.coups}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mapa */}
      <div className="flex-grow h-full relative z-0">
        <MapContainer 
          center={[20, 10]} 
          zoom={2.5} 
          minZoom={2}
          maxBounds={[[-90, -180], [90, 180]]}
          zoomControl={false}
          className="h-full w-full"
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />
          <ZoomControl position="bottomright" />
          <MapController selectedIntervention={selectedIntervention} setZoom={setCurrentZoom} />
          
          {filteredInterventions.map((intervention) => {
            const radius = getRadius(intervention);
            const count = selectedYear ? 1 : intervention.years.length;
            return (
              <React.Fragment key={`${intervention.id}-${selectedYear}`}>
                {!selectedYear && count > 1 && (
                  <Marker position={intervention.coordinates} icon={createCountIcon(count)} interactive={false} />
                )}
                <CircleMarker
                  center={intervention.coordinates}
                  radius={radius}
                  pathOptions={{
                    fillColor: intervention.type === 'operation' ? '#ef4444' : '#f59e0b',
                    fillOpacity: 0.85,
                    color: '#fff',
                    weight: 1.5,
                  }}
                  eventHandlers={{ click: () => handleMarkerClick(intervention) }}
                >
                  <Popup className="custom-popup" closeButton={false}>
                    <div className="p-1 min-w-[140px]">
                      <h3 className="font-bold text-base text-white border-b border-slate-700 pb-1 mb-1">{intervention.country}</h3>
                      <p className="text-[11px] text-slate-300 leading-tight mb-2">{intervention.description}</p>
                      <button onClick={() => handleMarkerClick(intervention)} className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Dossier →</button>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Panel Lateral */}
      <aside className={`
        fixed inset-y-0 right-0 z-[2000] w-full md:w-[480px] bg-slate-900 shadow-2xl transition-transform duration-500 ease-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-slate-800 flex flex-col
      `}>
        <div className="p-5 md:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-[10px] font-black text-red-600 tracking-[0.3em] uppercase mb-1">Registro Clasificado</h2>
            <p className="text-xl md:text-2xl font-black text-white italic tracking-tight uppercase">{selectedIntervention?.country || 'Selección'}</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 md:p-8 no-scrollbar bg-slate-900">
          {selectedIntervention ? (
            <div className="space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex flex-wrap gap-2">
                {selectedIntervention.years.map(y => (
                  <span key={y} className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-black tracking-widest shadow-md">{y}</span>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-none">{selectedIntervention.description}</h3>
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
                <p className="text-slate-300 leading-relaxed text-lg md:text-xl font-medium">{selectedIntervention.expandedDescription}</p>
              </div>
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Coordenadas de Incursión</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800"><span className="text-[9px] text-red-500 font-black block mb-1">LAT</span><span className="font-mono text-white">{selectedIntervention.coordinates[0]}°</span></div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800"><span className="text-[9px] text-red-500 font-black block mb-1">LNG</span><span className="font-mono text-white">{selectedIntervention.coordinates[1]}°</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-10"><p className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">Scanner Activo...</p></div>
          )}
        </div>
      </aside>

      {/* Línea de Tiempo Minimalista (Optimizado para movil) */}
      <div className="fixed bottom-0 left-0 right-0 z-[3000] p-3 md:p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-2xl p-4 md:p-6 rounded-2xl md:rounded-[40px] border border-slate-800 shadow-2xl pointer-events-auto">
          <div className="flex flex-col space-y-3 md:space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-[8px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Cronología</p>
                <h4 className="text-xl md:text-4xl font-black text-white italic tracking-tighter leading-none">
                  {selectedYear ? selectedYear : 'HISTORIA TOTAL'}
                </h4>
              </div>
              <button onClick={handleShowAll} className={`px-4 py-2 md:px-8 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${selectedYear === null ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                TODOS
              </button>
            </div>
            <div className="relative pt-1 px-1">
              <input type="range" min="0" max={availableYears.length - 1} step="1" value={selectedYear ? availableYears.indexOf(selectedYear) : 0} onChange={(e) => handleYearChange(parseInt(e.target.value))} className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600"/>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[9px] md:text-[10px] text-slate-600 font-black">{availableYears[0]}</span>
                <span className="text-[9px] md:text-[10px] text-slate-600 font-black">{availableYears[availableYears.length - 1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/90 z-[1900] md:hidden backdrop-blur-md transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)} />}

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #dc2626; cursor: pointer; border: 4px solid #1e293b; box-shadow: 0 0 15px rgba(220, 38, 38, 0.4); }
        @media (min-width: 768px) { input[type=range]::-webkit-slider-thumb { height: 32px; width: 32px; } }
        .custom-popup .leaflet-popup-content-wrapper { border-radius: 16px; background: #0f172a; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .marker-count-badge {
          background: #fff; color: #000; font-weight: 900; font-size: 10px; width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; position: absolute; transform: translate(-50%, -100%);
          pointer-events: none; border: 2px solid #ef4444; box-shadow: 0 2px 6px rgba(0,0,0,0.4); z-index: 1000;
        }
        .custom-div-icon { background: none; border: none; }
      `}</style>
    </div>
  );
};

export default App;
