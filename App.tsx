
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { interventions } from './data';
import { Intervention } from './types';

// Controlador para gestionar el estado del mapa y su respuesta al zoom/selección
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
    // Forzamos el redibujado para evitar áreas grises en el mapa
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedIntervention) {
      map.flyTo(selectedIntervention.coordinates, 6, { duration: 1.2 });
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

  // Contadores dinámicos que suman cada intervención por año
  const stats = useMemo(() => {
    let ops = 0;
    let coups = 0;
    filteredInterventions.forEach(i => {
      // Cada año en el array 'years' cuenta como un conflicto individual
      const weight = selectedYear ? 1 : i.years.length;
      if (i.type === 'operation') ops += weight;
      else if (i.type === 'coup') coups += weight;
    });
    return { ops, coups };
  }, [filteredInterventions, selectedYear]);

  const getRadius = (intervention: Intervention) => {
    const base = selectedYear ? 12 : 9;
    const countBonus = selectedYear ? 0 : Math.min(intervention.years.length * 1.1, 12);
    return Math.max(7, (base + countBonus) * (currentZoom / 3.8));
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

  const createCountIcon = (count: number) => {
    return L.divIcon({
      html: `<div class="marker-count-badge">${count}</div>`,
      className: '',
      iconSize: [0, 0],
      iconAnchor: [0, 16]
    });
  };

  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row bg-slate-950 overflow-hidden select-none">
      
      {/* Header Principal con Título Modernizado y Contadores Compactos */}
      <header className="absolute top-0 left-0 right-0 z-[1000] p-3 md:p-6 bg-gradient-to-b from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pointer-events-auto">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
              <span className="text-white">CHRON</span><span className="text-red-600">OS</span>
            </h1>
            <p className="text-slate-400 text-[9px] md:text-sm font-bold uppercase tracking-[0.25em] md:tracking-[0.4em] mt-1">
              Conflictos creados por <span className="text-red-500">EEUU</span>
            </p>
          </div>
          
          <div className="flex gap-2 md:gap-4 mt-1 md:mt-0">
            <div className="flex flex-col items-center bg-slate-900/90 border-l-2 md:border-l-4 border-red-600 px-3 py-1 md:px-6 md:py-2 rounded-r-xl backdrop-blur-xl shadow-2xl">
              <span className="text-[7px] md:text-[10px] font-black text-red-500 uppercase tracking-tighter">Ataques</span>
              <span className="text-lg md:text-4xl font-black text-white leading-none tabular-nums">{stats.ops}</span>
            </div>
            <div className="flex flex-col items-center bg-slate-900/90 border-l-2 md:border-l-4 border-amber-500 px-3 py-1 md:px-6 md:py-2 rounded-r-xl backdrop-blur-xl shadow-2xl">
              <span className="text-[7px] md:text-[10px] font-black text-amber-500 uppercase tracking-tighter">Golpes</span>
              <span className="text-lg md:text-4xl font-black text-white leading-none tabular-nums">{stats.coups}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Visor de Mapa */}
      <main className="flex-grow h-full relative z-0">
        <MapContainer 
          center={[15, 0]} 
          zoom={2.5} 
          minZoom={2}
          maxBounds={[[-90, -180], [90, 180]]}
          zoomControl={false}
          className="h-full w-full"
          attributionControl={false}
          worldCopyJump={true}
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
                {/* Badge de conteo: Solo visible cuando se ven todos los conflictos y hay más de uno */}
                {!selectedYear && count > 1 && (
                  <Marker 
                    position={intervention.coordinates} 
                    icon={createCountIcon(count)} 
                    interactive={false} 
                  />
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
                    <div className="p-1 min-w-[120px]">
                      <h3 className="font-bold text-sm md:text-base text-white border-b border-slate-700 pb-1 mb-2">{intervention.country}</h3>
                      <p className="text-[10px] md:text-[12px] text-slate-300 leading-tight mb-2 italic">
                        {intervention.description}
                      </p>
                      <button 
                        onClick={() => handleMarkerClick(intervention)} 
                        className="text-[9px] md:text-[10px] text-red-500 font-black uppercase tracking-widest hover:text-red-400"
                      >
                        LEER DOSSIER →
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </main>

      {/* Sidebar de Detalles (Expandible) */}
      <aside className={`
        fixed inset-y-0 right-0 z-[2000] w-full md:w-[500px] bg-slate-900 shadow-2xl transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-slate-800 flex flex-col backdrop-blur-3xl bg-opacity-95
      `}>
        <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-[10px] font-black text-red-600 tracking-[0.4em] uppercase mb-1">Archivo Clasificado</h2>
            <p className="text-xl md:text-3xl font-black text-white italic tracking-tight uppercase leading-none">{selectedIntervention?.country || 'Selección'}</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-slate-800/50 rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 md:p-10 no-scrollbar bg-slate-900/50">
          {selectedIntervention ? (
            <div className="space-y-6 md:space-y-10 animate-slideUp">
              <div className="flex flex-wrap gap-2">
                {selectedIntervention.years.map(y => (
                  <span key={y} className="bg-red-600 text-white px-3 py-1 rounded text-[10px] md:text-[12px] font-black tracking-widest shadow-lg">{y}</span>
                ))}
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight uppercase italic">{selectedIntervention.description}</h3>
                <div className="h-1.5 w-24 bg-red-600 rounded-full shadow-lg shadow-red-600/30"></div>
                <p className="text-slate-300 leading-relaxed text-lg md:text-2xl font-medium antialiased">{selectedIntervention.expandedDescription}</p>
              </div>

              <div className="p-5 md:p-8 bg-slate-950 rounded-[32px] border border-slate-800 space-y-4 shadow-inner">
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Análisis Geoespacial</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
                    <span className="text-[9px] text-red-500 font-black block mb-1 tracking-widest">LAT</span>
                    <span className="font-mono text-white text-lg md:text-xl font-bold">{selectedIntervention.coordinates[0]}°</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
                    <span className="text-[9px] text-red-500 font-black block mb-1 tracking-widest">LNG</span>
                    <span className="font-mono text-white text-lg md:text-xl font-bold">{selectedIntervention.coordinates[1]}°</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
              <div className="w-24 h-24 md:w-32 md:h-32 border-8 border-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <p className="text-sm md:text-lg font-black text-slate-500 uppercase tracking-[0.4em]">Aguardando Datos...</p>
            </div>
          )}
        </div>
      </aside>

      {/* Timeline Minimalista (Optimizado para Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-[3000] p-3 md:p-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-3xl p-4 md:p-8 rounded-2xl md:rounded-[48px] border border-slate-800 shadow-2xl pointer-events-auto">
          <div className="flex flex-col space-y-3 md:space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-[8px] md:text-[11px] font-black text-red-600 uppercase tracking-[0.4em] mb-1">Eje Temporal</p>
                <h4 className="text-2xl md:text-5xl font-black text-white italic tracking-tighter leading-none">
                  {selectedYear ? selectedYear : 'VISTA GLOBAL'}
                </h4>
              </div>
              <button 
                onClick={handleShowAll} 
                className={`px-5 py-2 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[12px] font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 ${selectedYear === null ? 'bg-red-600 text-white shadow-xl shadow-red-600/40' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                VER TODOS
              </button>
            </div>
            
            <div className="relative pt-1 px-1">
              <input 
                type="range" 
                min="0" 
                max={availableYears.length - 1} 
                step="1" 
                value={selectedYear ? availableYears.indexOf(selectedYear) : 0} 
                onChange={(e) => handleYearChange(parseInt(e.target.value))} 
                className="w-full h-1.5 md:h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between mt-3 px-1 md:px-2">
                <span className="text-[10px] md:text-[12px] text-slate-500 font-black tabular-nums">{availableYears[0]}</span>
                <span className="text-[10px] md:text-[12px] text-slate-500 font-black tabular-nums">{availableYears[availableYears.length - 1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop para móviles */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-[1900] md:hidden backdrop-blur-xl transition-opacity duration-300" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <style>{`
        .animate-slideUp { animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 4px solid #1e293b;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @media (min-width: 768px) {
          input[type=range]::-webkit-slider-thumb {
            height: 40px;
            width: 40px;
            border-width: 8px;
          }
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.1); }
      `}</style>
    </div>
  );
};

export default App;
