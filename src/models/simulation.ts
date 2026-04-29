export interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  oxygenSaturation: number;
  temperature: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  reasonForVisit: string;
  vitals: VitalSigns;
  avatarUrl: string;
}

export interface Message {
  id: string;
  sender: 'doctor' | 'patient' | 'system';
  content: string;
  timestamp: Date;
  hasAudio?: boolean;
}

export type ViewMode = 'paciente' | 'chat' | 'ficha';
