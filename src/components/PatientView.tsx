import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { AlertCircle, User, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Patient } from '../models/simulation';

const MEDSIM_MODEL_PATH = '/models/medsim_demo.glb';
const TALKING_ANIMATION_NAME = 'mixamo.com.001';
const MODEL_SCALE = 1;
const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const ORBIT_TARGET: [number, number, number] = [
  0.09771890875058677,
  -0.4765669964132093,
  -0.1357422255145624,
];
const CAMERA_POSITION: [number, number, number] = [
  -1.3780886310462146,
  -0.31360680425939247,
  1.2041966093775769,
];
const CAMERA_FOV = 50;
const MODEL_ROTATION: [number, number, number] = [0, 0, 0];

interface PatientViewProps {
  patient: Patient;
  isCompact?: boolean;
}

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

function MedSimScene() {
  const { scene, animations } = useGLTF(MEDSIM_MODEL_PATH);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const centerOffset = useMemo(() => {
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.traverse((object) => {
      const mesh = object as THREE.Mesh | THREE.SkinnedMesh;

      if (!mesh.isMesh) {
        return;
      }

      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.frustumCulled = true;
    });

    return [-center.x, -center.y, -center.z] as [number, number, number];
  }, [scene]);

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;

    const talkingClip =
      THREE.AnimationClip.findByName(animations, TALKING_ANIMATION_NAME) ??
      animations.find((animation) => animation.name.includes('001')) ??
      animations[1] ??
      animations[0];

    if (talkingClip) {
      const action = mixer.clipAction(talkingClip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.reset();
      action.play();
    }

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      mixerRef.current = null;
    };
  }, [scene, animations]);

  useFrame((_state, delta) => {
    const clampedDelta = Math.min(delta, 1 / 30);
    mixerRef.current?.update(clampedDelta);
  });

  return (
    <group position={MODEL_POSITION} scale={MODEL_SCALE} rotation={MODEL_ROTATION}>
      <group position={centerOffset}>
        <primitive object={scene} />
      </group>
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
            shadows={false}
            dpr={[1, 1]}
            frameloop="always"
            gl={{
              antialias: false,
              alpha: false,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
          >
            <PerspectiveCamera makeDefault position={CAMERA_POSITION} fov={isCompact ? CAMERA_FOV + 8 : CAMERA_FOV} />

            <ambientLight intensity={1.5} />
            <directionalLight position={[4, 8, 8]} intensity={2} />

            <MedSimScene />

            <OrbitControls
              target={ORBIT_TARGET}
              enableRotate
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
              minDistance={2}
              maxDistance={12}
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
