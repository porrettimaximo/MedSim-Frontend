# 🩺 MedSim

**MedSim** es una plataforma de simulación médica avanzada construida con React y Three.js.

## 🏗️ Arquitectura del Proyecto

### 1. Modelos (`src/models`)
Definen las estructuras de datos y tipos de la aplicación. Es el equivalente a los POJOs o Entidades en Java.
- **Ejemplo:** `simulation.ts` define qué propiedades tiene un `Patient` o un `ChatMessage`.

### 2. Vistas / Componentes (`src/components`)
Contienen la lógica de representación y el diseño (HTML/CSS). 
- **PatientView:** Encargado de renderizar el motor 3D y la paciente.
- **SimHeader:** Controla la navegación superior.
- **ChatView:** Gestiona la interfaz de mensajería.

### 3. Servicios (`src/services`)
Aquí reside la lógica de negocio y las llamadas a APIs (o simulaciones de datos). 
- **PatientService:** Gestiona la obtención de datos de pacientes y el historial clínico.

### 4. Controladores / Hooks (`src/hooks`)
En React, los hooks actúan como controladores que gestionan el **Estado** y la lógica que une los Servicios con las Vistas.
- **useSimulation:** Gestiona en qué pestaña está el usuario y qué paciente se está simulando.

---

## 🛠️ Stack Tecnológico

- **React 19:** Biblioteca principal para la interfaz de usuario.
- **TypeScript:** Superset de JavaScript que añade tipado estático (similar a Java) para evitar errores en tiempo de desarrollo.
- **Vite:** Herramienta de construcción ultra rápida para el desarrollo.
- **Three.js & React Three Fiber:** Motor para renderizar el entorno médico 3D.
- **Tailwind CSS:** Framework de utilidades CSS para un diseño premium y rápido.
- **Framer Motion:** Para animaciones y transiciones fluidas entre vistas.

---

## 📁 Estructura de Carpetas

```text
/
├── public/              # Archivos estáticos (Modelos 3D .glb, Imágenes)
├── src/
│   ├── components/      # Piezas de la interfaz (LEGOs)
│   ├── hooks/           # Lógica de estado y controladores
│   ├── models/          # Definición de tipos e interfaces
│   ├── services/        # Lógica de datos y llamadas externas
│   ├── lib/             # Utilidades y configuración de herramientas
│   ├── App.tsx          # Punto de entrada de la aplicación
│   └── main.tsx         # Renderizado inicial
├── package.json         # Dependencias del proyecto
└── tailwind.config.ts   # Configuración de diseño
```

---

## 🚀 Cómo empezar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```
