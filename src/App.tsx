import React from 'react';
import { useSimulation } from './hooks/useSimulation';
import { PatientView } from './components/PatientView';
import { SimHeader } from './components/SimHeader';
import { ChatView } from './components/ChatView';
import { MedicalRecordView } from './components/MedicalRecordView';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { patient, activeView, changeView } = useSimulation();

  return (
    <div className="flex flex-col h-screen bg-[#f0f7f9] text-slate-900 overflow-hidden font-sans">
      {/* View: Header (Controla la navegación) */}
      <SimHeader 
        activeView={activeView} 
        onViewChange={changeView} 
      />

      <main className="flex-1 relative flex overflow-hidden p-4 gap-4">
        <AnimatePresence mode="popLayout">
          {/* Lógica de división de pantalla */}
          
          {/* VISTA: PACIENTE (Solo o a la Izquierda) */}
          {(activeView === 'paciente' || activeView === 'chat') && (
            <motion.div 
              key="patient-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                width: activeView === 'paciente' ? '100%' : '50%' 
              }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm bg-white"
            >
              <PatientView patient={patient} isCompact={activeView === 'chat'} />
            </motion.div>
          )}

          {/* VISTA: CHAT (A la Derecha en pestaña Chat, a la Izquierda en pestaña Ficha) */}
          {(activeView === 'chat' || activeView === 'ficha') && (
            <motion.div 
              key="chat-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                width: '50%'
              }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full"
            >
              <ChatView />
            </motion.div>
          )}

          {/* VISTA: FICHA CLÍNICA (Solo a la Derecha en pestaña Ficha) */}
          {activeView === 'ficha' && (
            <motion.div 
              key="ficha-panel"
              initial={{ opacity: 0, x: 40 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                width: '50%'
              }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full"
            >
              <MedicalRecordView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
