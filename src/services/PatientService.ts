import { Patient } from '../models/simulation';

/**
 * Service to handle patient-related business logic and data fetching.
 */
export class PatientService {
  private static instance: PatientService;
  
  private currentPatient: Patient = {
    id: 'MS-8821',
    name: 'Mariana Silva',
    age: 28,
    gender: 'Femenino',
    reasonForVisit: 'Cefalea persistente y sensibilidad a la luz',
    vitals: {
      heartRate: 78,
      bloodPressure: '120/80',
      oxygenSaturation: 98,
      temperature: 36.6,
    },
    avatarUrl: '/placeholder-avatar.jpg',
  };

  private constructor() {}

  public static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService();
    }
    return PatientService.instance;
  }

  public getPatientData(): Patient {
    return { ...this.currentPatient };
  }

  public updateVitals(newVitals: Partial<Patient['vitals']>): void {
    this.currentPatient.vitals = {
      ...this.currentPatient.vitals,
      ...newVitals,
    };
  }
}
