import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  Float,
  Loader
} from '@react-three/drei';
import * as THREE from 'three';
import { Loader2, AlertCircle, User, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Patient } from '../models/simulation';

interface PatientViewProps {
  patient: Patient;
  isCompact?: boolean;
}

// Error Boundary Component for the 3D Canvas
class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white p-6 text-center">
          <div className="max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Error de Simulación</h3>
            <p className="text-slate-400 mb-6">Hubo un problema al cargar los recursos 3D. Asegúrate de que los archivos del modelo estén presentes.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full transition-all font-bold shadow-lg shadow-cyan-900/40"
            >
              Recargar Simulador
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function HumanPatient() {
  // Cargamos el modelo (Michelle.glb renombrado a patient.glb)
  const { scene, animations } = useGLTF('/patient.glb');
  const group = useRef<THREE.Group>(null);
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));

  useEffect(() => {
    if (animations && animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
    
    return () => {
      mixer.stopAllAction();
    };
  }, [scene, animations, mixer]);

  useFrame((state, delta) => {
    mixer.update(delta);
    
    // Movimiento sutil de respiración/balanceo
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -1.2, 0]} scale={1.2}>
      <primitive object={scene} castShadow />
    </group>
  );
}

// Entorno médico minimalista y profesional
function MedicalRoom() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Suelo médico */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.05} />
      </mesh>
      
      {/* Pared frontal */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Zócalo decorativo cian */}
      <mesh position={[0, 0.1, -7.9]}>
        <boxGeometry args={[40, 0.2, 0.1]} />
        <meshStandardMaterial color="#00c4cc" emissive="#00c4cc" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export const PatientView: React.FC<PatientViewProps> = ({ patient, isCompact }) => {
  return (
    <div className="relative w-full h-full bg-[#f1f5f9] overflow-hidden">
      <SceneErrorBoundary>
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin mb-6" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Preparando Entorno Médico...</p>
            </div>
          </div>
        }>
          <Canvas 
            shadows 
            dpr={[1, 2]} 
            gl={{ antialias: true, stencil: false }}
          >
            {/* Cámara más alta y alejada para ver el torso y rostro */}
            <PerspectiveCamera makeDefault position={[0, 1.5, 4.5]} fov={isCompact ? 50 : 35} />
            
            {/* Iluminación de alta calidad */}
            <ambientLight intensity={1.2} />
            <spotLight 
              position={[5, 10, 5]} 
              angle={0.15} 
              penumbra={1} 
              intensity={2} 
              castShadow 
            />
            <pointLight position={[-5, 5, -5]} intensity={1} color="#00c4cc" />
            <pointLight position={[0, 2, 5]} intensity={0.5} color="#ffffff" />

            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
              <HumanPatient />
            </Float>
            
            <MedicalRoom />
            
            <Environment preset="apartment" />
            <ContactShadows 
              position={[0, -1.2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={4.5} 
            />
            
            <OrbitControls 
              enablePan={false} 
              target={[0, 1.2, 0]} // Apunta a la cara/pecho de la paciente
              minPolarAngle={Math.PI / 4} 
              maxPolarAngle={Math.PI / 1.8} 
              minDistance={2}
              maxDistance={7}
            />
          </Canvas>
          <Loader />
        </Suspense>
      </SceneErrorBoundary>

      {/* Premium UI Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex justify-between items-start"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white p-4 rounded-3xl flex items-center gap-4 pointer-events-auto shadow-xl shadow-slate-200/50">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <User className="text-[#00c4cc] w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Simulación Activa</p>
              <h2 className="text-[#003d4c] text-lg font-black tracking-tight">{patient.name}</h2>
            </div>
          </div>
        </motion.div>

        {/* Botón de Micrófono flotante - Diseño Premium */}
        <div className="flex justify-end p-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-[#003d4c] text-white flex items-center justify-center shadow-2xl shadow-cyan-900/40 border-4 border-white/20 backdrop-blur-sm group pointer-events-auto transition-all"
          >
            <Mic className="w-9 h-9 group-hover:text-cyan-400 transition-colors" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Pre-carga
useGLTF.preload('/patient.glb');
