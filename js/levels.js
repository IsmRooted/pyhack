// PyHack — 50 operaciones. Cap 0 (1-5) jugable; resto skeleton hasta próximas sesiones.
//
// Cada nivel:
//   id, chapter, title, location, concept
//   intro, mission, hint, theory_id (opcional, lookup en theories.js)
//   starterCode
//   win:    { mustPrint, mustPrintMin, mustReachGoal, customCheck? }
//   requires: array de regex que el código debe cumplir
//   restrictions: array de reglas para examen
//   solution: código de referencia
//   stub: true → todavía no implementado, no jugable

const LEVELS = [
  // ============================================================
  // CAPÍTULO 0 — ONBOARDING TÉCNICO (1-5)
  // ============================================================
  {
    id: 1, chapter: 0,
    title: "Primer login",
    location: "Sentinel Labs · sala de inducción",
    concept: "print() y comentarios",
    is_checkpoint: true,
    intro:
      "Iris te recibe con un terminal abierto. \"Antes de nada, llama a la " +
      "herramienta más universal de Python: print. El sistema necesita que " +
      "te identifiques.\"",
    outro:
      "Identificación registrada.",
    diary:
      "Día 1. Sentinel Labs. Iris me ha pedido un print. Tan absurdo como " +
      "necesario — todo lo que vendrá lo voy a depurar con eso.",
    mission:
      "Imprime un mensaje de identificación con print(\"...\"). El sistema " +
      "comprueba que tu código se ejecuta sin errores y que produces output.\n\n" +
      "Las líneas que empiezan con # son COMENTARIOS — Python las ignora. " +
      "Sirven para dejarte notas.",
    hint: 'print("Operativo: Aldric")',
    starterCode:
      '# Misión: imprime tu identificación con print("...")\n# (Las líneas con # son comentarios — Python las ignora.)\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bprint\s*\(/, message: "Debes usar la función print(...)" },
    ],
  },

  {
    id: 2, chapter: 0,
    title: "Tu cobertura",
    location: "Sentinel Labs · escritorio asignado",
    concept: "Variables y f-strings",
    intro:
      "\"En campo no usarás tu nombre real,\" dice Iris. \"Una variable " +
      "guarda un valor con un nombre. Las f-strings te dejan incrustarlas " +
      "dentro de texto sin sufrir.\"",
    outro:
      "Alias registrado.",
    diary:
      "Día 2. Mi alias operativo. Una variable y una f-string después, mi " +
      "cobertura está en el sistema.",
    mission:
      "1) Define una variable alias con tu nombre operativo (un string, " +
      "entre comillas).\n" +
      "2) Define una variable rol = \"junior\".\n" +
      "3) Imprime usando una f-string algo como: \"Operativo Aldric, rango junior\".",
    hint:
      'alias = "Aldric"\nrol = "junior"\nprint(f"Operativo {alias}, rango {rol}")',
    starterCode:
      '# 1. alias = "..."\n# 2. rol = "junior"\n# 3. print con f-string que use ambas variables\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /^[ \t]*[a-zA-Z_]\w*\s*=(?!=)/m,
        message: "Debes definir al menos una variable con =" },
      { type: 'mustContain', regex: /\bf['"]/,
        message: "Debes usar una f-string (empieza con f\" o f')" },
    ],
  },

  {
    id: 3, chapter: 0,
    title: "Hash de prueba",
    location: "Laboratorio · taller de Python",
    concept: "Operadores y conversión de tipos",
    gives_potion: true,
    intro:
      "\"Matemáticas básicas. Quiero ver que dominas operadores y " +
      "conversión de tipos antes de tocar nada serio.\"",
    outro:
      "Cálculo correcto. Has obtenido una VPN burner para tu kit.",
    diary:
      "Día 3. Recordé que str() convierte número a texto. Detalle pequeño, " +
      "error frecuente.",
    mission:
      "1) Calcula hash_simple = (12345 * 7) % 1000 (un hash modular muy " +
      "básico).\n" +
      "2) Imprime un mensaje concatenado tipo: \"Hash calculado: \" + str(hash_simple).",
    hint:
      'hash_simple = (12345 * 7) % 1000\nprint("Hash calculado: " + str(hash_simple))',
    starterCode:
      '# 1. Calcula hash_simple = (12345 * 7) % 1000\n# 2. Imprime concatenando texto + str(hash_simple)\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bstr\s*\(/,
        message: "Debes usar str(...) para convertir el número a texto" },
      { type: 'mustContain', regex: /[+\-*/%]/,
        message: "Debes hacer una operación aritmética (+, *, %, …)" },
    ],
  },

  {
    id: 4, chapter: 0,
    title: "Lista de empleados",
    location: "Sistema interno · directorio",
    concept: "Listas y for in lista",
    intro:
      "\"Procesa el directorio interno. Una lista guarda varios valores; " +
      "un for los recorre. Esto lo harás constantemente.\"",
    outro:
      "Directorio procesado. Mañana, operativos reales.",
    diary:
      "Día 4. Listas + for. Lo más usado del lenguaje, y lo aprendí en una " +
      "tarea administrativa. Bien jugado por Iris.",
    mission:
      "1) Crea una lista empleados con al menos 4 strings (nombres).\n" +
      "2) Recorre la lista con un for e imprime para cada uno: \"Empleado: NOMBRE\".\n" +
      "3) Después de la lista, imprime cuántos hay con len().",
    hint:
      'empleados = ["Iris", "Marco", "Sara", "David"]\nfor e in empleados:\n    print(f"Empleado: {e}")\nprint(f"Total: {len(empleados)}")',
    starterCode:
      '# 1. Crea una lista de empleados (al menos 4 strings)\n# 2. Recorre con for e imprime cada uno con f-string\n# 3. Imprime el total con len()\n\n',
    win: { mustPrint: true, mustPrintMin: 5 },
    requires: [
      { type: 'mustContain', regex: /=\s*\[[^\]]*,[^\]]*\]/,
        message: "Debes crear una lista con varios elementos" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+(?!range\b)\w+/,
        message: "Debes recorrer la lista con un for (no con range)" },
      { type: 'mustContain', regex: /\blen\s*\(/,
        message: "Debes imprimir el total con len(...)" },
    ],
  },

  {
    id: 5, chapter: 0,
    title: "Evaluación de inducción",
    location: "Sala de evaluaciones · Sentinel Labs",
    concept: "EVALUACIÓN — repaso del Cap 0",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Última prueba antes de campo. Sin pista, sin teoría. " +
      "Demuestra que dominas lo básico.\"",
    outro:
      "Evaluación superada. Acreditación firmada.",
    diary:
      "Día 5. Primera evaluación interna. Sin pista. Aprobé con menos " +
      "esfuerzo del que esperaba — la práctica diaria sirve.",
    mission:
      "Procesa una lista de IPs. Para cada IP, imprime: \"Target N: IP\" " +
      "donde N es el número de orden (empezando en 1) y IP es el valor.\n\n" +
      "Después imprime el total con un f-string: \"Procesados N targets\".\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 8 líneas (sin contar comentarios)\n" +
      "• Debes usar al menos un bucle for\n" +
      "• Debes usar f-strings (al menos una)",
    hint: "Evaluación sin pista.",
    solution:
      'ips = ["10.0.0.1", "10.0.0.2", "10.0.0.5", "10.0.0.7"]\n' +
      'for i, ip in enumerate(ips, 1):\n' +
      '    print(f"Target {i}: {ip}")\n' +
      'print(f"Procesados {len(ips)} targets")',
    starterCode:
      '# EVALUACIÓN — Capítulo 0\n# Sin pista. Sin teoría previa.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    restrictions: [
      { type: 'maxLines', value: 8, message: "Máximo 8 líneas" },
      { type: 'mustContain', regex: /\bfor\b/, message: "Debes usar un bucle for" },
      { type: 'mustContain', regex: /\bf['"]/, message: "Debes usar una f-string" },
    ],
  },

  // ============================================================
  // CAPÍTULO 1 — RECONOCIMIENTO BÁSICO (6-12) — ACME Inc.
  // ============================================================
  {
    id: 6, chapter: 1,
    title: "Primer escaneo de puertos",
    location: "Cliente: ACME Inc · target.acme.local",
    concept: "scan_port + bucle for",
    is_checkpoint: true,
    intro:
      "Iris desliza un sobre por la mesa: orden de auditoría firmada por el " +
      "CEO de ACME Inc. \"Empezamos por lo básico: averiguar qué puertos " +
      "tiene abiertos su servidor de pruebas. Tu nueva herramienta es " +
      "scan_port(host, port). Devuelve 'open', 'closed' o 'filtered'.\"",
    outro:
      "Primer escaneo registrado.",
    diary:
      "Día 6. Mi primer recon real. scan_port devuelve un string por puerto. " +
      "Iterar con un for sobre una lista de puertos comunes — más simple de " +
      "lo que pensaba.",
    mission:
      "Escanea los puertos 22, 80, 443 y 3306 del host \"target.acme.local\". " +
      "Para cada puerto, imprime una línea con el formato:\n\n" +
      "    Puerto X: estado\n\n" +
      "Necesitarás un bucle for sobre la lista de puertos.",
    hint:
      'for port in [22, 80, 443, 3306]:\n' +
      '    estado = scan_port("target.acme.local", port)\n' +
      '    print(f"Puerto {port}: {estado}")',
    starterCode:
      '# Escanea 22, 80, 443, 3306 del host "target.acme.local"\n' +
      '# Para cada puerto imprime: "Puerto X: estado"\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bscan_port\s*\(/,
        message: "Debes llamar a scan_port(host, port)" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\b/,
        message: "Debes recorrer los puertos con un bucle for" },
      { type: 'mustContain', regex: /\bf['"]/,
        message: "Imprime con f-string" },
    ],
    targets: {
      "target.acme.local": {
        note: "ACME Inc · servidor de pruebas autorizado",
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH",       banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu" },
          80:   { status: "open",     service: "HTTP",      banner: "Apache/2.4.41 (Ubuntu)" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt",  banner: "Werkzeug/2.0.1 Python/3.9.7" },
        },
      },
    },
  },

  {
    id: 7, chapter: 1,
    title: "Filtrar puertos abiertos",
    location: "ACME · primer reporte",
    concept: "if + comparación con ==",
    intro:
      "\"Bien. Pero un escaneo crudo es ruido para el cliente — solo le " +
      "interesa lo que está abierto. Filtra con un if. La comparación es " +
      "doble igual: ==.\"",
    outro:
      "Resultados filtrados.",
    diary:
      "Día 7. Aprendí que = asigna y == compara. Confundirlos es el clásico " +
      "que mi maestro repetía. Yo también, ahora.",
    mission:
      "Escanea estos puertos: 21, 22, 80, 443, 3306, 8080.\n\n" +
      "Imprime SOLO los que estén abiertos, con el formato:\n\n" +
      "    Puerto X abierto",
    hint:
      'for port in [21, 22, 80, 443, 3306, 8080]:\n' +
      '    estado = scan_port("target.acme.local", port)\n' +
      '    if estado == "open":\n' +
      '        print(f"Puerto {port} abierto")',
    starterCode:
      '# Escanea los puertos. Imprime solo los abiertos.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Debes usar scan_port(...)" },
      { type: 'mustContain', regex: /\bif\b/, message: "Debes usar un if para filtrar" },
      { type: 'mustContain', regex: /==/, message: "Compara con == (doble igual)" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH" },
          80:   { status: "open",     service: "HTTP" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt" },
        },
      },
    },
  },

  {
    id: 8, chapter: 1,
    title: "Lista comprensiva",
    location: "ACME · refactorización",
    concept: "List comprehensions",
    gives_potion: true,
    intro:
      "\"Lo que has hecho funciona. Pero Python tiene una forma más concisa " +
      "para 'lista filtrada según condición': las list comprehensions. Una " +
      "línea en lugar de cuatro.\"",
    outro:
      "Sintaxis comprimida. Has obtenido una VPN burner.",
    diary:
      "Día 8. List comprehensions. La primera vez son confusas, la segunda " +
      "ya no las dejas ir. [x for x in lista if condicion].",
    mission:
      "Genera una lista llamada abiertos con los puertos abiertos del " +
      "host, usando una list comprehension. Imprime esa lista directamente.\n\n" +
      "Sintaxis: [expresión for elemento in iterable if condición]\n\n" +
      "Puertos a evaluar: 21, 22, 80, 443, 3306, 8080.",
    hint:
      'puertos = [21, 22, 80, 443, 3306, 8080]\n' +
      'abiertos = [p for p in puertos if scan_port("target.acme.local", p) == "open"]\n' +
      'print(abiertos)',
    starterCode:
      '# Usa una list comprehension para obtener solo los puertos abiertos.\n' +
      '# Sintaxis: [p for p in lista if condicion(p)]\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\[[^\[\]]*\bfor\s+\w+\s+in[^\[\]]*\bif\b[^\[\]]*\]/,
        message: "Debes usar una list comprehension con if (ej: [p for p in lista if cond])" },
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Debes seguir usando scan_port" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 9, chapter: 1,
    title: "Mapa de servicios",
    location: "ACME · catalogación",
    concept: "Diccionarios",
    intro:
      "\"Cada puerto bien conocido tiene un servicio asociado. Un dict es la " +
      "estructura natural para ese mapeo. Y nos sirve para etiquetar los " +
      "hallazgos en el reporte.\"",
    outro:
      "Catálogo registrado.",
    diary:
      "Día 9. Los dicts encajan donde antes amontonaba listas paralelas. " +
      "puerto → servicio en una sola estructura. Iris diría: 'no es novedad, " +
      "es higiene'.",
    mission:
      "Define un dict servicios donde la clave sea el número de puerto y el " +
      "valor el nombre del servicio (ej: 22→SSH, 80→HTTP, 443→HTTPS, " +
      "3306→MySQL, 8080→HTTP-alt).\n\n" +
      "Recórrelo con .items() y por cada par (puerto, nombre), escanea ese " +
      "puerto. Si está abierto, imprime:\n\n" +
      "    Puerto X (NOMBRE): abierto",
    hint:
      'servicios = {\n' +
      '    22: "SSH",\n' +
      '    80: "HTTP",\n' +
      '    443: "HTTPS",\n' +
      '    3306: "MySQL",\n' +
      '    8080: "HTTP-alt",\n' +
      '}\n' +
      'for puerto, nombre in servicios.items():\n' +
      '    if scan_port("target.acme.local", puerto) == "open":\n' +
      '        print(f"Puerto {puerto} ({nombre}): abierto")',
    starterCode:
      '# 1. Define un dict puerto → nombre del servicio\n' +
      '# 2. Recórrelo con .items()\n' +
      '# 3. Para los abiertos, imprime "Puerto X (NOMBRE): abierto"\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /=\s*\{[^}]*:[^}]*\}/,
        message: "Debes definir un dict con { clave: valor }" },
      { type: 'mustContain', regex: /\.items\s*\(/,
        message: "Recorre el dict con .items()" },
      { type: 'mustContain', regex: /\bif\b/, message: "Filtra con if" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH" },
          80:   { status: "open",     service: "HTTP" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt" },
        },
      },
    },
  },

  {
    id: 10, chapter: 1,
    title: "Tu primer scanner",
    location: "Sentinel · toolkit personal",
    concept: "Funciones reutilizables (def + return)",
    intro:
      "\"Has escrito el mismo patrón cuatro veces. Encapsúlalo en una " +
      "función. Es el primer paso para construir un toolkit propio que " +
      "puedas reutilizar contra cualquier cliente, no solo ACME.\"",
    outro:
      "Función registrada en el toolkit.",
    diary:
      "Día 10. Mi primera función propia. def, parámetros, return. La voy " +
      "a llamar contra muchos hosts en operaciones futuras y no tendré que " +
      "rehacerla.",
    mission:
      "Define una función escanear(host, puertos) que:\n\n" +
      "  • Reciba el host (string) y la lista de puertos a probar.\n" +
      "  • Devuelva (return) una lista con los puertos abiertos.\n\n" +
      "Después llámala con \"target.acme.local\" y la lista " +
      "[21, 22, 80, 443, 3306, 8080], guarda el resultado en una variable, e " +
      "imprime: f\"Abiertos: {resultado}\".",
    hint:
      'def escanear(host, puertos):\n' +
      '    abiertos = []\n' +
      '    for p in puertos:\n' +
      '        if scan_port(host, p) == "open":\n' +
      '            abiertos.append(p)\n' +
      '    return abiertos\n\n' +
      'resultado = escanear("target.acme.local", [21, 22, 80, 443, 3306, 8080])\n' +
      'print(f"Abiertos: {resultado}")',
    starterCode:
      '# Define escanear(host, puertos) que devuelva la lista de abiertos.\n' +
      '# Después llámala y muestra el resultado con f-string.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+\s*\(\s*\w+\s*,\s*\w+/,
        message: "Define una función con DOS argumentos: def escanear(host, puertos):" },
      { type: 'mustContain', regex: /^[ \t]+return\b/m,
        message: "Tu función debe devolver el resultado con return" },
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Sigue usando scan_port internamente" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 11, chapter: 1,
    title: "Reporte JSON",
    location: "Sentinel · entrega al cliente",
    concept: "import + módulo json",
    intro:
      "\"Los clientes esperan reportes estructurados, no líneas sueltas en " +
      "stdout. Importa el módulo json de la librería estándar y formatea " +
      "tu salida. Esto le ahorra horas al equipo del cliente que va a " +
      "ingestar tus hallazgos.\"",
    outro:
      "Reporte estructurado entregado.",
    diary:
      "Día 11. import json. Una línea, y stdout deja de ser un caos. " +
      "Pyodide trae la stdlib entera — ipaddress, hashlib, base64. Voy a " +
      "tener que leer la docu.",
    mission:
      "1) Construye un dict resultado donde cada clave sea un puerto " +
      "(de la lista [22, 80, 443, 3306, 8080]) y el valor su estado.\n" +
      "2) Importa json al inicio del script.\n" +
      "3) Imprime con json.dumps(resultado, indent=2) para que salga " +
      "bonito y multilínea.",
    hint:
      'import json\n\n' +
      'resultado = {}\n' +
      'for puerto in [22, 80, 443, 3306, 8080]:\n' +
      '    resultado[puerto] = scan_port("target.acme.local", puerto)\n\n' +
      'print(json.dumps(resultado, indent=2))',
    starterCode:
      '# 1. import json\n' +
      '# 2. construye dict { puerto: estado }\n' +
      '# 3. print(json.dumps(..., indent=2))\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+json\b/,
        message: "Debes importar el módulo json: import json" },
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/,
        message: "Usa json.dumps(...) para serializar el dict" },
      { type: 'mustContain', regex: /\bindent\s*=/,
        message: "Pasa indent=2 para que el JSON salga bonito" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 12, chapter: 1,
    title: "Evaluación: recon multi-host",
    location: "Sala de evaluaciones · ACME completo",
    concept: "EVALUACIÓN — recon estructurado",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Última prueba antes de pasar a fingerprinting. ACME tiene tres " +
      "servidores. Los necesito escaneados y reportados como un solo dict " +
      "anidado, exportado en JSON. Sin pista. Estructura limpia.\"",
    outro:
      "Capítulo cerrado. Pasamos a fingerprinting.",
    diary:
      "Día 12. Primera evaluación de campo. Tres hosts, dict anidado, JSON. " +
      "Todo lo del capítulo a la vez. Salió.",
    mission:
      "Genera un reporte JSON con el siguiente formato:\n\n" +
      "  {\n" +
      "    \"web.acme.local\":  { 22: \"...\", 80: \"...\", ... },\n" +
      "    \"db.acme.local\":   { ... },\n" +
      "    \"mail.acme.local\": { ... }\n" +
      "  }\n\n" +
      "HOSTS: web.acme.local, db.acme.local, mail.acme.local\n" +
      "PUERTOS: 22, 25, 80, 110, 143, 443, 3306\n\n" +
      "Imprime el resultado con json.dumps(..., indent=2).\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 18 líneas (sin contar comentarios)\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes importar json\n" +
      "• Debes usar al menos un dict",
    hint: "Evaluación sin pista.",
    solution:
      'import json\n\n' +
      'def escanear(host, puertos):\n' +
      '    return {p: scan_port(host, p) for p in puertos}\n\n' +
      'hosts = ["web.acme.local", "db.acme.local", "mail.acme.local"]\n' +
      'puertos = [22, 25, 80, 110, 143, 443, 3306]\n\n' +
      'reporte = {}\n' +
      'for h in hosts:\n' +
      '    reporte[h] = escanear(h, puertos)\n\n' +
      'print(json.dumps(reporte, indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 1\n' +
      '# Recon multi-host con reporte JSON. Sin pista.\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 18, message: "Máximo 18 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función con def" },
      { type: 'mustContain', regex: /\bimport\s+json\b/, message: "Importa el módulo json" },
      { type: 'mustContain', regex: /\{[^}]*[:,][^}]*\}|\{\s*\}/, message: "Usa al menos un dict" },
    ],
    targets: {
      "web.acme.local": {
        note: "ACME · servidor web público",
        ports: {
          22:   { status: "filtered" },
          80:   { status: "open",   service: "HTTP" },
          443:  { status: "open",   service: "HTTPS" },
          3306: { status: "closed" },
        },
      },
      "db.acme.local": {
        note: "ACME · base de datos interna",
        ports: {
          22:   { status: "open",   service: "SSH" },
          80:   { status: "closed" },
          3306: { status: "open",   service: "MySQL" },
          443:  { status: "closed" },
        },
      },
      "mail.acme.local": {
        note: "ACME · servidor de correo",
        ports: {
          22:   { status: "filtered" },
          25:   { status: "open",   service: "SMTP" },
          110:  { status: "closed" },
          143:  { status: "open",   service: "IMAP" },
          443:  { status: "open",   service: "HTTPS" },
        },
      },
    },
  },

  // ============================================================
  // CAPÍTULO 2 — ANÁLISIS DE SERVICIOS (13-18) — STUBS
  // ============================================================
  { id: 13, chapter: 2, title: "Banner grabbing",                 location: "Cliente: NorthBank",                    concept: "String methods (split, strip)", stub: true },
  { id: 14, chapter: 2, title: "Patrón en el ruido",              location: "NorthBank · análisis",                  concept: "Regex (re module)", stub: true },
  { id: 15, chapter: 2, title: "Cuando algo falla",               location: "Sentinel toolkit",                      concept: "try / except", stub: true },
  { id: 16, chapter: 2, title: "Modelando un servicio",           location: "Sentinel toolkit",                      concept: "Clases básicas (class)", stub: true },
  { id: 17, chapter: 2, title: "Persistir hallazgos",             location: "Sentinel toolkit",                      concept: "Lectura/escritura de archivos", stub: true },
  { id: 18, chapter: 2, title: "Evaluación: fingerprinting",      location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 2", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 3 — WEB HACKING I: HTTP Y APIs (19-24) — STUBS
  // ============================================================
  { id: 19, chapter: 3, title: "Tu primera petición HTTP",        location: "Cliente: ShopStack",                    concept: "requests.get / status codes", stub: true },
  { id: 20, chapter: 3, title: "JSON y APIs REST",                location: "ShopStack · API",                       concept: "Parseo de JSON", stub: true },
  { id: 21, chapter: 3, title: "GET vs POST",                     location: "ShopStack · login",                     concept: "Parámetros + URL crafting", stub: true },
  { id: 22, chapter: 3, title: "Sesiones y cookies",              location: "ShopStack · sesión",                    concept: "Sesiones HTTP", stub: true },
  { id: 23, chapter: 3, title: "Headers a medida",                location: "ShopStack · admin",                     concept: "Manipulación de headers", stub: true },
  { id: 24, chapter: 3, title: "Evaluación: panel admin",         location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 3", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 4 — WEB HACKING II: VULNERABILIDADES (25-30) — STUBS
  // ============================================================
  { id: 25, chapter: 4, title: "SQL injection: el clásico",       location: "Lab vulnerable",                        concept: "SQLi básico (educativo)", stub: true },
  { id: 26, chapter: 4, title: "UNION para extraer",              location: "Lab vulnerable",                        concept: "UNION-based extraction", stub: true },
  { id: 27, chapter: 4, title: "XSS: ojo con lo que pintas",      location: "Lab vulnerable",                        concept: "XSS reflejado y persistente", stub: true },
  { id: 28, chapter: 4, title: "Bypass de autenticación",         location: "Lab vulnerable",                        concept: "Auth bypass patterns", stub: true },
  { id: 29, chapter: 4, title: "Directory traversal",             location: "Lab vulnerable",                        concept: "../../../ y similares", stub: true },
  { id: 30, chapter: 4, title: "Evaluación: explotación web",     location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 4", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 5 — CRYPTO Y DATOS (31-35) — STUBS
  // ============================================================
  { id: 31, chapter: 5, title: "Codificaciones básicas",          location: "Forense de datos",                      concept: "base64, hex, url encoding", stub: true },
  { id: 32, chapter: 5, title: "Hashes y rainbow tables",         location: "Forense de datos",                      concept: "md5, sha + cracking simple", stub: true },
  { id: 33, chapter: 5, title: "César y XOR",                     location: "Comunicación interceptada",             concept: "Cifrado clásico y XOR", stub: true },
  { id: 34, chapter: 5, title: "Operaciones bitwise",             location: "Comunicación interceptada",             concept: "&, |, ^, <<, >>", stub: true },
  { id: 35, chapter: 5, title: "Evaluación: descifrar mensaje",   location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 5", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 6 — RED Y PROTOCOLOS (36-40) — STUBS
  // ============================================================
  { id: 36, chapter: 6, title: "Sockets crudos",                  location: "Sentinel toolkit",                      concept: "socket.connect / send / recv", stub: true },
  { id: 37, chapter: 6, title: "Leyendo paquetes",                location: "Captura de tráfico",                    concept: "Parseo de pcap (json simulado)", stub: true },
  { id: 38, chapter: 6, title: "HTTP a mano",                     location: "Sentinel toolkit",                      concept: "Construir HTTP sin librería", stub: true },
  { id: 39, chapter: 6, title: "Patrones de tráfico",             location: "Captura de tráfico",                    concept: "Análisis estadístico", stub: true },
  { id: 40, chapter: 6, title: "Evaluación: análisis de captura", location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 6", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 7 — POST-EXPLOTACIÓN + BASH (41-46) — STUBS
  // ============================================================
  { id: 41, chapter: 7, title: "subprocess: ejecutar comandos",   location: "Host comprometido (lab)",               concept: "subprocess.run", stub: true },
  { id: 42, chapter: 7, title: "Bash básico para ofensiva",       location: "Shell remoto (lab)",                    concept: "ls, find, grep, pipes (bash)", stub: true },
  { id: 43, chapter: 7, title: "Enumeración del sistema",         location: "Shell remoto (lab)",                    concept: "Python + bash combinados", stub: true },
  { id: 44, chapter: 7, title: "Persistencia (concepto)",         location: "Lab",                                   concept: "Cron, systemd (educativo)", stub: true },
  { id: 45, chapter: 7, title: "Exfiltración simulada",           location: "Lab",                                   concept: "Encadenar pasos en script", stub: true },
  { id: 46, chapter: 7, title: "Evaluación: pivoting",            location: "Sala de evaluaciones",                  concept: "EVALUACIÓN Cap 7", is_exam: true, stub: true },

  // ============================================================
  // CAPÍTULO 8 — OPERACIÓN CALDERA (47-50) — STUBS
  // ============================================================
  { id: 47, chapter: 8, title: "Caldera: reconocimiento",         location: "Operación real · prep",                 concept: "Recon avanzado integrado", stub: true },
  { id: 48, chapter: 8, title: "Caldera: punto de entrada",       location: "Operación real · ataque",               concept: "Cadena de explotación", stub: true },
  { id: 49, chapter: 8, title: "Caldera: extracción",             location: "Operación real · exfil",                concept: "Exfiltración + reporte", stub: true },
  { id: 50, chapter: 8, title: "EVALUACIÓN FINAL — Caldera",      location: "Sala de evaluaciones · pleno",          concept: "EXAMEN FINAL — todo combinado", is_exam: true, is_final: true, stub: true },
];
