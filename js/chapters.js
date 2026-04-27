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
    title: "Defensa de aplicaciones web",
    subtitle: "Validar input, auditar logs, endurecer headers",
    summary: "El otro lado del SQLi y del XSS: cómo se escribe el código que NO cae. Validación, parsing de logs y reporting de hallazgos.",
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
    title: "Forense y respuesta a incidentes",
    subtitle: "Triage, hashing y timeline en un host bajo investigación",
    summary: "subprocess, bash básico, scripts encadenados — desde el lado del que llega después y reconstruye lo que pasó.",
  },
  {
    id: 8,
    title: "Operación Caldera",
    subtitle: "Final: respuesta a un APT en un cliente real",
    summary: "Un APT hostil ataca a un cliente. Tu papel: detectar, contener y reportar — todo lo aprendido al servicio del blue team.",
  },
  {
    id: 9,
    title: "Detección y análisis defensivo",
    subtitle: "YARA-like, typosquat, IOCs, deps, reglas Sigma",
    summary: "El bloque de threat intel y análisis: clasificar muestras por strings, detectar paquetes typosquat en la cadena de suministro, extraer IOCs de emails, auditar dependencias y escribir reglas de detección. Todo el lado del analista.",
  },
];
