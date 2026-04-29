import React from 'react';
import { User, MessageSquare, FileText, LogOut, ChevronLeft } from 'lucide-react';
import { ViewMode } from '../models/simulation';

interface SimHeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function SimHeader({ activeView, onViewChange }: SimHeaderProps) {
  const tabs: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'paciente', label: 'Paciente', icon: User },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'ficha', label: 'Ficha Clínica', icon: FileText },
  ];

  return (
    <header className="grid grid-cols-3 items-center px-8 py-5 bg-white border-b border-slate-100 relative z-50">
      {/* Izquierda: Salir + MedSim */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg">
          <LogOut className="w-5 h-5 rotate-180 stroke-[1.5px]" />
        </button>
        <h1 className="text-xl font-black text-[#003d4c] tracking-tighter">
          MedSim
        </h1>
      </div>

      {/* Centro: Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`px-6 py-2.5 text-[11px] font-black rounded-xl transition-all flex items-center gap-2 uppercase tracking-[0.1em] ${activeView === tab.id
                  ? 'bg-[#003d4c] text-white shadow-lg shadow-sky-900/20'
                  : 'text-slate-400 hover:text-[#003d4c] hover:bg-white'
                }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Derecha: Vacío (Para mantener el centrado perfecto del grid) */}
      <div className="flex justify-end" />
    </header>
  );
}
