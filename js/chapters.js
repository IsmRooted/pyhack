// PyHack — capítulos del programa de formación de Sentinel Labs.
// 9 capítulos · 50 operaciones · 8 evaluaciones internas.

const CHAPTERS = [
  {
    id: 0,
    title: "Onboarding técnico",
    subtitle: "Python fundamentos en el contexto de la firma",
    summary: "Tu primera semana. Aún no haces pentesting — repasas Python.",
  },
  {
    id: 1,
    title: "Reconocimiento básico",
    subtitle: "Recoger información sobre un objetivo",
    summary: "Antes de atacar, escuchas. Puertos, banners, DNS. La base de cualquier operación.",
  },
  {
    id: 2,
    title: "Análisis de servicios",
    subtitle: "Identificar qué hay detrás de cada puerto",
    summary: "Parseo de respuestas, regex, manejo de errores. Convertir bytes en información útil.",
  },
  {
    id: 3,
    title: "Web Hacking I",
    subtitle: "HTTP, APIs y autenticación",
    summary: "El protocolo que sostiene Internet. requests, sesiones, headers, JSON.",
  },
  {
    id: 4,
    title: "Web Hacking II",
    subtitle: "Vulnerabilidades clásicas (educativo)",
    summary: "SQLi, XSS, traversal. Las fallas que han marcado dos décadas — contra labs simulados.",
  },
  {
    id: 5,
    title: "Cripto y datos",
    subtitle: "Codificación, hashing y cifrado débil",
    summary: "Base64, hashes, César, XOR. Romper cosas mal protegidas y entender por qué se rompen.",
  },
  {
    id: 6,
    title: "Red y protocolos",
    subtitle: "Sockets, paquetes, tráfico",
    summary: "Bajo HTTP hay TCP. Bajo TCP hay paquetes. Aprender a leer ese nivel.",
  },
  {
    id: 7,
    title: "Post-explotación + Bash",
    subtitle: "Una vez dentro: enumerar, persistir, exfiltrar",
    summary: "subprocess, bash básico, scripts encadenados. La vida después del exploit.",
  },
  {
    id: 8,
    title: "Operación Caldera",
    subtitle: "Final: aplicar todo lo aprendido",
    summary: "Una APT hostil ataca a un cliente real. No es laboratorio. Demuestras lo que sabes.",
  },
];
