import React from 'react';
import { User, ClipboardList, Thermometer, UserCheck } from 'lucide-react';

export function MedicalRecordView() {
  return (
    <div className="h-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-y-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-[#003d4c]">Ficha clinica</h1>
      </div>

      <div className="bg-[#eef7f9] rounded-2xl p-6 mb-8 border border-sky-100">
        <h2 className="text-2xl font-bold text-[#003d4c]">Mariana Silva - 28 Años</h2>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-3 bg-[#00c4cc] rounded-full" />
            <h3 className="font-bold text-[#003d4c] uppercase tracking-wider text-sm">Datos de identificacion</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 px-2">
            {[
              { label: 'NOMBRE Y APELLIDO', value: 'Mariana Silva' },
              { label: 'FECHA DE NACIMIENTO', value: '1995-08-24' },
              { label: 'DNI', value: '42.123.456' },
              { label: 'OBRA SOCIAL / PREPAGA', value: 'OSDE 210' },
              { label: 'SEXO', value: 'Femenino' },
              { label: 'OCUPACION', value: 'Arquitecta' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-baseline border-b border-slate-50 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
                <span className="text-sm font-semibold text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-3 bg-[#00c4cc] rounded-full" />
            <h3 className="font-bold text-[#003d4c] uppercase tracking-wider text-sm">Motivo de consulta (triage)</h3>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "Paciente refiere cefalea persistente de inicio súbito hace 12 horas, acompañada de fotofobia leve y náuseas. No refiere fiebre previa."
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-3 bg-[#00c4cc] rounded-full" />
            <h3 className="font-bold text-[#003d4c] uppercase tracking-wider text-sm">Antecedentes personales</h3>
          </div>
          <div className="flex flex-wrap gap-2 px-2">
            {['Migrañas episódicas', 'Alergia a Penicilina', 'Asma controlado'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-500 rounded-lg uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
