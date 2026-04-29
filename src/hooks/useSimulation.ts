import { useState, useEffect, useCallback } from 'react';
import { Patient, ViewMode } from '../models/simulation';
import { PatientService } from '../services/PatientService';

/**
 * Controller-like hook that manages the simulation state and coordinates services.
 */
export function useSimulation() {
  const [patient, setPatient] = useState<Patient>(PatientService.getInstance().getPatientData());
  const [activeView, setActiveView] = useState<ViewMode>('paciente');
  const [sessionTime, setSessionTime] = useState(0);

  // Simulation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update vitals with random variation to simulate life
  useEffect(() => {
    const vitalTimer = setInterval(() => {
      const variation = Math.floor(Math.random() * 3) - 1;
      const newHeartRate = patient.vitals.heartRate + variation;
      
      PatientService.getInstance().updateVitals({ heartRate: newHeartRate });
      setPatient(PatientService.getInstance().getPatientData());
    }, 3000);
    
    return () => clearInterval(vitalTimer);
  }, [patient.vitals.heartRate]);

  const changeView = useCallback((view: ViewMode) => {
    setActiveView(view);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    patient,
    activeView,
    sessionTime: formatTime(sessionTime),
    changeView,
  };
}
